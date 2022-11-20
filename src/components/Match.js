import React from 'react'
import './Match.css'

function Match({ match, spells }) {

    var win = match.win;
    var champion = match.championName;
    var stats = `${match.kills}/${match.deaths}/${match.assists}`;
    var kda = ((match.kills + match.assists) / match.deaths).toFixed(2);
    var spell1 = spells.find(({ key }) => key === `${match.summoner1Id}`).id;
    var spell2 = spells.find(({ key }) => key === `${match.summoner2Id}`).id;

    return (
        <div className={win ? 'match_container win' : 'match_container lose'}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${champion}.png`} alt={champion} className='champion_icon' />
            <div className='spell_container'>
                <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/${spell1}.png`} alt="spell1" className='mini_icon' />
                <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/${spell2}.png`} alt="spell2" className='mini_icon' />
            </div>
            <p className='kda'>{stats}<br />{kda < Infinity ? `kda:${kda}` : 'Perfect'}</p>
            <div className='item_container'>
                {match.item0 !== 0 ? <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${match.item0}.png`} alt="item0" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item1 !== 0 ? <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${match.item1}.png`} alt="item1" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item2 !== 0 ? <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${match.item2}.png`} alt="item2" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item3 !== 0 ? <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${match.item3}.png`} alt="item3" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item4 !== 0 ? <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${match.item4}.png`} alt="item4" className='mini_icon' /> : <div className='mini_icon' />}
                {match.item5 !== 0 ? <img src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${match.item5}.png`} alt="item5" className='mini_icon' /> : <div className='mini_icon' />}
            </div>
        </div>
    )
}

export default Match
