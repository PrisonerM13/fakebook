import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import PostList from './components/PostList';
import Post from './components/Post';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header" />
      <Router>
        <Switch>
          <Route path="/:id" component={Post} />
          <Route path="/" component={PostList} />
          <Route render={() => 'Page not found'}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
