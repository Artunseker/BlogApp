const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.use("/blogs/categories/:categoryid",userController.blogs_by_category);

router.use("/blogs/:blogid", userController.blogs_detail);

router.use("/blogs",userController.blogs);

router.use("/",userController.anasayfa);

module.exports = router;