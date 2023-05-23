import express from "express";
import { confirmAccount, login, register, updateUserData, updateUserPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/confirmAccount", confirmAccount)
router.patch("/updateUser", updateUserData)
router.patch("/updatePassword", updateUserPassword)

export default router;