import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId;
const sentCodeId = new mongoose.Types.ObjectId;

export const users = {
    _id: userId,
    fullName: "Ruan Christian",
    email: "ruanchristian00@gmail.com", 
    password: "ruanchristian",
    phone: 61982905747,
    birthDate: "1115211422",
    gender: "masculino",
    accessLevel: "basic",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    _v: 0
}

export const code = [
    {
        _id: sentCodeId,
        email: "ruanchristian00@gmail.com",
        code: "XVP23",
        validation: false
    }
]