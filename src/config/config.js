[
'OPENAI_KEY'
].forEach((name) => {
    if (!process.env[name]) {
      throw new Error(`Environment variable ${name} is missing`)
    }
  })

  const config={
    OPENAI_KEY:process.env.OPENAI_KEY,
    PORT:process.env.PORT,
   
  }
  module.exports=config