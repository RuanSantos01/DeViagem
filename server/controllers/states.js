import haversine from "haversine";
import { estados } from "../data/state.js";
import States from "../models/States.js";
import axios from "axios";

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

export const getIATAcodes = async (req, res) => {
    try {

        const { origem, destino } = req.body

        const ori = estados.find((estado) => estado.nome === origem)
        const des = estados.find((estado) => estado.nome === destino)

        const retorno = [
            { origem, IATA: ori.aeroporto.IATA },
            { destino, IATA: des.aeroporto.IATA }
        ]

        res.status(200).json(retorno)

    } catch (err) {
        console.error('Erro ao recuperar IATA codes: ', err)
        res.status(500).json(err)
    }
}

export const getTravels = async (req, res) => {
    try {
        const {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            returnDate,
            adults
        } = req.body;

        const token = await getTokenAmadeus();

        const trips = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
            params: {
                originLocationCode,
                destinationLocationCode,
                departureDate,
                returnDate,
                adults,
                max: 5,
                nonStop: true
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const tripsResponse = trips.data.data;

        res.status(200).json(tripsResponse);

    } catch (err) {
        console.error('Erro ao obter viagens da Amadeus API:', err.data);
        res.status(500).json(err)
    }
}

const getTokenAmadeus = async () => {
    try {

        const response = await axios.post(
            'https://test.api.amadeus.com/v1/security/oauth2/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                    username: process.env.APIKEY_AMADEUS,
                    password: process.env.APISECRET_AMADEUS,
                },
            })

        const { access_token } = response.data;
        return access_token;

    } catch (err) {
        console.error('Erro ao recuperar token', err)
        throw err
    }
}