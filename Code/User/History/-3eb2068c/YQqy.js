// const got = require('got');
require('dotenv').config()
const express = require('express');
const https = require('https')
const axios = require('axios').default
const fs = require('fs');
const { AuthCallsIpAccessControlListMappingListInstance } = require('twilio/lib/rest/api/v2010/account/sip/domain/authTypes/authTypeCalls/authCallsIpAccessControlListMapping');
const { PhoneNumberPage } = require('twilio/lib/rest/messaging/v1/service/phoneNumber');
const { ConversationPage } = require('twilio/lib/rest/conversations/v1/conversation');
const dbCon = require('./configs/dbCon.js');

/*DataBase Connection*/
const UserControls = require('./controllers/User.js');
const CallControls = require('./controllers/Call.js');
const TrenControls = require('./controllers/TranscriptEntry.js');


const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
// const { Server } = require('ws');

const PORT = process.env.PORT || 4000; //port for https

const server = express() // make the server 
    .use((req, res) => res.send("Hi there"))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

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



const { MessagingResponse } = require('twilio').twiml;

const app = express()

let otps = {}

let socketids = {}
let numberofcalls = 0
function sendOTP(phonenumber) {
    const random = Math.floor(Math.random() * 9000 + 1000)
    var receiverNumber = phonenumber;
    const twilioServiceNumber = '+15076292632';

    client.messages
        .create({
            body: `Your LangLink OTP is ${random}`,
            from: twilioServiceNumber,
            to: receiverNumber
        })
        .then(message => {
            console.log(message.sid)
            otps[phonenumber] = random;
            console.log(otps)
        });


    const twiml = new MessagingResponse();

    twiml.message('Your LangLink OTP is 6663629');
}

function verifyOTP(phonenumber, otp, socketid, socket, io) {
    console.log(phonenumber, otp, socketid)
    let message = {}
    if (otps[phonenumber] == otp) {
        message = {
            "verified": "yes"
        }
        delete otps[phonenumber]



        console.log(otps)
    }
    else {
        message = {
            "verified": "no"
        }
    }
    let x = io.to(socketid).emit('verifiedotp', message)
    console.log(x, message);

}

async function text_to_text(message, sent_language, send_language)  {
    translated_text = ""
    const url = 'https://11fc0468-644c-4cc6-be7d-46b5bffcd914-prod.e1-us-east-azure.choreoapis.dev/aqqz/iiitilmt/1.0.0/onemt';
    const languages = {
        'English': 'eng',
        'Hindi': 'hin',
        'Telugu': 'tel'
    }

    const options = {
        method: 'POST',
        headers: {
            'accept': '/',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.TEXT_TRANSLATION_TOKEN}`
        },
        body: JSON.stringify({
            text: message,
            source_language: languages[sent_language],
            target_language: languages[send_language]
        })
    };

    await fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('translated_text',data.data)
            translated_text = data.data
        })
        .catch(error => console.error(error));

    return translated_text
}


function getmessage(messagetillnow, message) {
    if (messagetillnow.length === message.length) {
        return ""
    }
    else {
        let cutofflength = messagetillnow.length
        for (let i = messagetillnow.length; i < message.length; i++) {
            if (message[i] == ' ')
                cutofflength++;
            else
                break;
        }
        return message.substring(cutofflength)
    }
}





const io = require('socket.io')(server); // make the socket connection 
io.on('connect', (socket) => {
    let messagetillnow = ""
    let senttillnow = ""
    console.log("Connected", socket.id)

    socket.on('disconnect', () => {
        // phonenumbers.map((phonenumber) => {
        //     socket.removeListener(`${phonenumber} message`)
        // })
        console.log('disconnected', socket.id)
    })

    socket.on('phonenumber', (message) => {
        socketids[message.phonenumber] = socket.id
        console.log(socketids)

        message.contactNumber = message.phonenumber;

        const thisUser = UserControls.getUser( message );
        console.log( thisUser );

        // socket.removeAllListeners(`${message.phonenumber} message`);
        socket.on(`${message.phonenumber} message`, (message) => {
            if (socketids[message.sentby] == socket.id) {
                console.log("sendingmessage1")
                console.log(message.callid)
                console.log(message.message)
                // socket.broadcast.emit(`${message.sentto} message`, message)
                io.emit(`${message.sentto} getsenddetails`, message)
            }
        })
        socket.on(`${message.phonenumber} senddetails`, async (message) => {
            if(message.sent_language !== message.send_language)
                message.message = await text_to_text(message.message, message.sent_language, message.send_language)
            console.log(message.send_language);
            console.log(message.sent_language);
            console.log(message.sentto);
            console.log(message.message);
            io.emit(`${message.sentto} message`, message)
        })
    })
    socket.on('message', (message) => { // send the message to the frontend 
        let messagetosend = getmessage(senttillnow, message.message)
        messagetillnow = message.message;
        console.log('recieved', message.message)

        console.log(messagetosend)
        let sendingmessage = JSON.stringify({ ...message, "message": message.message, "sentby": "server" })
        let x = socket.broadcast.emit('message-receive', sendingmessage)
        console.log('result', x)
        senttillnow = messagetillnow
    })
    socket.on('sendOTP', (message) => {
        sendOTP(message.number)
    })
    socket.on('verifyOTP', (message) => {
        verifyOTP(message.phonenumber, message.otp, socket.id, socket, io)
    })
    socket.on('call-number', (message) => {
        console.log('calling')
        console.log(message)
        io.emit(`${message.callee}`, message)

    })
    socket.on('call-accept', (message) => {
        console.log('accepting')
        console.log(message)
        numberofcalls += 1
        message.callid = `${numberofcalls}`
        callid = numberofcalls
        io.emit(`${message.caller} call-accepted`, message)
        io.emit(`${message.callee} call-accepted`, message)
        languagecaller = ""
        languagecallee = ""
        console.log(`${message.caller} message`)

    })
    socket.on('call-decline', (message) => {
        console.log('rejecting')
        console.log(message)
        io.emit(`${message.caller} call-declined`, message)
    })
    socket.on('call-terminated', (message) => {
        console.log('terminating')
        console.log(message)
        io.emit(`${message.caller} call-terminated`, message)
        io.emit(`${message.callee} call-terminated`, message)


    })


})

// console.clear()





function chatGPT() {
    // const url = 'https://api.openai.com/v1/engines/davinci/completions';

    // const prompt = 'Hi How are you';
    // const params = {
    //     'prompt': prompt,
    //     'max_tokens': 256,
    //     'temperature': 0.7,
    //     'frequency_penalty': 0.4,
    //     'presence_penalty': 0.6,

    // };

    // const headers=  {
    //     'Authorization': `Bearer ${process.env.API}`,
    // }


    // try {
    //     const response = await axios.post(url,params, {headers: headers });
    //     output = `${prompt}${response.choices[0].text}`;
    //     console.log(output.substring(0, output.lastIndexOf('\n')));
    // } catch (err) {
    //     console.log(err);
    // }



    const API_URL = 'https://api.openai.com/v1/engines/davinci/completions';

    const data = {
        prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. Human: Hello, who are you?
        AI: I am an AI created by OpenAI. How can I help you today?
        Human: What is the capital of telangana?`,
        max_tokens: 50,
        temperature: 0.5,
        stop: 'Human:'
    };

    axios.post(API_URL, data, {
        headers: {
            'Authorization': `Bearer ${process.env.GPT_API}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log(response.data.choices[0].text);
    }).catch((error) => {
        console.log(error);
    });

}



// Establishing connection with the backend.

console.log("Trying to connect to mongoDB");

dbCon.connect();
