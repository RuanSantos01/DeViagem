import {
    riodejaneiroAccommodations,
    alagoasAccommodations,
    bahiaAccommodations,
    minasgeraisAccommodations,
    paranaAccommodations,
    pernambucoAccommodations,
    rondoniaAccommodations,
    saoPauloAccommodations,
    sergipeAccommodations,
} from "./accommodationData.js";
import mongoose from "mongoose";

const rioId = new mongoose.Types.ObjectId;
const rioId2 = new mongoose.Types.ObjectId;
const alagoasId = new mongoose.Types.ObjectId;
const alagoasId2 = new mongoose.Types.ObjectId;
const bahiaId = new mongoose.Types.ObjectId;
const bahiaId2 = new mongoose.Types.ObjectId;
const minasId = new mongoose.Types.ObjectId;
const minasId2 = new mongoose.Types.ObjectId;
const paranaId = new mongoose.Types.ObjectId;
const paranaId2 = new mongoose.Types.ObjectId;
const pernambucoId = new mongoose.Types.ObjectId;
const pernambucoId2 = new mongoose.Types.ObjectId;
const rondoniaId = new mongoose.Types.ObjectId;
const rondoniaId2 = new mongoose.Types.ObjectId;
const sao_pauloId = new mongoose.Types.ObjectId;
const sao_pauloId2 = new mongoose.Types.ObjectId;
const sergipeId = new mongoose.Types.ObjectId;
const sergipeId2 = new mongoose.Types.ObjectId;

// packeges

