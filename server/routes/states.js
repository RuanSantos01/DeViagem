import express from "express";
import { statesDistance, states, getTravels, getIATAcodes } from "../controllers/states.js";

const router = express.Router();

router.get("/l/:estadoOrigem", statesDistance)
router.get("/states", states)
router.post('/getTravels', getTravels)
router.post('/getIATAcodes', getIATAcodes)

export default router;