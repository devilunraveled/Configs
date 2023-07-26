const TranscriptEntry = require('../models/TranscriptEntry.js')

const createTranscriptEntry = async (socket, data) => {
    try {
        const { callId, text, senderID, senderLang, botMode } = data;
        // Need to implement the sensitivity thing as well.

        const onGoingCall = Call.findById(callId);

        if ( onGoingCall.Status === 'ongoing' ){
            if ( onGoingCall.CallerId === senderID || onGoingCall.ReceiverId === senderID ){

                const message = new TranscriptEntry({
                    CallId : callId,
                    SentText : text,
                    Sender : senderID,
                    SenderLang : senderLang,
                    SentByChatBot : botMode,
                })

                const savedMessage = await message.save();

                if ( savedMessage ){
                    onGoingCall.TranscriptEntries.push( savedMessage._id );
                    await onGoingCall.save();

                    console.log('Successfully Created Message.');
                    socket.emit('TranscriptCreated', onGoingCall);
                }else{
                    console.log('Could not create/save the message.');
                }

            }
        }
    } catch (err){
        console.log(`Error While Creating Message : ${err.message}`);
        socket.emit('MessageCreationError', { message : err.message });
    }
}

const getTranscriptEntry = (socket, data) => {
    try{
        const { transcriptId } = data;

        TranscriptEntry.find({
            _id : transcriptId,
        })
        .then((message) => {
                console.log('Message Obtained.');
                socket.emit('MessageReceived', message);
        })
        .catch((err) => {
                console.log(`Error Encountered : ${err}`);
                socket.emit('Error', {message : err.message});
        });
    } catch (err){
    }
}

const setReceiverText = async (socket, data, botMode) => {
    try{
        const { messageId, receiverLang: receiverLang, translatedText, botMode } = data;

        const transcriptEntry = TranscriptEntry.findById( messageId );

        if ( transcriptEntry ){
            if ( transcriptEntry.ReceivedText === '__NO_TEXT_RECEIVED__'){
                transcriptEntry.ReceiverLang = receiverLang;
                transcriptEntry.ReceivedText = translatedText;
                transcriptEntry.ReceivedByChatBot = botMode;

                const newTranscriptEntry = await transcriptEntry.save();
            } else {
                console.log('Already modified transcript.');
                socket.emit('ReWriteTranscript', { message : 'Already translated transcript'});
            }
        } else {
            console.log(`No Transcript Found pertaining to current ID`);
            socket.emit('InvalidID', { message : "Incorrect ID"});
        }

    }catch(err){
        console.log(`Error While Editing Message : ${err.message}`);
        socket.emit('MessageCreationError', { message : err.message });
    }
}

module.exports = { createTranscriptEntry, setReceiverText: setReceiverText, getTranscriptEntry  };
