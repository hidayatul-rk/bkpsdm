import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import App from './App';
import MenuMakanan from './Pages/MenuMakanan';
import MenuMinuman from './Pages/MenuMinuman';
import Kontak from './Pages/Kontak';

const appRoute = () => (
    <Router>
        <div>
            <Route path="/" exact component={App} />
            <Route path="/menu_makanan" exact component={MenuMakanan} />
            <Route path="/menu_minuman" exact component={MenuMinuman} />
            <Route path="/kontak" exact component={Kontak} />
        </div>
    </Router>
);
export default appRoute

