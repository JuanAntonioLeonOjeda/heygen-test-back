const express = require("express")
const cors = require("cors")
const axios = require('axios')

const app = express()
app.use(cors()) // Allow all origins

const API_KEY = "YmVkZDRhNzY0ZmU5NDI1MTkyNmJjOWNjZGZmMzk3MDUtMTczOTg4MDA0Ng=="

app.get("/video", async (req, res) => {
  const { query } = req.query

  const faq = {
    testOne: {
      description: "This is test one",
      id: "f4df0165a54b486a9493145aed4a594c"
    },
    testTwo: {
      description: "This is test two",
      id: "cc572ead54ed4af3975f03afe598bb47"
    },
  };

  const answer = faq[query]

  if (!answer) {
    return res
      .status(200)
      .json({ message: "No related topics" })
  }
  
  try {
    const statusResponse = await axios.get(
      `https://api.heygen.com/v1/video_status.get?video_id=${answer?.id}`,
      {
        headers: { "X-Api-Key": API_KEY },
      }
    )

    if (statusResponse.data.data.status !== "completed") {
      return res
        .status(202)
        .json({ message: "Video is still processing, try again later." })
    }

    res.json(statusResponse.data.data) // Send the video data back to Vue
  } catch (error) {
    console.error("Error fetching video:", error)
    res.status(500).json({ error: "Failed to fetch video" })
  }
})

app.listen(3000, () => console.log("Server running on http://localhost:3000"))