import React from 'react'
import './Match.css'

function Match({ match }) {

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
    var stats = `${match.kills}/${match.deaths}/${match.assists}`;
    var kda = ((match.kills + match.assists) / match.deaths).toFixed(2)
    var spell1 = match.summoner1Id;
    var spell2 = match.summoner2Id;

    return (
        <div className={win ? 'match_container win' : 'match_container lose'}>
            <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champion}.png`} alt={champion} className='champion_icon' />
            <div className='spell_container'>
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${spells[spell1]}.png`} alt="spell1" className='mini_icon' />
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${spells[spell2]}.png`} alt="spell2" className='mini_icon' />
            </div>
            <p className='kda'>{stats}<br />{kda < Infinity ? `kda:${kda}` : 'Perfect'}</p>
            <div className='item_container'>
                {match.item0 !== 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item0}.png`} alt="item0" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item1 !== 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item1}.png`} alt="item1" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item2 !== 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item2}.png`} alt="item2" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item3 !== 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item3}.png`} alt="item3" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item4 !== 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item4}.png`} alt="item4" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item5 !== 0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/item/${match.item5}.png`} alt="item5" className='mini_icon' /> : <div className='mini_icon' />}

            </div>
        </div>
    )
}

export default Match
