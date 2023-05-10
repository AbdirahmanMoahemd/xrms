import expressAsync from "express-async-handler";
import Sales from "../models/salesModel.js";
import Store from "../models/storeModel.js";

export const getSalesItems = expressAsync(async (req, res) => {
  try {
    const sales = await Sales.find()
      .sort({ createdAt: -1 })
      .populate("item")
      .populate("customer");

    res.json({ sales });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getSalesById = expressAsync(async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (sale) {
      res.json(sale);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createSalesItem = expressAsync(async (req, res) => {
  try {
    const { item, customer, quantity, price, date, isPaid } = req.body;

    const store = await Store.findById(item);
    if (store) {
      const sale = new Sales({
        item,
        customer,
        quantity,
        price,
        date,
        isPaid,
      });
      const createdSales = await sale.save();

      if (createdSales) {
        store.countInStock = store.countInStock - quantity;
        const updatedStoreItem = await store.save();
      }
      res.status(201).json(createdSales);
    } else {
      res.status(404);
      throw new Error("Item Not Found");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const updateSalesItem = expressAsync(async (req, res) => {
  const { item, customer, quantity, price, date, isPaid } = req.body;

  const sale = await Sales.findById(req.params.id);

  if (item) {
    sale.item = item;
    sale.customer = customer;
    sale.quantity = quantity;
    sale.price = price;
    sale.date = date;
    sale.isPaid = isPaid;

    const updatedStoreItem = await item.save();
    res.json({
      updatedStoreItem,
    });
  } else {
    res.status(404);
    throw new Error("Store item Not Found");
  }
});

export const deleteSalesItemById = expressAsync(async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (sale) {
      res.json({ message: "Sales item removed" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});