export const packagesData = [
    // Rio de janeiro
    {
        _id: rioId,
        operador: "Ruan Christian",
        destino: 'Rio de Janeiro',
        cem: 'Rio de Janeiro',
        valorPassagem: 902,
        pessoas: 2,
        imagem: 'packages/rio-de-janeiro/1.png',
        imagens: ['packages/rio-de-janeiro/1.png', 'packages/rio-de-janeiro/2.png', 'packages/rio-de-janeiro/3.png', 'packages/rio-de-janeiro/4.png', 'packages/rio-de-janeiro/5.png'],
        hospedagem: riodejaneiroAccommodations[0],
        vagas: 20,
        vagasRestantes: 16,
        dataInicio: new Date(2023, 6, 15),
        dataFim: new Date(2023, 7, 15)
    },
    {
        _id: rioId2,
        operador: "Ruan Christian",
        destino: 'Rio de Janeiro',
        cem: 'Rio de Janeiro',
        valorPassagem: 709,
        pessoas: 2,
        imagem: 'packages/rio-de-janeiro/buzios/3.png',
        imagens: ['packages/rio-de-janeiro/buzios/1.png', 'packages/rio-de-janeiro/buzios/2.png', 'packages/rio-de-janeiro/buzios/3.png', 'packages/rio-de-janeiro/buzios/4.png', 'packages/rio-de-janeiro/buzios/5.png'],
        hospedagem: riodejaneiroAccommodations[1],
        vagas: 20,
        vagasRestantes: 12,
        dataInicio: new Date(2023, 6, 30),
        dataFim: new Date(2023, 7, 30)
    },
    // Alagoas
    {
        _id: alagoasId,
        destino: 'Alagoas',
        cem: 'Maceio',
        valorPassagem: 600,
        pessoas: 3,
        imagem: 'packages/alagoas/maceio/1.png',
        imagens: ['packages/alagoas/maceio/1.png', 'packages/alagoas/maceio/2.png', 'packages/alagoas/maceio/3.png', 'packages/alagoas/maceio/4.png', 'packages/alagoas/maceio/5.png'],
        hospedagem: alagoasAccommodations[0],
        vagas: 15,
        dataInicio: new Date(2023, 7, 15),
        dataFim: new Date(2023, 8, 15)
    },
    {
        _id: alagoasId2,
        destino: 'Alagoas',
        cem: 'Maragogi',
        valorPassagem: 800,
        pessoas: 3,
        imagem: 'packages/alagoas/maragogi/3.png',
        imagens: ['packages/alagoas/maragogi/1.png', 'packages/alagoas/maragogi/2.png', 'packages/alagoas/maragogi/3.png', 'packages/alagoas/maragogi/4.png', 'packages/alagoas/maragogi/5.png'],
        hospedagem: alagoasAccommodations[1],
        vagas: 15,
        dataInicio: new Date(2023, 7, 30),
        dataFim: new Date(2023, 8, 30)
    },
    //Bahia
    {
        _id: bahiaId,
        destino: 'Bahia',
        cem: 'Porto Seguro',
        valorPassagem: 1050,
        pessoas: 3,
        imagem: 'packages/bahia/porto_seguro/1.png',
        imagens: ['packages/bahia/porto_seguro/1.png', 'packages/bahia/porto_seguro/2.png', 'packages/bahia/porto_seguro/3.png', 'packages/bahia/porto_seguro/4.png', 'packages/bahia/porto_seguro/5.png'],
        hospedagem: bahiaAccommodations[0],
        vagas: 10,
        dataInicio: new Date(2023, 8, 15),
        dataFim: new Date(2023, 9, 15)
    },
    {
        _id: bahiaId2,
        destino: 'Bahia',
        cem: 'Salvador',
        valorPassagem: 1200,
        pessoas: 3,
        imagem: 'packages/bahia/salvador/3.png',
        imagens: ['packages/bahia/salvador/1.png', 'packages/bahia/salvador/2.png', 'packages/bahia/salvador/3.png', 'packages/bahia/salvador/4.png', 'packages/bahia/salvador/5.png'],
        hospedagem: bahiaAccommodations[1],
        vagas: 10,
        dataInicio: new Date(2023, 8, 30),
        dataFim: new Date(2023, 9, 30)
    },
    //Minas Gerais
    {
        _id: minasId,
        destino: 'Minas Gerais',
        cem: 'Monte Verde',
        valorPassagem: 500,
        pessoas: 1,
        imagem: 'packages/minas-gerais/monte-verde/3.png',
        imagens: ['packages/minas-gerais/monte-verde/1.png', 'packages/minas-gerais/monte-verde/2.png', 'packages/minas-gerais/monte-verde/3.png', 'packages/minas-gerais/monte-verde/4.png', 'packages/minas-gerais/monte-verde/5.png'],
        hospedagem: minasgeraisAccommodations[0],
        vagas: 30,
        dataInicio: new Date(2023, 9, 15),
        dataFim: new Date(2023, 10, 15)
    },
    {
        _id: minasId2,
        destino: 'Minas Gerais',
        cem: 'Ouro Preto',
        valorPassagem: 400,
        pessoas: 1,
        imagem: 'packages/minas-gerais/ouro-preto/3.png',
        imagens: ['packages/minas-gerais/ouro-preto/1.png', 'packages/minas-gerais/ouro-preto/2.png', 'packages/minas-gerais/ouro-preto/3.png', 'packages/minas-gerais/ouro-preto/4.png', 'packages/minas-gerais/ouro-preto/5.png'],
        hospedagem: minasgeraisAccommodations[1],
        vagas: 30,
        dataInicio: new Date(2023, 9, 30),
        dataFim: new Date(2023, 10, 30)
    },
    //parana
    {
        _id: paranaId,
        destino: 'Paraná',
        cem: 'Curitiba',
        valorPassagem: 800,
        pessoas: 4,
        imagem: 'packages/parana/curitiba/5.png',
        imagens: ['packages/parana/curitiba/1.png', 'packages/parana/curitiba/2.png', 'packages/parana/curitiba/3.png', 'packages/parana/curitiba/4.png', 'packages/parana/curitiba/5.png'],
        hospedagem: paranaAccommodations[0],
        vagas: 18,
        dataInicio: new Date(2023, 10, 15),
        dataFim: new Date(2023, 11, 15)
    },
    {
        _id: paranaId2,
        destino: 'Paraná',
        cem: 'Foz Iguaçu',
        valorPassagem: 1465,
        pessoas: 4,
        imagem: 'packages/parana/foz-iguacu/3.png',
        imagens: ['packages/parana/foz-iguacu/1.png', 'packages/parana/foz-iguacu/2.png', 'packages/parana/foz-iguacu/3.png', 'packages/parana/foz-iguacu/4.png', 'packages/parana/foz-iguacu/5.png'],
        hospedagem: paranaAccommodations[1],
        vagas: 18,
        dataInicio: new Date(2023, 10, 30),
        dataFim: new Date(2023, 11, 30)
    },
    //Pernambuco
    {
        _id: pernambucoId,
        destino: 'Pernambuco',
        cem: 'Olinda',
        valorPassagem: 450,
        pessoas: 2,
        imagem: 'packages/pernambuco/olinda/1.png',
        imagens: ['packages/pernambuco/olinda/1.png', 'packages/pernambuco/olinda/2.png', 'packages/pernambuco/olinda/3.png', 'packages/pernambuco/olinda/4.png', 'packages/pernambuco/olinda/5.png'],
        hospedagem: pernambucoAccommodations[0],
        vagas: 25,
        dataInicio: new Date(2023, 11, 15),
        dataFim: new Date(2023, 12, 15)
    },
    {
        _id: pernambucoId2,
        destino: 'Pernambuco',
        cem: 'Recife',
        valorPassagem: 550,
        pessoas: 2,
        imagem: 'packages/pernambuco/recife/4.png',
        imagens: ['packages/pernambuco/recife/1.png', 'packages/pernambuco/recife/2.png', 'packages/pernambuco/recife/3.png', 'packages/pernambuco/recife/4.png', 'packages/pernambuco/recife/5.png'],
        hospedagem: pernambucoAccommodations[1],
        vagas: 12,
        dataInicio: new Date(2023, 11, 30),
        dataFim: new Date(2023, 12, 30)
    },
    //Rondonia
    {
        _id: rondoniaId,
        destino: 'Rondônia',
        cem: 'Ji Parana',
        valorPassagem: 980,
        pessoas: 2,
        imagem: 'packages/rondonia/ji_parana/4.png',
        imagens: ['packages/rondonia/ji_parana/1.png', 'packages/rondonia/ji_parana/2.png', 'packages/rondonia/ji_parana/3.png', 'packages/rondonia/ji_parana/4.png'],
        hospedagem: rondoniaAccommodations[0],
        vagas: 25,
        dataInicio: new Date(2023, 12, 15),
        dataFim: new Date(2024, 1, 15)
    },
    {
        _id: rondoniaId2,
        destino: 'Rondônia',
        cem: 'Porto Velho',
        valorPassagem: 620,
        pessoas: 2,
        imagem: 'packages/rondonia/porto_velho/1.png',
        imagens: ['packages/rondonia/porto_velho/1.png', 'packages/rondonia/porto_velho/2.png', 'packages/rondonia/porto_velho/3.png', 'packages/rondonia/porto_velho/4.png', 'packages/rondonia/porto_velho/5.png'],
        hospedagem: rondoniaAccommodations[1],
        vagas: 25,
        dataInicio: new Date(2023, 12, 30),
        dataFim: new Date(2024, 1, 30)
    },
    //São paulo
    {
        _id: sao_pauloId,
        destino: 'São Paulo',
        cem: 'São Paulo Capital',
        valorPassagem: 570,
        pessoas: 3,
        imagem: 'packages/sao-paulo/2.png',
        imagens: ['packages/sao-paulo/1.png', 'packages/sao-paulo/2.png', 'packages/sao-paulo/3.png', 'packages/sao-paulo/4.png', 'packages/sao-paulo/5.png'],
        hospedagem: saoPauloAccommodations[0],
        vagas: 10,
        dataInicio: new Date(2023, 1, 15),
        dataFim: new Date(2024, 2, 15)
    },
    {
        _id: sao_pauloId2,
        destino: 'São Paulo',
        cem: 'Campos Jordão',
        valorPassagem: 800,
        pessoas: 3,
        imagem: 'packages/sao-paulo/campos_jordao/2.png',
        imagens: ['packages/sao-paulo/campos_jordao/1.png', 'packages/sao-paulo/campos_jordao/2.png', 'packages/sao-paulo/campos_jordao/3.png', 'packages/sao-paulo/campos_jordao/4.png', 'packages/sao-paulo/campos_jordao/5.png'],
        hospedagem: saoPauloAccommodations[1],
        vagas: 10,
        dataInicio: new Date(2023, 1, 30),
        dataFim: new Date(2024, 2, 30)
    },
    //Sergipe
    {
        _id: sergipeId,
        destino: 'Sergipe',
        cem: 'Aracaju',
        valorPassagem: 1000,
        pessoas: 2,
        imagem: 'packages/sergipe/aracaju/1.png',
        imagens: ['packages/sergipe/aracaju/1.png', 'packages/sergipe/aracaju/2.png', 'packages/sergipe/aracaju/3.png', 'packages/sergipe/aracaju/4.png', 'packages/sergipe/aracaju/5.png'],
        hospedagem: sergipeAccommodations[0],
        vagas: 17,
        dataInicio: new Date(2023, 2, 15),
        dataFim: new Date(2024, 3, 15)
    },
    {
        _id: sergipeId2,
        destino: 'Sergipe',
        cem: 'São Cristovão',
        valorPassagem: 850,
        pessoas: 2,
        imagem: 'packages/sergipe/sao_cristovao/3.png',
        imagens: ['packages/sergipe/sao_cristovao/1.png', 'packages/sergipe/sao_cristovao/2.png', 'packages/sergipe/sao_cristovao/3.png', 'packages/sergipe/sao_cristovao/4.png'],
        hospedagem: sergipeAccommodations[1],
        vagas: 28,
        dataInicio: new Date(2023, 2, 30),
        dataFim: new Date(2024, 3, 30)
    },

]