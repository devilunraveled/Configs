import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
    createPost, 
    getUserPosts,
    commentOnPost,
    upVotePost,
    downVotePost,
    reportPost,
} from "./controllers/posts.js";

const router = express.Router();

/*Read Routes*/

/*Create Routes*/
router.post("/:subGreddiitId/createNewPost", verifyToken, createPost);
router.post("/:postId/comment", verifyToken, commentOnPost);
router.post("/postId:/reportPost", verifyToken, reportPost);

/*Update Routes*/
router.patch("/:postId/upVote", verifyToken, upVotePost);
router.patch("/:postId/downVote", verifyToken, downVotePost);

/*Delete Routes*/
router.delete("/:postId/delete", verifyToken, deletePost);