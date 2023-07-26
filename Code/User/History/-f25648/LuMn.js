const CallControls = require("../controllers/Call.js");

const decide = async (data) => {
	try {
		const { callID, receiverID } = data;

		const currentCall = await CallControls.getCall(callID);

		let receiverBotMode = false;

		if (currentCall && currentCall.CalleeID === receiverID) {
			receiverBotMode = currentCall.CalleeChatBot;
		}
	} catch (err) {
		console.log(err.message);
	}
};
