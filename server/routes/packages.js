import express from "express";
import { packages, paidPackages, insertPaidPackages, updatePaidPackages } from "../controllers/packages.js";

const router = express.Router();

router.get("/", packages);
router.post("/paidPackages", paidPackages);
router.post("/insertPaidPackage", insertPaidPackages);
router.patch("/updatePaidPackage", updatePaidPackages)

export default router;