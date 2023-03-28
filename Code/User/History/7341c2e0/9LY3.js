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
        
        // Having extracted the user, we need to extract all the followers of the user.
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