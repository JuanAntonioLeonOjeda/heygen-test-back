require("dotenv").config()
const express = require("express")
const cors = require("cors")

const askClaude = require("./claude")

const app = express()
app
  .use(cors())
  .use(express.json())

  .post("/claude", async (req, res) => {
    try {
      const input = req.body.question

      const answer = await askClaude(input)
      console.log(answer)
    } catch (error) {
      console.error(
        "Claude API Error:",
        error.response ? error.response.data : error
      )
      res.status(500).json({ error: "Failed to communicate with Claude." })
    }
  })

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
)
