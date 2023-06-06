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
        valorPassagem: {
            type: Number,
            required: true
        },
        imagem: {
            type: String,
            required: true
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
        }
    },
    { timestamps: true }
);

const Packages = mongoose.model("Packages", PackagesSchema);
export default Packages;