import React, { Component } from 'react';
import { Row, Col, notification } from 'antd';

import { withRouter } from "react-router-dom";

import './Home.css';

class Home extends Component {

  render() {
    const navbarComponent = this.props.navbarComponent;

    return (
      <div class="banner-div">
        {navbarComponent}
      </div>
    );
  };
}


export default withRouter(Home);