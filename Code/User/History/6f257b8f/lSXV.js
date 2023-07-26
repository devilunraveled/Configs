// const got = require('got');
require("dotenv").config();
const express = require("express");
const https = require("https");
const axios = require("axios").default;
const fs = require("fs");
const {
	AuthCallsIpAccessControlListMappingListInstance,
} = require("twilio/lib/rest/api/v2010/account/sip/domain/authTypes/authTypeCalls/authCallsIpAccessControlListMapping");
const {
	PhoneNumberPage,
} = require("twilio/lib/rest/messaging/v1/service/phoneNumber");
const {
	ConversationPage,
} = require("twilio/lib/rest/conversations/v1/conversation");
const dbCon = require("./configs/dbCon.js");

/*DataBase Connection*/
const UserControls = require("./controllers/User.js");
const CallControls = require("./controllers/Call.js");
const TrenControls = require("./controllers/TranscriptEntry.js");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);
// const { Server } = require('ws');

const PORT = process.env.PORT || 4000; //port for https

const server = express() // make the server
	.use((req, res) => res.send("Hi there"))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));
//	.catch( (err) => {console.log(err.message)});

server.on("error", (err) => {
	console.log(`${err.message}`);
});
// const wss = new Server({ server });
// wss.on('connection', function(ws, req) {
//     console.log("Here")
//     ws.on('message', message => {
//         var dataString = message.toString();
//         console.log(dataString)
//     })
// })

//* Delete these lines of code when the message is created on
//* phone number given by the frontend.

const { MessagingResponse } = require("twilio").twiml;

const app = express();

let socketIDs = {};
let socketStatus = {};
// Keeps track of the different sockets that are connected.

async function sendOTP(phoneNumber, userID) {
	try {
		const random = Math.floor(Math.random() * 9000 + 1000);
		var receiverNumber = phoneNumber;
		const twilioServiceNumber = "+15076292632";
		console.log(random);
		// console.log("UserID : ", userID);
		const response = await UserControls.setUserPassword(
			{ id: userID },
			random
		);

		if (response == 1) {
			return -1;
		}

		// client.messages
		// 	.create({
		// 		body: `Your LangLink OTP is ${random}`,
		// 		from: twilioServiceNumber,
		// 		to: receiverNumber,
		// 	})
		// 	.then((message) => {
		// 		console.log(message.sid);
		// 	});
	} catch (err) {
		console.log(`Twilio Error : ${err.message}`);
		return;
	}

	// const twiml = new MessagingResponse();

	// twiml.message("Sending LangLink OTP");
}

async function verifyOTP(userID, otp) {
	try {
		let message = {};

		const responseObj = await UserControls.verifyPassword({
			id: userID,
			otp: otp,
		});

		if (responseObj === 0) {
			message = {
				verified: "yes",
			};
		} else {
			message = {
				verified: "no",
			};
		}

		return message;
	} catch (err) {
		console.log(`OTP Verification Error : ${err.message}`);
		return {};
	}
}

