import expressAsync from "express-async-handler";
import Tasks from "../models/tasksModel.js";

export const getTasks = expressAsync(async (req, res) => {
  try {
    const tasks = await Tasks.find({bin:false});

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});


export const getTasksInBin = expressAsync(async (req, res) => {
  try {
    const tasks = await Tasks.find({bin:true});

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTaskById = expressAsync(async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (task) {
      res.json(task); 
    }

   
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createTask = expressAsync(async (req, res) => {
  try {
    const { name, phone, item, problem, amount,date, userid, comment } = req.body;

    const tasks = new Tasks({
      user: userid,
      name,
      phone,
      item,
      problem,
      amount,
      date,
      comment
    });
    const createdTasks = await tasks.save();
    res.status(201).json(createdTasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


export const updateTasksStage = expressAsync(async (req, res) => {
  const { stage } = req.body;

  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.stage = stage;

    const updatedTasks = await task.save();
    res.json({
      updatedTasks
    });
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});


export const updateTasks = expressAsync(async (req, res) => {
  const { name, phone, item, problem, amount, date, stage, comment } = req.body;

  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.name = name;
    task.phone = phone;
    task.item = item;
    task.problem = problem;
    task.amount = amount;
    task.date = date;
    task.stage = stage;
    task.comment = comment;

    const updatedTasks = await task.save();
    res.json({
      updatedTasks
    });
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});

export const moveTaskstoBin = expressAsync(async (req, res) => {

  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.bin = true;

    const updatedTasks = await task.save();
    res.json({
      updatedTasks
    });
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});


export const restoreTasks = expressAsync(async (req, res) => {

  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.bin = false;

    const updatedTasks = await task.save();
    res.json({
      updatedTasks
    });
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});

export const deleteTaskById = expressAsync(async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);

    res.json({ message: "Task removed" });
  } catch (error) {
    res.json({ error: error.message });
  }
});
