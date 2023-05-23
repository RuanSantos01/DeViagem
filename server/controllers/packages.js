import Packages from "../models/Packages.js";
import PaidPackages from "../models/PaidPackages.js";

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
    const {
        codigo,
        formValues,
        cartInformations,
        listaCpfPago,
        listaCpfPendente,
        valorPago,
        valorTotal } = req.body;

    try {

        const newPaidPackage = new PaidPackages({
            codigo,
            formValues,
            cartInformations,
            listaCpfPago,
            listaCpfPendente,
            valorPago,
            valorTotal
        })
        await newPaidPackage.save();

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