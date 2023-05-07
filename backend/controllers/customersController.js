import expressAsync from "express-async-handler";
import Customers from "../models/customersModel.js";

export const getCustomers = expressAsync(async (req, res) => {
  try {
    const customers = await Customers.find().sort({ createdAt: -1 });

    res.json({ customers });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getCustomersById = expressAsync(async (req, res) => {
  try {
    const customer = await Customers.findById(req.params.id);
    if (customer) {
      res.json(customer);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createCustomers = expressAsync(async (req, res) => {
  try {
    const { name, phone, tasks } = req.body;



    const excustomers = await Customers.findOne({phone});
    if (!excustomers) {
        const customers = await Customers.find().sort({ createdAt: -1 });

    const customer = new Customers({
      custID: customers[0].custID + 1,
      name,
      phone,
      tasks,
    });
    const createdCustomers = await customer.save();
    res.status(201).json(createdCustomers);
    }
    else{
        res.status(500).json({ message: 'Already exists' });
    }
    
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const updateCustomers = expressAsync(async (req, res) => {
  const { name, phone } = req.body;

  const customer = await Customers.findById(req.params.id);

  if (customer) {
    customer.name = name;
    customer.phone = phone;

    const updatedCustomers = await customer.save();
    res.json({
      updatedCustomers,
    });
  } else {
    res.status(404);
    throw new Error("Customers Not Found");
  }
});

export const deleteCustomersById = expressAsync(async (req, res) => {
  try {
    const customer = await Customers.findByIdAndDelete(req.params.id);

    res.json({ message: "Customers removed" });
  } catch (error) {
    res.json({ error: error.message });
  }
});
