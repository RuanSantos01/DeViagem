import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

// MODELS
import User from "../models/User.js";
import SentCode from "../models/SentCode.js";

// GET USER
export const getUser = async (req, res) => {
    try {

        const { cpf } = req.params;

        const user = await User.findOne({ cpf: cpf })
        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' })

        res.status(200).json({ user })

    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            phone,
            birthDate,
            gender,
            cpf
        } = req.body;

        const user = await User.findOne({ email: email })
        if (user) return res.status(403).json({ msg: "Usuário já cadastrado." })

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            phone,
            birthDate,
            gender,
            accessLevel: "basic",
            cpf,
            activities: [],
            validation: false,
            password: passwordHash
        });

        const savedUser = await newUser.save();

        const code = generateCode();
        sendEmail(email, code);

        const newSentCode = new SentCode({
            email,
            code,
            validation: false
        })
        await newSentCode.save();


        res.status(201).json({ savedUser, msg: "Código enviado por email." })

    } catch (err) {

        res.status(500).json({ error: err.message });

    }
}

// LOGGING USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "Usuário não está cadastrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Credenciais inválidas" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// CONFIRM CODE
export const confirmAccount = async (req, res) => {
    const {
        code,
        email,
    } = req.body;

    const payload = await SentCode.findOne({ email: email });

    if (payload.validation) {
        res.status(403).json({ msg: "Código já validado anteriormente" })
    } else {
        if (code === payload.code) {

            SentCode.updateOne(
                { email: email },
                { $set: { validation: true } }
            ).then(() => {
                console.log(`Dado atualizado`);
            }).catch(err => {
                console.log("Error ao atualizar dado no mongo -", err);
            });

            User.updateOne(
                { email: email },
                { $set: { validation: true } }
            ).then(() => {
                console.log(`Dado atualizado`);
            }).catch(err => {
                console.log("Error ao atualizar dado no mongo -", err);
            });

            res.status(200).json({ validation: true, msg: "Código validado com sucesso!." });
        } else {
            res.status(403).json({ validation: false, msg: "Código inválido" });
        };
    }
}

// UPDATE USER DATA
export const updateUserData = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            _id
        } = req.body;

        const filter = { _id }

        const update = {
            $set: {
                fullName,
                email,
                phone
            }
        }

        await User.updateOne(filter, update)

        res.status(200).json({ msg: 'Dados do usuário atualizados com sucesso.' })
    } catch (err) {
        res.status(500).json({ msg: err })
    }

}

// UPDATE USER DATA
export const updateUserAcesslevel = async (req, res) => {
    try {
        const {
            accessLevel,
            cpf
        } = req.body;

        const filter = { cpf }

        const update = {
            $set: {
                accessLevel
            }
        }

        await User.updateOne(filter, update)

        res.status(200).json({ msg: 'Dados do usuário atualizados com sucesso.' })
    } catch (err) {
        res.status(500).json({ msg: err })
    }

}

// UPDATE PASSWORD
export const updateUserPassword = async (req, res) => {
    try {
        const {
            password,
            newPassword,
            _id
        } = req.body

        const salt = await bcrypt.genSalt();

        const user = await User.findById(_id);
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const newPasswordHash = await bcrypt.hash(newPassword, salt);
            const update = {
                $set: {
                    password: newPasswordHash
                }
            }

            const filter = { _id }
            User.updateOne(filter, update)

            res.status(200).json({ msg: 'Senha alterada com sucesso' })
        } else {
            res.status(505).json({ msg: 'Senha original informada não é válida' })
        }

    } catch (err) {
        res.status(500).json({ msg: err })
    }

}

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email })
        if (!user) res.status(404).json({ msg: 'Usuário não encontrado!' })

        const code = generateCode();
        sendEmail(email, code);

        const newSentCode = new SentCode({
            email,
            code,
            validation: false
        })
        await newSentCode.save();

        res.status(201).json({ msg: "Código enviado por email." })

    } catch (err) {
        res.status(500).json(err)
    }
}

// NEW PASSWORD
export const newPassword = async (req, res) => {
    try {
        const { password, email } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const update = {
            $set: {
                password: passwordHash
            }
        };

        const filter = { email };
        await User.updateOne(filter, update);

        res.status(200).json({ msg: 'Senha alterada com sucesso!' });

    } catch (err) {
        res.status(500).json({ msg: err })
    }

}

// GERADOR DE CÓDIGO
const generateCode = () => {
    let code = '';
    let digits = '0123456789';

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        code += digits[randomIndex];
    }

    return code;
}

// ENVIADOR DE EMAIL
const sendEmail = (email, code) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: email,
        from: "deviagem2023@gmail.com",
        subject: "Código para validação DeViagem",
        text: `Seu código para validação da conta é ${code}`
    }

    sgMail.send(msg)
        .then(() => {
            console.log("Email Enviado")
        }).catch((error) => {
            throw { message: error.message }
        })
}