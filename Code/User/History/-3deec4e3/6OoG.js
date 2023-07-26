const TranscriptEntry = require('../models/TranscriptEntry.js');


const Call = require('../models/Call.js');

const createTranscriptEntry = async (data) => {
    try {
        const { callID, text, id, language } = data;
        // Need to implement the sensitivity thing as well.
        const senderID = id;
        const onGoingCall = await Call.findById(callID);

        if ( senderID === onGoingCall.CallerID ){
            botMode = onGoingCall.CallerChatBot;
            //senderLang = onGoingCall.CallerLang;
            receiverLang = onGoingCall.CalleeLang;

        } else if ( senderID === onGoingCall.CalleeID ){
            botMode = onGoingCall.CalleeChatBot;
            //senderLang = onGoingCall.CalleeLang;
            receiverLang = onGoingCall.CallerLang;
        } else {
            console.log("Third Party User");
            return;
        }

        if ( onGoingCall.Status === 'ongoing' ){
            if ( onGoingCall.CallerID === senderID || onGoingCall.CalleeID === senderID ){

                const message = new TranscriptEntry({
                    CallID : callID,
                    SentText : text,
                    SenderID : senderID,
                    SenderLang : language,
                    ReceiverLang : receiverLang,
                    SentByChatBot : botMode,
                })

                const savedMessage = await message.save();

                if ( savedMessage ){
                    onGoingCall.TranscriptEntries.push( savedMessage._id );
                    await onGoingCall.save();

                    console.log('Successfully Created Message.');
                    //socket.emit('TranscriptCreated', onGoingCall);
                    return { call : onGoingCall, message : savedMessage };
                }else{
                    console.log('Could not create/save the message.');
                    return ;
                }
            }
        } else {
        return null;
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

const setReceiverText = async (data) => {
    try{
        const { messageID,translatedText } = data;

        const transcriptEntry = await TranscriptEntry.findById( messageID );
        
        if ( !translatedText ){
            return transcriptEntry;
        }

        if ( transcriptEntry ){
            if ( transcriptEntry.TranslatedText === '__NO_TEXT_RECEIVED__'){
                transcriptEntry.TranslatedText = translatedText;

                const newTranscriptEntry = await transcriptEntry.save();
                console.log(`Message Translated`);
                return newTranscriptEntry;
            } else {
                console.log('Already modified transcript.');
                //socket.emit('ReWriteTranscript', { message : 'Already translated transcript'});
                return ;
            }
        } else {
            console.log(`No Transcript Found pertaining to current ID`);
            //socket.emit('InvalidID', { message : "Incorrect ID"});
            return ;
        }

    }catch(err){
        console.log(`Error While Editing Message : ${err.message}`);
        //socket.emit('MessageCreationError', { message : err.message });
        return ;
    }
}

module.exports = { createTranscriptEntry, setReceiverText: setReceiverText, getTranscriptEntry  };
