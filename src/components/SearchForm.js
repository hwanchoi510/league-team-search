import React, { useState } from 'react'
import './SearchForm.css'

function SearchForm({ search }) {

    const [summonerName, setSummonerName] = useState("");
    const [server, setServer] = useState("na1");

    const handleOnSubmit = (e) => {
        search(summonerName, server);
    }

    return (
        <div className='search_bar_container'>
            <div className='search_bar_box'>
                <h1>Search Summoner</h1>
                <p>Summoner has to be in Normal, Solo or Flex game</p>
                <div className='input_box'>
                    <input type='text' id="summoner_name" placeholder="hideonbush" onChange={(e) => setSummonerName(e.target.value)} className='input_bar' ></input>
                    <select id="server" name="server" onChange={(e) => setServer(e.target.value)} className='select_bar'>
                        <option value="na1">NA</option>
                        <option value="kr">KR</option>
                    </select>
                    <button onClick={() => handleOnSubmit()} className='submit_button'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchForm
