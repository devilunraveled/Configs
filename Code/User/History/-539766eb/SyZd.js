import Post from "../models/Posts.js";
import SubGreddiit from "../models/SubGreddiits.js";
import User from "../models/Users.js";

/*Create Controls*/
export const createPost = async ( req, res ) => {
    try{
        const { subGreddiitId, userId } = req.params;
        
        const user = User.findById(userId);
        const subGreddiit = SubGreddiit.findById(subGreddiitId);

        // Now, we have the subGreddiit and the user who is about to
        // make the post. First verify that user is in the SubGreddiit.
        try {
            if ( subGreddiit.users.contains( userId) ){
                continue;
            }
        } catch(err){
            return res.status(404).json({ message : "User Is Not Part Of Subgreddiit"});
        }
        
        // Next, we need to check whether the user is currently blocked.
        try{
            if ( subf)
        }
    }
}