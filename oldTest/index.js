const express = require("express")
const cors = require("cors")
const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()

const askClaude = require('./claude')
const {
  createAvatarSession
} = require('./heygen')

const app = express()
app.use(cors())
app.use(express.json())

app
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
  .get('/session', async (req,res) => {
    try {
      const answer = await createAvatarSession()
      res.status(200).json(answer)
    } catch (error) {
      res.status(500).send(error)
    }
  } )



app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
)
