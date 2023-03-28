import SubGreddiit from "../models/SubGreddiits";
import User from "../models/Users";

import { invalidUser } from "./posts";

/*Checking For Moderator Permissions*/
async function isMOD( subGreddiitId, userId ){
    const subGreddiit = await SubGreddiit.findById(subGreddiitId);

    if ( subGreddiit.moderator.includes( userId ) ){
        return true;
    }
    
    return false;
}

/*Read Routes*/

/* createSubGreddiit */
export const createSubGreddiit = async (req, res) => {
    try{
        const userId = req.user.id;

        const {
            name,
            description,
            tags,
            bannedWords,
        } = req.body;
        // *These are the values that the frontend needs to provide.

        const newSubGreddiit = new SubGreddiit({
            name : name,
            description : description,
            tags : tags,
            bannedWords : bannedWords,
            moderator : userId,
            hasProfilePic : false,
            hasDashboardPic : false,
            users : {userId : true},
            blockedUsers : [],
            posts : [],
            reports : []
        })

        newSubGreddiit.save( ( err, sGObject) =>{
            if ( err ){
                console.log(err.message);
            } else {
                newSubGreddiit = sGObject;
            }
        });

        //Now, we have to resolve some dependencies,

        //*Adding the SubGreddiit To Users joined subGreddiit 
        //*and ownedSubGreddiitList.

        const user = await User.findById(userId);
        user.ownedSubGreddiits.push(newSubGreddiit._id);
    } catch(err) {
        res.status(401).json({ message : err.message})
    }
}

/* getAllSubGreddiits */
export const getAllSubGreddiits = async ( req, res ) => {
    try{
    const userId = req.user.id;
    let allJoinedSubGs = [];
    let notJoinedSubGs = [];
    
    /*Getting all the SubGreddiits that the user has joined. */
    SubGreddiit.find( { [`users.${userId}`] : true }, ( err, subGreddiits) =>{
        if ( err ){
            res.status(401).json({message : err.message});
        } else {
            const allJoinedSubGs = subGreddiits;
        }
    });

    /*Getting all the subGreddiits that the user has not joined. */
    SubGreddiit.find({ [`users.${userId}`] : {$ne : true}}, ( err, subGreddiits) =>{
        if ( err ){
            res.status(401).json({ message : err.message });
        } else {
            notJoinedSubGs = subGreddiits;
        }
    });

    return res.status(200).json({ joinedSubs : allJoinedSubGs, otherSubs : notJoinedSubGs});
    } catch ( err ){
        return res.status(400).json({message : err.message});
    }
}


/*getSubGreddiitPosts*/
export const getSubGreddiitPosts = async ( req, res ) => {

}

/*  getSubGreddiitReports,
    getSubGreddiitDetails,
    getSubGreddiitJoinRequests,
    requestToJoinSubGreddiit,
    leaveSubGreddiit,
    deleteSubGreddiit,
    getSubGreddiitAnalytics,
*/