const CallControls = require('../controllers/CallControls');

const CallList = async (socket, socketStatus, data) => {
	try {
		if (socketStatus[socket.id]) {
			if (data.callID == "") {
				console.log(`CallDetails Event Sent Without CallID`);
				return;
			}

			const callList = await CallControls.getUserCalls(data);
			//console.log(callList);

            socket.emit(
				`${callDetails.CallerID} CallDetails`,
				callList
			);
		} else {
			return;
		}
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = {CallList};