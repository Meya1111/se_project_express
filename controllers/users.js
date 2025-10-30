const mongoose = require("mongoose");
const User = require("../models/user");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/constants");
const bcrypt = require("bcryptjs");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res.status(CREATED).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error" });
    });
};

const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" })
    );

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
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error" })
    );
};

module.exports = { getUsers, getUser, createUser };
