import React from 'react'
import Match from './Match'

function Matches({matches}) {
    return (
        <div>
            <Match match={matches[0]}/>
            <Match match={matches[1]}/>
            <Match match={matches[2]}/>
            <Match match={matches[3]}/>
            <Match match={matches[4]}/>
        </div>
    )
}

export default Matches
