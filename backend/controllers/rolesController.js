const Role = require("../models/roleModel");

exports.getAll = async (req, res) => {
  const roles = await Role.getAll();
  res.json(roles);
};

exports.getById = async (req, res) => {
  const role = await Role.getById(req.params.id);
  role ? res.json(role) : res.status(404).send("Not found");
};

exports.create = async (req, res) => {
  await Role.create(req.body);
  res.status(201).send("Created");
};

exports.update = async (req, res) => {
  await Role.update(req.params.id, req.body);
  res.send("Updated");
};

exports.remove = async (req, res) => {
  await Role.remove(req.params.id);
  res.send("Deleted");
};
