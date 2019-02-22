import React from "react";

class Info extends React.Component{
    
    constructor(){
        super();

        this.state = { isInfoShown: false };
    }

    handleShowPress = () => {
        this.setState({ isInfoShown : !this.state.isInfoShown });
    }

    render(){

        const infoHtml = (
            <div className="left-align">
                <p>Pomodoro is a timer based work method where work is given a certain amount of time which is followed by a break time. Before each work segment a task is chosen for that segment to be worked on. Work and break cycle can be repeated as many times as needed.</p>
                <p>This pomodoro app uses the following default times for segments:</p>
                <ul>
                    <li>work 25min</li>
                    <li>short break 5min</li>
                    <li>long break 20min (after three short breaks)</li>
                </ul>
            </div>
        )

        return(
            <div>
                <p onClick={this.handleShowPress}>Short info about pomodoro {this.state.isInfoShown ? "(hide)" : "(show)"}</p>

                {this.state.isInfoShown ? infoHtml : null}
            </div>
        );
    }
}

export default Info;