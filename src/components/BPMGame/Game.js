import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Style.css';

class Game extends Component {
  state = {
    title: "Listen, and keep the beat!",
    description: "Tap by left-clicking or spacebar.",
    count: 0,
    sum: 0,
    accuracy: 0,
    previousTime: null,
    toggleHome: false,
  }
  
  count = 0;
  
  TapHandler = () => {
    console.log(this.state.count);
    let currentTime = Date.now()
    if (this.state.count !== 0) {
      let itv = currentTime - this.state.previousTime;
      let currentAcc = 1 - Math.min(Math.abs(itv / this.props.interval - 1), 1);
      let sum = this.state.sum + currentAcc*100;
      let acc = sum / this.state.count;
      this.setState({sum: sum, accuracy: acc});
    }
    if (this.state.count === 7) {
      this.setState({description: "Keep tapping..."});
      this.props.setState({toggleFadeOut: true});
    }
    if (this.state.count >= 23) {
      this.setState((prevState) => ({description: (31 - prevState.count) + " times remaining..."}));
    }
    if (this.state.count === 31) {
      this.props.setState({accuracy: this.state.accuracy, pageNum: 3, toggleFadeOut: false});
    }
    this.setState((prevState) => ({count: prevState.count + 1, previousTime: currentTime}));
  }
  
  clickBackHandler = () => {
    this.props.setState({bpm: null, accuracy: null, pageNum: 1, toggleFadeOut: false});
  }
  
  clickHomeHandler = () => {
    this.setState({toggleHome: true});
  }

  componentWillUnmount() {
    clearInterval(this.props.setInterval);
  }

  render() {
    if (this.state.toggleHome) {
      return <Redirect to="home" />;
    }

    var accText;
    if (this.state.count >= 2) {
      accText = "Accuracy: " + this.state.accuracy.toFixed(5) + "%";
    }
    else {
      accText = "Tap here!"
    }

    return (
      <div>
        <div className='Title'>
          <h1>{this.state.title}</h1>
        </div>
        <div className='Description'>
          <h3>{this.state.description}</h3>
        </div>
        <div className='TapAreaContainer'>
          <button className='TapArea' onClick={this.TapHandler}>{accText}</button>
        </div>
        <div>
          <button className='Buttons' onClick={this.clickBackHandler}>Back</button>
        </div>
        <div>
          <button className='Buttons' onClick={this.clickHomeHandler}>Home</button>
        </div>
      </div>
    );
  }
}
export default Game;