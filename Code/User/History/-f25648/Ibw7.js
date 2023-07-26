const CallControls = require("../controllers/Call.js");

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
