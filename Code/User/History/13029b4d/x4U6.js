import SubGreddiit from "../models/SubGreddiit.js";
import User from "../models/User.js";
import { deletePost } from "./posts.js";
import { invalidUser } from "./posts.js";

/*Checking For Moderator Permissions*/
async function isMOD(subGreddiitId, userId) {
  const subGreddiit = await SubGreddiit.findById(subGreddiitId);

  if (subGreddiit.moderator.includes(userId)) {
    return true;
  }

  return false;
}

/*Read Routes*/

/* createSubGreddiit */
export const createSubGreddiit = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, description, tags, bannedWords } = req.body;
    // *These are the values that the frontend needs to provide.

    // Convert the comma-separated string of banned words into an object with boolean values
    const bannedWordsArray = bannedWords.split(",").map((word) => word.trim());
    const bannedWordsObject = bannedWordsArray.reduce((acc, word) => {
      acc[word] = true;
      return acc;
    }, {});

    const tagsArray = tags.split(",").map( (word) => word.trim() ); 

    var newSubGreddiit = new SubGreddiit({
      name: name,
      description: description,
      tags: tagsArray,
      bannedWords: bannedWordsObject,
      moderator: userId,
      hasProfilePic: false,
      hasDashboardPic: false,
      users: { [userId] : true },
      blockedUsers: [],
      posts: [],
      reports: [],
    });

    newSubGreddiit.save((err, sGObject) => {
      if (err) {
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
    await user.save()

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

/* getAllSubGreddiits */
export const getAllSubGreddiits = async (req, res) => {
  try {
    const userId = req.user.id;

    /*Getting all the SubGreddiits that the user has joined. */
    const allJoinedSubGs = await SubGreddiit.find({ [`users.${userId}`]: true });
    
    /*Getting all the subGreddiits that the user has not joined. */
    const notJoinedSubGs = await SubGreddiit.find( { [`users.${userId}`] : { $ne : true } });

    return res
      .status(200)
      .json({ joinedSubs: allJoinedSubGs, otherSubs: notJoinedSubGs });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/*getSubGreddiitPosts*/
export const getSubGreddiitPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const subGreddiitId = req.params;

    if (invalidUser(subGreddiitId, userId)) {
      return res.status(400).json({ message: err.message });
    }

    //*Now, the user should be able to retrieve all the posts.

    const subGreddiit = SubGreddiit.findById(subGreddiitId);
    //!Should you return a list of post objects, or just their ids?

    return res.status(200).json(subGreddiit.posts);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/*getSubGreddiitReports*/
export const getSubGreddiitReports = async (req, res) => {
  try {
    const userId = req.user.id;
    const subGreddiitId = req.params;

    if (invalidUser(subGreddiitId, userId)) {
      return res.status(400).json({ message: err.message });
    }

    //*Now, the user should be able to retrieve all the posts.

    const subGreddiit = SubGreddiit.findById(subGreddiitId);

    return res.status(200).json(subGreddiit.reports);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/*getSubGreddiitDetails*/
export const getSubGreddiitDetails = async (req, res) => {
  try {
    const subGreddiitId = req.params;

    //*Now, the user should be able to retrieve all the details.

    const subGreddiit = SubGreddiit.findById(subGreddiitId);

    //*Delete the things not required in the home.
    delete subGreddiit.reports;
    delete subGreddiit.posts;
    ////delete subGreddiit.users;
    delete subGreddiit.blockedUsers;

    return res.status(200).json(subGreddiit);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/*getSubGreddiitJoinRequests*/
export const getSubGreddiitJoinRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subGreddiitId } = req.params;

    if (invalidUser(subGreddiitId, userId)) {
      return res.status(400).json({ message: err.message });
    }

    //*Now, the user should be able to retrieve all the posts.

    const subGreddiit = SubGreddiit.findById(subGreddiitId);
    //!Should you return a list of post objects, or just their ids?

    return res.status(200).json(subGreddiit.posts);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/*requestToJoinSubGreddiit*/
export const requestToJoinSubGreddiit = async (req, res) => {
  try {
    const userId = req.user.id;
    const {subGreddiitId} = req.params;

    console.log("Id : ", userId, "subGId : ", subGreddiitId);
    /*Check if the user has already left the subGreddiit*/
    const user = await User.findById(userId);

    console.log("User : ", user);
    if (user.leftSubGreddiits.includes(subGreddiitId)) {
      return res
        .status(403)
        .json({ message: "User Already Left The SubGreddiit." });
    }

    //*If code reaches here, the user should be allowed
    //* to send joining request to the SubGreddiit.

    const subGreddiit = await SubGreddiit.findById(subGreddiitId);

    //*Making Sure the user is not blocked.
    //!May be clarification is needed.

    if (subGreddiit.blockedUsers.includes(userId)) {
      return res.status(403).json({ message: "Cannot send join request." });
    }

    //An existing user can also not send joining requests.

    if (subGreddiit.users.get(userId)) {
      return res.status(403).json({ message: "Already joined." });
    }

    //*Now, the user should be allowed to.
    subGreddiit.joinRequests.push(userId);

    await subGreddiit.save();

    //!Should something be sent back here?
    return res.status(200).json();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const approveJoinRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { joinerId, subGreddiitId } = req.body;

    let subGreddiit = SubGreddiit.findById(subGreddiitId);

    if (!subGreddiit.moderator.includes(userId)) {
      //A random user is trying to operate on requests.
      return res.status(403).json({ message: "Permission Denied" });
    }

    if (!subGreddiit.joinRequests.includes(joinerId)) {
      //Mod is randomly adding users to boost the subGreddiit.
      return res.status(403).json({ message: "Could not find Request." });
    }

    // Now, the request exists, and the moderator is working,
    // so we can allow the joining.

    let condition = { _id: subGreddiitId };
    let update = {
      $set: { [`users.${joinerId}`]: true },
      $pull: { joinRequests: joinerId }, //Deleting The Request.
    };

    SubGreddiit.updateOne(condition, update, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
    });

    subGreddiit = SubGreddiit.findById(subGreddiitId);

    return res
      .status(200)
      .json({
        newUsers: subGreddiit.users,
        requests: subGreddiit.joinRequests,
      });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/* deleteSubGreddiit */
export const deleteSubGreddiit = async (req, res) => {
  //Code For deleting a subGreddiit.
};

/*leaveSubGreddiit*/
export const leaveSubGreddiit = async (req, res) => {
  try {
    const {subGreddiitId} = req.params;
    const userId = req.user.id;

    //*If not a part of SubGreddiit, send back a warning.
    const subGreddiit = SubGreddiit.findById(subGreddiitId);

    console.log( subGreddiit );

    if (!subGreddiit.users.includes(userId)) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    // Any user that is part of the subGreddiit can leave
    // normally, except the moderator.

    // *If the moderator leaves, the first user is made the moderator.
    if (subGreddiit.moderator.includes(userId)) {
      //*If the moderator is the last user, delete the entire subGreddiit.

      if (subGreddiit.users.length === 1) {
        return await deleteSubGreddiit(req, res);
      } else {
        // Removes the moderator as a user.
        subGreddiit.users = subGreddiit.users.filter((id) => {
          id !== userId;
        });
        subGreddiit.moderator.push(subGreddiit.users[0]);
        subGreddiit.moderator = subGreddiit.moderator.filter((id) => {
          id != userId;
        });
      }
    } else {
      // A general user leaves, nobody cares.
      subGreddiit.users = subGreddiit.users.filter((id) => {
        id !== userId;
      });
    }

    await subGreddiit.save();

    res
      .status(200)
      .json({ users: subGreddiit.users, moderator: subGreddiit.moderator });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/*
    getSubGreddiitAnalytics,
*/
