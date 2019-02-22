import React from "react";

class PomodoroSetup extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            workMinutes: props.workTime/60,
            shortBreakMinutes: props.breakTimeShort/60,
            longBreakMinutes: props.breakTimeLong/60,
            isSetupVisible: false
        };

        this.updateValues = props.updateValues;
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateValues(this.state.workMinutes*60, this.state.shortBreakMinutes*60, this.state.longBreakMinutes*60);
    }        

    toggleSetupVisibility = () => {
        this.setState({isSetupVisible: !this.state.isSetupVisible})
    }

    render(){

        const setupForm = (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Work minutes:</label><br />
                        <input 
                            type="number"
                            name="workMinutes"
                            min="1"
                            step="1"
                            value={this.state.workMinutes}
                            onChange={this.handleChange}
                        />
                    <br />
                    <label>Short break minutes:</label><br />
                        <input 
                            type="number"
                            name="shortBreakMinutes"
                            min="1"
                            step="1"
                            value={this.state.shortBreakMinutes}
                            onChange={this.handleChange}
                        />
                    <br />
                    <label>Long break minutes:</label><br />
                        <input 
                            type="number"
                            name="longBreakMinutes"
                            min="1"
                            step="1"
                            value={this.state.longBreakMinutes}
                            onChange={this.handleChange}
                        />
                    <br />
                    <button>Apply</button>
                </form>
            </div>
        )
    
        return(
            <div>
                <p onClick={this.toggleSetupVisibility}>Pomodoro setup ({this.state.isSetupVisible ? "hide" : "show"})</p>
                {this.state.isSetupVisible ? setupForm : null}
            </div>
        );
    }
}

export default PomodoroSetup;