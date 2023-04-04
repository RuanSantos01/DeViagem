import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// MODELS
import User from "../models/User.js";
import SentCode from "../models/SentCode.js";

// REGISTER USER
export const register = async (req, res) => {
    try {

        const {
            fullName,
            email, 
            password,
            phone,
            birthDate,
            gender
        } = req.body;

        const user = await User.findOne({email: email})
        if(user) return res.status(403).json({msg: "Usuário já cadastrado."})

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email, 
            phone,
            birthDate,
            gender,
            accessLevel: "basic",
            activities: [],
            password: passwordHash
        });

        // ENVIAR CÓDIGO DE VALIDAÇÃO DE EMAIL

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (err) {
    
        res.status(500).json({error: err.message});

    }
}

// LOGGING USER
export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: "Usuário não está cadastrado"});
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Credenciais inválidas"});
    
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

// CONFIRM CODE
export const confirmAccount = async(req, res) => {
    const {email, code} = req.body;
    const payload = await SentCode.findOne({email: email});

    if(payload.validation) {
        res.status(403).json({msg: "Código já validado anteriormente"})
    } else {
        if(code === payload.code) {
            SentCode.updateOne(
                {email: email},
                {$set: {validation: true}}
            ).then(() => {
                console.log(`Dado atualizado`)
            }).catch(err => {
                console.log("Error ao atualizar dado no mongo -", err)
            })
            res.status(200).json({validation: true, msg: "Código validado com sucesso!."})
        } else {
            res.status(403).json({validation: false, msg: "Código inválido"})
        }
    }
}