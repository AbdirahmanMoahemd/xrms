import expressAsync from "express-async-handler";
import Store from "../models/storeModel.js";

export const getStoreItems = expressAsync(async (req, res) => {
  try {
    const items = await Store.find();

    res.json({ items });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getStoreItemById = expressAsync(async (req, res) => {
  try {
    const item = await Store.findById(req.params.id);
    if (item) {
      res.json(item);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createStoreItem = expressAsync(async (req, res) => {
  try {
    const { name, selling, cost, countInStock } = req.body;

    const items = new Store({
      name,
      selling,
      cost,
      countInStock,
    });
    const createdStoreItem = await items.save();
    res.status(201).json(createdStoreItem);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const updateStoreItem = expressAsync(async (req, res) => {
  const { name, selling, cost, countInStock } = req.body;

  const item = await Store.findById(req.params.id);

  if (item) {
    item.name = name;
    item.selling = selling;
    item.cost = cost;
    item.countInStock = countInStock;

    const updatedStoreItem = await item.save();
    res.json({
      updatedStoreItem,
    });
  } else {
    res.status(404);
    throw new Error("Store item Not Found");
  }
});

export const deleteStoreItemById = expressAsync(async (req, res) => {
  try {
    const item = await Store.findByIdAndDelete(req.params.id);

    res.json({ message: "Store item removed" });
  } catch (error) {
    res.json({ error: error.message });
  }
});
