import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './Style.css';
import * as actionCreators from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import * as Pulse from '../../components/BPMGame/Sounds/pulse.flac';
import * as PulseUp from '../../components/BPMGame/Sounds/pulseUp.flac';
//import * as WoodBlock from '../../components/BPMGame/Sounds/woodblock.wav';
//import * as WoodBlockUp from '../../components/BPMGame/Sounds/woodblockUp.wav';

class Game extends Component {
  state = {
    toggleHome: false,
  }
  
  tapCount = 0;
  sum = 0;
  accuracy = null;
  index = null;
  previousTime = null;
  toggleFadeOut = false;

  TapHandler = () => {
    const searchPosition = (arr, target) => {
      if (arr.length === 0) { return 0; }

      let low = 0;
      let high = arr.length - 1;
      while (low <= high) {
        let mid = parseInt((low + high) / 2);
        if (arr[mid].accuracy === target) { return mid; }
        else if (arr[mid].accuracy > target) { high = mid - 1; }
        else { low = mid + 1; }
      }
      return low;
    }

    let currentTime = Date.now()
    const interval = 60000 / this.props.storedBPM;
    if (this.tapCount !== 0) {
      let itv = currentTime - this.previousTime;
      let currentAcc = 1 - Math.min(Math.abs(itv / interval - 1), 1);
      this.sum += currentAcc*100;
      this.accuracy = this.sum / this.tapCount;
      this.index = searchPosition(this.props.storedRanking, this.accuracy);
    }
    if (this.tapCount === 7 & !this.toggleFadeOut) {
      this.toggleFadeOut = true;
    }
    else if (this.tapCount === 31) {
      var ranking;
      if (this.props.storedRanking.length === 0) {
        ranking = -1;
      }
      else {
        if (this.index !== null) {
          let tempTotal = this.props.storedRanking.length + 1;
          ranking = (100 * (tempTotal - this.index) / tempTotal)
        }
      }
      this.props.onSetAcc(this.accuracy, this.index, ranking);
      this.props.setState({ gameFinished: true });
    }
    this.previousTime = currentTime;
    this.tapCount += 1
    this.forceUpdate();
  }
  
  clickBackHandler = () => {
    this.props.onResetBPM();
    this.props.setState({ gameStarted: false });
  }
  
  clickHomeHandler = () => {
    this.props.onResetBPM();
    this.setState({ toggleHome: true });
  }

  componentDidMount() {
    this.props.onGetAccs(this.props.storedBPM);

    var count = 0;
    var vol = 1;
    const audios = [new Audio(PulseUp), new Audio(Pulse), new Audio(Pulse), new Audio(Pulse)];
    this.playSound = setInterval(() => {
      if (this.toggleFadeOut) {
        vol = (vol < 0.2) ? 0 : vol - 0.2
      }
      else {
        vol = 1;
      }
      audios[count].volume = vol;

      audios[count].play();
      if (count === 3) {
        count = 0;
      }
      else {
        count += 1;
      }
    }, 60000 / this.props.storedBPM);
  }

  componentWillUnmount() {
    clearInterval(this.playSound);
  }

  render() {
    if (this.state.toggleHome) {
      return <Redirect to="home" />;
    }

    var accText;
    if (this.tapCount >= 2) {
      accText = "Accuracy: " + this.accuracy.toFixed(5) + "%";
    }
    else {
      accText = "Tap here!"
    }

    var rankingText;
    if (this.props.storedRanking.length === 0) {
      rankingText = "You are the first player of this BPM!"
    }
    else {
      if (this.index !== null) {
        let tempTotal = this.props.storedRanking.length + 1;
        rankingText = "You are " + (100 * (tempTotal - this.index) / tempTotal).toFixed(5) + "% high."
      }
      else {
        rankingText = "Your ranking will be displayed here."
      }
    }

    var title = "Listen, and keep the beat!";
    var description;
    if (this.tapCount < 8) {
      description = "Tap by left-clicking or spacebar.";
    }
    else if (this.tapCount >= 8 && this.tapCount < 24) {
      description = "Keep tapping...";
    }
    else {
      description = (32 - this.tapCount) + " times remaining...";
    }
    
    return (
      <div>
        <div className='Title'>
          <h1>{title}</h1>
        </div>
        <div className='Description'>
          <h3>{description}</h3>
        </div>
        <div className='TapAreaContainer'>
          <button className='TapArea' onClick={this.TapHandler}>{accText}</button>
        </div>
        <div>
          {rankingText}
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

const mapStateToProps = (state) => {
  return {
    storedRanking: state.ac.ranking,
    storedBPM: state.bpm.bpm
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetAccs: (bpm) => dispatch(actionCreators.getAccs(bpm)),
    onSetAcc: (acc, idx, ran) => dispatch({ type: actionTypes.SET_ACC, accuracy: acc, index: idx, ranking: ran }),
    onResetBPM: () => dispatch({ type: actionTypes.RESET_ACC_AND_BPM })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);