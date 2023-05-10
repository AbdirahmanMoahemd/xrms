import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createSalesItem, deleteSalesItemById, getSalesById, getSalesItems, updateSalesItem } from "../controllers/salesController.js";

const router = express.Router();

router.route("/").get(protect, getSalesItems).post(protect, createSalesItem);
router
  .route("/:id")
  .get(protect, getSalesById)
  .put(protect, updateSalesItem)
  .delete(protect, admin, deleteSalesItemById);

  export default router
