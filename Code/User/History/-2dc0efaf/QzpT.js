const mongoose = require('mongoose');

const TranscriptEntrySchema = new mongoose.schema(
    {
        CallID : {
            type  : String,
            required : true
        },
        TimeStamp : {
            type : Date,
            default : Date.now
        },
        Sender : {
            type : String,
            required : true,
        },
        Sensitivity : {
            type : Boolean,
            default : false,
        },
        SentByChatBot : {
            type : Boolean,
            default : false,
        },
        ReceivedByChatBot : {
            type : Boolean,
            default : false,
        },
        SenderLang : {
            type : String,
            enum : ["English", "Hindi", "Telugu"],// need to import from somewhere.
            required : true,
            default : "english"
        },
        ReceiverLang : {
            type : String,
            enum : ["English", "Hindi", "Telugu"], // need to import from somewhere.
            required : true,
            default : "english"
        },
        SentText : {
            type : String,
            default : "__NO_TEXT_SENT__",
            required : true,
        },
        ReceivedText : {
            type : String,
            default : "__NO_TEXT_RECIEVED__",
        }
    }
)

const Transcript = mongoose.model('Transcript', TranscriptEntrySchema);

module.exports = Transcript;
