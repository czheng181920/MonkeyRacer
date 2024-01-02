import React, { useState, useEffect } from 'react';
import { socket } from '../socket';

export function ConnectionManager() {
    const [room, setRoom] = useState("");
    const [roomInput, setRoomInput] = useState("");

    useEffect(() => {
        socket.on('valid_room', () => {
            setRoom(roomInput);
            socket.emit('join', {
                room: roomInput,
                username: "user"
            });
        });

        socket.on('invalid_room', () => {
            setRoom(roomInput);
            socket.emit('create_room', {
                room: roomInput
            });
        });
    });

    function join(e, roomCode) {
        e.preventDefault();
        if (roomCode != "") {
            socket.emit('leave', {
                room: room,
                username: "user"
            });
            socket.emit("validate_room", roomCode)
        }
    }

    function leave() {
        socket.emit('leave', {
            room: room,
            username: "user"
        });
        setRoom("");
        window.location.reload();
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
        setRoomInput(roomCode);
        socket.emit('create_room', {
            room: roomCode,
        });
    }

    return (
        <>
            <button onClick={ createRoom } disabled={room != ""}>Create room</button>
            <form>
                <input type="text" value={roomInput} onChange={(e) => setRoomInput(e.target.value)} />
                <button onClick={ (e) => join(e, roomInput) }>Join room</button>
                <button onClick={ leave } disabled={room == ""}>Leave room</button>
            </form>
            
        </>
    )
}