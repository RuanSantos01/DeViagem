import express from "express";
import { getScrips } from "../controllers/scripts.js";

const router = express.Router();

router.get("/getAll", getScrips)

export default router;