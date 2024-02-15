import React, { useState } from "react";
import { socket } from "../socket";
import Input from "./Input";

const TextForm = (props) => {
    const [text, setText] = useState("");

    function sendText(input) {
        socket.emit("race_input", {
            passage: props.passage,
            input: input,
        })
        setText(input)
        console.log(input)
    }

    return (
        <>
            <Input 
                type="text"
                value={text} 
                onChange={(e) => sendText(e.target.value)} 
                placeholder="Type here"
                className="input-text"
            />
        </>
    )
}

export default TextForm;