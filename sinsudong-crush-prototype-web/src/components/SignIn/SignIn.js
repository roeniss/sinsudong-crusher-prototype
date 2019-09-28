import React, { Component } from 'react';

import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox, Modal} from 'antd';

import './SignIn.css';


class SignIn extends Component{

    state = {
        incorrect : false,
        incorrectUser : null
    }

    fetchUserInfo = async (res) => {
      console.log(res);
        axios.post('http://54.180.95.158:8080/login', {
          email : res.email,
          password : res.password,
        })
          .then(function (response) {           
            if(response.data.status == 204){
              console.log(response.data.status);
            }
            else{                      
              const tokenValue = response.data.data;
              const name = response.data.data.name;
              localStorage.setItem('token', tokenValue);
              localStorage.setItem('name',name);
            }         
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    
    handleSubmit = async(e) => {
      e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              this.fetchUserInfo(values).then(() => new Promise((resolve) => setTimeout(()=>{
                if(localStorage.getItem('token')!= null){
                  resolve();
                  window.location.reload();
                }
                else{
                  this.setState({
                    incorrect : true
                  });
                }

              }, 500)))
              .catch(function (error) {
                console.log(error);
              });
          }
        }); 
      };

      render() {
        const { getFieldDecorator } = this.props.form;
        const modalVisible = this.props.modalVisible;
        const setModalVisible = this.props.setModalVisible;
        const fetchState = this.props.fetchState;

        
        if(this.state.incorrect == false && this.state.incorrectUser == null){
          this.setState({
            incorrectUser : 
            <Form.Item className="warning">
            <h1></h1>
            </Form.Item>
          });
        } 
        else if(this.state.incorrect == true){
          this.setState({
            incorrectUser :           
            <Form.Item className="warning">
            <h1>올바르지 않은 아이디 또는 비밀번호입니다.</h1>
            </Form.Item>,
            incorrect : false
          })
        }
      
        return (
            <Modal className="signIn"
                id="signIn"
                title="로그인"
                centered
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                >  
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '이메일 주소를 입력해주세요!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '비밀번호를 입력해주세요!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            {this.state.incorrectUser}
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>로그인 정보 자동 저장</Checkbox>)}
              <a className="login-form-forgot" href="">
                비밀번호 찾기
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button"
              >
                로그인
              </Button>
              계정이 없으시다면? <a href="">가입하기!</a>
            </Form.Item>
          </Form>
        </Modal>
        );
      }
    }

export default Form.create()(SignIn)