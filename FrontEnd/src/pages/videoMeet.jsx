import React, { useRef, useState } from 'react'
const server_url = "http://localhost:8080";
var connections = {};
const peerConfigConnections={
    "iceServer":[
        {"urls":"stun:stun.l.google.com:1932"}
    ]
}
import "../style/videoComponenet.css"


export default function VideoMeetComponent() {

    var socketRef=useRef();
    let socketIdRef=useRef();
    let localVideoRef=useState();

    let [videoAvailable,setVideoAvailable]=useState(true);

    let [audioAvailable,setAudioAvailable]=useState(true);

    let [video,setVideo]=useState();

    let [audio,setAudio]=useState();
    let [screen,setScreen]=useState();

    let [showModel,setShowModel]=useState();
    let [screenAvailable,setScreenAvailable]=useState();
    let [message,setMessage]=useState("");

    let [newMessage,setNewMessage]=useState(0);
    let [messages,setMessages]=useState([]);
    let [askForUsername,setAskForUsername]=useState(true);
    const videoRef=useRef([]);
    let [username,setUsername]=useState(); 
    let [videos,setVideos]=useState([]);

    return (
        <div>

        <h2>Video Meet Componenets{window.location.href}</h2>

        </div>
    )
}
