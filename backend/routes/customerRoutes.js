import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
  createCustomers,
  deleteCustomersById,
  getCustomers,
  getCustomersById,
  getTasksCustomersById,
  getTasksCustomersByName,
  updateCustomers,
} from "../controllers/customersController.js";

const router = express.Router();

router.route("/").get(getCustomers).post(protect, createCustomers);
router.route("/byname/:name").get(getTasksCustomersByName)
router.route("/mytasks/:id").get(protect, getTasksCustomersById);
router
  .route("/:id")
  .get(protect, getCustomersById)
  .put(protect, updateCustomers)
  .delete(protect, admin, deleteCustomersById);

export default router;
