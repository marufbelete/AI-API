const { Configuration, OpenAIApi } = require('openai')
const config = require('../config/config')

const openaiApiKey = config.OPENAI_KEY
const configuration = new Configuration({
  apiKey: openaiApiKey,
})
const openai = new OpenAIApi(configuration)
module.exports.openai=openai