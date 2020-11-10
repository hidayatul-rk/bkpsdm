import React from 'react';
import './App.css';
// import Inline from './Page/inline'
// import Internal from './Page/Internal'
import Home from './Component/Home'
import Belajar from './Component/Belajar'
import About from './Component/About'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Routingpage from './Component/Routingpage';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/Belajar">Belajar</Link> */}
        <Routingpage />
        <Switch>
          <Route path="/About">
            <About />
          </Route>

          <Route path="/belajar">
            <Belajar />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </Router>

      {/* <Internal /> */}

      {/* <Inline /> */}

    </div>
  );
}

export default App;
