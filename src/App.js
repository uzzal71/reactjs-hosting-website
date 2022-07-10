import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticleList from './pages/ArticleList';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (    
    <div className="App">
      <div id="page-body">
      <Switch>
        <Route exact path="/">
            <HomePage />
        </Route>
        <Route path="/about">
            <AboutPage />
        </Route>
        <Route path="/articles-list">
            <ArticleList />
        </Route>
        <Route path="/article">
            <ArticlePage />
        </Route>
      </Switch>
      </div>
    </div>
  );
}

export default App;