const User = require('../models/User.js')

const getUser = (data) => {
    try{
        const {contactNumber} = data;

        User.find ({
            contactNumber : contactNumber
        })
        .then( (user) => {
            if ( user.length() === 0 ){
                // socket.emit('noUserFound', { message : 'Not a registered user.'});
                return {message : "Not a registered User", response : -1};
            } else {
                // socket.emit('userFound', user);
                return user;
            }
        }).catch( (err) => {
                console.log(`Encountered Error While Retrieving: ${err.message}`);
                // socket.emit('Error', {message : err.message});
                return err; 
        })
        ;

    } catch (err){
        console.log(`!! Encountered Error : ${err.message}`)
        return err
    }
}

const createUser = async (socket, data) => {
    try{
        const { contactNumber } = data;

        const newUser = new User ({
            contactNumber : contactNumber
        });

        const savedUser = await newUser.save();

        if ( savedUser ){
            //socket.emit('UserCreated', newUser);
            return newUser;
        } else {
            console.log(`!! Encountered Error While Saving`);
            return;
            //socket.emit('UserCreationFailed' : { message : 'Could Not Register User.'});
        }
    }
    catch ( err ){
        console.log(`!! Encountered Error : ${err.message}`);
        return ;
    }
}

const setUserPassword = async (socket, data, password) => {
    try{
        const { id } = data;

        const user = await User.findById( id );

        user.password = password;
        // No encryption because that is for the nubs.

        const savedUser = await user.save();

        if ( savedUser ){
            socket.emit('OTPSet', newUser);
        } else {
            console.log(`!! Encountered Error While Setting OTP`);
            // socket.emit('OTPCreationFailed' : { message : 'Could Not Set Password'});
        }
    }
    catch ( err ){
        console.log(`!! Encountered Error : ${err.message}`)
    }
}

const verifyPassword = async ( socket, data ) => {
    try{
        const { id, otp } = data;

        const user = await User.findById( id );

        if ( otp == user.password ){
            // Only comparison needed, frontend can send number or string.
            user.password = 6969;

            newUser = await user.save();

            // socket.emit('OTPVerified' : newUser);
        } else {
            console.log(`OTP Mismatch : OTP -> ${user.password}, Pass -> ${otp}`);
            // socket.emit('OTPMismatch', { message : 'OTP does not match' });
        }
    }
    catch ( err ){
        console.log(`!! Encountered Error : ${err.message}`)
    }
}

module.exports = { getUser, setUserPassword, createUser, verifyPassword }