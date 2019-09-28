import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

class Root extends React.Component{
    render(){
      document.title = "신수동 크러셔"
      return(
        <BrowserRouter> 
            <App/>
        </BrowserRouter>
      )
    }
  }

export default Root;