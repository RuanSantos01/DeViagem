import mongoose from "mongoose";

const AccommodationSchema = new mongoose.Schema(
    {
        identificador: {
            type: Number,
            required: true
        },
        nomeLocal: {
            type: String,
        },
        image: {
            type: String,
        },
        localizacao: {
            type: String
        },
        localizacaoCompleta: {
            type: String
        },
        informacaoGeral: {
            type: String
        },
        tipoQuarto: {
            type: String
        },
        quartos: {
            type: Array
        },
        camas: {
            type: String
        },
        avaliacao: {
            type: String
        },
        tempoCapacidade: {
            type: String
        },
        valor: {
            type: Number
        },
        descricao: {
            type: String
        },
        informacoesAdicionais: {
            type: Object
        },
        geoLocalizacao: {
            type: Array
        }
    },
    { timestamps: true }
);

const Accommodation = mongoose.model("Accommodation", AccommodationSchema);
export default Accommodation;