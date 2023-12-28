import React, { useState } from "react";
import { socket } from "../socket";

export function TextForm() {
    const [text, setText] = useState("");

    function sendText(t) {
        socket.emit("message", t)
        setText(t)
        console.log(t)
    }

    return (
        <>
            <input 
                type="text"
                value={text} 
                onChange={(e) => sendText(e.target.value)} 
                placeholder="Type here"
            />
        </>
    )
}