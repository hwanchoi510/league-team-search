import React, { useState } from "react";
import Axios from "axios";
import SearchForm from "./components/SearchForm";
import MatchInfo from "./components/MatchInfo";
import './App.css'

/**
 * Main App
 * Displays the components of the website
 */
function App() {

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
  /**
   * Gets the initial data from the riot api
   * Data fetched:
   *  champions
   *  summoner spells
   */
  const getDatas = async () => {
    await Axios.get(
      "https://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/champion.json"
    )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setChamps(Object.values(data.data));
      });

    await Axios.get(
      "https://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/summoner.json"
    )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setSpells(Object.values(data.data));
      });
  };

  /**
   * Fetches the in-game data of the given summoner name and server
   * 
   * The summoner must be in a "Classic" Mode (Summoner's Rift) else it'll create an error
   * If there are too many requests, it'll fail due to rate limits.
   * 
   * @param {*} summonerName : the ign of the summoner
   * @param {*} server : the server of the summoner
   */
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

    let data = await Axios.get(`/.netlify/functions/fetch-summoner-id?server=${server}&summonerName=${encodeURIComponent(summonerName)}`)
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
      let current_game = await Axios.get(`/.netlify/functions/fetch-current-match?server=${server}&data=${data}`)
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

  /**
   * Gets the rank info of the given summoner id and server
   * 
   * @param {*} id : the encrypted id of the summoner 
   * @param {*} server : the server the summoner is in
   * @returns 
   */
  const getSummonerInfo = async (id, server) => {
    let summoner = await Axios.get(`/.netlify/functions/fetch-summoner-rank?server=${server}&id=${id}`)
    .then((res) => {
      return res.data;
    });

    return summoner;
  };

  /**
   * Gets the history of the given summoner id and server
   * 
   * @param {*} id : the encrypted id of the summoner
   * @param {*} server : the server the summoner is in
   * @returns 
   */
  const getMatchInfo = async (id, server) => {
    const puuid = await Axios.get(`/.netlify/functions/fetch-summoner-info?server=${server}&id=${id}`)
    .then((res) => {
      setSummonerIcons((summonerIcons) => [
        ...summonerIcons,
        res.data.profileIconId,
      ]);
      return res.data.puuid;
    });

    const matchIDs = await Axios.get(`/.netlify/functions/fetch-summoner-matches?server=${regions[server]}&puuid=${puuid}`)
    .then((res) => {
      return res.data;
    });

    var matches = [];
    for await (const matchID of matchIDs) {
      const match = await Axios.get(
        `/.netlify/functions/fetch-summoner-match?server=${regions[server]}&matchID=${matchID}`
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
        {loading ? <div className='loading'><i className="fas fa-spinner fa-spin fa-3x"/></div> : null}
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
