const mongoose = require("mongoose");
const User = require("../models/user");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  return User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const getUsers = (req, res) => User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));

const getUser = (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(400).send({ message: "Invalid user ID format" });
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getUsers, getUser, createUser };
