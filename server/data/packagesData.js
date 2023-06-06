import { barcelonaAccommodations, londresAccommodations, parisAccommodations, riodejaneiroAccommodations } from "./accommodationData.js";
import mongoose from "mongoose";

const rioId = new mongoose.Types.ObjectId;
const rioId2 = new mongoose.Types.ObjectId;
const londresId = new mongoose.Types.ObjectId;
const parisId = new mongoose.Types.ObjectId;
const barcelonaId = new mongoose.Types.ObjectId;

export const packagesData = [
    {
        _id: rioId,
        operador: "Ruan Christian",
        destino: 'Rio de Janeiro',
        valorPassagem: 902,
        pessoas: 2,
        imagem: '/packages/rio-de-janeiro.png',
        imagens: ['/packages/rio-de-janeiro/1.png', '/packages/rio-de-janeiro/2.png', '/packages/rio-de-janeiro/3.png', '/packages/rio-de-janeiro/4.png', '/packages/rio-de-janeiro/5.png'],
        hospedagem: riodejaneiroAccommodations[0],
        vagas: 20,
        vagasRestantes: 16
    },
    {
        _id: rioId2,
        operador: "Ruan Christian",
        destino: 'Rio de Janeiro',
        valorPassagem: 709,
        pessoas: 2,
        imagem: '/packages/rio-de-janeiro.png',
        imagens: ['/packages/rio-de-janeiro/1.png', '/packages/rio-de-janeiro/2.png', '/packages/rio-de-janeiro/3.png', '/packages/rio-de-janeiro/4.png', '/packages/rio-de-janeiro/5.png'],
        hospedagem: riodejaneiroAccommodations[1],
        vagas: 20,
        vagasRestantes: 12
    },
    {
        _id: londresId,
        destino: 'Londres',
        valorPassagem: 1000,
        imagem: '/packages/londres.png',
        hospedagem: londresAccommodations,
        vagas: 10,
    },
    {
        _id: parisId,
        destino: 'Paris',
        valorPassagem: 1200,
        imagem: '/packages/paris.png',
        hospedagem: parisAccommodations,
        vagas: 5,
    },
    {
        _id: barcelonaId,
        destino: 'Barcelona',
        valorPassagem: 700,
        imagem: '/packages/barcelona.png',
        hospedagem: barcelonaAccommodations,
        vagas: 15,
    }
]