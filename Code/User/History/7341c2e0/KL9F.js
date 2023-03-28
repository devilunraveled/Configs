import User from "../models/Users";

/*Read Controls*/

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

export const getUserSubGreddiits = async ( req, res ) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        // Now, we need to extract the SubGreddiits the user is a moderator of.
    }

}