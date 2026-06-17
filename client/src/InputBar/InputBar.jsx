import './InputBar.css'
import React, { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'
import axios from 'axios'

function InputBar() {

    let client = useRef(null);
    let chatWindow = useRef(null);
    let inputBar = useRef(null);
    let aiTag = useRef(null);

    const [ai, setAi] = useState(false)
    const [chats, setChats] = useState([])
    const [otherChats, setOtherChats] = useState([])

    useEffect(() => {
        chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    },[chats, otherChats])


    function addMessage(message) {
        let [name, value]= message.split("$")

        if(name == sessionStorage.getItem("name")) {
            setChats(prevChats => [...prevChats, {name:"you", value, myChat: 1}]);
        }else {
            setChats(prevChats => [...prevChats, {name, value, myChat: 0}]);
        }
    }

    useEffect(() => {
        if(ai == true) {
            aiTag.current.style.visibility="visible";
        }else {
            aiTag.current.style.visibility="hidden";
        }
    }, [ai])

    useEffect(() => {
        inputBar.current.focus();
        client.current = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/stomp"),

            onConnect: () => {
                client.current.subscribe("/topic/chat", (message) => {
                    addMessage(message.body);
                });
            },
        });

        client.current.activate();

        return () => {
            client.current.deactivate();
        };
    }, []);

    async function onSend() {
        setAi(false);
        let value = document.getElementById("input").value;

        if(client.current && client.current.connected) {
            client.current.publish({ destination: "/message/to-all", body: sessionStorage.getItem("name") + "$" + (value == "" ? "..." : value)})
            document.getElementById("input").value = ""
        }   
        
        if(value.startsWith("@Ai ")) {

            const response = await axios.get("http://localhost:8080/ai/chat", {
                params: {
                    prompt: value.replace("@Ai ", "")
                }
            })
            client.current.publish({ destination: "/message/to-all", body: "ChatGPT" + "$" + response.data})
        }
        
    }

    return (
        <div id="outer">
            <div id="whole-bar">
                <input id="input" type='text' placeholder='enter message...'
                onChange={(e) => {
                    if(e.target.value.startsWith("@Ai ")) {
                        setAi(true);
                    }else {
                        setAi(false);
                    }
                }}
                ref={inputBar} 
                autoComplete="off"
                onKeyUp={(event) => {
                    if(event.key == "Enter") onSend()
                }}/>
                <div id="ai" ref={aiTag}>@Ai</div>
                <button id="button" onClick={onSend}>📩</button>
            </div>
            <div id='chat-window' ref={chatWindow}>
                {chats.map(e => 
                    (e.myChat == 1) ? (<div className="my-chat">
                            <span className="red">{e.name}:</span>{e.value}
                        </div>):
                    (<div className="others-chat">
                            <span className="red">{e.name}:</span>{e.value}
                        </div>)
                    
                )}
            </div>
        </div>
    )
}

export default InputBar
