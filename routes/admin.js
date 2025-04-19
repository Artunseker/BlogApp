const express = require("express");
const adminRouter = express.Router();

const imgupload = require("../helpers/image-upload");

const admin_controller = require("../controllers/admin");
//categories



adminRouter.get("/category/delete/:categoryid",admin_controller.admin_get_delete_category);

adminRouter.post("/category/delete/:categoryid",admin_controller.admin_post_delete_category);

adminRouter.get("/categories/:categoryid",admin_controller.admin_get_edit_category);

adminRouter.post("/categories/:categoryid",admin_controller.admin_post_edit_category);

adminRouter.get("/category/create",admin_controller.admin_get_create_category);

adminRouter.post("/category/create",admin_controller.admin_post_create_category);


adminRouter.get("/categories",admin_controller.admin_get_categories);

//blogs

adminRouter.get("/blog/delete/:blogid",admin_controller.admin_get_delete_blog);

adminRouter.post("/blog/delete/:blogid",admin_controller.admin_post_delete_blog);

adminRouter.get("/blog/create",admin_controller.admin_get_create_blog);

adminRouter.post("/blog/create",imgupload.single("resim"), admin_controller.admin_post_create_blog);

adminRouter.get("/blogs/:blog_id",admin_controller.admin_get_edit_blog);

adminRouter.post("/blogs/:blog_id", imgupload.single("resim"),admin_controller.admin_post_edit_blog);


adminRouter.get("/blogs",admin_controller.admin_get_blogs);



module.exports = adminRouter; 