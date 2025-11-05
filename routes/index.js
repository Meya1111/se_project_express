const router = require("express").Router();

const { NOT_FOUND } = require("../utils/constants");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { getItems } = require('../controllers/clothingItems');

const clothingItemRouter = require("./clothingItems");
const userRouter = require("./users");

router.post("/signin", login);
router.post("/signup", createUser);
router.get('/items', getItems);
router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
