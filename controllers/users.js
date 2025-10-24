const User = require("../modals/user");

const createUser = (req, res) => {
  const { name, avatar } = req.body;  
  User.create({ name, avatar })
  .then((user) => res.status(201).send(user))
  .catch((err) => {
   console.error(err);
   if (err.name === "ValidationError") {
   return res.status(400).send({ message: err.message });
   }
   return res.status(500).send({ message: err.message }); 
  });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
    return res.status(400).send({ message: "Invalid user ID format" });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getUsers, getUser, createUser };