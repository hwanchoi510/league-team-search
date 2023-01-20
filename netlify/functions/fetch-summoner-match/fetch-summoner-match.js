// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
axios = require('axios');

const handler = async (event) => {
  const {server, matchID} = event.queryStringParameters
  const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
  const url = `https://${server}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`;
  try {
    const controller = new AbortController();
    const data = await axios.get(url)
      .then((res) => {
        return res.data;
      });
    controller.abort();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }