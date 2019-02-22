import React from "react";
import tomatoImg from "../tomato.png";

const animStyle = {
    transitionProperty: "background-color",
    transitionDuration: "3s",
    paddingBottom: "10px",
    borderRadius: "10%"
}

function PomodoroComponent(props){
    return(
        <div
            id="pomodoro-component"
            style={{...animStyle, backgroundColor: props.bgColor}}
        >
            <h2>{props.stateTitle}</h2>
            
            <div id="tomato-container">
                <img src={tomatoImg} alt="tomato" width="300px"/>
                <h1 id="counter" className="rounded">{props.time}</h1>
            </div>

            <div>
                <button onClick={props.handleStartPress}>Start</button>
                <button onClick={props.handleStopPress}>Stop</button>
                <button onClick={props.handleResetPress}>Reset</button>
                <button onClick={props.handleSoundPress}>Sound: {props.isMuted ? "OFF" : "ON"}</button>
            </div>
        </div>
    );
}

export default PomodoroComponent;