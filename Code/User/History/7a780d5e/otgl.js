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