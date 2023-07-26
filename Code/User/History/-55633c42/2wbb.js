const CallControls = require('../controllers/CallControls');

const CallHistory = async (socket, socketStatus, data) => {
	try {
		if (socketStatus[socket.id]) {
			if (data.callID == "") {
				console.log(`CallDetails Event Sent Without CallID`);
				return;
			}

			const callList = await CallControls.getUserCalls(data);
			//console.log(callList);

            socket.emit(
				`${callDetails.CallerID} CallHistory`,
				callList
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