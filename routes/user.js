const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/blogs/categories/:slug",userController.blogs);

router.get("/blogs/:slug", userController.blogs_detail);

router.get("/blogs",userController.blogs);

router.get("/",userController.anasayfa);

module.exports = router;