import {riodejaneiroAccommodations } from "./accommodationData.js";
import mongoose from "mongoose";

const rioId = new mongoose.Types.ObjectId;
const rioId2 = new mongoose.Types.ObjectId;


export const packagesData = [
    {
        _id: rioId,
        destino: 'Rio de Janeiro',
        valorPassagem: 902,
        pessoas: 2,
        imagem: '/packages/rio-de-janeiro.png',
        imagens: ['/packages/rio-de-janeiro/1.png', '/packages/rio-de-janeiro/2.png', '/packages/rio-de-janeiro/3.png', '/packages/rio-de-janeiro/4.png', '/packages/rio-de-janeiro/5.png'],
        hospedagem: riodejaneiroAccommodations[0],
        vagas: 20,
    },
    {
        _id: rioId2,
        destino: 'Rio de Janeiro',
        valorPassagem: 709,
        pessoas: 2,
        imagem: '/packages/rio-de-janeiro.png',
        imagens: ['/packages/rio-de-janeiro/1.png', '/packages/rio-de-janeiro/2.png', '/packages/rio-de-janeiro/3.png', '/packages/rio-de-janeiro/4.png', '/packages/rio-de-janeiro/5.png'],
        hospedagem: riodejaneiroAccommodations[1],
        vagas: 20,
    },
]