import React, { useState } from "react";
import Axios from "axios";
import SearchForm from "./components/SearchForm";
import MatchInfo from "./components/MatchInfo";
import './App.css'

function App() {
  const API_KEY = process.env.REACT_APP_RIOT_API_KEY;
  var regions = {
    na1: "americas",
    kr: "asia",
  };

  const [matches, setMatches] = useState([]);
  const [summoners, setSummoners] = useState([]);
  const [summonerNames, setSummonerName] = useState([]);
  const [summonerIcons, setSummonerIcons] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [champions, setChamps] = useState([]);
  const [spells, setSpells] = useState([]);

  const getDatas = async () => {
    await Axios.get(
      "http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json"
    )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setChamps(Object.values(data.data));
      });

    await Axios.get(
      "http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/summoner.json"
    )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setSpells(Object.values(data.data));
      });
  };

  const searchSummoner = async (summonerName = "", server = "na1") => {
    setLoading(true);
    setMatches([]);
    setSummoners([]);
    setChamps([]);
    setSpells([]);
    setSummonerIcons([]);
    setErrorMessage("");
    setError(false);

    getDatas();

    const summonerLink = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`;
    let data = await Axios.get(summonerLink)
      .then((res) => {
        setError(false);
        return res.data.id;
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        setErrorMessage("Summoner Not Found");
        return null;
      });

    if (data != null) {
      const matchLink = `https://${server}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data}?api_key=${API_KEY}`;
      let current_game = await Axios.get(matchLink)
        .then((res) => {
          setError(false);
          return res.data;
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
          setErrorMessage("Summoner Not In-Game");
          return null;
        });

      if(current_game.gameMode === "CLASSIC"){
        let participants = current_game.participants;
        setCurrentGame(current_game.participants);

        for await (const p of participants) {
          let summoner = await getSummonerInfo(p.summonerId, server);
          let match = await getMatchInfo(p.summonerId, server);
          
          await setSummonerName((summonerNames) => [...summonerNames, p.summonerName])
          await setSummoners((summoners) => [...summoners, summoner]);
          await setMatches((matches) => [...matches, match]);
        }

        await setError(false);
        await setLoading(false);
      } else {
        await setError(true);
        await setErrorMessage("Summoner not in Solo or Flex Game");
        await setLoading(false);
      }
    }
  };
  // Gets the rank data of the summoner
  const getSummonerInfo = async (id, server) => {
    const rankedLink = `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;
    let summoner = await Axios.get(rankedLink).then((res) => {
      return res.data;
    });

    return summoner;
  };

  // Gets the info of the most recent 5 games of a summoner
  const getMatchInfo = async (id, server) => {
    const summonerLink = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/${id}?api_key=${API_KEY}`;
    const puuid = await Axios.get(summonerLink).then((res) => {
      setSummonerIcons((summonerIcons) => [
        ...summonerIcons,
        res.data.profileIconId,
      ]);
      return res.data.puuid;
    });

    const matchesLink = `https://${regions[server]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=5&api_key=${API_KEY}`;
    const matchIDs = await Axios.get(matchesLink).then((res) => {
      return res.data;
    });

    var matches = [];
    for await (const matchID of matchIDs) {
      const match = await Axios.get(
        `https://${regions[server]}.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`
      )
        .then((res) => {
          let participants = res.data.info.participants;
          return participants.find(({ summonerId }) => summonerId === id);
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage("Try again later");
          setError(true);
        });
      await matches.push(match);
    }

    return matches;
  };

  return (
    <div className="App">
      <div className='app_name'>
        <h1>League Team Search</h1>
      </div>
      <SearchForm search={searchSummoner} />
      <div>
        {loading ? <div className='loading'><i class="fas fa-spinner fa-spin fa-3x"/></div> : null}
        {error ? <p className='message'>{errorMessage}</p> : null}
        {matches.length > 0 && !loading && !error ? (
          <MatchInfo
            current_game={currentGame}
            summoners={summoners}
            summonerNames={summonerNames}
            summoner_icons={summonerIcons}
            matches={matches}
            champs={champions}
            spells={spells}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
