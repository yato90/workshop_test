const Role = require("../models/roleModel");

exports.getAll = async (req, res) => {
  const roles = await Role.getAll();
  res.json(roles);
};