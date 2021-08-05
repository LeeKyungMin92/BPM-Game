import React, { Component } from 'react';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { Redirect } from 'react-router';
import './Style.css';

class GameSetting extends Component {
  state = {
    bpm: null,
    alarm: "",
    toggleAlarm: false,
    toggleHome: false,
  }
  
  clickStartHandler = () => {
    if (this.state.bpm === null) {
      this.setState({alarm: "Please select your BPM!", toggleAlarm: true});
    }
    else {
      this.props.setState((prevState) => ({bpm: this.state.bpm, page: 2}));
    }
  }
  
  clickHomeHandler = () => {
    this.setState({toggleHome: true});
  }

  render() {
    if (this.state.toggleHome) {
      return <Redirect to="home" />;
    }

    const options = [100, 120, 150, 180];
    return (
      <div>
        <div className='Title'>
          <h1>BPM Game</h1>
        </div>
        <div className='Description'>
          <h3>Select BPM and start the game!</h3>
        </div>
        <div className="BPMDropdown">
          <Dropdown
            placeholder="Select BPM..."
            options={options}
            onChange={(selected) => this.setState({bpm: selected.value})}
            onSelect={(selected) => this.setState({bpm: selected.value})}
            onClose={() => this.setState({alarm: "", toggleAlarm: false})}
          />
        </div>
        <div className={this.state.toggleAlarm ? 'Alarm' : 'NoAlarm'}>
          {this.state.alarm}
        </div>
        <button className='Buttons' onClick={this.clickStartHandler}>Start</button>
        <button className='Buttons' onClick={this.clickHomeHandler}>Home</button>
      </div>
    );
  }
}
export default GameSetting;