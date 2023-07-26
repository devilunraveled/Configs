const Call = require('../models/Call.js');
const User = require('./User.js');

const createCall = async (data) => {
    try{
        const { caller, callee } = data;
        
        const callerData = User.getUser({contactNumber : caller});
        const calleeData = User.getUser({contactNumber : callee});
        
        const callerId = callerData._id;
        const calleeId = calleeData._id;

        const newCall = new Call({
            CallerId : callerId,
            ReceiverId : calleeId,
            Status : 'calling',
        });

        const savedCall = await newCall.save();

        if ( savedCall ){
            console.log('Registered Call In Database');
            //socket.emit('CallRegistered', savedCall);
            return savedCall;
        } else {
            console.log('Error Saving the Call');
            //socket.emit('Error', { message : 'Could Not connect to the backend.'});
            return;
        }
    } catch(err){
        console.log(`Encountered Error : ${err.message}`);
        //socket.emit('Error', { message : err.message});
        return;
    }
}

const endCall = async (socket, data) => {
    try{
        const { callId, id } = data;
        const call = await Call.findById( callId );

        if ( call.CallerId === id || call.ReceiverId === id ){
            if ( call.Status === 'ended'){
                console.log('Call Already Cancelled.');
                socket.emit('CallEnded', call);
            } else {
                call.Status = 'ended';
                call.Duration = Date.now - call.StartTime;

                const pastCall = await call.save();

                console.log(`Call Ended Successfully`);
                socket.emit('CallEnded', pastCall);
            }
        } else{
            console.log(`Third Party Involvement : Sent ID : ${id} is neither Caller ${call.CallerId} nor Callee ${call.ReceiverId}`);
            socket.emit('PermissionError', { message : `Call Can't be cut by a third party user.`});
        }
    }catch (err){
        console.log(`Encountered Error : ${err.message}`);
        socket.emit('Error', { message : err.message});
    }
}

const acceptCall = async (data) => {
    try{
        const { callId, callee } = data;
        const call = await Call.findById( callId );
        
        const calleeUser = User.getUser({ contactNumber : callee });
        const id = calleeUser._id

        if ( call.CallerId === id || call.ReceiverId === id ){
            if ( call.Status !== 'ongoing'){
                console.log('Call Already Accepted.');
                //socket.emit('CallAccepted', call);
                return call;
            } else {
                call.Status = 'ongoing';
                call.StartTime = Date.now;
                console.log(`Call Starting : ${call.StartTime}`);
                const acceptedCall = await call.save();

                console.log(`Call Accepted Successfully`);
                //socket.emit('CallAccepted', acceptedCall);
                return acceptedCall;
            }
        } else{
            console.log(`Third Party Involvement : Sent ID : ${id} is neither Caller ${call.CallerId} nor Callee ${call.ReceiverId}`);
            //socket.emit('PermissionError', { message : `Call can't be accepted by a third party user.`});
            return;
        }
    } catch (err){
        console.log(`Encountered Error : ${err.message}`);
        //socket.emit('Error', { message : err.message});
        return;
    }
}

module.exports = { createCall, endCall, acceptCall };
