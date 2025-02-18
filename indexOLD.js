require("dotenv").config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const faq = require("./faq")

const app = express()
app.use(cors())

app.get("/video", async (req, res) => {
  const { query } = req.query

  const answer = faq[query]

  if (!answer) {
    return res.status(200).json({ message: "No related topics" })
  }

  try {
    const statusResponse = await axios.get(
      `https://api.heygen.com/v1/video_status.get?video_id=${answer?.id}`,
      {
        headers: { "X-Api-Key": process.env.API_KEY },
      }
    )

    if (statusResponse.data.data.status !== "completed") {
      return res
        .status(202)
        .json({ message: "Video is still processing, try again later." })
    }

    res.json(statusResponse.data.data)
  } catch (error) {
    console.error("Error fetching video:", error)
    res.status(500).json({ error: "Failed to fetch video" })
  }
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))
