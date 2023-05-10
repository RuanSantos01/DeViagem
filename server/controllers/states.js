import haversine from "haversine";
import { estados } from "../data/state.js";
import States from "../models/States.js";

export const statesDistance = async (req, res) => {
    const { estadoOrigem } = req.params;

    const estadoSelecionado = estados.find((estado) => estado.nome.toLowerCase() === estadoOrigem.toLowerCase());

    if (!estadoSelecionado) {
        return res.status(400).send('Estado selecionado inválido');
    }

    const estadosDistancia = estados.map((estado) => {
        const distancia = haversine(
            { latitude: estadoSelecionado.lat, longitude: estadoSelecionado.long },
            { latitude: estado.lat, longitude: estado.long },
            { unit: 'km' }
        );

        return {
            nome: estado.nome,
            distancia: distancia.toFixed(0),
        };
    });

    res.json(estadosDistancia);
}

export const states = async (req, res) => {
    try {
        const estados = await States.find();
        res.status(200).json({ estados })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

