import express from "express";
import { packages } from "../controllers/packages.js";

const router = express.Router();

router.get("/", packages);

export default router;