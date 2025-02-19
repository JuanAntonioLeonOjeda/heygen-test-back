const axios = require('axios')
require('dotenv').config()

const createAvatarSession = async () => {
  try {
    const result = await axios.post("https://api.heygen.com/v1/streaming.new", {
        quality: 'medium',
      },
      {
        headers: { "X-Api-Key": process.env.HEYGEN_API_KEY },
      }
    )

    const session = await startSession(result.data.data.session_id)
    if (!session) return "Error starting session"

    console.log(result.data.data)
    return result.data.data
  } catch (error) {
    console.error(error)
    return 'Error Starting Avatar Session'
  }
}

const startSession = async (id) => {
  try {
    const result = await axios.post(
      "https://api.heygen.com/v1/streaming.start",
      {
        session_id: id,
        sdp: {
          type: '',
          sdp: ''
        }
      },
      {
        headers: { "X-Api-Key": process.env.HEYGEN_API_KEY }
      }
    )
    console.log(result.data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = {
  createAvatarSession
}