const {openai } =require('./gptAPI.js')
const {fileId} = require('./uploadFile.js')

async function createFineTune() {
  try {
    const response = await openai.createFineTune({
      training_file: fileId,
      model: 'davinci'
    })
  } catch (err) {
    console.log('error: ', err.response.data.error)
  }
}

createFineTune()
