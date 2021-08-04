import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import GameSetting from '../../components/BPMGame/GameSetting';
import Game from '../../components/BPMGame/Game';
import GameResult from '../../components/BPMGame/GameResult';
import './BPMGame.css'

class BPMGame extends Component {
  state = {
    bpm: null,
    accuracy: null,
    page: 1,
  }

  render() {
    let currentPage;
    switch (this.state.page) {
      case 1:
        currentPage = (
          <GameSetting setState={p => this.setState(p)} />
        );
        break;

      case 2:
        currentPage = (
          // interval: time interval of 1/4 note at current bpm as ms
          <Game bpm={this.state.bpm} interval={60000 / this.state.bpm} setState={p => this.setState(p)} />
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