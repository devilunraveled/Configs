const TrenControls = require("../controllers/TranscriptEntry.js");

//*TranslationAPI
const TranslateAPI = require("../translate.js");

const SendText = async (io, socket, socketStatus, socketIDs, data) => {
    if (socketStatus[socket.id]) {
        if (data.callID == "") {
            console.log(`Text Sent Without CallID`);
            return;
        }

        const response =
            await TrenControls.createTranscriptEntry(data);

        if (response == null) {
            console.log("Call Ended");
            return;
        }
        
        const calleeSocketID =
            socketIDs[response.call.CalleeID];
        const callerSocketID =
            socketIDs[response.call.CallerID];

        if (data.id === response.call.CallerID) {
            io.to(callerSocketID).emit(
                `${response.call.CallerID} TextSent`,
                response.message
            );
        } else {
            io.to(calleeSocketID).emit(
                `${response.call.CalleeID} TextSent`,
                response.message
            );
        }

        let senderText = response.message.SentText;
        let finalMessage = response.message;

        //Now, we need to translate the text.
        translatedText = await TranslateAPI.textToText(
            response.message.SentText,
            response.message.SenderLang,
            response.message.ReceiverLang
        );
        
        finalMessage = await TrenControls.setReceiverText({
            messageID: response.message._id,
            translatedText: translatedText,
        });

        // console.log(
        //     `Final Transcript Entry : ${finalMessage}`
        // );

        if (data.id === response.call.CalleeID) {
            io.to(callerSocketID).emit(
                `${response.call.CallerID} IncomingText`,
                finalMessage
            );
        } else {
            io.to(calleeSocketID).emit(
                `${response.call.CalleeID} IncomingText`,
                finalMessage
            );
        }
    } else {
        return;
    }
}


module.exports = {SendText};