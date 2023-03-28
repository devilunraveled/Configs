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
router.get("/:subGreddiitId/posts", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/*Create Routes*/
router.post("/:subGreddiitId/:userId/createNewPost", verifyToken, createPost);
router.post("/:postId/:userId/comment", verifyToken, commentOnPost);
router.post("/postId:/:userId/reportPost", verifyToken, reportPost);

/*Update Routes*/
router.patch("/:postId/:userId/upVote", verifyToken, upVotePost);
router.patch("/:postId/:userId/downVote", verifyToken, downVotePost);

/*Delete Routes*/
router.delete("/:postId/delete", verifyToken, deletePost);