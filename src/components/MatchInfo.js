import React from "react"
import CurrentMatch from "./CurrentMatch";
import SummonerInfo from "./SummonerInfo"
import './MatchInfo.css'

function MatchInfo({ current_game, summoners, summonerNames, summoner_icons, matches, champs, spells }) {

    return (
        <div>
            <div className='current_game'>
                <CurrentMatch match_info={current_game} champs={champs} spells={spells} />
            </div>
            <div className='teams'>
                <div className='blue' >
                    <SummonerInfo summoner={summoners[0]} name={summonerNames[0]} summoner_icon={summoner_icons[0]} match={matches[0]} spells={spells} />
                    <SummonerInfo summoner={summoners[1]} name={summonerNames[1]} summoner_icon={summoner_icons[1]} match={matches[1]} spells={spells} />
                    <SummonerInfo summoner={summoners[2]} name={summonerNames[2]} summoner_icon={summoner_icons[2]} match={matches[2]} spells={spells} />
                    <SummonerInfo summoner={summoners[3]} name={summonerNames[3]} summoner_icon={summoner_icons[3]} match={matches[3]} spells={spells} />
                    <SummonerInfo summoner={summoners[4]} name={summonerNames[4]} summoner_icon={summoner_icons[4]} match={matches[4]} spells={spells} />
                </div>
                <div className='red'>
                    <SummonerInfo summoner={summoners[5]} name={summonerNames[5]} summoner_icon={summoner_icons[5]} match={matches[5]} spells={spells} />
                    <SummonerInfo summoner={summoners[6]} name={summonerNames[6]} summoner_icon={summoner_icons[6]} match={matches[6]} spells={spells} />
                    <SummonerInfo summoner={summoners[7]} name={summonerNames[7]} summoner_icon={summoner_icons[7]} match={matches[7]} spells={spells} />
                    <SummonerInfo summoner={summoners[8]} name={summonerNames[8]} summoner_icon={summoner_icons[8]} match={matches[8]} spells={spells} />
                    <SummonerInfo summoner={summoners[9]} name={summonerNames[9]} summoner_icon={summoner_icons[9]} match={matches[9]} spells={spells} />
                </div>
            </div>
        </div>
    )
}

export default MatchInfo
