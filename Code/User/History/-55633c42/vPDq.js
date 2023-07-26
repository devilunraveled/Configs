const CallControls = require('../controllers/Call');

const CallHistory = async (socket, socketStatus, data) => {
	try {
		if (socketStatus[socket.id]) {
			if (data.callID == "") {
				console.log(`CallDetails Event Sent Without CallID`);
				return;
			}

			const callList = await CallControls.getUserCalls(data);
			console.log(callList);

            socket.emit(
				`${data.id} CallHistory`,
				callList
			);
		} else {
			return;
		}
	} catch (err) {
		console.log(err.message);
	}
};

const LastCall = async (socket, socketStatus, data) => {
	try {
        if (socketStatus[socket.id]) {

            const callID = await CallControls.getLastCall(data);
            console.log(callID);

            socket.emit(
                `${data.id} LastCall`,
                {callID : callID}
            );
        } else {
            return;
        }
    } catch (err) {
        console.log(err.message);
    }
};


const Transcripts = async (socket, socketStatus, data) => {
    try{
        if (socketStatus[socket.id]) {
            const transcriptList = await CallControls.getCallTranscripts(data);
            
            socket.emit(
                `${callDetails.CallerID} Transcripts`,
                transcriptList
            );
        }
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {CallHistory, Transcripts};