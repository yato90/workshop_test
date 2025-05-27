const User = require("../models/userModel");

exports.getAll = async (req, res) => {
  const users = await User.getAll();
  res.json(users);
};

exports.create = async (req, res) => {
  await User.create(req.body);
  res.status(201).send("Created");
};

exports.update = async (req, res) => {
  await User.update(req.params.id, req.body);
  res.send("Updated");
};

exports.remove = async (req, res) => {
  await User.remove(req.params.id);
  res.send("Deleted");
};
