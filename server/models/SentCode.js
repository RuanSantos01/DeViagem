import mongoose from "mongoose";

const SentCodeSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        code: {
            type: String,
            min: 5,
            max: 5
        },
        validation: {
            type: Boolean
        }
    },
    {timestamps: true}
);

const SentCode = mongoose.model("SentCode", SentCodeSchema);
export default SentCode;