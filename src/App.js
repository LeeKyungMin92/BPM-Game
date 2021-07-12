import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home/Home';
import NoticeBoard from './containers/NoticeBoard/NoticeBoard';
import AddNotice from './containers/AddNotice/AddNotice';
import NoticeDetail from './containers/NoticeBoard/NoticeDetail/NoticeDetail';
import FreeBoard from './containers/FreeBoard/FreeBoard';
import AddFree from './containers/AddFree/AddFree';
import FreeDetail from './containers/FreeBoard/FreeDetail/FreeDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/home" exact render={() => <Home title="Home" />} />
          <Route path='/notice' exact render={() => <NoticeBoard title="Notice" />} />
          <Route path='/notice/:id' exact component={NoticeDetail} />
          <Route path="/addnotice" exact component={AddNotice} />
          <Route path="/free" exact render={() => <FreeBoard title="Free" />} />
          <Route path="/free/:id" exact component={FreeDetail} />
          <Route path="/addfree" exact component={AddFree} />
          <Redirect exact from="/" to="/home" />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
