
//*DataBase Connection
const UserControls = require("./controllers/User.js");
const CallControls = require("./controllers/Call.js");
const TrenControls = require("./controllers/TranscriptEntry.js");

//*Twilio
const Twilio = require("./twilio.js");

//*TranslationAPI

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
						if (socketStatus[socket.id]) {
							const newCall = await CallControls.createCall({
								callerId: data.id,
								calleeNumber: data.callee,
							});

							if (newCall == null) {
								console.log(`Invalid User`);
								return;
							}

							console.log(newCall);

							const calleeSocketID = socketIDs[newCall.CalleeID];
							const callerSocketID = socketIDs[newCall.CallerID];
							io.to(callerSocketID).emit(
								`${newCall.CallerID} Calling`,
								{
									callID: newCall._id,
								}
							);
							io.to(calleeSocketID).emit(
								`${newCall.CalleeID} IncomingCall`,
								{
									callID: newCall._id,
									phoneNumber: data.caller,
								}
							);
						} else {
							return;
						}
					});

					socket.on(`${data.id} CallAccepted`, async (data) => {
						if (socketStatus[socket.id]) {
							const acceptedCall = await CallControls.acceptCall(
								data
							);
							console.log(acceptedCall);

							const calleeSocketID =
								socketIDs[acceptedCall.CalleeID];
							const callerSocketID =
								socketIDs[acceptedCall.CallerID];
							io.to(callerSocketID).emit(
								`${acceptedCall.CallerID} CallStart`,
								acceptedCall
							);
							io.to(calleeSocketID).emit(
								`${acceptedCall.CalleeID} CallStart`,
								acceptedCall
							);
						} else {
							return;
						}
					});

					socket.on(`${data.id} CallCut`, async (data) => {
						console.log("JaiGay");
						if (socketStatus[socket.id]) {
							if (data.callID == "") {
								console.log(
									`CallCut Event Sent Without CallID`
								);
								return;
							}
							const rejectedCall = await CallControls.endCall(
								data
							);
							console.log(`RejectedCall : ${rejectedCall}`);

							if (rejectedCall == null) {
								console.log("Failed to End Call");
								return;
							}

							const calleeSocketID =
								socketIDs[rejectedCall.CalleeID];
							const callerSocketID =
								socketIDs[rejectedCall.CallerID];

							if (rejectedCall.Status === "missed") {
								io.to(calleeSocketID).emit(
									`${rejectedCall.CalleeID} MissedCall`,
									rejectedCall
								);
								io.to(callerSocketID).emit(
									`${rejectedCall.CallerID} CallEnd`,
									rejectedCall
								);
							} else {
								console.log(`Sending Response For Ending Call`);
								io.to(callerSocketID).emit(
									`${rejectedCall.CallerID} CallEnd`,
									rejectedCall
								);
								io.to(calleeSocketID).emit(
									`${rejectedCall.CalleeID} CallEnd`,
									rejectedCall
								);
							}
						} else {
							return;
						}
					});

					//*Transcript Controls
					socket.on(`${data.id} SendText`, async (data) => {
						if (socketStatus[socket.id]) {
							if (data.callID == "") {
								console.log(`Text Sent Without CallID`);
								return;
							}

							const response =
								await TrenControls.createTranscriptEntry(data);

							if (response == null) {
								console.log("Call Ended");
								return;
							}
							// console.log(`Call : ${response.call}`);
							// console.log(`Message : ${response.message}`);

							const calleeSocketID =
								socketIDs[response.call.CalleeID];
							const callerSocketID =
								socketIDs[response.call.CallerID];

							if (data.id === response.call.CallerID) {
								io.to(callerSocketID).emit(
									`${response.call.CallerID} TextSent`,
									response.message
								);
							} else {
								io.to(calleeSocketID).emit(
									`${response.call.CalleeID} TextSent`,
									response.message
								);
							}

							let translatedText = response.message.SentText;
							let finalMessage = response.message;

							//Now, we need to translate the text.
							translatedText = await textToText(
								response.message.SentText,
								response.message.SenderLang,
								response.message.ReceiverLang
							);
							finalMessage = await TrenControls.setReceiverText({
								messageID: response.message._id,
								translatedText: translatedText,
							});

							console.log(
								`Final Transcript Entry : ${finalMessage}`
							);

							if (data.id === response.call.CalleeID) {
								io.to(callerSocketID).emit(
									`${response.call.CallerID} IncomingText`,
									finalMessage
								);
							} else {
								io.to(calleeSocketID).emit(
									`${response.call.CalleeID} IncomingText`,
									finalMessage
								);
							}
						} else {
							return;
						}
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