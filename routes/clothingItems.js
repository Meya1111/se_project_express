const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

//const {
 // validateCreateItem,
 // validateItemIdParam,
//} = require("../middlewares/validation");

//router.post("/", validateCreateItem, createItem);
//router.delete("/:itemId", validateItemIdParam, deleteItem);
router.put("/:itemId/likes", likeItem);
//router.put("/:itemId/likes", validateItemIdParam, likeItem);

module.exports = router;
