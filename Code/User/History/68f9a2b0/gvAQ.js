import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        postedBy : Number,
        containsImage : Boolean,
        postContent : String,
        postedSubGreddiit : Number,
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
        }
    }
);

const Post = mongoose.model("Post", postSchema);
export default Post;