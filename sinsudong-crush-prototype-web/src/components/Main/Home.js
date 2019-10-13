import React, { Component } from 'react';
import { Row, Col, notification, Result, Icon, Button, Table } from 'antd';
import axios from 'axios';

import { withRouter } from "react-router-dom";

import './Home.css';

const columns = [
  {
    title: '이름',
    dataIndex: 'user.name',
    render: text => <a>{text}</a>,
  },
  {
    title: '성별',
    dataIndex: 'userCharacter.gender',
    render: text => text == 1 ? <a>남성</a> : <a>여성</a>,
  },
  {
    title: '연령',
    dataIndex: 'userCharacter.age',
    render: text => text == 1 ? <a>10대</a> : text == 2? <a>20대</a>
    : text == 3? <a>30대</a> : text == 4? <a>40대</a> : <a>50대 이상</a>
  },
  {
    title: '주소',
    dataIndex: 'userCharacter.address',
    render: text => text == 1 ? <a>서울특별시</a> : text == 2? <a>광주광역시</a>: text == 3? <a>대구광역시</a>
    : text == 4? <a>대전광역시</a>: text == 5? <a>부산광역시</a>: text == 6? <a>울산광역시</a>
    : text == 7? <a>인천광역시</a>: text == 8? <a>제주특별자치도</a>: text == 9? <a>세종특별자치시</a>
    : text == 10? <a>강원도</a>: text == 11? <a>경기도</a>: text == 12? <a>경상북도</a>
    : text == 13? <a>경상남도</a>: text == 14? <a>전라남도</a>: text == 15? <a>전라북도</a>
    : text == 16? <a>충청남도</a> : <a>충청북도</a>
  },
  {
    title: '혼인 상태',
    dataIndex: 'userCharacter.married',
    render: text => text == 1 ? <a>미혼</a> : <a>기혼</a>,
  },
  {
    title: '숙박 여부',
    dataIndex: 'userCharacter.night',
    render: text => text == 1 ? <a>당일치기 여행 선호</a> : <a>숙박 여행 선호</a>,
  },
  {
    title: '여행 시기',
    dataIndex: 'userCharacter.month',
    render: text => text == 1 ? <a>1월</a> : text == 2? <a>2월</a>: text == 3? <a>3월</a>
    : text == 4? <a>4월</a>: text == 5? <a>5월</a>: text == 6? <a>6월</a>
    : text == 7? <a>7월</a>: text == 8? <a>8월</a>: text == 9? <a>9월</a>
    : text == 10? <a>10월</a>: text == 11? <a>11월</a>: <a>12월</a>
  },
  {
    title: '동행할 사람',
    dataIndex: 'userCharacter.partner',
    render: text => text == 1 ? <a>친구</a> : text == 2? <a>연인</a>: text == 3? <a>동료</a>
    : text == 4? <a>단체</a>: text == 5? <a>친척</a> : <a>기타</a>
  },
  {
    title: '평균 총 지출',
    dataIndex: 'userCharacter.cost',
    render: text => text == 1 ? <a>10만 원 미만</a> : text == 2? <a>10만 원 ~ 20만 원</a>: text == 3? <a>20만 원 ~ 30만 원</a>
    : text == 4? <a>30만 원 ~ 40만 원</a>: text == 5? <a>40만 원 ~ 50만 원</a> 
    : text == 6 ? <a>50만 원 ~ 100만 원</a> : <a>기타</a>
  },
  {
    title: '여행지에서의 활동',
    dataIndex: 'userCharacter.activity',
    render: text => text == 1 ? <a>자연 및 풍경 감상</a> : text == 2? <a>음식 관광</a>: text == 3? <a>스포츠 활동</a>
    : text == 4? <a>역사 유적지 방문</a>: text == 5? <a>테마파크</a> : text == 6 ? <a>지역 축제</a> 
    : text == 7? <a>체험 프로그램</a>: text == 8? <a>시티 투어</a> : text == 9 ? <a>드라마 촬영지</a> 
    : text == 10? <a>가족 친지 방문</a>: text == 11? <a>회의 참가</a> : text == 12 ? <a>교육, 연수</a>
    : text == 13? <a>유흥</a> 
    : <a>기타</a>
  }
];

class Home extends Component {

  state = {
    isClicked: false,
  }

  getUserList = async () => {
    axios.get('http://54.180.95.158:8080/users')
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          resdata: response.data.data
        });
      });
  }

  render() {
    const navbarComponent = this.props.navbarComponent;

    return (
      <div class="banner-div">
        {navbarComponent}
        <Row style={{ height: "100vh" }}>
          <Col
          xs={{span : 24, offset : 0}}
          sm={{span : 24, offset : 0}} md={{span : 20, offset : 2}}
          lg={{span : 20, offset : 2}} xl={{span : 20, offset : 2}}
          
          style={{ marginTop: "25vh" }}>
            {
              this.state.isClicked ?
                <Table className="banner-user-table" columns={columns} dataSource={this.state.resdata} />
                :
                <Result
                  icon={<Icon type="user" style={{ color: "black" }} />}
                  title="회원 정보 조회"
                  extra={<Button className="banner-user-button"
                    onClick={() => {
                      this.setState({ isClicked: true })
                      this.getUserList();
                    }}>조회하기</Button>}
                />
            }

          </Col>
        </Row>

      </div>
    );
  };
}


export default withRouter(Home);