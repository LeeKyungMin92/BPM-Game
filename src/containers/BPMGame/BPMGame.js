import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import GameSetting from '../../components/BPMGame/GameSetting';
import Game from '../../components/BPMGame/Game';
import GameResult from '../../components/BPMGame/GameResult';
import './BPMGame.css'
import * as Pulse from '../../components/BPMGame/Sounds/pulse.flac';
import * as PulseUp from '../../components/BPMGame/Sounds/pulseUp.flac';
//import * as WoodBlock from '../../components/BPMGame/Sounds/woodblock.wav';
//import * as WoodBlockUp from '../../components/BPMGame/Sounds/woodblockUp.wav';

class BPMGame extends Component {
  state = {
    bpm: null,
    accuracy: null,
    page: 1,
    toggleFadeOut: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.toggleFadeOut !== nextState.toggleFadeOut && !this.state.toggleFadeOut);
  }
  
  count = 0;
  vol = 1;
  render() {
    var playSound = setInterval(() => {
      if (this.state.page === 2) {
        if (this.count === 0) {
          this.audio = new Audio(PulseUp);
        }
        else {
         this.audio = new Audio(Pulse);
        }
        this.audio.play();
        
        if (this.count === 3) {
          this.count = 0;
        }
        else {
          this.count += 1;
        }

        if (this.state.toggleFadeOut) {
          this.vol -= 0.2
          this.audio.volume = this.vol;
          if (this.audio.volume < 0.2) {
            clearInterval(playSound);
            return;
          }
        }
        else {
          this.vol = 1;
          this.audio.volume = 1;
        }
      }
      else {
        clearInterval(playSound);
        return;
      }
    }, 60000 / this.state.bpm);

    var currentPage;
    switch (this.state.page) {
      case 1:
        this.count = 0;
        currentPage = (
          <GameSetting setState={p => this.setState(p)} />
        );
        break;

      case 2:
        currentPage = (
          // interval: time interval of 1/4 note at current bpm as ms
          <Game bpm={this.state.bpm} interval={60000 / this.state.bpm} setInterval={playSound} setState={p => this.setState(p)} />
        );
        break;

      case 3:
        currentPage = (
          <GameResult bpm={this.state.bpm} accuracy={this.state.accuracy} setState={p => this.setState(p)} />
        )
        break;

      default:
        break;
    }
    return (
      <div className="BPMGame">
        {currentPage}
      </div>
    );
  }
}
export default BPMGame;