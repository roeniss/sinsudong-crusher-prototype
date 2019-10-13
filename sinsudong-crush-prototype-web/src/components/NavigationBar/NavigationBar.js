import React, { Component } from 'react';

import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import './NavigationBar.css'
import { Link } from 'react-router-dom';

import { Row, Col } from 'antd';


import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import animateScrollTo from 'animated-scroll-to';


class NavigationBar extends Component{
    state = {
        signUpToggle : false,
        form : null,
        modal1Visible: false,
        modal2Visible: false,

        userNav : null,
        tokenValue : "",
        nameValue : "",

        isLogIn : false,

        afterLogin : null,
        fetchState : false,

        loginState : 0
    }
  
    componentDidMount(){
      this.setState({
        element : 
          {element : document.getElementById("navbar"), speed: 100,minDuration: 700,}
      });
      if(document.getElementById("main") != null){
        this.setState({
            elementTop : 
            {element : document.getElementById("main"), speed: 100,minDuration: 700,}
        });
    }
      if(document.getElementById('banner')!= null){
        this.setState({
            height : document.getElementById('banner').clientHeight
        });
        }
    }
    
    setModal1Visible = (v) =>{
        this.setState({ 
            modal1Visible : v
        }); 
    }
    
    setModal2Visible = (v) =>{
        this.setState({ 
            modal2Visible : v
        });
    }

    setTokenValue = () =>{
        const localToken = localStorage.getItem('token');
        return localToken;
    }

    setNameValue = () =>{
        const localName = localStorage.getItem('name');
        return localName;
    }

    logOut = () =>{
        localStorage.clear();
        this.setState({
            tokenValue : "",
            nameValue : "",
            isLogIn : false
        });
        window.location.reload();
    }

    loginNavbarChange = () => {
        
        if(localStorage.getItem('token')!=null && this.state.tokenValue==""){
            const token = this.setTokenValue();
            const name = this.setNameValue();

            this.setState({
                tokenValue : token,
                nameValue : name
            });
        }
        
        else if(this.state.tokenValue != "" && this.state.isLogIn == false 
        && this.state.afterLogin!=null){
            this.setState({
                userNav : this.state.afterLogin,
                isLogIn : true
            });    
        }
    }

    

    render(){
        const signUpToggle = this.state.signUpToggle;

        const modal1Visible  = this.state.modal1Visible;
        const setModal1Visible = this.setModal1Visible;

        const nameValue = this.state.nameValue;

        const logOut = this.logOut;
        const fetchState = this.state.fetchState;

        if(localStorage.getItem('token') != null){
            this.loginNavbarChange();
        }

        const beforeLogin = 
        <Nav className="before-login-text">
            <Nav.Link onClick={() => this.setModal1Visible(true)}>로그인</Nav.Link>
            <Nav.Link href= "/signup">
                회원가입
            </Nav.Link>
        </Nav>

        if(this.state.userNav == null){
            this.setState({
                userNav : beforeLogin
            });
        }

        if(this.state.afterLogin == null && this.state.nameValue !="" &&
        localStorage.getItem('token') != null){
            this.setState({
                afterLogin : 
                <Nav className="login">
                    <NavBar.Text className="nav-txt">
                        {this.state.nameValue}님 안녕하세요!
                    </NavBar.Text>
                    <Nav.Link className="nav-link" href="/myPage">
                        마이페이지
                    </Nav.Link>
                    <Nav.Link onClick={logOut}>
                        로그아웃
                    </Nav.Link>
                </Nav>  
            })
        }
            
        
        return (          
            <Row> 
                    <NavBar collapseOnSelect bg="dark" variant="dark" fixed="top">
                            <Col xs={{span : 4, offset : 0}} xl={{span : 4, offset : 0}}
                            lg={{span : 4, offset : 10}} xl={{span : 4, offset : 10}}>
                            <NavBar.Brand>
                                <Link onClick={() => animateScrollTo(0, this.state.elementTop)} to= "/" className = "title" style={{ textDecoration: 'none', color: 'black' }}>
                                  <h1 class="nav-title">신수동 크러셔</h1>
                                </Link>
                            </NavBar.Brand>                           
                            </Col>
                            <Col xs={{span : 12, offset : 8}} sm={{span : 12, offset : 8}} 
                            lg={{span : 6, offset : 4}} xl={{span : 6, offset : 4}}>
                            <NavBar.Collapse className="navbar-collapse">
                                {this.state.userNav}
                                <SignIn modalVisible={modal1Visible}
                                        setModalVisible={setModal1Visible}
                                        nameValue={nameValue}
                                        fetchState={fetchState}/>
                            </NavBar.Collapse>
                            </Col>
                       
                    </NavBar>
                    </Row>
        );
    }
}
    
  export default NavigationBar;