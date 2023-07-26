const openAI = require("./configs/openAI");

const CallControls = require("../controllers/Call.js");

const sendAsChatBot = async (data) => {
    let chatHistory = [];
    const {callID, receiverID} = data;    
    
    const callTranscripts = await CallControls.getCallTranscripts(data);

    for ( let i = 0; i < callTranscripts.length; i++){
       var messageObject = {};
       messageObject.role = callTranscripts[i].SenderID === receiverID ? "user" : "system";
       messageObject.content = 
        callTranscripts[i].SenderID === receiverID ? callTranscripts[i].SentText : callTranscripts[i].TranslatedText;
    
       chatHistory.push(messageObject);
    }

    const botResponse = openAI.getBotResponse(chatHistory);
}




const getReceiverBotMode = async (data) => {
	try {
		const { callID, receiverID } = data;

		const currentCall = await CallControls.getCall(callID);

		let receiverBotMode = false;

		if (currentCall && currentCall.CalleeID === receiverID) {
			receiverBotMode = currentCall.CalleeChatBot;
		} else if (currentCall && currentCall.CallerID === receiverID) {
            receiverBotMode = currentCall.CallerChatBot;
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