const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema(
    {
        CallerID : {
            type : String,
            required : true,
        },
        CalleeID : {
            type : String,
            required : true,
        },
        StartTime : {
            type : Date, // ISO formatted date or epoch time.
            default : Date.now
        },
        CallerChatBot : {
            type : Boolean,
            default : false,
        },
        CalleeChatBot : {
            type : Boolean,
            default : false,
        },
        CallerLang : {
            type : String,
            enum : ["English", "Hindi", "Telugu"],// need to import from somewhere.
            required : true,
            default : "english"
        },
        CalleeLang : {
            type : String,
            enum : ["English", "Hindi", "Telugu"], // need to import from somewhere.
            required : true,
            default : "english"
        },
        Status : {
            type : String,
            enum : ['ongoing', 'missed', 'ended', 'calling', 'declined'],
        },
        Duration : Number,
        TranscriptEntries : { // .id of the TranscriptEntries.
            type : Array,
            default : [],
        }
    }
)

const Call = mongoose.model('Call', CallSchema);

module.exports = Call;