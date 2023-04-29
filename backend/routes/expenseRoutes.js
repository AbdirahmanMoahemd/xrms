import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createExpense, deleteItemById, getItemById, getItems, getTotalExpense, updateItem } from "../controllers/expenseController.js";


const router = express.Router();

router.route("/").get(protect, getItems).post(protect, createExpense);
router.route('/total').get(getTotalExpense)
router
  .route("/:id")
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, admin, deleteItemById);

  export default router
