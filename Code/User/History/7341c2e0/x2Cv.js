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
        
        const userFollowers = await Promise.all(
            user.followersList.map( (id) => User.findById(id) )
        );

        const formattedFollowers = userFollowers.map(
           ({ _id, firstName, lastName, userId ,profilePicturePath}) =>{
            return {};
           }
        )
    }
    catch ( err ){
        res.status(404).json( {message : err.message });
    }
}