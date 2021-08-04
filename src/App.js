import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';
import Home from './containers/Home/Home';
import Board from './containers/Board/Board';
import AddPost from './containers/AddPost/AddPost';
import Detail from './containers/Board/Detail/Detail';
import BPMGame from './containers/BPMGame/BPMGame'

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path="/home" exact render={() => <Home title="Home" />} />
          <Route path='/notice' exact render={() => <Board boardType="Notice" />} />
          <Route path="/notice/add" exact render={() => <AddPost boardType="Notice" />} />
          <Route path='/notice/:id' exact component={Detail} />
          <Route path="/free" exact render={() => <Board boardType="Free" />} />
          <Route path="/free/add" exact render={() => <AddPost boardType="Free" />} />
          <Route path="/free/:id" exact component={Detail} />
          <Route path="/game" exact component={BPMGame} />
          <Redirect exact from="/" to="/home" />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
