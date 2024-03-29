const {openai } =require('./gptAPI.js')

exports.createCompletion = async (prompt) => {
      const gptResponse = await openai.createCompletion({
          model: 'text-davinci-003',
          temperature:0.2,
          prompt: prompt,
          max_tokens: 1500,
          temperature: 0.5,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
          // stream:true,
          best_of: 1,
        })
        // mk
        if (gptResponse?.data) {
          // console.log(gptResponse.data.choices[0].text)
          const outputText = gptResponse.data.choices[0].text;
          return outputText
        }
        return gptResponse
        };


