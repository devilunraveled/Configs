import Comment from "../models/Comments.js";
import Post from "../models/Posts.js";
import Report from "../models/Reports.js";
import SubGreddiit from "../models/SubGreddiits.js";
import User from "../models/Users.js";

/*Checking For User Validity*/
function invalidUser( subGreddiitId, userId ){
    const subGreddiit = await SubGreddiit.findById(subGreddiitId);
    const validUser = subGreddiit.users.get(userId);
    const isBlocked = subGreddiit.blockedUsers.contains(userId);

    if ( !validUser || isBlocked ){
        return false;
    }
    return true;
}

/*Create Controls*/
export const createPost = async ( req, res ) => {
    try{
        const userId = req.user.id;
        const { subGreddiitId } = req.params;
        const { postDescription, postTags } = req.body;
        const subGreddiit = await SubGreddiit.findById(subGreddiitId);

        // Now, we have the subGreddiit and the user who is about to
        // make the post. First verify that user is in the SubGreddiit.
        if ( invalidUser(subGreddiitId, userId) ){
            return res.status(400).json({message : "Invalid User"});
        }
        // If code reaches here, the user is part of the subgreddiit and
        // is not blocked, therefore is allowed to post.

        const user = await User.findById(userId);

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
                console.log(err).message;
                //!Response Status should be returned here.
            } else {
                newPost = postObject;
            }
        });
        // After successful update, we have the Post object in newPost.
        // `await` is not used, since we have a callback.        


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

export const commentOnPost = async(req, res) => {
    try{
        const userId = req.user.id;
        const { postId } = req.params;
        const { username, comment, subGreddiitId } = req.body;
        
        // *If the user is blocked or not a part of the SubGreddiit,
        // *this should not be allowed.

        if ( invalidUser(subGreddiitId, userId) ){
            return res.status(400).json({message : "Invalid User"});
        }

        //*The user should now be able to comment on this post.

        var newComment = new Comment({
            subComment : {},
            commentText : comment,
            commentedBy : username
        });

        newComment = await newComment.save();
        
        const updatedPost = await Post.findOneAndUpdate(
            { _id : postId },
            { $push: { comments : newComment._id }},
            { new : true}
        ).exec()
        
        return res.status(201).json( updatedPost);
    }catch(err){
        res.status(400).json( { message :err.message });       
    }
}

export const reportPost = async(req, res) => {
    try{
        const userId = req.user.id; //Person who is reporting.
        const { postId } = req.params;
        const { subGreddiitId, description} = req.body;
        // Username of the person that reported.

        const subGreddiit = await SubGreddiit.findById(subGreddiitId);
        if ( invalidUser(subGreddiitId, userId) ){
            return res.status(400).json({message : "Invalid User"});
        }

        //*The user should now be able to report this post.
        
        const userThatReported = await User.findById(userId);
        const reportedPost = await Post.findById(postId);        

        var newReport = new Report({
            reportedBy : userThatReported.userName,
            reportedUser : reportedPost.postedBy,
            reportType : "Post",
            reportedText : reportedPost.postContent,
            description : description
        });

        newReport = await newReport.save();

        //Now, we need to update the SubGreddiit reports property as well.
        subGreddiit.reports.push( newReport._id );
        await subGreddiit.save();

        res.status(201).json( newReport );
    }catch(err){
        res.status(400).json( { message :err.message });       
    }
}

/*Update Controls*/
export const upVotePost = async (req, res) => {
    try{
        const { postId } = req.params;
        const userId = req.user.id;
        const thisPost = await Post.findById(postId);
        const subGreddiitId = thisPost.postedSubGreddiit;

        if ( invalidUser(subGreddiitId, userId) ){
            return res.status(400).json({message : "Invalid User"});
        }
        //Now, the user should be allowed to upvote.

        // If the user has downVoted, that is to be deleted.
        if ( thisPost.downVotes.get(userId) ){
            thisPost.downVotes.delete(userId);
        }

        if ( thisPost.upVotes.get(userId) ){
            thisPost.upVotes.delete(userId);
        }else{
            thisPost.upVotes.set(userId, true);
        }

        thisPost = await thisPost.save();

        return res.status(201).json(thisPost);
    }catch(err){
        res.status(400).json( { message :err.message } );       
    }
}

export const downVotePost = async (req, res) => {
    try{
        const { postId } = req.params;
        const userId = req.user.id;
        const thisPost = await Post.findById(postId);
        const subGreddiitId = thisPost.postedSubGreddiit;

        if ( invalidUser(subGreddiitId, userId) ){
            return res.status(400).json({message : "Invalid User"});
        }
        //Now, the user should be allowed to downvote.

        // If the user has upVoted, that is to be deleted.
        if ( thisPost.upVotes.get(userId) ){
            thisPost.upVotes.delete(userId);
        }

        if ( thisPost.downVotes.get(userId) ){
            thisPost.downVotes.delete(userId);
        }else{
            thisPost.downVotes.set(userId, true);
        }

        thisPost = await thisPost.save();
        return res.status(201).json(thisPost);
    }catch(err){
        res.status(400).json( { message : err.message } );       
    }
}

/*Delete Controls*/
export const deletePost = async (req, res) => {
    try{
        const { postId } = req.params;
        const userId = req.user.id;
        const { subGreddiitId } = req.body;

        // *Only two people can delete a post, either the creator itself,
        // *or the moderator of the SubGreddiit.

        if ( invalidUser( userId, subGreddiitId ) ){
            return res.status(401).json({message :err.message});
        }
    }catch(err){
        res.status(400).json( { message :err.message });       
    }
}

/*Read Controls*/
export const getFeedPosts = async(req, res) => {
    try{
        
    }catch(err){
        res.status(400).json( { message :err.message });       
    }
}

export const getUserPosts = async(req, res) => {
    try{
        
    }catch(err){
        res.status(400).json( { message :err.message });       
    }
}