import express from "express";
import { packages, paidPackages, insertPaidPackages, updatePaidPackages, insertPackagesToAccount, getUserPackages, insertPackages } from "../controllers/packages.js";

const router = express.Router();

router.get("/", packages);
router.get("/getUserPackages/:cpf", getUserPackages);
router.post('/insertPackage', insertPackages);
router.post("/paidPackages", paidPackages);
router.post("/insertPaidPackage", insertPaidPackages);
router.patch("/updatePaidPackage", updatePaidPackages);
router.patch("/insertPackagesToAccount", insertPackagesToAccount);

export default router;