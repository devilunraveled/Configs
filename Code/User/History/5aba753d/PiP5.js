const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: process.env.ORG_API,
    apiKey: process.env.BOT_API,
});

const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();