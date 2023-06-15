import express from "express";
import { accommodations, getAccommodationByDestiny, registerAccommodation } from "../controllers/accommodation.js";

const router = express.Router();

router.get("/", accommodations)
router.post("/:id")
router.post("/getByDestiny", getAccommodationByDestiny)

export default router;