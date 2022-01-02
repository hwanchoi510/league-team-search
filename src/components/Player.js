import React from 'react'
import './Player.css'

function Player({ player_info, runes, spells, champs }) {

    var rune_link = 'https://ddragon.canisback.com/img/';
    var spell_link = `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/`;
    var team = player_info.teamId;
    var name = player_info.summonerName;
    var champion = champs.find(({ key }) => key === `${player_info.championId}`).id;
    var spell1 = spells.find(({ key }) => key === `${player_info.spell1Id}`).id;
    var spell2 = spells.find(({ key }) => key === `${player_info.spell2Id}`).id;
    var runes_list = player_info.perks.perkIds

    return (
        <div className={team === 100 ? 'player_blue' : 'player_red'}>
            <p className='player_name'>{name}</p>
            <img src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champion}.png`} alt={champion} className='player_champion_icon' />
            <div className='spells'>
                <img src={`${spell_link}${spell1}.png`} alt='spell' className='spell_icon' />
                <img src={`${spell_link}${spell2}.png`} alt='spell' className='spell_icon' />
            </div>
            <div className='runes'>
                <div className='main_runes'>
                    <img src={`${rune_link}${runes[runes_list[0]]}`} alt='main rune' className='main_rune' />
                    <img src={`${rune_link}${runes[runes_list[1]]}`} alt='main rune 1' className='sub_rune' />
                    <img src={`${rune_link}${runes[runes_list[2]]}`} alt='main rune 2' className='sub_rune' />
                    <img src={`${rune_link}${runes[runes_list[3]]}`} alt='main rune 3' className='sub_rune' />
                </div>
                <div className='sub_runes'>
                    <img src={`${rune_link}${runes[runes_list[4]]}`} alt='sub rune 1' className='sub_rune' />
                    <img src={`${rune_link}${runes[runes_list[5]]}`} alt='sub rune 2' className='sub_rune' />
                </div>
                <div className='sub_runes'>
                    <img src={`${rune_link}${runes[runes_list[6]]}`} alt='stat rune 1' className='stat_rune' />
                    <img src={`${rune_link}${runes[runes_list[7]]}`} alt='stat rune 2' className='stat_rune' />
                    <img src={`${rune_link}${runes[runes_list[8]]}`} alt='stat rune 3' className='stat_rune' />
                </div>
            </div>
        </div>
    )
}

export default Player