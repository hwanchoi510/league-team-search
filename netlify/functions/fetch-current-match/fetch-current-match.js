// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
axios = require('axios');

const handler = async (event) => {
  const {server, data} = event.queryStringParameters
  const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
  const url = `https://${server}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data}?api_key=${API_KEY}`;
  try {
    const data = await axios.get(url)
      .then((res) => {
        return res.data;
      });
    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }