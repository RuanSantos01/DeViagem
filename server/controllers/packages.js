import Packages from "../models/Packages.js";
import PaidPackages from "../models/PaidPackages.js";
import User from "../models/User.js";

export const packages = async (req, res) => {
    try {
        const packages = await Packages.find();
        res.status(200).json({ packages })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

export const paidPackages = async (req, res) => {
    const { codigo } = req.body;

    try {
        const pack = await PaidPackages.findOne({ codigo })
        if (!pack) {
            return res.status(404).json({ msg: 'Código não encontrado' })
        }
        res.status(200).json({ pack })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

export const insertPaidPackages = async (req, res) => {

    try {

        const {
            cpf,
            codigo,
            formValues,
            cartInformations,
            listaCpfPago,
            listaCpfPendente,
            valorPago,
            valorTotal } = req.body;

        const newPaidPackage = new PaidPackages({
            cpf,
            codigo,
            formValues,
            cartInformations,
            listaCpfPago,
            listaCpfPendente,
            valorPago,
            valorTotal
        })
        await newPaidPackage.save();

        const cpfNoMask = cpf.replace(/\D/g, '');

        const filter = { cpf: cpfNoMask }
        const user = await User.findOne(filter);

        const activities = user.activities ? [...user.activities, newPaidPackage] : [newPaidPackage];
        const update = {
            $set: {
                activities: activities
            }
        }

        await User.updateOne(filter, update)

        res.status(201).json({ msg: 'Pacote salvo com sucesso!' })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const updatePaidPackages = async (req, res) => {
    try {
        const {
            codigo,
            listaCpfPago,
            listaCpfPendente,
            valorPago
        } = req.body;

        const filter = { codigo: codigo }

        const update = {
            $set: {
                listaCpfPago,
                listaCpfPendente,
                valorPago
            }
        }

        await PaidPackages.updateOne(filter, update)

        res.status(200).json({ msg: 'Pacote atualizado com sucesso' })
    } catch (err) {
        res.status(500).json({ msg: err })
    }


}

export const insertPackagesToAccount = async (req, res) => {
    try {
        const { cpf, pack } = req.body;
        const user = await User.findOne({ cpf })
        const userPackages = user.packages;
        const dest = pack.destino.replace(/\s/g, '');
        const newPack = { ...pack, imagem: `packages/${dest}/${pack.imagem.path}` }
        const update = {
            $set: {
                packages: [...userPackages, newPack]
            }
        }

        await User.updateOne({ cpf }, update)

        res.status(200).json({ msg: 'success' })

    } catch (err) {

        res.status(500).json({ msg: err })
    }
}

export const updatePackagesAccount = async (req, res) => {
    try {

    } catch (err) {

    }
}

export const getUserPackages = async (req, res) => {
    try {

        const { cpf } = req.params;
        const response = await User.findOne({ cpf })

        res.status(200).json(response.packages);

    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

export const insertPackages = async (req, res) => {
    try {

        const {
            operador,
            destino,
            cem,
            valorPassagem,
            pessoas,
            imagem,
            hospedagem,
            vagas,
            dataInicio,
            dataFim,
            vagasRestantes
        } = req.body;

        const dest = destino.replace(/\s/g, '');

        const newPackage = new Packages({
            operador,
            destino,
            cem,
            valorPassagem,
            pessoas,
            imagem: `packages/${dest}/${imagem}`,
            hospedagem: JSON.parse(hospedagem),
            vagas,
            dataInicio,
            dataFim,
            vagasRestantes
        })

        await newPackage.save();

        res.status(201).json({ msg: 'sucesso' })

    } catch (err) {
        console.error('Não foi possível cadastrar o pacote : ', err)
        res.status(500).json({ msg: err })
    }
}