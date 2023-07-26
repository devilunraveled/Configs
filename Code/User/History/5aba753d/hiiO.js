const { Configuration, OpenAIApi } = require("openai");

let openAI;

const setup = async () => {
    const configuration = new Configuration({
        organization: process.env.ORG_API,
        apiKey: process.env.BOT_API,
    });

    openAI = new OpenAIApi(configuration);
    //const response = await openAI.listEngines();
    //console.log(response);
}

const getBotResponse = async (data) => {
    const completion = await openAI.createChatCompletion({
        model : "gpt-3.5-turbo",
        messages : data.chat,
        temperature : 0.5,
        presence_penalty : 1.0,
    })

    console.log(completion.data.choices[0].message);
}

module.exports = { setup, getBotResponse };