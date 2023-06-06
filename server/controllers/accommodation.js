import Accommodation from "../models/Accommodation.js";

export const accommodations = async (req, res) => {
    try {

        const Accommodations = await Accommodation.find();
        res.status(200).json({ Accommodations })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

export const registerAccommodation = async (req, res) => {
    try {
        console.log(req)
        const {
            nomeLocal,
            destino,
            image,
            images,
            localizacao,
            localizacaoCompleta,
            informacaoGeral,
            tipoQuarto,
            quartos,
            camas,
            avaliacao,
            tempoCapacidade,
            valor,
            descricao,
            informacoesAdicionais,
            geolocalizacao
        } = req.body;

        const newAccommodation = new Accommodation({
            nomeLocal,
            destino,
            image,
            images,
            localizacao,
            localizacaoCompleta,
            informacaoGeral,
            tipoQuarto,
            quartos,
            camas,
            avaliacao,
            tempoCapacidade,
            valor,
            descricao,
            informacoesAdicionais,
            geoLocalizacao: geolocalizacao
        })

        const savedAccommodation = await newAccommodation.save();

        res.status(201).json({ savedAccommodation, msg: 'Hospedagem cadastrada com sucesso!' })


    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

export const getAccommodationByDestiny = async (req, res) => {
    try {

        const {
            destiny
        } = req.body;

        const response = await Accommodation.find({ destino: destiny })

        res.status(200).json(response);

    } catch (err) {
        res.status(500).json({ msg: err })
    }
}