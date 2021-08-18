import React, { Component } from 'react';
import 'react-dropdown-now/style.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './Style.css';
import * as actionCreators from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onStoreAcc: (bpm, acc, index) => dispatch(actionCreators.postAcc(bpm, {accuracy: acc, index: index})),
    onResetBPM: () => dispatch({ type: actionTypes.RESET_ACC_AND_BPM })
  };
};

const mapStateToProps = (state) => {
  return {
    storedBPM: state.bpm.bpm,
    storedAcc: state.bpm.accuracy,
    storedIdx: state.bpm.index,
    storedRan: state.bpm.ranking,
  };
};

class GameResult extends Component {
  state = {
    toggleHome: false,
  }
  
  clickRestartHandler = () => {
    this.props.setState({ gameStarted: false, gameFinished: false });
  }
  
  clickHomeHandler = () => {
    this.setState({toggleHome: true});
  }

  componentDidMount() {
    this.props.onStoreAcc(this.props.storedBPM, this.props.storedAcc, this.props.storedIdx);
  }

  componentWillUnmount() {
    this.props.onResetBPM();
  }

  render() {
    if (this.state.toggleHome) {
      return <Redirect to="home" />;
    }
    var rankingText;
    if (this.props.storedRan === -1) {
      rankingText = "You are the first player of this BPM!"
    }
    else {
      rankingText = "Your accuracy is " + this.props.storedRan.toFixed(5) + "% high.";
    }

    return (
      <div>
        <div className='Title'>
          <h1>Result ({this.props.storedBPM}BPM)</h1>
        </div>
        <div className='Description'>
          <h2>Your accuracy is...</h2>
        </div>
        <div className="Result">
          <h1>{this.props.storedAcc.toFixed(2)}%</h1>
        </div>
        <div>
          <h3>{rankingText}</h3>
        </div>
        <button className='Buttons' onClick={this.clickRestartHandler}>Restart</button>
        <button className='Buttons' onClick={this.clickHomeHandler}>Home</button>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameResult);