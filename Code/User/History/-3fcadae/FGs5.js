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
router.post("/:subGreddiitId/homepage", verifyToken, getSubGreddiitDetails);
router.post("/:subGreddiitId/reports", verifyToken, getSubGreddiitReports);
router.post("/:subGreddiitId/posts", verifyToken, getSubGreddiitPosts);
router.post("/:subGreddiitId/joiningRequests", verifyToken, getSubGreddiitJoinRequests );

/*Create Routes*/

/*Update Routes*/
router.post("/:subGreddiitId/join", verifyToken, requestToJoinSubGreddiit);

/*Delete Routes*/