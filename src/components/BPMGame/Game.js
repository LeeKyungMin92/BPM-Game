import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './Style.css';
import * as actionCreators from '../../store/actions/index';

class Game extends Component {
  state = {
    title: "Listen, and keep the beat!",
    description: "Tap by left-clicking or spacebar.",
    count: 0,
    sum: 0,
    accuracy: null,
    index: null,
    previousTime: null,
    toggleHome: false,
  }
  
  count = 0;
  
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
    if (this.state.count !== 0) {
      let itv = currentTime - this.state.previousTime;
      let currentAcc = 1 - Math.min(Math.abs(itv / this.props.interval - 1), 1);
      let sum = this.state.sum + currentAcc*100;
      let acc = sum / this.state.count;
      let index = searchPosition(this.props.storedRanking, acc);
      this.setState({
        sum: sum, 
        accuracy: acc, 
        index: index
      });
    }
    if (this.state.count === 7) {
      this.setState({description: "Keep tapping..."});
      this.props.setState({toggleFadeOut: true});
    }
    if (this.state.count >= 23) {
      this.setState((prevState) => ({description: (31 - prevState.count) + " times remaining..."}));
    }
    if (this.state.count === 31) {
      var ranking;
      if (this.props.storedRanking.length === 0) {
        ranking = -1;
      }
      else {
        if (this.state.index !== null) {
          let tempTotal = this.props.storedRanking.length + 1;
          ranking = (100 * (tempTotal - this.state.index) / tempTotal)
        }
      }
      this.props.setState({
        accuracy: this.state.accuracy, 
        index: this.state.index, 
        ranking: ranking, 
        pageNum: 3, 
        toggleFadeOut: false
      });
    }
    console.log(this.state.index);
    console.log(this.props.storedRanking);
    this.setState((prevState) => ({
      count: prevState.count + 1, 
      previousTime: currentTime
    }));
  }
  
  clickBackHandler = () => {
    this.props.setState({
      bpm: null, 
      accuracy: null, 
      pageNum: 1, 
      toggleFadeOut: false
    });
  }
  
  clickHomeHandler = () => {
    this.setState({ toggleHome: true });
  }

  componentWillUnmount() {
    clearInterval(this.props.setInterval);
  }

  componentDidMount() {
    this.props.onGetAccs();
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

    var rankingText;
    if (this.props.storedRanking.length === 0) {
      rankingText = "You are the first player of this BPM!"
    }
    else {
      if (this.state.index !== null) {
        let tempTotal = this.props.storedRanking.length + 1;
        rankingText = "You are " + (100 * (tempTotal - this.state.index) / tempTotal).toFixed(5) + "% high."
      }
      else {
        rankingText = "Your ranking will be displayed here."
      }
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
    storedRanking: state.ac.ranking
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let bpm = ownProps.bpm;
  return {
    onGetAccs: () => dispatch(actionCreators.getAccs(bpm)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));