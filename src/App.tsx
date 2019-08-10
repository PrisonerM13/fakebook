import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Post from './components/Post';
import Feed from './containers/Feed';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header" />
      <Router>
        <Switch>
          <Route path="/:id" component={Post} />
          <Route path="/" component={Feed} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
