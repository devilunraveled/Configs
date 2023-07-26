const openAI = require("./configs/openAI");

const CallControls = require("./controllers/Call.js");

const sendAsChatBot = async (data) => {
    let chatHistory = [];
    const receiverID = data.id;    
    
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
    console.log("ChatGPT Response: " + botResponse);

    data.text = botResponse;
    
    return data;
}

const getReceiverBotMode = async (data) => {
	try {
		const { callID, id } = data;

		const currentCall = await CallControls.getCall(callID);

		let receiverBotMode = false;

		if (currentCall && currentCall.CalleeID === id) {
            data.id = currentCall.CallerID;
			receiverBotMode = currentCall.CallerChatBot;
            data.language = currentCall.CallerLanguage;
		} else if (currentCall && currentCall.CallerID === id) {
            data.id = currentCall.CalleeID;
            receiverBotMode = currentCall.CalleeChatBot;
            data.language = currentCall.CalleeLanguage;
        }else {
            console.log("Error getting callData.");
            return;
        }

        data.BotMode = receiverBotMode;
        return data;
	} catch (err) {
		console.log(err.message);
        data.BotMode = false;
        return data;
    }
};

const decide = async (data) => {
    try {
        data = await getReceiverBotMode(data);

        if ( data && data.BotMode === true ) {
           data = await sendAsChatBot(data);
        }else{
            return;
        }

        delete data.BotMode;
        return data;

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {decide};