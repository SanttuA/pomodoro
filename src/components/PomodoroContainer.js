import React from "react";
import PomodoroComponent from "./PomodoroComponent";
import PomodoroSetup from "./PomodoroSetup";
import soundfile from "../ticktock.wav";


class PomodoroContainer extends React.Component{

    constructor(){
        super();

        this.state = {
            workTime: 25*60,        //length of one work segment
            breakTimeShort: 5*60,   //length of one short break segment
            breakTimeLong: 20*60,   //length of one long break segment
            timeLeft: 25*60,        //time left in current countdown timer
            isBreakTime: false,     //is now break or work time
            breakCount: 0,          //counts break towards a long break
            longBreakPoint: 3,      //how many short breaks till long break
            isMuted: false          //is alarm sound muted
        };

        this.counter = null;
        this.isCounterRunning = false;
        this.alarmAudio = new Audio(soundfile);
    }

    handleStartPress = () => {
        if(this.isCounterRunning === true && this.counter !== null)
            return;

        this.isCounterRunning = true;
        this.counter = setInterval(() => {
            this.setState({timeLeft: this.state.timeLeft-1});

            if(this.state.timeLeft === 0){
                if(this.state.isMuted === false)
                    this.alarmAudio.play();

                //switching from break to work time
                if(this.state.isBreakTime === true){
                    this.setState({
                        timeLeft: this.state.workTime,
                        isBreakTime: false
                    });
                }
                //switching from work to break time
                else{
                    //if there's not enough short breaks yet
                    if(this.state.breakCount < this.state.longBreakPoint){
                        this.setState({
                            timeLeft: this.state.breakTimeShort,
                            isBreakTime: true,
                            breakCount: this.state.breakCount+1
                        });
                    }
                    //if it's time for a long break
                    else{
                        this.setState({
                            timeLeft: this.state.breakTimeLong,
                            isBreakTime: true,
                            breakCount: 0
                        });
                    }
                }
            }
        }, 1000);
    }

    handleStopPress = () => {
        this.stopCounter();
    }

    handleResetPress = () => {
        this.stopCounter();
        this.setState({
            timeLeft: this.state.workTime,
            isBreakTime: false,
            breakCount: 0
        });
    }

    handleSoundPress = () => {
        this.setState({isMuted: !this.state.isMuted});
    }

    stopCounter = () => {
        if(this.isCounterRunning === true && this.counter !== null){
            clearInterval(this.counter);
            this.isCounterRunning = false;
        }
    }

    timeLeftToString = (timeLeft) => {
        let time = timeLeft;
        let minutes = parseInt(time / 60);
        let seconds = parseInt(time % 60);
        minutes = minutes < 10 ? "0"+ minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return minutes+":"+seconds;
    }

    updateValues = (work, shortBreak, longBreak) => {
        this.stopCounter();
        this.setState({
            workTime: work,
            breakTimeShort: shortBreak,
            breakTimeLong: longBreak,
            timeLeft: work,
            isBreakTime: false,
            breakCount: 0
        });
    }

    render(){
        return(
            <div className="center">
                <PomodoroComponent
                    stateTitle={this.state.isBreakTime ? "Break" : "Work"}
                    bgColor={this.state.isBreakTime ? "green" : "teal"}
                    time={this.timeLeftToString(this.state.timeLeft)}
                    handleStartPress={this.handleStartPress}
                    handleStopPress={this.handleStopPress}
                    handleResetPress={this.handleResetPress}
                    handleSoundPress={this.handleSoundPress}
                    isMuted={this.state.isMuted}
                />
                <PomodoroSetup
                    workTime={this.state.workTime}
                    breakTimeShort={this.state.breakTimeShort}
                    breakTimeLong={this.state.breakTimeLong}
                    updateValues={this.updateValues}
                />
            </div>
        );
    }
}

export default PomodoroContainer;