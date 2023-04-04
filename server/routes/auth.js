import express from "express";
import { confirmAccount, login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/confirmAccount", confirmAccount)

export default router;