//*Environment Variables
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

//*Twilio Setup
const client = require("twilio")(accountSid, authToken);

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