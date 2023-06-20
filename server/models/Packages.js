import mongoose from "mongoose";

const PackagesSchema = new mongoose.Schema(
    {
        operador: {
            type: String
        },
        destino: {
            type: String,
            required: true
        },
        cem: {
            type: String
        },
        valorPassagem: {
            type: Number,
            required: true
        },
        imagem: {
            type: String,
        },
        imagens: {
            type: Array,
        },
        hospedagem: {
            type: Object
        },
        vagas: {
            type: Number,
        },
        pessoas: {
            type: Number
        },
        dataInicio: {
            type: String
        },
        dataFim: {
            type: String
        }
    },
    { timestamps: true }
);

const Packages = mongoose.model("Packages", PackagesSchema);
export default Packages;