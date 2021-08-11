import React, { Component } from 'react';
import 'react-dropdown-now/style.css';
import { Redirect } from 'react-router';
import './Style.css';

class GameResult extends Component {
  state = {
    toggleHome: false,
  }
  
  clickRestartHandler = () => {
    this.props.setState({bpm: null, pageNum: 1, accuracy: null});
  }
  
  clickHomeHandler = () => {
    this.setState({toggleHome: true});
  }

  render() {
    if (this.state.toggleHome) {
      return <Redirect to="home" />;
    }
    
    return (
      <div>
        <div className='Title'>
          <h1>Result ({this.props.bpm}BPM)</h1>
        </div>
        <div className='Description'>
          <h2>Your accuracy is...</h2>
        </div>
        <div className="Result">
          <h1>{this.props.accuracy.toFixed(2)}%</h1>
        </div>
        <button className='Buttons' onClick={this.clickRestartHandler}>Restart</button>
        <button className='Buttons' onClick={this.clickHomeHandler}>Home</button>
      </div>
    );
  }
}
export default GameResult;