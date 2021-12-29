import React from 'react'
import Matches from './Matches';

function SummonerInfo({ summoner, summoner_icon, match }) {
    
    var solo_rank = summoner.find(({ queueType }) => queueType === "RANKED_SOLO_5x5");
    var summoner_name = solo_rank.summonerName;
    var tier = solo_rank.tier;
    var rank = solo_rank.rank;
    var points = solo_rank.leaguePoints;
    var winrate = solo_rank.wins / (solo_rank.wins + solo_rank.losses);
    console.log(match)

    return (
        <div>
            <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${summoner_icon}.png`} alt='summoner icon' className="summoner_icon"/>
            <p>{summoner_name}</p>
            <p>{tier} {rank}, {points}, {winrate}</p>
            <Matches matches={match}/>
            {/* <p>{match.kills}/{match.deaths}/{match.assists}</p> */}
            
        </div>
    )
}

export default SummonerInfo
