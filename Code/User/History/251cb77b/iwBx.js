import express from "express";
/*Importing Controllers */
import {
    getUser,
    getUserFollowers,
    getUserFollowing,
    getUserSubGreddiits,
    updateUserDetails,
    addRemoveUserFollower,
    addRemoveUserFollowing,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read Routes */
router.get("/:id", verifyToken, getUser);
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/following", verifyToken, getUserFollowing);
router.get("/:id/mySubGreddiits", verifyToken, getUserSubGreddiits);

/*Update Routes */
router.patch("/:id/update", verifyToken, updateUserDetails);
router.patch("/:id/:friendId/follower", verifyToken, addRemoveUserFollower); 
router.patch("/:id/:friendId/following", verifyToken, addRemoveUserFollowing);
// *If a user deletes a particular follower, should be reflected for the follower as well.

export default router;