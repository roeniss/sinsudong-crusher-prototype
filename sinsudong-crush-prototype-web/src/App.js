import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Main from './pages/Main';
import SignUp from './components/SignUp/SignUp';

class App extends Component {

    render() {

        return (
                <Router>
                    <Route exact path="/" component={Main} />
                    <Route path="/signup" component={SignUp} />
                </Router>
        );
    }
}

export default App;