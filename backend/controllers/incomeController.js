import Income from "../models/incomeModel.js";
import expressAsync from "express-async-handler";


export const getItems = expressAsync(async (req, res) => {
    try {
      const items = await Income.find().sort({createdAt: -1});
  
      res.json({ items });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
  
  export const getItemById = expressAsync(async (req, res) => {
    try {
      const item = await Income.findById(req.params.id);
      if (item) {
        res.json(item);
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  });
  
  export const createIncome = expressAsync(async (req, res) => {
    try {
      const { userId, title, amount, type, date, ref } = req.body;
  
      const items = new Income({
        user:userId,
        title,
        amount,
        type,
        date,
        ref
      });
      const createdStoreItem = await items.save();
      res.status(201).json(createdStoreItem);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  export const updateItem = expressAsync(async (req, res) => {
    const {  title, amount, type, date, ref } = req.body;
  
    const item = await Income.findById(req.params.id);
  
    if (item) {
      item.title = title;
      item.amount = amount;
      item.type = type;
      item.date = date;
      item.ref = ref;
  
      const updatedIncomeItem = await item.save();
      res.json({
        updatedIncomeItem,
      });
    } else {
      res.status(404);
      throw new Error("item Not Found");
    }
  });
  
  export const deleteItemById = expressAsync(async (req, res) => {
    try {
      const item = await Income.findByIdAndDelete(req.params.id);
  
      res.json({ message: "item removed" });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
  

  export const getTotalIncome = expressAsync(async (req, res) => {
    try {
      let toltalInc;
      const items = await Income.find().sort({ createdAt: -1 });
  
      const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2);
        };
  
      let totalIncome = addDecimals(
        (toltalInc = items.reduce((acc, item) => acc + item.amount, 0))
      );
      function kFormatter(num) {
        return Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
          : Math.sign(num) * Math.abs(num);
      }
  
      kFormatter(totalIncome)
  
      res.json({ totalIncome });
    } catch (error) {
      res.json({ error: error.message });
    }
  });