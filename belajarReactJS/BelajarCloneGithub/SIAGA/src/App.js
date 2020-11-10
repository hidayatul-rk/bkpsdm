import React from 'react';
import './css/App.css';
import './css/home.css';
import './css/result.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ResultPage from './pages/ResultPage';
import DetailPage from './pages/DetailPage';
import HomePage from "./pages/HomePage";
import AdminPage from './pages/AdminPage';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/search" component={ResultPage}/>
                    <Route path="/detail" component={DetailPage}/>
                    <Route path="/admin" component={AdminPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
