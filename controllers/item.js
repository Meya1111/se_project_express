const Item = require('../models/clothingItem'); 
const { OK, CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

const getItems = (req, res) => {
  Item.find({})
  .then((items) => res.status(OK).send(items))
  .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server error' }));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  Item.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid item data' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server error' });
    });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  Item.findByIdAndDelete(id)
    .then((doc) => {
      if (!doc) return res.status(NOT_FOUND).send({ message: 'Item not found' });
      return res.send({ message: 'Deleted' });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server error' }));
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  Item.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, 
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: 'Item not found' });
      }
      res.send(item);
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server error' }));
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  Item.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.send(item);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };