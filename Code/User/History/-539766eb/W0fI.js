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
        const validUser = subGreddiit.users.get(userId);

        if ( !validUser ){
            return res.status(404).json({ message : "User Is Not Part Of Subgreddiit"});
        }
            
        // Next, we need to check whether the user is currently blocked.
        const isBlocked = subGreddiit.blockedUsers.contains(userId);
        if ( isBlocked ){
            return res.status(400).json({ message : "User Is Blocked By a Moderator."})
        }

        // If code reaches here, the user is part of the subgreddiit and
        // is not blocked, therefore is allowed to post.


        
    }   catch(err){
            res.status(400).json({ message : err.message });
    }
}