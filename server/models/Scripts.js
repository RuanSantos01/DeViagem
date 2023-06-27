import mongoose from "mongoose";

const ScriptsSchema = new mongoose.Schema(
    {
        destino: String,
        descricaoDestino: String,
        imagem: String,
        roteiro: Array,
    },
    { timestamps: true }
);

const Scripts = mongoose.model("scripts", ScriptsSchema);
export default Scripts;