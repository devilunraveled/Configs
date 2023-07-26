const TranscriptEntry = require('../models/TranscriptEntry.js');

const Call = require('./Call.js');

const createTranscriptEntry = async (socket, data) => {
    try {
        const { callId, text, id } = data;
        // Need to implement the sensitivity thing as well.
        const senderID = id;
        const onGoingCall = await Call.findById(callId);

        if ( senderID === onGoingCall.CallerId ){
            botMode = onGoingCall.CallerChatBot;
            senderLang = onGoingCall.CalleeLang;
            receiverLang = onGoingCall.CallerLang;

        } else if ( senderID === onGoingCall.CalleeId ){
            botMode = onGoingCall.CalleeChatBot;
            senderLang = onGoingCall.CallerLang;
            receiverLang = onGoingCall.CalleeLang;
        } else {
            console.log("Third Party User");
            return;
        }

        if ( onGoingCall.Status === 'ongoing' ){
            if ( onGoingCall.CallerId === senderID || onGoingCall.ReceiverId === senderID ){

                const message = new TranscriptEntry({
                    CallId : callId,
                    SentText : text,
                    SenderID : senderID,
                    SenderLang : senderLang,
                    ReceiverLang : receiverLang,
                    SentByChatBot : botMode,
                })

                const savedMessage = await message.save();

                if ( savedMessage ){
                    onGoingCall.TranscriptEntries.push( savedMessage._id );
                    await onGoingCall.save();

                    console.log('Successfully Created Message.');
                    //socket.emit('TranscriptCreated', onGoingCall);
                    return savedMessage;
                }else{
                    console.log('Could not create/save the message.');
                    return ;
                }

            }
        }
    } catch (err){
        console.log(`Error While Creating Message : ${err.message}`);
        //socket.emit('MessageCreationError', { message : err.message });
        return ;
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
        .catch( (err) =>{
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
