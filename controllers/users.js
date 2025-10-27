const mongoose = require("mongoose");
const User = require("../models/user");
const { OK, CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  return User.create({ name, avatar })
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: 'Invalid data' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server error' });
    });
};

const getUsers = (req, res) => User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server error' }));

const getUser = (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid user ID format" });
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.send(user);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'server error' }));
};

module.exports = { getUsers, getUser, createUser };
