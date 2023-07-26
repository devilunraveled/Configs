const { Configuration, OpenAIApi } = require("openai");

const ConnectionSetup = async () => {
    const configuration = new Configuration({
        organization: process.env.ORG_API,
        apiKey: process.env.BOT_API,
    });

    const openAI = new OpenAIApi(configuration);
    const response = await openAI.listEngines();
    console.log(response);
}

module.export