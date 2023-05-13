import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createIncome, deleteItemById, getItemById, getItems, getTotalIncome, getTotalIncomeByTasks, updateItem } from "../controllers/incomeController.js";


const router = express.Router();

router.route("/").get(protect, getItems).post(protect, createIncome);
router.route('/total').get(getTotalIncome)
router.route('/tasks/total').get(protect, admin, getTotalIncomeByTasks)
router
  .route("/:id")
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, admin, deleteItemById);

  export default router
