const router = require('express').Router();
const { getItems, createItem, deleteItem } = require('../controllers/item');

router.get('/', getItems);
router.post('/', createItem);
router.delete('/:id', deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;