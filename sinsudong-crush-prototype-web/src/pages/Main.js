import React, { Component } from 'react';
import Home from '../components/Main/Home';
import NavbarComponent from '../components/NavigationBar/NavigationBar';
import SignUp from '../components/SignUp/SignUp';

import axios from 'axios';
import { Redirect } from "react-router-dom";

class Main extends Component {

  state = {
      
  }

  render() {
    return (
      <section id="main">
        <Home
          navbarComponent={(<NavbarComponent />)}
          signUp={(<SignUp />)}>
        </Home>
      </section>
    );
  };
}

export default Main;