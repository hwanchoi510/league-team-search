import React from 'react'

function Match({ match }) {

    console.log(match);
    var spells = {
        "0": "SummonerHeal",
        "1": "SummonerBoost",
        "3": "SummonerExhaust",
        "4": "SummonerFlash",
        "6": "SummonerHaste",
        "7": "SummonerHeal",
        "11": "SummonerSmite",
        "12": "SummonerTeleport",
        "13": "SummonerMana",
        "14": "SummonerDot",
        "21": "SummonerBarrier",
        "30": "SummonerPoroRecall",
        "31": "SummonerPoroThrow",
        "32": "SummonerSnowball",
        "39": "SummonerSnowURFSnowball_Mark"
    }
    var win = match.win;
    var champion = match.championName;
    var kda = `${match.kills}/${match.deaths}/${match.assists}`;
    var spell1 = match.summoner1Id;
    var spell2 = match.summoner2Id;

    return (
        <div>
            <span>{win ? "win  " : "lose  "}</span>
            <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champion}.png`} alt={champion}/>
            <span>  
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${spells[spell1]}.png`} />
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${spells[spell2]}.png`} />
            </span>
            <span>  {kda}</span>
            <span>
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item0}.png`} alt="item0" />
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item1}.png`} alt="item1"/>
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item2}.png`} alt="item2"/>
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item3}.png`} alt="item3"/>
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item4}.png`} alt="item4"/>
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item5}.png`} alt="item5"/>
            </span>
        </div>
    )
}

export default Match
