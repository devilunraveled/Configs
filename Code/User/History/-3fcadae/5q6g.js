import express from 'express';

/*Importing Controllers*/

import {
    createSubGreddiit,
    getAllSubGreddiits,
    getSubGreddiitPosts,
    getSubGreddiitReports,
    getSubGreddiitDetails,
    getSubGreddiitJoinRequests,
    requestToJoinSubGreddiit,
    leaveSubGreddiit,
    deleteSubGreddiit,
} from "../controllers/subGreddiits.js";

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/*Read Routes*/
router.get("/SubGreddiitsPage", verifyToken, getAllSubGreddiits);
router.get("/:subGreddiitId/details", verifyToken, getSubGreddiitDetails);
router.get("/:subGreddiitId/reports", verifyToken, getSubGreddiitReports);
router.get("/:subGreddiitId/posts", verifyToken, getSubGreddiitPosts);
router.get("/:subGreddiitId/joiningRequests", verifyToken, getSubGreddiitJoinRequests );

/*Create Routes*/
router.post("/createNewSubGreddiit", verifyToken, createSubGreddiit);

/*Update Routes*/
router.patch("/:subGreddiitId/join", verifyToken, requestToJoinSubGreddiit);
router.patch("/:subGreddiitId/leave", verifyToken, leaveSubGreddiit);

/*Delete Routes*/
router.delete("/:subGreddiitId/delete", verifyToken, deleteSubGreddiit);

export default router;