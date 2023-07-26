const CallControls = require("../controllers/Call.js");

const ChangeLanguage = async (io, socket, socketStatus, socketIDs, data) => {
	if (socketStatus[socket.id]) {
		const newCall = await CallControls.changeLanguage(data);
		console.log(`Changed Language to ${data.language}`);
		// console.log(newCall);
	} else {
		return;
	}
};

const BotMode = async (io, socket, socketStatus, socketIDs, data) => {
    if (socketStatus[socket.id]) {
        const newCall = await CallControls.changeBotMode(
            data
        );
        console.log(`Changed BotMode`);
        // console.log(newCall);
    } else {
        return;
    }
}

module.exports = {
    ChangeLanguage,
    BotMode
};