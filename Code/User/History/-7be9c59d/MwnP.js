const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema(
    {
        CallerId : {
            type : String,
            required : true,
        },
        ReceiverId : {
            type : String,
            required : true,
        },
        StartTime : {
            type : Date, // ISO formatted date or epoch time.
            default : Date.now
        },
        Status : {
            type : String,
            enum : ['ongoing', 'missed', 'ended', 'calling'],
        },
        Duration : Number,
        TranscriptEntries : { // .id of the TranscriptEntries.
            type : Array,
            default : [],
        }
    }
)
