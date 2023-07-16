const router = require("express").Router();

const commentRoute = require("./commentRoute");
const postRoute = require("./postingRoute");
const userRoute = require("./userRoute");

router.use("/comment", commentRoute);
router.use("/post", postRoute);
router.use("/user", userRoute);

module.exports = router;