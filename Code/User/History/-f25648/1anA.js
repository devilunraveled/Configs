const openAI = require("./configs/openAI");

const CallControls = require("../controllers/Call.js");

const sendAsChatBot = async (data) => {
    let chatHistory = [];
    const {receiverID} = data;    
    
    const callTranscripts = await CallControls.getCallTranscripts(data);

    for ( let i = 0; i < callTranscripts.length; i++){
       var messageObject = {};
       messageObject.role = callTranscripts[i].SenderID === receiverID ? "user" : "system";
       messageObject.content = 
        callTranscripts[i].SenderID === receiverID ? callTranscripts[i].SentText : callTranscripts[i].TranslatedText;
    
       chatHistory.push(messageObject);
    }

    console.log(chatHistory);

    const botResponse = openAI.getBotResponse(chatHistory);
    data.text = botResponse;
    sent( data.io, data.socket, data.socketStatus, data.socketIDs, data);
}




const getReceiverBotMode = async (data) => {
	try {
		const { callID, receiverID } = data;

		const currentCall = await CallControls.getCall(callID);

		let receiverBotMode = false;

		if (currentCall && currentCall.CalleeID === receiverID) {
			receiverBotMode = currentCall.CalleeChatBot;
            data.language = currentCall.CalleeLanguage;
		} else if (currentCall && currentCall.CallerID === receiverID) {
            receiverBotMode = currentCall.CallerChatBot;
            data.language = currentCall.CallerLanguage;
        }else {
            console.log("Error getting callData.")
        }

        return receiverBotMode;
	} catch (err) {
		console.log(err.message);
	}
};

const decide = async (data) => {
    try {
        const { callID, receiverID } = data;

        const receiverBotMode = await getReceiverBotMode(data);

        if ( receiverBotMode === true ) {
            await sendAsChatBot(data);
        }

        return;

    } catch (err) {
        console.log(err.message);
    }
}