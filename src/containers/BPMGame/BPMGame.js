import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import GameSetting from '../../components/BPMGame/GameSetting';
import Game from '../../components/BPMGame/Game';
import GameResult from '../../components/BPMGame/GameResult';
import './BPMGame.css'

class BPMGame extends Component {
  state = {
    gameStarted: false,
    gameFinished: false,
  }
  
  render() {
    return (
      <div className="BPMGame">
        {
          this.state.gameStarted ? (
            this.state.gameFinished ? 
            <GameResult setState={p => this.setState(p)} /> : 
            <Game setState={p => this.setState(p)} />
          ) : <GameSetting setState={p => this.setState(p)} />
        }
      </div>
      
    );
  }
}
export default BPMGame;