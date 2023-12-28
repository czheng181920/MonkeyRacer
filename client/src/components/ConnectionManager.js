import React from 'react';
import { socket } from '../socket';

export function ConnectionManager() {
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    function ping() {
        socket.emit('message', 'ping');
    }

    return (
        <>
            <button onClick={ connect }>Connect</button>
            <button onClick={ disconnect }>Disconnect</button>
            <button onClick={ ping }>Ping</button>
        </>
    )
}