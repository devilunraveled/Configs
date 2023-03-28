import mongoose from "mongoose";

const subGreddiitSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            default : "NewSubGreddiit",
        },
        description : {
            type : String,
            default : "Sample Description",
        },
        tags : {
            type : Array,
            default : [],
        },
        bannedWords : {
            type : Array,
            default : [],
        },
        moderator : {
            type : String,
            default : "",
        },
        users : {
            type : Array,
            default : [],
        },
        hasProfilePic : {
            type : Boolean,
            default : false,
        },
        hasDashboardPic : {
            type : Boolean,
            default : false,
        },
        blockedUsers : {
            type : Array,
            default : [],
        },
        reports : {
            type : Array,
            default : [],
        }
    },
    { timestamps : true },
);