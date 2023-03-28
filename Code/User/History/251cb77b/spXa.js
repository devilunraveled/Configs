import express from "express";
/*Importing Controllers */
import {
    getUser,
    getUserFollowers,
    getUserFollowing,
    getUserSubGreddiits,
    addRemoveUserFollower,
    addRemoveUserFollowing
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read Routes */
router.get("/:id", verifyToken, getUser);
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/following", verifyToken, getUserFollowing);
router.get("/:id/mySubGreddiits", verifyToken, getUserSubGreddiits);