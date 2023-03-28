import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
            min : 2,
            max : 25,
        },
        lastName : {
            type : String,
            required : false,
            default : "",
            max : 25,
        },
        userId : {
            type : String,
            required : true,
            max : 25,
            unique : true,
        },
        email : {
            type :  String,
            required : true,
            max : 50,
            unique : true,
        },
        age : {
            type : Number,
            required : true,
            min : 12,
            max : 99,
        },
        contactNumber : {
            type : String,
            required : true,
            min : 7,
            max : 15,
        },
        password : {
            type : String,
            required : true,
            min : 5,
        },
        picturePath : {
            type : String,
            default : "",
        },
        followersList : {
            type : Array,
            default : [],
        },
        followingList : {
            type : Array,
            default : [],
        },
    },
    {timestamps : true }
);

const user = mongoose.model("User", userSchema);
export default user;