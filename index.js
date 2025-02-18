const express = require("express")
const cors = require("cors")
const axios = require("axios")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
const CLAUDE_MODEL = "claude-3-haiku" // Other options: claude-3-sonnet / claude-3-haiku / opus-20240229

app.post("/claude", async (req, res) => {
  try {
    const userMessage = req.body.question

    const query = `I'm going to do some query stuff with this ${userMessage}`

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: CLAUDE_MODEL,
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
    console.log(response.data.content[0].text);
    res.json({ answer: response.data.content[0].text })
  } catch (error) {
    console.error(
      "Claude API Error:",
      error.response ? error.response.data : error.message
    )
    res.status(500).json({ error: "Failed to communicate with Claude." })
  }
})

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
)
