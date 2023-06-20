import mongoose from "mongoose";

const PaidPackagesSchema = new mongoose.Schema(
    {
        formValues: {
            type: Object,
        },
        cpf: String,
        cartInformations: {
            type: Object,
        },
        codigo: {
            type: String
        },
        listaCpfPago: {
            type: Array
        },
        listaCpfPendente: {
            type: Array
        },
        valorTotal: {
            type: Number
        },
        valorPago: {
            type: Number
        }
    },
    { timestamps: true }
);

const PaidPackages = mongoose.model("paid_packages", PaidPackagesSchema);
export default PaidPackages;