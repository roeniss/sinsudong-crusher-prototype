import React, { Component } from 'react';

import NavbarComponent from '../NavigationBar/NavigationBar';

import { Row, Col } from 'antd';

import axios from 'axios';
import { Redirect } from "react-router-dom";

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  Modal,
  message,
  Steps,
  Radio,
  Result
} from 'antd';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import './SignUp.css';

const { Option } = Select;
const { Step } = Steps;


class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      isSignedUp: false,
      authEmail: false,
      checkToggle: false,
      completeToggle: false,
      status: "validating",
      current: 0,
      res: []
    };
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  success = () => {
    message
      .loading('가입 처리 중입니다..', 2.0)
      .then(() => message.success('가입에 성공하였습니다.', 4.0))
  };
  validateEmail = async (email) => {

    axios.get('http://54.180.95.158:8080/users/email/check', {
      params: {
        email: email
      }
    })
      .then((response) => {
        if (response.data.message == "중복된 이메일입니다.") {
          this.setState({
            authEmail: false
          });
        }
        else {
          this.setState({
            authEmail: true
          });
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchUserInfo = async () => {

    axios.post('http://54.180.95.158:8080/users', {
      user: {
        name: this.state.res[0].name,
        email: this.state.res[0].email,
        password: this.state.res[0].password
      },
      userCharacter: {
        gender: this.state.res[1].gender,
        age: this.state.res[1].age,
        address: this.state.res[1].address,
        married: this.state.res[1].married,

        night: this.state.res[2].night,
        month: this.state.res[2].month,
        partner: this.state.res[2].partner,
        cost: this.state.res[2].cost,
        activity: this.state.res[2].activity
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.fetchUserInfo()
          .then(() => new Promise((resolve) => setTimeout(() => {
            const plusCurrent = this.state.current + 1;
            this.setState({ current: plusCurrent });
          }, 100))).catch(function (error) {
          });
      }
    });
  };

  handleNext = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.state.res.push(values);
        if(this.state.current != 2){
          const plusCurrent = this.state.current + 1;
          this.setState({ current: plusCurrent });
        }
      }
    });
    console.log(this.state.res);
  }



  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkEmail = (rule, value, callback) => {
    const form = this.props.form;
    if (this.state.authEmail) {
      this.setState({ status: "success" });
      this.countDown_success('사용 가능한 이메일입니다.');
    }
    else {
      this.setState({ status: "error" })
      this.countDown_fail('이미 사용 중인 이메일입니다');
    }
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('입력한 두 비밀번호가 일치하지 않습니다!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  countDown_success = (message) => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: '이메일 중복 체크',
      content: message
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }
  countDown_fail = (message) => {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: '이메일 중복 체크',
      content: message
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }

  onChange = current => {
    this.setState({ current });
  };

  componentDidMount() {
    // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav). 
    const targetElement = document.querySelector('#signUp');
    enableBodyScroll(targetElement);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const current = this.state.current;


    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return (
      <div>
        <NavbarComponent></NavbarComponent>
        <Row className="signup-title-col">
          <Col offset={3} span={18}>
            <Steps current={current} onChange={this.onChange}>
              <Step title="계정 정보 입력" description="회원 가입 정보" />
              <Step title="개인 기본 정보 입력" description="추천 서비스를 위한 조사" />
              <Step title="선호 여행 스타일 입력" description="추천 서비스를 위한 조사" />
            </Steps>
          </Col>
        </Row>
        <Row>
          <Col offset={8} span={8}>
            {this.state.current == 0 ?
              <Form className="signup-form"
                {...formItemLayout}>
                <Form.Item label="이름">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '이름을 입력해주세요!' }],
                  })(
                    <AutoComplete
                    >
                      <Input />
                    </AutoComplete>,
                  )}
                </Form.Item>
                <Form.Item label="E-mail" className="email"
                  validateStatus={this.state.status}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: '올바른 이메일 형식이 아닙니다!',
                      },
                      {
                        required: true,
                        message: '이메일 주소를 입력해주세요!',
                      },
                    ],
                  })(<Input className="email-input" />)}
                  <Button onClick={
                    () => {
                      this.setState({ checkToggle: true })
                      const email = this.props.form.getFieldValue("email");
                      this.validateEmail(email)
                        .then(() => new Promise((resolve) => setTimeout(() => {
                          this.checkEmail();
                        }, 300))).catch(function (error) {
                        });
                    }
                  } className="check-button" >중복검사</Button>

                </Form.Item>
                <Form.Item label="비밀번호" hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '비밀번호를 입력해주세요!',
                      },
                    ],
                    validateTrigger: 'onClick'
                  })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="비밀번호 확인" hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: '비밀번호를 다시 확인해주세요!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

              </Form> : null}
            {this.state.current == 1 ?
              <Form className="signup-form"
                {...formItemLayout}>
                <Form.Item label="성별">
                  {getFieldDecorator('gender', {
                    rules: [{ required: true, message: '성별을 선택해주세요!' }],
                  })(
                    <Radio.Group>
                      <Radio.Button value={1}>남성</Radio.Button>
                      <Radio.Button value={2}>여성</Radio.Button>
                    </Radio.Group>,
                  )}
                </Form.Item>
                <Form.Item label="연령">
                  {getFieldDecorator('age', {
                    rules: [{ required: true, message: '연령을 선택해주세요!' }],
                  })(
                    <Radio.Group>
                      <Radio value={1}>10대</Radio>
                      <Radio value={2}>20대</Radio>
                      <Radio value={3}>30대</Radio>
                      <Radio value={4}>40대</Radio>
                      <Radio value={5}>50대 이상</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
                <Form.Item label="거주 지역" hasFeedback>
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: '거주지역을 선택해주세요!' }],
                  })(
                    <Select placeholder="거주지역을 선택해주세요">
                      <Option value={1}>서울특별시</Option>
                      <Option value={2}>광주광역시</Option>
                      <Option value={3}>대구광역시</Option>
                      <Option value={4}>대전광역시</Option>
                      <Option value={5}>부산광역시</Option>
                      <Option value={6}>울산광역시</Option>
                      <Option value={7}>인천광역시</Option>
                      <Option value={8}>제주특별자치도</Option>
                      <Option value={9}>세종특별자치시</Option>
                      <Option value={10}>강원도</Option>
                      <Option value={11}>경기도</Option>
                      <Option value={12}>경상남도</Option>
                      <Option value={13}>경상북도</Option>
                      <Option value={15}>전라남도</Option>
                      <Option value={16}>전라북도</Option>
                      <Option value={17}>충청남도</Option>
                      <Option value={18}>충청북도</Option>
                    </Select>,
                  )}
                </Form.Item>
                <Form.Item label="혼인 상태">
                  {getFieldDecorator('married', {
                    rules: [{ required: true, message: '혼인 상태를 선택해주세요!' }],
                  })(
                    <Radio.Group>
                      <Radio.Button value={1}>미혼</Radio.Button>
                      <Radio.Button value={2}>기혼</Radio.Button>
                    </Radio.Group>,
                  )}
                </Form.Item>

              </Form> : null
            }
            {this.state.current == 2 ?
              <Form className="signup-form"
                {...formItemLayout}>
                <Form.Item label="숙박 여부">
                  {getFieldDecorator('night', {
                    rules: [{ required: true, message: '숙박 여부 선호를 선택해주세요!' }],
                  })(
                    <Radio.Group>
                      <Radio.Button value={1}>당일치기 여행 선호</Radio.Button>
                      <Radio.Button value={2}>숙박 여행 선호</Radio.Button>
                    </Radio.Group>,
                  )}
                </Form.Item>
                <Form.Item label="여행 시기">
                  {getFieldDecorator('month', {
                    rules: [{ required: true, message: '선호하는 여행 시기를 선택해주세요!' }],
                  })(
                    <Radio.Group>
                      <Radio.Button value={1}>1월</Radio.Button>
                      <Radio.Button value={2}>2월</Radio.Button>
                      <Radio.Button value={3}>3월</Radio.Button>
                      <Radio.Button value={4}>4월</Radio.Button>
                      <Radio.Button value={5}>5월</Radio.Button>
                      <Radio.Button value={6}>6월</Radio.Button>
                      <Radio.Button value={7}>7월</Radio.Button>
                      <Radio.Button value={8}>8월</Radio.Button>
                      <Radio.Button value={9}>9월</Radio.Button>
                      <Radio.Button value={10}>10월</Radio.Button>
                      <Radio.Button value={11}>11월</Radio.Button>
                      <Radio.Button value={12}>12월</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item label="동행할 사람">
                  {getFieldDecorator('partner', {
                    rules: [{ required: true, message: '동행할 사람의 유형을 선택해주세요!' }],
                  })(
                    <Radio.Group>
                      <Radio value={1}>친구</Radio>
                      <Radio value={2}>연인</Radio>
                      <Radio value={3}>동료</Radio>
                      <Radio value={4}>단체</Radio>
                      <Radio value={5}>친척</Radio>
                      <Radio value={6}>기타</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item label="평균 총 지출">
                  {getFieldDecorator('cost', {
                    rules: [{ required: true, message: '여행 평균 총 지출을 선택해주세요!' }],
                  })(
                    <Select placeholder="여행 평균 총 지출을 선택해주세요">
                      <Option value={1}>10만 원 미만</Option>
                      <Option value={2}>10만 원 ~ 20만 원</Option>
                      <Option value={3}>20만 원 ~ 30만 원</Option>
                      <Option value={4}>30만 원 ~ 40만 원</Option>
                      <Option value={5}>40만 원 ~ 50만 원</Option>
                      <Option value={6}>50만 원 ~ 100만 원</Option>
                      <Option value={7}>100만 원 이상</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="여행지에서의 활동">
                  {getFieldDecorator('activity', {
                    rules: [{ required: true, message: '여행지에서의 활동을 선택해주세요!' }],
                  })(
                    <Select placeholder="여행지에서의 활동을 선택해주세요">
                      <Option value={1}>자연 및 풍경 감상</Option>
                      <Option value={2}>음식 관광</Option>
                      <Option value={3}>스포츠 활동</Option>
                      <Option value={4}>역사 유적지 방문</Option>
                      <Option value={5}>테마파크</Option>
                      <Option value={6}>지역 축제</Option>
                      <Option value={7}>체험 프로그램</Option>
                      <Option value={8}>시티 투어</Option>
                      <Option value={9}>드라마 촬영지</Option>
                      <Option value={10}>가족 친지 방문</Option>
                      <Option value={11}>회의 참가</Option>
                      <Option value={12}>교육, 연수</Option>
                      <Option value={13}>유흥</Option>
                      <Option value={14}>기타</Option>
                    </Select>
                  )}
                </Form.Item>

              </Form> : null
            }
            {this.state.current == 3 ?
              <Result
              status="success"
              title="회원 가입 성공"
              subTitle="신수동 크러셔 서비스를 이용할 준비가 되었습니다."
            /> : null
            }
          </Col>
        </Row>
        <Row>
          <Col className="signup-button-col" offset={15} span={6}>
            {this.state.current == 0 ?
              <Button type="primary" htmlType="submit" onClick={(e) => {
                if (this.state.status == "error") {
                  this.countDown_fail("이메일 중복 체크를 해주세요!");
                }
                this.handleNext(e);

              }}>
                다음
                                        </Button>
              : null
            }
            {this.state.current == 1 ?
              <Button type="primary" htmlType="submit" onClick={(e) => {
                this.handleNext(e);

              }}>
                다음
                    </Button>
              : null
            }
            {this.state.current == 2 ?
              <Button type="primary" htmlType="submit" onClick={(e) => {
                this.handleNext(e);
                this.handleSubmit(e);
              }}>
                가입
                                        </Button>
              : null
            }
          </Col>
        </Row>
        {this.state.authEmail}
      </div>
    );
  }
}
export default Form.create()(SignUp)