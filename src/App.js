import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Splash from './routes/nex/splash';
import Home from './routes/nex/home';

import FirebaseService from './services/firebase-service';
import UserInfoService from './services/user-info-service';
import ClassFeedService from './services/class-feed-service';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        FirebaseService.init();
        UserInfoService.init();
        ClassFeedService.init();

        window.fbs = FirebaseService;
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App fill">
                    <Route exact path='/' component={Splash} />
                    <Route path='/classes' component={Home} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
