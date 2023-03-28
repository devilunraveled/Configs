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
    getSubGreddiitAnalytics,
} from "../controllers/subGreddiits.js";

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/*Read Routes*/
router.post("/SubGreddiitsPage/allSubGreddiits", verifyToken, getAllSubGreddiits);
router.post("/:subGreddiitId/homepage", verifyToken, getSubGreddiitDetails);
router.post("/:subGreddiitId/reports", verifyToken, getSubGreddiitReports);
router.post("/:subGreddiitId/posts", verifyToken, getSubGreddiitPosts);
router.post("/:subGreddiitId/joiningRequests", verifyToken, getSubGreddiitJoinRequests );
router.post("/:subGreddiitId/getAnalysis", verifyToken, getSubGreddiitAnalytics);

/*Create Routes*/
router.post("/SubGreddiit/createNew", verifyToken, createSubGreddiit);

/*Update Routes*/
router.patch("/:subGreddiitId/join", verifyToken, requestToJoinSubGreddiit);
router.patch("/:subGreddiitId/leave", verifyToken, leaveSubGreddiit);

/*Delete Routes*/
router.delete("/:subGreddiitId/delete", verifyToken, deleteSubGreddiit);