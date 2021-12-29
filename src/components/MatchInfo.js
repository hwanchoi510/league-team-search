import React from "react"
import SummonerInfo from "./SummonerInfo"

function MatchInfo({ current_game, summoners, summoner_icons, matches }) {

    return (
        <div>
            <div>
                <p>current game info</p>
            </div>
            <div>
                <div className="blue_team" >
                    <SummonerInfo summoner={summoners[0]} summoner_icon={summoner_icons[0]} match={matches[0]}/>
                    <SummonerInfo summoner={summoners[1]} summoner_icon={summoner_icons[1]} match={matches[1]}/>
                    <SummonerInfo summoner={summoners[2]} summoner_icon={summoner_icons[2]} match={matches[2]}/>
                    <SummonerInfo summoner={summoners[3]} summoner_icon={summoner_icons[3]} match={matches[3]}/>
                    <SummonerInfo summoner={summoners[4]} summoner_icon={summoner_icons[4]} match={matches[4]}/>
                </div>
                <div className="red_team">
                    <SummonerInfo summoner={summoners[5]} summoner_icon={summoner_icons[5]} match={matches[5]}/>
                    <SummonerInfo summoner={summoners[6]} summoner_icon={summoner_icons[6]} match={matches[6]}/>
                    <SummonerInfo summoner={summoners[7]} summoner_icon={summoner_icons[7]} match={matches[7]}/>
                    <SummonerInfo summoner={summoners[8]} summoner_icon={summoner_icons[8]} match={matches[8]}/>
                    <SummonerInfo summoner={summoners[9]} summoner_icon={summoner_icons[9]} match={matches[9]}/>
                </div>
            </div>
            
        </div>
    )
}

export default MatchInfo
