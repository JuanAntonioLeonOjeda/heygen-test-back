const axios = require('axios')

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
const CLAUDE_MODEL = "claude-3-5-haiku-latest" // Other options: claude-3-sonnet / claude-3-haiku / opus-20240229

const faq = require('./faq')

const askClaude = async (input) => {
  const faqString = JSON.stringify(faq, null, 2)
  const query = `Te voy a pasar una lista de preguntas y respuestas de una empresa de autosercicio: ${faqString}. Por favor, en base a esta información responde de la forma más amistosa posible la siguiente pregunta: ${input}. Responde en castellano.`
  
  const response = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      messages: [{ role: "user", content: query }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
    }
  )

  return response.data.content[0].text
}

module.exports = askClaude