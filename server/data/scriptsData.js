import {
    riodejaneiroAccommodations,
    londresAccommodations,
    parisAccommodations,
    barcelonaAccommodations
} from "./data/accommodationData.js";

export const packagesData = [
    {
        destino: 'Rio de Janeiro',
        dataIda: newDate(2023, 6, 1),
        dataVolta: newDate(2023, 6, 8),
        valor: 500,
        imagem: '/packages/rio-de-janeiro.png',
        hospedagem: riodejaneiroAccommodations
    },
    {
        destino: 'Londres',
        dataIda: newDate(2023, 9, 16),
        dataVolta: newDate(2023, 9, 21),
        valor: 1000,
        imagem: '/packages/londres.png',
        hospedagem: londresAccommodations
    },
    {
        destino: 'Paris',
        dataIda: newDate(2024, 0, 5),
        dataVolta: newDate(2024, 0, 10),
        valor: 1200,
        imagem: '/packages/paris.png',
        hospedagem: parisAccommodations
    },
    {
        destino: 'Barcelona',
        dataIda: newDate(2024, 3, 20),
        dataVolta: newDate(2024, 3, 23),
        valor: 700,
        imagem: '/packages/barcelona.png',
        hospedagem: barcelonaAccommodations
    }
]