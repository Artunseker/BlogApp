const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.use("/blogs/categories/:slug",userController.blogs_by_category);

router.use("/blogs/:slug", userController.blogs_detail);

router.use("/blogs",userController.blogs);

router.use("/",userController.anasayfa);

module.exports = router;