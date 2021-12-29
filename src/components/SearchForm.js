import React, { useState } from 'react'

function SearchForm( {search} ) {

    const [summonerName, setSummonerName] = useState("");
    const [server, setServer] = useState("na1");

    const handleOnSubmit = (e) => {
        search(summonerName, server);
    }

    return (
        <div>
            <input type='text' id="summoner_name" placeholder="hideonbush" onChange={(e) => setSummonerName(e.target.value)}></input>
            <select id="server" name="server" onChange={(e) => setServer(e.target.value)}>
                <option value="na1">NA</option>
                <option value="kr">KR</option>
            </select>
            <button onClick={() => handleOnSubmit()}>Search</button>
        </div>
    )
}

export default SearchForm
