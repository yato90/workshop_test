const Task = require("../models/taskModel");

exports.getAll = async (req, res) => {
  const tasks = await Task.getAll();
  res.json(tasks);
};

exports.getById = async (req, res) => {
  const task = await Task.getById(req.params.id);
  task ? res.json(task) : res.status(404).send("Not found");
};

exports.create = async (req, res) => {
  await Task.create(req.body);
  res.status(201).send("Created");
};

exports.update = async (req, res) => {
  await Task.update(req.params.id, req.body);
  res.send("Updated");
};

exports.remove = async (req, res) => {
  await Task.remove(req.params.id);
  res.send("Deleted");
};
