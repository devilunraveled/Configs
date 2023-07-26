


const CallNumber = async (io, socket, socketStatus, socketIDs, data) => {
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
}