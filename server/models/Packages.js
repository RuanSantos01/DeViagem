import mongoose from "mongoose";

const PackagesSchema = new mongoose.Schema(
    {
        destino: {
            type: String,
            required: true
        },
        dataIda: {
            type: String,
            required: true
        },
        dataVolta: {
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
            required: true
        },
        horaIda: {
            type: String
        },
        horaVolta: {
            type: String
        }
    },
    { timestamps: true }
);

const Packages = mongoose.model("Packages", PackagesSchema);
export default Packages;