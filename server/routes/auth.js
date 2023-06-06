import express from "express";
import { confirmAccount, getUser, login, register, updateUserAcesslevel, updateUserData, updateUserPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/confirmAccount", confirmAccount)
router.patch("/updateUser", updateUserData)
router.patch("/updatePassword", updateUserPassword)
router.patch("/updateAcessLevel", updateUserAcesslevel)
router.get("/getUser/:cpf", getUser)

export default router;