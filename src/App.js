import React, { useState } from 'react'
import Axios from 'axios';
import SearchForm from './components/SearchForm';
import MatchInfo from './components/MatchInfo';

function App() {

  const API_KEY = 'RGAPI-bb99039b-4ad6-44de-8c18-d1d5c7a17885';
  var regions = {
    "na1": "americas",
    "kr": "asia"};
  
  const [matches, setMatches] = useState([]);
  const [summoners, setSummoners] = useState([]);
  const [summonerIcons, setSummonerIcons] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const searchSummoner = async (summonerName = "", server = "na1") => {
    setLoading(true);
    setMatches([]);
    setSummoners([]);
    setSummonerIcons([]);
    setErrorMessage("");
    setError(false);
    
    const summonerLink = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`;
    let data = await Axios.get(summonerLink)
      .then(res => {
        setError(false);
        return res.data.id;
      }).catch(e => {
        setLoading(false);
        setError(true);
        setErrorMessage("Summoner Not Found");
        return null;
      })
    
    if(data != null) {
      const matchLink = `https://${server}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data}?api_key=${API_KEY}`;
      let participants = await Axios.get(matchLink)
        .then(res => {
          setError(false);
          setCurrentGame(res.data.participants);
          return res.data.participants;
        })
        .catch(e => {
          setLoading(false);
          setError(true);
          setErrorMessage("Summoner Not In-Game");
          return null;
        })
      
      for await (const p of participants) {
        let summoner = await getSummonerInfo(p.summonerId, server);
        let match = await getMatchInfo(p.summonerId, server);

        await setSummoners(summoners => [...summoners, summoner]); 
        await setMatches(matches => [...matches, match]);
      }

      await setError(false);
      await setLoading(false);
    }
  }
  // Gets the rank data of the summoner
  const getSummonerInfo = async (id, server) => {
    
    const rankedLink = `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
    let summoner = await Axios.get(rankedLink)
        .then(res => {return res.data;});

    return summoner;
  }

  // Gets the info of the most recent 5 games of a summoner
  const getMatchInfo = async (id, server) => {
    const summonerLink = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/${id}?api_key=${API_KEY}`;
    const puuid = await Axios.get(summonerLink)
      .then(res => {
        setSummonerIcons(summonerIcons => [...summonerIcons, res.data.profileIconId]);
        return res.data.puuid;
      })

    const matchesLink = `https://${regions[server]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=5&api_key=${API_KEY}`;
    const matchIDs = await Axios.get(matchesLink)
      .then(res => { return res.data });

    var matches = [];
    for await ( const matchID of matchIDs) {
      const match = await Axios.get(`https://${regions[server]}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
      .then(res => { 
        let participants = res.data.info.participants;
        return participants.find(({ summonerId }) => summonerId === id); })
      .catch(error => {
        setLoading(false);
        setErrorMessage("Try again later");
        setError(true);
      })
      await matches.push(match);
    }
    
    return matches;
  }


  return (
    <div className="App">
          <SearchForm search={searchSummoner}/>
          <div> 
            { loading ? <p>loading</p> : null }
            { error ? <p>{errorMessage}</p> : null}
            { matches.length > 0 && !loading && !error ? 
              <MatchInfo current_game={currentGame} summoners={summoners} summoner_icons={summonerIcons} matches={matches}/> : null}
          </div>
    </div>
  );
}

export default App;
