import User from "../models/Users";

/*READ CONTROLS*/

/*getUser */
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch ( err ){
        res.status(404).json({message : err.message});
    }
}

/*getUserFollowers */
export const getUserFollowers = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        
        // Having extracted the user, we need to extract the followers of the user.
        const userFollowers = await Promise.all(
            user.followersList.map( (id) => User.findById(id) )
        );
        
        // We don't want to return the entire object for friends, instead, we will filter 
        // out the required details and only send those to the front-end.
        const formattedFollowers = userFollowers.map(
           ({ _id, firstName, lastName, userId ,profilePicturePath}) =>{
            return {_id, firstName, lastName, userId ,profilePicturePath};
           }
        )
        res.status(200).json(formattedFollowers);
    }
    catch ( err ){
        res.status(404).json( {message : err.message });
    }
}

/*getUserFollowing*/
export const getUserFollowing = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        
        // Having extracted the user, we need to extract the following of the user.
        const userFollowing = await Promise.all(
            user.followingList.map( (id) => User.findById(id) )
        );
        
        // We don't want to return the entire object for friends, instead, we will filter 
        // out the required details and only send those to the front-end.
        const formattedFollowing = userFollowing.map(
           ({ _id, firstName, lastName, userId ,profilePicturePath}) =>{
            return {_id, firstName, lastName, userId ,profilePicturePath};
           }
        )
        res.status(200).json(formattedFollowing);
    }
    catch ( err ){
        res.status(404).json( {message : err.message });
    }
}

/*getUserSubGreddiits*/
export const getUserSubGreddiits = async ( req, res ) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        // Now, we need to extract the SubGreddiits the user is a moderator of.

        ////const personalSubGreddiits = await Promise.all(
        ////    user.ownedSubGreddiits)
        ////)
    }
    catch ( err ){
        res.status(404).json( {message : err.message });
    }
}

/*UPDATE CONTROLS*/

/*updateUserDetails*/
export const updateUserDetails = async ( req, res ) => {
    try{
        const { id, newUser } = req.params;
        let user = await User.findById(id);
        
        // *Union of two operators, done through the spread operator.
        user = {...user,...newUser};
        // !This is not a safe way to do this, find a better way.

        await user.save();
        res.status(200).json({newUser});
    }catch ( err ){
        res.status(501).json( {message : err.message });
    }
}

/*addRemoveUserFollower*/
export const addRemoveUserFollower = async ( req, res ) => {
    try{
        const { userId, followerId } = req.params;
        const user = await User.findById(userId);
        const follower = await User.findById(followerId);

        if ( user.followersList.includes(followerId) )
        {
            // *The second user already follows, have to remove.
            user.followersList = user.followersList.filter( (id) => id !== followerId);
            follower.followingList = follower.followingList.filter( (id) => id !== userId);

            await user.save();
            await follower.save();
        } else {
            // *The second user doesn't follow, so we can't do anything.
        }
    }
    catch( err ){
        res.status(501).json( {message : err.message});
    }
}

/*addRemoveUserFollowing*/ 
//*This essentially is trying to follow/un-follow someone.
export const addRemoveUserFollowing = async ( req, res ) => {
    try{
        const { userId, targetId } = req.params;
        const user = await User.findById(userId);
        const target = await User.findById(targetId);

        if ( user.followingList.includes(targetId) )
        {
            //* This means that user already follows and now we have to un-follow.
            user.followingList = user.followingList.filter( (id) => id !== targetId );
            target.followersList = target.followersList.filter( (id) => id !== userId);
        } else {
            //* Now, a follow request should be sent, but right now, directly allow follow.
            user.followingList.push(targetId);
            target.followersList.push(userId);
        }

        //* Saving the updates in the database.
        await user.save();
        await target.save();  
    } catch(err) {
        res.status(501).json( {message : err.message});
    }
}

