import { Router } from "express";
const router = Router();

import * as controller from '../controllers/PostController.js'

// POST
router.route("/create-post").post(controller.createPost);

// GET
router.route("/all-posts").get(controller.getAllPost)
// GET single blog
router.route("/get-post/:id").get(controller.getPostById);
// GET ALL Blog of Single User
router.route("/user-post/:id").get(controller.userPost)

// DELETE
router.route("/delete-post/:id").delete(controller.deletePost);

// PUT
router.route("/update-post/:id").put(controller.updatePost);


export default router;