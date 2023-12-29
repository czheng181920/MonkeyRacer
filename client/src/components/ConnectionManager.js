import React, { useState } from 'react';
import { socket } from '../socket';

export function ConnectionManager() {
    const [room, setRoom] = useState("");

    function join(e, roomCode) {
        e.preventDefault();
        if (roomCode != "") {
            socket.emit('leave', {
                room: room,
                username: "user"
            });
        }
        setRoom(roomCode);
        socket.emit('join', {
            room: roomCode,
            username: "user"
        });
    }

    function leave() {
        socket.emit('leave', {
            room: room,
            username: "user"
        });
        setRoom("");
    }

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    function createRoom() {
        const roomCode = makeid(8);
        setRoom(roomCode);
        socket.emit('create_room', {
            room: roomCode,
        });
    }

    return (
        <>
            <button onClick={ createRoom } disabled={room != ""}>Create room</button>
            <form>
                <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
                <button onClick={ (e) => join(e, room) }>Join room</button>
                <button onClick={ leave } disabled={room == ""}>Leave room</button>
            </form>
            
        </>
    )
}