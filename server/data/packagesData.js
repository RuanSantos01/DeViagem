import {riodejaneiroAccommodations,
    alagoasAccommodations,
    bahiaAccommodations,
    minasAccommodations,
    paranaAccommodations,
    pernambucoAccommodations,
    rondoniaAccommodations,
    saoPauloAccommodations,
    sergipeAccommodations, } from "./accommodationData.js";
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
        destino: 'Rio de Janeiro',
        valorPassagem: 902,
        pessoas: 2,
        imagem: 'assets/packages/rio-de-janeiro/1.png',
        imagens: ['assets/packages/rio-de-janeiro/1.png', 'assets/packages/rio-de-janeiro/2.png', 'assets/packages/rio-de-janeiro/3.png', 'assets/packages/rio-de-janeiro/4.png', 'assets/packages/rio-de-janeiro/5.png'],
        hospedagem: riodejaneiroAccommodations[0],
        vagas: 20,
    },
    {
        _id: rioId2,
        destino: 'Buzios',
        valorPassagem: 709,
        pessoas: 2,
        imagem: 'assets/packages/rio-de-janeiro/buzios/3.png',
        imagens: ['assets/packages/rio-de-janeiro/buzios/1.png', 'assets/packages/rio-de-janeiro/buzios/2.png', 'assets/packages/rio-de-janeiro/buzios/3.png', 'assets/packages/rio-de-janeiro/buzios/4.png', 'assets/packages/rio-de-janeiro/buzios/5.png'],
        hospedagem: riodejaneiroAccommodations[1],
        vagas: 20,
    },
     // Alagoas
     {
        _id: alagoasId,
        destino: 'Maceio ',
        valorPassagem: 600,
        pessoas: 3,
        imagem: 'assets/packages/alagoas/maceio/1.png',
        imagens: ['assets/packages/alagoas/maceio/1.png', 'assets/packages/alagoas/maceio/2.png', 'assets/packages/alagoas/maceio/3.png', 'assets/packages/alagoas/maceio/4.png', 'assets/packages/alagoas/maceio/5.png'],
        hospedagem: alagoasAccommodations[0],
        vagas: 15,
    },
    {
        _id: alagoasId2,
        destino: 'Maragogi',
        valorPassagem: 800,
        pessoas: 3,
        imagem: 'assets/packages/rio-de-janeiro/maragogi/3.png',
        imagens: ['assets/packages/rio-de-janeiro/maragogi/1.png', 'assets/packages/rio-de-janeiro/maragogi/2.png', 'assets/packages/rio-de-janeiro/maragogi/3.png', 'assets/packages/rio-de-janeiro/maragogi/4.png', 'assets/packages/rio-de-janeiro/maragogi/5.png'],
        hospedagem: alagoasAccommodations[1],
        vagas: 15,
    },
    //Bahia
    {
        _id: bahiaId,
        destino: 'Porto Seguro',
        valorPassagem: 1050,
        pessoas: 3,
        imagem: 'assets/packages/bahia/porto_seguro/1.png',
        imagens: ['assets/packages/bahia/porto_seguro/1.png', 'assets/packages/bahia/porto_seguro/2.png', 'assets/packages/bahia/porto_seguro/3.png', 'assets/packages/bahia/porto_seguro/4.png', 'assets/packages/bahia/porto_seguro/5.png'],
        hospedagem: bahiaAccommodations[0],
        vagas: 10,
    },
    {
        _id: bahiaId2,
        destino: 'Salvador',
        valorPassagem: 1200,
        pessoas: 3,
        imagem: 'assets/packages/bahia/salvador/3.png',
        imagens: ['assets/packages/bahia/salvador/1.png', 'assets/packages/bahia/salvador/2.png', 'assets/packages/bahia/salvador/3.png', 'assets/packages/bahia/salvador/4.png', 'assets/packages/bahia/salvador/5.png'],
        hospedagem: bahiaAccommodations[1],
        vagas: 10,
    },
   //Minas Gerais
   {
        _id: minasId,
        destino: 'Monte Verde',
        valorPassagem: 500,
        pessoas: 1,
        imagem: 'assets/packages/minas-gerais/monte-verde/3.png',
        imagens: ['assets/packages/minas-gerais/monte-verde/1.png', 'assets/packages/minas-gerais/monte-verde/2.png', 'assets/packages/minas-gerais/monte-verde/3.png', 'assets/packages/minas-gerais/monte-verde/4.png', 'assets/packages/minas-gerais/monte-verde/5.png'],
        hospedagem: minasAccommodations[0],
        vagas: 30,
    },
    {
        _id: minasId2,
        destino: 'Ouro Preto',
        valorPassagem: 400,
        pessoas: 1,
        imagem: 'assets/packages/minas-gerais/ouro-preto/3.png',
        imagens: ['assets/packages/minas-gerais/ouro-preto/1.png', 'assets/packages/minas-gerais/ouro-preto/2.png', 'assets/packages/minas-gerais/ouro-preto/3.png', 'assets/packages/minas-gerais/ouro-preto/4.png', 'assets/packages/minas-gerais/ouro-preto/5.png'],
        hospedagem: minasAccommodations[1],
        vagas: 30,
    },
      //parana
   {
        _id: paranaId,
        destino: 'Curitiba',
        valorPassagem: 800,
        pessoas: 4,
        imagem: 'assets/packages/parana/curitiba/5.png',
        imagens: ['assets/packages/parana/curitiba/1.png', 'assets/packages/parana/curitiba/2.png', 'assets/packages/parana/curitiba/3.png', 'assets/packages/parana/curitiba/4.png', 'assets/packages/parana/curitiba/5.png'],
        hospedagem: paranaAccommodations[0],
        vagas: 18,
    },
    {
        _id: paranaId2,
        destino: 'Foz Iguaçu',
        valorPassagem: 1465,
        pessoas: 4,
        imagem: 'assets/packages/parana/foz-iguacu/3.png',
        imagens: ['assets/packages/parana/foz-iguacu/1.png', 'assets/packages/parana/foz-iguacu/2.png', 'assets/packages/parana/foz-iguacu/3.png', 'assets/packages/parana/foz-iguacu/4.png', 'assets/packages/parana/foz-iguacu/5.png'],
        hospedagem: paranaAccommodations[1],
        vagas: 18,
    },
    //Pernambuco
    {
        _id: pernambucoId,
        destino: 'Olinda',
        valorPassagem: 450,
        pessoas: 2,
        imagem: 'assets/packages/pernambuco/olinda/1.png',
        imagens: ['assets/packages/pernambuco/olinda/1.png', 'assets/packages/pernambuco/olinda/2.png', 'assets/packages/pernambuco/olinda/3.png', 'assets/packages/pernambuco/olinda/4.png', 'assets/packages/pernambuco/olinda/5.png'],
        hospedagem: pernambucoAccommodations[0],
        vagas: 25,
    },
    {
        _id: pernambucoId2,
        destino: 'Recife',
        valorPassagem: 550,
        pessoas: 2,
        imagem: 'assets/packages/pernambuco/recife/4.png',
        imagens: ['assets/packages/pernambuco/recife/1.png', 'assets/packages/pernambuco/recife/2.png', 'assets/packages/pernambuco/recife/3.png', 'assets/packages/pernambuco/recife/4.png', 'assets/packages/pernambuco/recife/5.png'],
        hospedagem: pernambucoAccommodations[1],
        vagas: 12,
    },
       //Rondonia
       {
        _id: rondoniaId,
        destino: 'Ji Parana',
        valorPassagem: 980,
        pessoas: 2,
        imagem: 'assets/packages/rondonia/ji_parana/4.png',
        imagens: ['assets/packages/rondonia/ji_parana/1.png', 'assets/packages/rondonia/ji_parana/2.png', 'assets/packages/rondonia/ji_parana/3.png', 'assets/packages/rondonia/ji_parana/4.png'],
        hospedagem: rondoniaAccommodations[0],
        vagas: 25,
    },
    {
        _id: rondoniaId2,
        destino: 'Porto Velho',
        valorPassagem: 620,
        pessoas: 2,
        imagem: 'assets/packages/rondonia/porto_velho/1.png',
        imagens: ['assets/packages/rondonia/porto_velho/1.png', 'assets/packages/rondonia/porto_velho/2.png', 'assets/packages/rondonia/porto_velho/3.png', 'assets/packages/rondonia/porto_velho/4.png', 'assets/packages/rondonia/porto_velho/5.png'],
        hospedagem: rondoniaAccommodations[1],
        vagas: 25,
    },
       //São paulo
       {
        _id: sao_pauloId,
        destino: 'São Paulo',
        valorPassagem: 570,
        pessoas: 3,
        imagem: 'assets/packages/sao_paulo/2.png',
        imagens: ['assets/packages/sao_paulo/1.png', 'assets/packages/sao_paulo/2.png', 'assets/packages/sao_paulo/3.png', 'assets/packages/sao_paulo/4.png', 'assets/packages/sao_paulo/5.png'],
        hospedagem: saoPauloAccommodations[0],
        vagas: 10,
    },
    {
        _id: sao_pauloId2,
        destino: 'Campos Jordão',
        valorPassagem: 800,
        pessoas: 3,
        imagem: 'assets/packages/sao_paulo/campos_jordao/2.png',
        imagens: ['assets/packages/sao_paulo/campos_jordao/1.png', 'assets/packages/sao_paulo/campos_jordao/2.png', 'assets/packages/sao_paulo/campos_jordao/3.png', 'assets/packages/sao_paulo/campos_jordao/4.png', 'assets/packages/sao_paulo/campos_jordao/5.png'],
        hospedagem: saoPauloAccommodations[1],
        vagas: 10,
    },
       //Sergipe
       {
        _id: sergipeId,
        destino: 'Aracaju',
        valorPassagem: 1000,
        pessoas: 2,
        imagem: 'assets/packages/sergipe/aracaju/1.png',
        imagens: ['assets/packages/sergipe/aracaju/1.png', 'assets/packages/sergipe/aracaju/2.png', 'assets/packages/sergipe/aracaju/3.png', 'assets/packages/sergipe/aracaju/4.png', 'assets/packages/sergipe/aracaju/5.png'],
        hospedagem: sergipeAccommodations[0],
        vagas: 17,
    },
    {
        _id: sergipeId2,
        destino: 'São Cristovão',
        valorPassagem: 850,
        pessoas: 2,
        imagem: 'assets/packages/sergipe/sao_cristovao/3.png',
        imagens: ['assets/packages/sergipe/sao_cristovao/1.png', 'assets/packages/sergipe/sao_cristovao/2.png', 'assets/packages/sergipe/sao_cristovao/3.png', 'assets/packages/sergipe/sao_cristovao/4.png'],
        hospedagem: sergipeAccommodations[1],
        vagas: 28,
    },
    
]