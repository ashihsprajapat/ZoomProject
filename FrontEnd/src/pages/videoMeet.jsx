import React, { useEffect, useRef, useState } from 'react'
import "./videoMeetStyle.css"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const server_url = "http://localhost:8084";
var connections = {};

//var connections ={} eshe eshe kiya hai 

const peerConfigConnections = {
    "iceServer": [
        { "urls": "stun:stun.l.google.com:19302" }  //stun server use for your ip address as public internet which return ip address
    ]
}
import "../style/videoComponenet.css"


export default function VideoMeetComponent() {

    var socketRef = useRef();

    let socketIdRef = useRef();

    let localVideoRef = useState();

    let [videoAvailable, setVideoAvailable] = useState(true); //take permition to hardware then check if awailable or not

    let [audioAvailable, setAudioAvailable] = useState(true);// same 

    let [video, setVideo] = useState([]); //video on off handle by this

    let [audio, setAudio] = useState();//same for audio

    let [screen, setScreen] = useState(); //same for screen sharing

    let [showModel, setShowModel] = useState(); //pop the msg typing

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([]); //alll messages

    let [message, setMessage] = useState(""); //write msg and send then add to messages

    let [newMessage, setNewMessage] = useState(0);// that show count as notification

    let [askForUsername, setAskForUsername] = useState(true);//login as guest then take username

    let [username, setUsername] = useState("");

    const videoRef = useRef([]);

    let [videos, setVideos] = useState([]);

    //todo
    // if(isChrome()===false){

    // }

    const getVideoPermission = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true })

            if (videoPermission) {
                setVideoAvailable(true);
            } else {
                setVideoAvailable(false);
            }

        } catch (err) {
            console.log(err)

        }
    }

    const getAudioPermission = async () => {
        try {
            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true })

            if (audioPermission) {
                setAudioAvailable(true);
            } else {
                setAudioAvailable(false);
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable })

                if (userMediaStream) {
                    window.localStram = userMediaStream;

                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = userMediaStream
                    }
                }
            }

        } catch (err) {
            console.log(err)
        }
    }

    let getUserMediaSuccess = (stream) => {  // jeb me video band kiya tab sabi se hat jana chahiye
        try {
            window.localStram

        } catch (e) {
            console.log(e)
        }

    }

    let getPermisson = async () => {
        try {


        } catch (err) {
            console.log(err);
        }
    }

    let getUserMedia = () => { //when we mute the audio then cut sound and when stop video then stop handle by this
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio }) //make it as promiss
                .then(getUserMediaSuccess)// todo getusreMedia success
                .then((stream) => { })  //refresh stram
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());

            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        getVideoPermission();
        getAudioPermission();
    }, [])

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [audio, video]);

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message);

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setREmoteDescription(new RTCSessionDescription(signal.sdp).then(() => {
                    if (signal.sdp.type === "offer") {

                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketIdRef.current.emit("signal", fromId, JSON.stringify({ "sdp": connections[fromId].setLocalDescription }))
                            })
                                .catch((e) => console.log(e))

                        })
                            .catch((e) => console.log(e))
                    }
                })

                )
                    .catch((e) => console.log(e))
            }

        }

        if (signal.ice) {
            connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
        }

    }

    //add message

    let addMessage = () => {

    }

    let connectToSocketServer = () => {

        socketRef.current = io.connect(server_url, { secure: false });

        socketRef.current.on('signal', gotMessageFromServer); //get message after socket connected

        socketRef.current.on("connect", () => {
            socketRef.current.emit("join-call", window.location.href);

            socketIdRef.current = socketRef.current.id;// store socket.id

            socketRef.current.on("chat-messagae", addMessage) //add new Message 

            socketRef.current.on('user-left', (id) => {
                setVideo((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on("user-join", (id, clients) => {
                clients.forEach((socketListId) => {

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections);

                    connections[socketListId].onicecandidate = (event) => {

                        if (event.candidate !== null) {
                            socketRef.current.emit("signal", socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    connections[socketListId].onaddStream = (event) => {

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            setVideo(video => {
                                const updatedVideos = video.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                )
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })
                        } else {

                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoPlay: true,
                                playsinline: true,
                            }

                            setVideo(videos => {
                                const updatedVideos = [...videos, newVideo];

                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })

                        }
                    }

                    if (window.localStram !== undefined && window.localStram !== null) {

                        connections[socketListId].addStream(window.localStram);
                    } else {
                        ///let blackSlience
                        // jab video off kerenge to black screen aa jayegi

                    }



                })


                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current)
                            continue;

                        try {
                            connections[id2].addStream(window.localStram)

                        } catch (err) {

                        }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit("signal", id2, JSON.stringify({ "sdp": connections[id2].setLocalDescription }));

                                })
                                .catch((e) => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        // getUserMedia
        connectToSocketServer();
    }

    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }

    return (
        <div>

            {/* <h2>Video Meet Componenets {window.location.href}</h2>
            <h2>{window.location.port}</h2> */}

            {askForUsername === true ?
                <div className='vidoMeet  border-2 p-5 border-gray-800 ' >

                    <h2 className='text-2xl'>Enter into lobby</h2>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="@username"
                        size='small'
                        required
                        className='m-2  max-w-xl'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxRows={4}

                    />
                    <br />
                    <Button variant="contained"
                        size='small'
                        className='m-2'
                        onClick={connect} >Connect</Button>

                    <div className='border'>
                        <video ref={localVideoRef} autoPlay muted ></video>
                    </div>

                </div>
                :
                <></>
            }

        </div>
    )
}
