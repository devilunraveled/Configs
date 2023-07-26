const Call = require("../models/Call.js");

const User = require("./User.js");

const createCall = async (data) => {
	try {
		const { callerId, calleeNumber } = data;

		const Callee = await User.getUser({phoneNumber : calleeNumber});
		const currentTime = Date.now();

		if ( Callee ){
			const calleeId = Callee._id;
			console.log("Callee Is Valid");

			const newCall = new Call({
				CallerID: callerId,
				CalleeID: calleeId,
				StartTime : currentTime,
				Status: "calling",
			});

			const savedCall = await newCall.save();

			if (savedCall) {
				console.log("Registered Call In Database");
				// socket.emit('CallRegistered', savedCall);
				return savedCall;
			} else {
				console.log("Error Saving the Call");
				// socket.emit('Error', { message : 'Could Not connect to the backend.'});
				return;
			}
		} else {
            return;
        }
	} catch (err) {
		console.log(`Encountered Error : ${err.message}`);
		//socket.emit('Error', { message : err.message});
		return;
	}
};

const endCall = async (data) => {
	try {
		const { callID, id } = data;

		if ( callID === "" ){
			console.log(`Data : ${data}`);
			return null;
		}

		const call = await Call.findById(callID);

		if (call.CallerID === id || call.CalleeID === id) {
			if (call.Status === "ended" || call.Status === "declined" || call.Status === "missed") {
				console.log("Call Already Cancelled.");
				// socket.emit("CallEnded", call);
				return call;
			} else {

				// Missed Call
				if ( id === call.CallerID && call.Status === "calling"){
					call.Status = "missed";
				} else if ( id === call.CalleeID && call.Status === "calling" ){
					call.Status = "declined";
				} else if ( call.Status === "ongoing" ){
					call.Status = "ended";
				}
				
				call.Duration = Date.now() - call.StartTime;

				const pastCall = await call.save();

				console.log(`Call Ended Successfully`);
				//socket.emit("CallEnded", pastCall);
				return pastCall;
			}
		} else {
			console.log(
				`Third Party Involvement : Sent ID : ${id} is neither Caller ${call.CallerID} nor Callee ${call.CalleeId}`
			);
			//socket.emit("PermissionError", {
			//	message: `Call Can't be cut by a third party user.`,
			//});
			return ;
		}
	} catch (err) {
		console.log(`Encountered Error : ${err.message}`);
		//socket.emit("Error", { message: err.message });
		return ;
	}
};

const acceptCall = async (data) => {
	try {
		const { callID, id } = data;
		const call = await Call.findById(callID);

		if (call.CallerID === id || call.CalleeID === id) {
			if (call.Status === "ongoing") {
				console.log("Call Already Accepted.");
				//socket.emit("CallAccepted", call);
				return call;
			} else {
				call.Status = "ongoing";
				call.StartTime = Date.now();

				const acceptedCall = await call.save();

				console.log(`Call Accepted Successfully`);
				//socket.emit("CallAccepted", acceptedCall);
				return acceptedCall;
			}
		} else {
			console.log(
				`Third Party Involvement : Sent ID : ${id} is neither Caller ${call.CallerID} nor Callee ${call.CalleeID}`
			);
			/*socket.emit("PermissionError", {
				message: `Call can't be accepted by a third party user.`,
			});*/
			return ;
		}
	} catch (err) {
		console.log(`Encountered Error : ${err.message}`);
		//socket.emit("Error", { message: err.message });
		return ;
	}
};

const changeLanguage = async (data) => {
	try{
		const { id, callID, language } = data;
		const call = await Call.findById(callID);

		if ( id === call.CalleeID ){
			call.CalleeLang = language;
			console.log("Changed Callee Language");
			const modCall = await call.save();
			return modCall;

		} else if ( id === call.CallerID ) {
			
			call.CallerLang = language;
			console.log("Changed Caller Language");
			const modCall = await call.save();
			return modCall;
		}
	} catch (err){
		console.log(`Encountered Error : ${err.message}`);
	} 
}

const changeBotMode = async (data) => {
	try{
		const { id, callID, newBotMode } = data;
		const call = await Call.findById(callID);

		if ( id === call.CalleeID ){
			call.CalleeChatBot = newBotMode;
			console.log("Changed Callee BotMode");
			const modCall = await call.save();
			return modCall;

		} else if ( id === call.CallerID ) {
			
			call.CallerChatBot = newBotMode;
			console.log("Changed Caller BotMode");
			const modCall = await call.save();
			return modCall;
		}
	} catch (err){
		console.log(`Encountered Error : ${err.message}`);
	} 
}

const getUserCalls = async (data) => {
	try{
		const { id, numCalls, offset } = data;

		const callList = await Call.find({
			$or: [{ CalleeID : id }, { CallerID : id }]
		})
		.sort({StartTime : -1})
		.skip(offset)
		.limit(numCalls);

		console.log(`Call Records Extracted.`);

		return callList;
	} catch (err) {
		console.log(`Encountered Error : ${err.message}`);
	}
}


module.exports = { createCall, endCall, acceptCall, changeLanguage, changeBotMode, getUserCalls };
