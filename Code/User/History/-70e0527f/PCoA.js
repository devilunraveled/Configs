//*Environment Variables
let accountSid = process.env.ACCOUNT_SID;
let authToken = process.env.AUTH_TOKEN;

//*Twilio Setup
let client = require("twilio")(accountSid, authToken);

//*DataBase Connection
const UserControls = require("./controllers/User.js");

const setup = () => {
    accountSid = process.env.ACCOUNT_SID;
    authToken = process.env.AUTH_TOKEN;
    client = require("twilio")(accountSid, authToken);
}

const sendOTP = async (phoneNumber, userID) => {
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

		client.messages
			.create({
				body: `Your LangLink OTP is ${random}`,
				from: twilioServiceNumber,
				to: receiverNumber,
			})
			.then((message) => {
				console.log(message.sid);
			});
	} catch (err) {
		console.log(`Twilio Error : ${err.message}`);
		return;
	}
}

const verifyOTP = async (userID, otp) => {
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

module.exports = { verifyOTP, sendOTP };