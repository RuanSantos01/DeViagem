import mongoose from "mongoose";

const StatesSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
        },
        lat: {
            type: Number,
        },
        long: {
            type: Number
        }
    },
    { timestamps: true }
);

const States = mongoose.model("states", StatesSchema);
export default States;