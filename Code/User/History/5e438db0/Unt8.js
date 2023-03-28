import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
    getFeedPosts, 
    getUserPosts,
    likePosts,
} from "./controllers/posts.js";


/*Read Routes*/
router.get("/", verifyToken, getFeedPosts);