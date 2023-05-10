import express from "express";
import { statesDistance, states } from "../controllers/states.js";

const router = express.Router();

router.get("/l/:estadoOrigem", statesDistance)
router.get("/states", states)

export default router;