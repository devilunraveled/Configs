
//*DataBase Connection
const UserControls = require("./controllers/User.js");
//const CallControls = require("./controllers/Call.js");
const TrenControls = require("./controllers/TranscriptEntry.js");

//*Twilio
const Twilio = require("./twilio.js");

//// TranslationAPI
// const TranslateAPI = require("./translate.js");

//*CallEvents
const CallEvents = require("./socketControllers/CallEvents.js");

//*TranscriptEvents
const TranscriptEvents = require("./socketControllers/TranscriptEvents.js");

const beginCommunication = (socketIDs, socketStatus, io, client) => {	
	// const io = socketIO(server);
    try {
		io.on("connect", async (socket) => {
			console.log("Socket-Server Connected. SocketID : ", socket.id);
			socketStatus[socket.id] = true;

			let data = {};

			socket.on("disconnect", () => {
				if (socketStatus[socket.id] === true) {
					delete socketStatus[socket.id];
				}
				console.log(`Socket : ${socket.id} Disconnected`);
				return;
			});

			//*Connection Events.
			socket.on(`PhoneNumber`, async (data) => {
				if (socketStatus[socket.id]) {
					let thisUser = await UserControls.getUser(data);

					// console.log(thisUser);

					if (thisUser === undefined) {
						thisUser = await UserControls.createUser(data);
					}

					console.log(thisUser);

					// Declaring this connection as active
					socketIDs[thisUser._id] = socket.id;

					//Sending OTP to the user.
					await Twilio.sendOTP(client, data.phoneNumber, thisUser._id);

					data.id = thisUser._id.toString();

					socket.emit(`${data.phoneNumber} UserID`, { id: data.id });

					//*Verification Of OTP
					socket.on(`${data.id} VerifyOTP`, async (data) => {
						if (socketStatus[socket.id]) {
							const response = await Twilio.verifyOTP(data.id, data.otp);
							socket.emit(`${data.id} VerifiedOTP`, response);
						} else {
							return;
						}
					});

					//*Call Events
					socket.on(`${data.id} CallNumber`, async (data) => {
						await CallEvents.CallNumber(io, socket, socketStatus, socketIDs, data);
					});

					socket.on(`${data.id} CallAccepted`, async (data) => {
						await CallEvents.CallAccepted(io, socket, socketStatus, socketIDs, data);
					});

					socket.on(`${data.id} CallCut`, async (data) => {
						await CallEvents.CallCut(io, socket, socketStatus, socketIDs, data);
					});

					//*Transcript Controls
					socket.on(`${data.id} SendText`, async (data) => {
						await 
						// if (socketStatus[socket.id]) {
						// 	if (data.callID == "") {
						// 		console.log(`Text Sent Without CallID`);
						// 		return;
						// 	}

						// 	const response =
						// 		await TrenControls.createTranscriptEntry(data);

						// 	if (response == null) {
						// 		console.log("Call Ended");
						// 		return;
						// 	}
						// 	// console.log(`Call : ${response.call}`);
						// 	// console.log(`Message : ${response.message}`);

						// 	const calleeSocketID =
						// 		socketIDs[response.call.CalleeID];
						// 	const callerSocketID =
						// 		socketIDs[response.call.CallerID];

						// 	if (data.id === response.call.CallerID) {
						// 		io.to(callerSocketID).emit(
						// 			`${response.call.CallerID} TextSent`,
						// 			response.message
						// 		);
						// 	} else {
						// 		io.to(calleeSocketID).emit(
						// 			`${response.call.CalleeID} TextSent`,
						// 			response.message
						// 		);
						// 	}

						// 	let translatedText = response.message.SentText;
						// 	let finalMessage = response.message;

						// 	//Now, we need to translate the text.
						// 	translatedText = await TranslateAPI.textToText(
						// 		response.message.SentText,
						// 		response.message.SenderLang,
						// 		response.message.ReceiverLang
						// 	);
						// 	finalMessage = await TrenControls.setReceiverText({
						// 		messageID: response.message._id,
						// 		translatedText: translatedText,
						// 	});

						// 	console.log(
						// 		`Final Transcript Entry : ${finalMessage}`
						// 	);

						// 	if (data.id === response.call.CalleeID) {
						// 		io.to(callerSocketID).emit(
						// 			`${response.call.CallerID} IncomingText`,
						// 			finalMessage
						// 		);
						// 	} else {
						// 		io.to(calleeSocketID).emit(
						// 			`${response.call.CalleeID} IncomingText`,
						// 			finalMessage
						// 		);
						// 	}
						// } else {
						// 	return;
						// }
					});

					//*Functionality Control
					socket.on(`${data.id} ChangeLanguage`, async (data) => {
						if (socketStatus[socket.id]) {
							const newCall = await CallControls.changeLanguage(
								data
							);
							console.log(`Changed Language to ${data.language}`);
							// console.log(newCall);
						} else {
							return;
						}
					});

					socket.on(`${data.id} ChangeBotMode`, async (data) => {
						if (socketStatus[socket.id]) {
							const newCall = await CallControls.changeBotMode(
								data
							);
							console.log(`Changed BotMode`);
							// console.log(newCall);
						} else {
							return;
						}
					});
				} else {
					return;
				}
			});
		});
	} catch (err) {
		console.log(`Encountered the following error : ${err.message}`);
	}

    return io;
};

module.exports = { beginCommunication };