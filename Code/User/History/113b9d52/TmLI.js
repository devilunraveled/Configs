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
            type : Map,
            of : Boolean,
        },
        moderator : {
            type : String,
            default : "",
        },
        hasProfilePic : {
            type : Boolean,
            default : false,
        },
        hasDashboardPic : {
            type : Boolean,
            default : false,
        },
        users : {
            type : Map,
            of : Boolean,
        },
        blockedUsers : { //Array Of Blocked User Ids.
            type : Array,
            default : [],
        },
        posts : {       // Array Of PostIds.
            type :Array,
            default : [],
        },
        reports : { // Array Of Report Ids.
            type : Array,
            default : [],
        }
    },
    { timestamps : true },
);

const SubGreddiit = mongoose.model("SubGreddiit", subGreddiitSchema);
export default SubGreddiit;