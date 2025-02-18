const axios = require('axios')
require('dotenv').config()

const startAvatarSession = async () => {
  try {
    const result = await axios.post("https://api.heygen.com/v1/streaming.new", {
        quality: 'medium',
      },
      {
        headers: { "X-Api-Key": process.env.HEYGEN_API_KEY },
      }
    )
    console.log(result.data.data)
    return result.data.data
  } catch (error) {
    console.error(error)
    return 'Error Starting Avatar Session'
  }
}

module.exports = {
  startAvatarSession
}