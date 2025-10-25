const Item = require('../models/clothingItem'); 

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Invalid item data' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then((doc) => {
      if (!doc) return res.status(404).send({ message: 'Item not found' });
      return res.send({ message: 'Deleted' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getItems, createItem, deleteItem };