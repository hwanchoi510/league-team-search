import React from 'react'
import Match from './Match';
import './SummonerInfo.css'

function SummonerInfo({ summoner, name, summoner_icon, match, spells }) {

    var solo_rank = summoner.find(({ queueType }) => queueType === "RANKED_SOLO_5x5");
    var tier = solo_rank !== undefined ? solo_rank.tier : 'UNRANKED';
    var rank = solo_rank !== undefined ? solo_rank.rank : '';
    var points = solo_rank !== undefined ? solo_rank.leaguePoints : '';
    var winrate = solo_rank !== undefined ? (solo_rank.wins / (solo_rank.wins + solo_rank.losses)).toFixed(2) : '';

    return (
        <div className='summoner'>
            <div className='summoner_profile'>
                <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/${summoner_icon}.png`} alt='summoner icon' className='summoner_icon'/>
                <div className='summoner_info' >
                    <h1 className='summoner_name'>{name}</h1>
                    <div className='ranked_info'>
                        <img src={`/images/ranked-emblems/Emblem_${tier}.png`} alt='ranked emblem' className='ranked_emblem' />
                        <div className='ranked_text'>
                            <p>{tier} {rank}</p>
                            <p>{points} lp</p>
                            <p>winrate:{winrate}%</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='summoner_matches'>
                <Match match={match[0]} spells={spells} />
                <Match match={match[1]} spells={spells} />
                <Match match={match[2]} spells={spells} />
                <Match match={match[3]} spells={spells} />
                <Match match={match[4]} spells={spells} />
            </div>
        </div>
    )
}

export default SummonerInfo
