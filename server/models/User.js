import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 20
        },
        phone: {
            type: String,
            required: true,
            min: 11,
            max: 11
        },
        birthDate: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        accessLevel: {
            type: String,
            required: true
        },
        activities: {
            type: Array
        },
    },
    {timestamps: true}
);

const User = mongoose.model("user", UserSchema);
export default User;