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

/*Update Routes */
router.get("/:id/:friendId/follower", verifyToken, addRemoveUserFollower); 
// *If a user deletes a particular follower, should be reflected for the follower as well.
router.get("/:id/:friendId/following", verifyToken, addRemoveUserFollowing);