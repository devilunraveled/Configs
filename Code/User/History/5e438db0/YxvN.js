import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
    createPost,
    getFeedPosts, 
    getUserPosts,
    commentOnPost,
    reactToPost,
    reportPost,
} from "./controllers/posts.js";

const router = express.Router();

/*Read Routes*/
router.get("/:subGreddiitId", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

/*Create Routes*/
router.post("/:subGreddiitId/:userId/createNewPost", verifyToken, createPost);
router.post("/:postId/:userId/comment", verifyToken, commentOnPost);
router.post("/postId:/:userId/reportPost", verifyToken, reportPost);

/*Update Routes*/
router.patch("/:postId/:userId/react", verifyToken, reactToPost);

/*Delete Post*/
router.delete("/:subGreddiit/:postId/:userId", verifyToken, deletePost);