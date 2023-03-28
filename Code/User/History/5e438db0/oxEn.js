import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
    createPost,
    getFeedPosts, 
    getUserPosts,
    reactToPost,
} from "./controllers/posts.js";

const router = express.Router();

/*Read Routes*/
router.get("/:subGreddiitId", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

/*Create Routes*/
router.post("/:subGreddiitId/:userId/newPost", verifyToken, createPost);

/*Update Routes*/
router.patch("/:postId/:userId/react", verifyToken, reactToPost);