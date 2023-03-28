import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/*Register User */
export const register = async ( req, res ) => {
    // The frontend would need to send the request in this format
    try {
        const {
            firstName, 
            lastName,
            userId,
            email,
            age,
            contactNumber,
            password,
            profilePicturePath,
            backgroundPicturePath,
            followersList,
            followingList
        } = req.body(); 
        
        const salt = await bcrypt.genSalt(); // *Encryption Using bcrypt.
        const hashedPassword = await bcrypt.hash(password, salt); 
        
        const newUser = new User ({
            firstName, 
            lastName,
            userId,
            email,
            age,
            contactNumber,
            password : hashedPassword,
            profilePicturePath,
            backgroundPicturePath,
            followersList,
            followingList
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        // *201 corresponds to a successful creation.        
    }
    catch ( err ){
        res.status(500).json( {error : err.message });
    }
}

/*For Logging In */
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne( {email : email} );
        if ( !user ){
            return res.status(400).json({msg : "User Not Found"});
        }

        const isValidUser = await bcrypt.compare( password, user.password);
        if ( !isValidUser ){
            return res.status(400).json({msg : "Invalid Credentials" });
        }
        
        const payload = {
            id : user._id,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY);
        // !Make sure password is not sent back to the frontend
        delete user.password;

        res.status(200).json({token, user});
    }
    catch{
        res.status(500).json( {error : err.message} );
    }
}

