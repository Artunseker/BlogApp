const express = require("express");
const adminRouter = express.Router();

const imgupload = require("../helpers/image-upload");
const auth = require("../middlewares/auth.js");
const admin_controller = require("../controllers/admin");
//categories



adminRouter.get("/category/delete/:categoryid",auth,admin_controller.admin_get_delete_category);

adminRouter.post("/category/delete/:categoryid",auth,admin_controller.admin_post_delete_category);

adminRouter.post("/categories/remove",auth,admin_controller.post_category_remove);

adminRouter.get("/categories/:categoryid",auth,admin_controller.admin_get_edit_category);

adminRouter.post("/categories/:categoryid",auth,admin_controller.admin_post_edit_category);

adminRouter.get("/category/create",auth,admin_controller.admin_get_create_category);

adminRouter.post("/category/create",auth,admin_controller.admin_post_create_category);


adminRouter.get("/categories",auth,admin_controller.admin_get_categories);

//blogs

adminRouter.get("/blog/delete/:blogid",auth,admin_controller.admin_get_delete_blog);

adminRouter.post("/blog/delete/:blogid",auth,admin_controller.admin_post_delete_blog);

adminRouter.get("/blog/create",auth,admin_controller.admin_get_create_blog);

adminRouter.post("/blog/create",auth,imgupload.single("resim"), admin_controller.admin_post_create_blog);

adminRouter.get("/blogs/:blog_id",auth,admin_controller.admin_get_edit_blog);

adminRouter.post("/blogs/:blog_id",auth, imgupload.single("resim"),admin_controller.admin_post_edit_blog);


adminRouter.get("/blogs",auth,admin_controller.admin_get_blogs);



module.exports = adminRouter; 