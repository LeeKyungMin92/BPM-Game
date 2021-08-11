import React, { Component } from 'react';
import 'react-dropdown-now/style.css';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './Style.css';
import * as actionCreators from '../../store/actions/index';

const mapDispatchToProps = (dispatch, ownProps) => {
  let bpm = ownProps.bpm;
  return {
    onStoreAcc: (acc, index) => dispatch(actionCreators.postAcc(bpm, {accuracy: acc, index: index}))
  };
};

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

  componentDidMount() {
    this.props.onStoreAcc(this.props.accuracy, this.props.index);
  }

  render() {
    if (this.state.toggleHome) {
      return <Redirect to="home" />;
    }
    var rankingText;
    if (this.props.ranking === -1) {
      rankingText = "You are the first player of this BPM!"
    }
    else {
      rankingText = "Your accuracy is " + this.props.ranking.toFixed(5) + "% high.";
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
        <div>
          <h3>{rankingText}</h3>
        </div>
        <button className='Buttons' onClick={this.clickRestartHandler}>Restart</button>
        <button className='Buttons' onClick={this.clickHomeHandler}>Home</button>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(GameResult);