async function textToText(message, sent_language, send_language) {
	try {
		let translatedText = "";
		const url =
			"https://11fc0468-644c-4cc6-be7d-46b5bffcd914-prod.e1-us-east-azure.choreoapis.dev/aqqz/iiitilmt/1.0.0/onemt";
		const languages = {
			English: "eng",
			Hindi: "hin",
			Telugu: "tel",
		};

		console.log(
			`Translating From ${sent_language}(${languages[sent_language]}) to ${send_language} (${languages[send_language]})`
		);

		const options = {
			method: "POST",
			headers: {
				accept: "/",
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.TRANSLATION_TOKEN}`,
			},
			body: JSON.stringify({
				text: message,
				source_language: languages[sent_language],
				target_language: languages[send_language],
			}),
		};

		await fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				console.log("TranslatedText", data.data);
				translatedText = data.data;
			})
			.catch((error) => console.error(error));

		return translatedText;
	} catch (err) {
		console.log(`Translation Pipeline Error : ${er.message}`);
	}
}

// function getMessage(messageTillNow, message) {
// 	if (messageTillNow.length === message.length) {
// 		return "";
// 	} else {
// 		let cutOffLength = messageTillNow.length;
// 		for (let i = messageTillNow.length; i < message.length; i++) {
// 			if (message[i] == " ") cutOffLength++;
// 			else break;
// 		}
// 		return message.substring(cutOffLength);
// 	}
// }

try {
	const io = require("socket.io")(server);
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
				await sendOTP(data.phoneNumber, thisUser._id);

				data.id = thisUser._id.toString();

				socket.emit(`${data.phoneNumber} UserID`, { id: data.id });

				//*Verification Of OTP
				socket.on(`${data.id} VerifyOTP`, async (data) => {
					if (socketStatus[socket.id]) {
						const response = await verifyOTP(data.id, data.otp);
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

						console.log(newCall);

						socket.emit(`${newCall.CallerID} Calling`, {
							callID: newCall._id,
						});
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
							{ callID: newCall._id, phoneNumber: data.caller }
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

						const calleeSocketID = socketIDs[acceptedCall.CalleeID];
						const callerSocketID = socketIDs[acceptedCall.CallerID];
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
							console.log(`CallCut Event Sent Without CallID`);
							return;
						}
						const rejectedCall = await CallControls.endCall(data);
						console.log(`RejectedCall : ${rejectedCall}`);
						
						if ( rejectedCall == null ){
							console.log("Failed to End Call");
							return ;
						}

						const calleeSocketID = socketIDs[rejectedCall.CalleeID];
						const callerSocketID = socketIDs[rejectedCall.CallerID];

						if (rejectedCall.Status === "missed") {
							io.to(calleeSocketID).emit(
								`${rejectedCall.CalleeID} MissedCall`,
								rejectedCall
							);
							io.to(callerSocketID).emit(
								`${rejectedCall.CallerID} CallEnd`,
								rejectedCall
							)
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

						if ( response == null ){
							console.log('Call Ended');
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
						}else{
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

						console.log(`Final Transcript Entry : ${finalMessage}`);

						if (data.id === response.call.CalleeID) {
							io.to(callerSocketID).emit(
								`${response.call.CallerID} IncomingText`,
								finalMessage
							);
						}else{
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
						const newCall = await CallControls.changeLanguage(data);
						console.log(`Changed Language to ${data.language}`);
						// console.log(newCall);
					} else {
						return;
					}
				});

				socket.on(`${data.id} ChangeBotMode`, async (data) => {
					if (socketStatus[socket.id]) {
						const newCall = await CallControls.changeBotMode(data);
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

// const io = require('socket.io')(server); // make the socket connection
// io.on('connect', (socket) => {
//     let messagetillnow = ""
//     let senttillnow = ""
//     console.log("Connected", socket.id)

//     socket.on('disconnect', () => {
//         // phonenumbers.map((phonenumber) => {
//         //     socket.removeListener(`${phonenumber} message`)
//         // })
//         console.log('disconnected', socket.id)
//     })

//     console.log(`Connect : ${socket.id}`)

//     socket.on('phonenumber', (message) => {
//         socketIDs[message.phonenumber] = socket.id

//         console.log(`PhoneNumber : ${socket.id}`);

//         const thisUser = UserControls.getUser( message );
//         console.log( thisUser );

//         // socket.removeAllListeners(`${message.phonenumber} message`);
//         socket.on(`${message.phonenumber} message`, (message) => {
//             //if (socketids[message.sentby] == socket.id) {
//             console.log(`Message : ${socket.id}`);
//             console.log("sendingmessage1")
//                 console.log(message.callid)
//                 console.log(message.message)
//                 // socket.broadcast.emit(`${message.sentto} message`, message)
//                 io.emit(`${message.sentto} getsenddetails`, message)
//             //}
//         })
//         socket.on(`${message.phonenumber} senddetails`, async (message) => {
//             if(message.sent_language !== message.send_language)
//                 message.message = await text_to_text(message.message, message.sent_language, message.send_language)
//             console.log(message.send_language);
//             console.log(message.sent_language);
//             console.log(message.sentto);
//             console.log(message.message);
//             io.emit(`${message.sentto} message`, message)
//         })
//     })
//     socket.on('message', (message) => { // send the message to the frontend
//         let messagetosend = getmessage(senttillnow, message.message)
//         messagetillnow = message.message;
//         console.log('recieved', message.message)

//         console.log(messagetosend)
//         let sendingmessage = JSON.stringify({ ...message, "message": message.message, "sentby": "server" })
//         let x = socket.broadcast.emit('message-receive', sendingmessage)
//         console.log('result', x)
//         senttillnow = messagetillnow
//     })
//     socket.on('sendOTP', (message) => {
//         sendOTP(message.number)
//     })
//     socket.on('verifyOTP', (message) => {
//         verifyOTP(message.phonenumber, message.otp, socket.id, socket, io)
//     })
//     socket.on('call-number', (message) => {
//         console.log('calling')
//         console.log(message)
//         io.emit(`${message.callee}`, message)

//     })
//     socket.on('call-accept', (message) => {
//         console.log('accepting')
//         console.log(message)
//         numberofcalls += 1
//         message.callid = `${numberofcalls}`
//         callid = numberofcalls
//         io.emit(`${message.caller} call-accepted`, message)
//         io.emit(`${message.callee} call-accepted`, message)
//         languagecaller = ""
//         languagecallee = ""
//         console.log(`${message.caller} message`)

//     })
//     socket.on('call-decline', (message) => {
//         console.log('rejecting')
//         console.log(message)
//         io.emit(`${message.caller} call-declined`, message)
//     })
//     socket.on('call-terminated', (message) => {
//         console.log('terminating')
//         console.log(message)
//         io.emit(`${message.caller} call-terminated`, message)
//         io.emit(`${message.callee} call-terminated`, message)

//     })

// })

// console.clear()

// function chatGPT() {
//     // const url = 'https://api.openai.com/v1/engines/davinci/completions';

//     // const prompt = 'Hi How are you';
//     // const params = {
//     //     'prompt': prompt,
//     //     'max_tokens': 256,
//     //     'temperature': 0.7,
//     //     'frequency_penalty': 0.4,
//     //     'presence_penalty': 0.6,

//     // };

//     // const headers=  {
//     //     'Authorization': `Bearer ${process.env.API}`,
//     // }

//     // try {
//     //     const response = await axios.post(url,params, {headers: headers });
//     //     output = `${prompt}${response.choices[0].text}`;
//     //     console.log(output.substring(0, output.lastIndexOf('\n')));
//     // } catch (err) {
//     //     console.log(err);
//     // }

//     const API_URL = 'https://api.openai.com/v1/engines/davinci/completions';

//     const data = {
//         prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. Human: Hello, who are you?
//         AI: I am an AI created by OpenAI. How can I help you today?
//         Human: What is the capital of Telangana?`,
//         max_tokens: 50,
//         temperature: 0.5,
//         stop: 'Human:'
//     };

//     axios.post(API_URL, data, {
//         headers: {
//             'Authorization': `Bearer ${process.env.GPT_API}`,
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
//         console.log(response.data.choices[0].text);
//     }).catch((error) => {
//         console.log(error);
//     });

// }

// Establishing connection with the backend.

console.log("Trying to connect to mongoDB");

dbCon.connect();
