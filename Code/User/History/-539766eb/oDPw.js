import Post from "../models/Posts.js";
import SubGreddiit from "../models/SubGreddiits.js";
import User from "../models/Users.js";

/*Create Controls*/
export const createPost = async ( req, res ) => {
    try{
        const { subGreddiitId, userId } = req.params;
        const { postDescription, postTags } = req.body;
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

        const user = User.findById(userId);

        var newPost = new Post({
            postedBy : user.userId,
            userId,
            profilePicturePath : user.profilePicturePath,
            postContent : postDescription,
            postedSubGreddiit : subGreddiit.name,
            tags : postTags,    // An array of tags should be sent from the frontend.
            upVotes : {},
            downVotes : {},
            comments : []
        });
        // !Should tags be checked to only allow for SubGreddiit tags?
        // *This will create a structure of the post.

        newPost.save( (err, postObject) => {
            if (err) {
                console.log(err);
                //!Response Status should be returned here.
            } else {
                newPost = postObject;
            }
        });
        // After successful update, we have the Post object in newPost.

        // *Now, when the newPost is saved, we need to send all the posts
        // *back to the frontend.

        // Now, we need to update two more things :
        // 1. userPosts list.
        // 2. SubGreddiitPosts list.

        // *Updating UserPosts
        user.createdPosts.push( newPost._id );
        await user.save();

        // *Updating SubGreddiitPosts
        subGreddiit.posts.push( newPost.id );
        await subGreddiit.save();

        //After a post has been created, the SubGreddiit needs to be updated, 
        //therefore, we send back the SubGreddiit Object.
        res.status(200).json( subGreddiit ); 
    }   catch(err){
            res.status(400).json({ message : err.message });
    }
}