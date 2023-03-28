import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        subComment : {
           type : Number,
           default : 0,
        },
        commentText : String, 
        commentedBy : Number,
    }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;