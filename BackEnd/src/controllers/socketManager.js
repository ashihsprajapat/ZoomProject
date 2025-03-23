import { Socket } from "node:dgram";
import { Server } from "socket.io"

const connections = {}
const messages = {};
const timeOnline = {};
export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
        }
    });

    io.on("connection", (Socket) => {

        console.log("Something connect")

        Socket.on("join-call", (path) => {
            if (connections[path] === undefined) {
                connections[path] = [];
            }
            connections[path].push(socket.id)
            timeOnline[socket.id] = new Date();

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", Socket.id, connections[path])

            }
            if (messages !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(Socket.id).emit("chat_message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }

        })


        Socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", Socket.id, message);
        })


        Socket.on("chat-message", (data, render) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(Socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];
                }, ["", false]);


            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }
                messages[matchingRoom].push({ "sender": sender, "data": data, "socket-id-sender": Socket.id })
                console.log("message", KeyboardEvent, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, Socket.id);
                })
            }

        })
        Socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[Socket.id] - new Date())

            var key;

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === Socket.id) {
                        key = k;

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', Socket.id);
                        }

                        var index = connections[key].indexOf(Socket.id);

                        connections[key].splice(index, 1);

                        if (connections[key].length === 0) {
                            delete connections[key];
                        }

                    }
                }

            }

        })
    })

    return io;
}
