import express from "express";
import {
  createPurchase,
  getAllPurchase,
  getPurchaseById,
  getPurchaseByUid,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.post("/", createPurchase);
router.get("/", getAllPurchase);
router.get("/:id", getPurchaseById);
router.get("/u/:id", getPurchaseByUid);
router.put("/:id", updatePurchase);
router.delete("/:id", deletePurchase);

export default router;
