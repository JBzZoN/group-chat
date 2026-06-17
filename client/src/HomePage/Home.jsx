import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {

    const inputBar = useRef(null);

    const navigate = useNavigate();

    function onSend() {
        sessionStorage.setItem("name", inputBar.current.value)
        navigate("/chat")
    }

  return (
    <div id='everything'>
        <div id="whole-bar-home">
            <input id="input-home" type='text' placeholder='enter your name...'
            autoComplete="off"
            ref={inputBar} 
            onKeyUp={(event) => {
                if(event.key == "Enter") onSend()
            }}/>
            <button id="button-home" onClick={onSend}>📩</button>
        </div>
    </div>
  )
}

export default Home
