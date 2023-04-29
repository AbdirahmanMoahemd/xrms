import Expenses from "../models/expenseModel.js";
import expressAsync from "express-async-handler";
import Income from "../models/incomeModel.js";

export const getItems = expressAsync(async (req, res) => {
  try {
    const items = await Expenses.find().sort({ createdAt: -1 });

    res.json({ items });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getItemById = expressAsync(async (req, res) => {
  try {
    const item = await Expenses.findById(req.params.id);
    if (item) {
      res.json(item);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createExpense = expressAsync(async (req, res) => {
  try {
    const { userId, title, amount, type, date, ref } = req.body;

    const items = new Expenses({
      user: userId,
      title,
      amount,
      type,
      date,
      ref,
    });
    const createdStoreItem = await items.save();
    res.status(201).json(createdStoreItem);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const updateItem = expressAsync(async (req, res) => {
  const { title, amount, type, date, ref } = req.body;

  const item = await Expenses.findById(req.params.id);

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
    const item = await Expenses.findByIdAndDelete(req.params.id);

    res.json({ message: "item removed" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTotalExpense = expressAsync(async (req, res) => {
  try {
    let toltalExp;
    let toltalInc;
    const items = await Expenses.find()
    const incomes = await Income.find()

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };

    let expense = addDecimals(
      (toltalExp = items.reduce((acc, item) => acc + item.amount, 0))
    );

    let income = addDecimals(
        (toltalInc = incomes.reduce((acc, item) => acc + item.amount, 0))
      );

    function kFormatter(num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    }

  let totalExpense= kFormatter(expense)
  let totalIncome =  kFormatter(income)
  let blance = income - expense;

    res.json({ totalExpense, totalIncome, blance });
  } catch (error) {
    res.json({ error: error.message }); 
  }
});
