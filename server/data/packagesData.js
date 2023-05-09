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
        destino: 'Rio de Janeiro',
        dataIda: new Date(2023, 6, 1),
        horaIda: '19:10',
        dataVolta: new Date(2023, 6, 8),
        horaVolta: '07:30',
        valorPassagem: 902,
        imagem: '/packages/rio-de-janeiro.png',
        imagens: ['/packages/rio-de-janeiro/1.png', '/packages/rio-de-janeiro/2.png', '/packages/rio-de-janeiro/3.png', '/packages/rio-de-janeiro/4.png', '/packages/rio-de-janeiro/5.png'],
        hospedagem: riodejaneiroAccommodations[0],
        vagas: 20,
    },
    {
        _id: rioId2,
        destino: 'Rio de Janeiro',
        dataIda: new Date(2023, 6, 6),
        horaIda: '13:00',
        dataVolta: new Date(2023, 6, 10),
        horaVolta: '19:30',
        valorPassagem: 709,
        imagem: '/packages/rio-de-janeiro.png',
        imagens: ['/packages/rio-de-janeiro/1.png', '/packages/rio-de-janeiro/2.png', '/packages/rio-de-janeiro/3.png', '/packages/rio-de-janeiro/4.png', '/packages/rio-de-janeiro/5.png'],
        hospedagem: riodejaneiroAccommodations[1],
        vagas: 20,
    },
    {
        _id: londresId,
        destino: 'Londres',
        dataIda: new Date(2023, 9, 16),
        dataVolta: new Date(2023, 9, 21),
        valorPassagem: 1000,
        imagem: '/packages/londres.png',
        hospedagem: londresAccommodations,
        vagas: 10,
    },
    {
        _id: parisId,
        destino: 'Paris',
        dataIda: new Date(2024, 0, 5),
        dataVolta: new Date(2024, 0, 10),
        valorPassagem: 1200,
        imagem: '/packages/paris.png',
        hospedagem: parisAccommodations,
        vagas: 5,
    },
    {
        _id: barcelonaId,
        destino: 'Barcelona',
        dataIda: new Date(2024, 3, 20),
        dataVolta: new Date(2024, 3, 23),
        valorPassagem: 700,
        imagem: '/packages/barcelona.png',
        hospedagem: barcelonaAccommodations,
        vagas: 15,
    }
]