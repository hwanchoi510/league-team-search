import React from 'react'
import Player from './Player'
import './CurrentMatch.css'

function CurrentMatch({ match_info, spells, champs }) {

    var runes = {
        "8112": "perk-images/Styles/Domination/Electrocute/Electrocute.png",
        "8124": "perk-images/Styles/Domination/Predator/Predator.png",
        "8128": "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",
        "9923": "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",
        "8126": "perk-images/Styles/Domination/CheapShot/CheapShot.png",
        "8139": "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png",
        "8143": "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png",
        "8136": "perk-images/Styles/Domination/ZombieWard/ZombieWard.png",
        "8120": "perk-images/Styles/Domination/GhostPoro/GhostPoro.png",
        "8138": "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png",
        "8135": "perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png",
        "8134": "perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png",
        "8105": "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png",
        "8106": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",
        "8351": "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",
        "8369": "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
        "8358": "perk-images/Styles/Inspiration/MasterKey/MasterKey.png",
        "8306": "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png",
        "8304": "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png",
        "8313": "perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png",
        "8321": "perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png",
        "8316": "perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png",
        "8345": "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png",
        "8347": "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png",
        "8352": "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png",
        "8410": "perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png",
        "8005": "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
        "8008": "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
        "8021": "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
        "8010": "perk-images/Styles/Precision/Conqueror/Conqueror.png",
        "9101": "perk-images/Styles/Precision/Overheal.png",
        "9111": "perk-images/Styles/Precision/Triumph.png",
        "8009": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
        "9104": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
        "9105": "perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png",
        "9103": "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png",
        "8014": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
        "8017": "perk-images/Styles/Precision/CutDown/CutDown.png",
        "8299": "perk-images/Styles/Sorcery/LastStand/LastStand.png",
        "8437": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
        "8439": "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png",
        "8465": "perk-images/Styles/Resolve/Guardian/Guardian.png",
        "8446": "perk-images/Styles/Resolve/Demolish/Demolish.png",
        "8463": "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png",
        "8401": "perk-images/Styles/Resolve/MirrorShell/MirrorShell.png",
        "8429": "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
        "8444": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
        "8473": "perk-images/Styles/Resolve/BonePlating/BonePlating.png",
        "8451": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
        "8453": "perk-images/Styles/Resolve/Revitalize/Revitalize.png",
        "8242": "perk-images/Styles/Sorcery/Unflinching/Unflinching.png",
        "8214": "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
        "8229": "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",
        "8230": "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png",
        "8224": "perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png",
        "8226": "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png",
        "8275": "perk-images/Styles/Sorcery/NimbusCloak/6361.png",
        "8210": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png",
        "8234": "perk-images/Styles/Sorcery/Celerity/CelerityTemp.png",
        "8233": "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png",
        "8237": "perk-images/Styles/Sorcery/Scorch/Scorch.png",
        "8232": "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png",
        "8236": "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png",
        "5005": "perk-images/StatMods/StatModsAttackSpeedIcon.png",
        "5002": "perk-images/StatMods/StatModsArmorIcon.png",
        "5003": "perk-images/StatMods/StatModsMagicResIcon.png",
        "5007": "perk-images/StatMods/StatModsCDRScalingIcon.png",
        "5008": "perk-images/StatMods/StatModsAdaptiveForceIcon.png",
        "5001": "perk-images/StatMods/StatModsHealthScalingIcon.png"
    };

    return (
        <div className='current_match_container'>
            <div>
                <Player player_info={match_info[0]} runes={runes} spells={spells} champs={champs} />
                <Player player_info={match_info[1]} runes={runes} spells={spells} champs={champs} />
                <Player player_info={match_info[2]} runes={runes} spells={spells} champs={champs} />
                <Player player_info={match_info[3]} runes={runes} spells={spells} champs={champs} />
                <Player player_info={match_info[4]} runes={runes} spells={spells} champs={champs} />
            </div>
            <div>
                <Player player_info={match_info[5]} runes={runes} spells={spells} champs={champs} />
                <Player player_info={match_info[6]} runes={runes} spells={spells} champs={champs} />
                <Player player_info={match_info[7]} runes={runes} spells={spells} champs={champs} />
                <Player player_info={match_info[8]} runes={runes} spells={spells} champs={champs} />
                <Player player_info={match_info[9]} runes={runes} spells={spells} champs={champs} />
            </div>
        </div>
    )
}

export default CurrentMatch
