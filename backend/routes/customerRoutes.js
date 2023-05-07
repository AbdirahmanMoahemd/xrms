import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import { createCustomers, deleteCustomersById, getCustomers, getCustomersById, updateCustomers } from "../controllers/customersController.js";


const router = express.Router();

router.route("/").get(protect, getCustomers).post(protect, createCustomers);
router
  .route("/:id")
  .get(protect, getCustomersById)
  .put(protect, updateCustomers)
  .delete(protect, admin, deleteCustomersById);

  export default router