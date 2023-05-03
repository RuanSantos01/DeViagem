import express from "express";
import { accommodations } from "../controllers/accommodation.js";

const router = express.Router();

router.get("/", accommodations)
router.post("/:id")

export default router;