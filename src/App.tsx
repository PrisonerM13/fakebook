import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import PostForm from './components/PostForm';
import Feed from './containers/Feed';
import IPost from './models/IPost';
import DataService from './services/data.service';

export const dataService = new DataService<IPost>('posts', '_id');

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header" />
      <Router>
        <Switch>
          <Route path="/:id" component={PostForm} />
          <Route path="/" component={Feed} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
