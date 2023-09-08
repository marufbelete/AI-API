const { Configuration, OpenAIApi } = require('openai')
const config = require('../config/config')

const openaiApiKey = config.OPENAI_KEY
console.log(openaiApiKey)
const configuration = new Configuration({
  apiKey: openaiApiKey,
})
const openai = new OpenAIApi(configuration)
module.exports.openai=openai