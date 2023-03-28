import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        //*Posted By will contain the username, not the _id field.
        postedBy : {
            type : String,
            required : true,
        },
        userId : {
            type : String,
            required : true,
        },
        profilePicturePath : String, //Profile Picture Of the user who posted.
        postContent : {
            type : String,
            required : true,
        },
        postedSubGreddiit : {
            type : Number,
            required : true,
        },
        tags : {
            type : Array,
            default : [],
        },
        upVotes : {
            type : Map,
            of : Boolean,
        },
        downVotes :  {
            type : Map,
            of : Boolean,
        },
        comments : {
            type : Array, //*Array of commentIDs.
            default : [],
        },
    },
    { timestamp : true },
);

const Post = mongoose.model("Post", postSchema);
export default Post;