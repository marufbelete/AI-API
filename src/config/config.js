[
'OPENAI_KEY',
'DATABASE_URL',
'ACCESS_TOKEN_SECRET',
'ACCESS_TOKEN_EXPIRES'
].forEach((name) => {
    if (!process.env[name]) {
      throw new Error(`Environment variable ${name} is missing`)
    }
  })

  const config={
    OPENAI_KEY:process.env.OPENAI_KEY,
    DATABASE_URL:process.env.DATABASE_URL,
    ACCESS_TOKEN_EXPIRES:process.env.ACCESS_TOKEN_EXPIRES,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    PORT:process.env.PORT,
   
  }
  module.exports=config