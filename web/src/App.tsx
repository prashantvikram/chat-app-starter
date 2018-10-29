import * as React from 'react';
import { Component } from "react";
import './App.css';

import { Layout, Tabs, Row, Col } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;

// components
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AppHeader from "./components/AppHeader";

import AuthContext from "./auth-context";

export interface IProps {}

export interface IState {
  isAuth: boolean,
  toggleAuth: any
}

class App extends Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    
    this.state = {
      isAuth: false,
      toggleAuth: this.toggleAuth
    }

    this.checkExistingSession = this.checkExistingSession.bind(this);
    this.toggleAuth = this.toggleAuth.bind(this);
  }
  componentWillMount(){
    this.checkExistingSession();
  }
  checkExistingSession() {
    fetch("/user/", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.hasOwnProperty('passport')) {
        if (json.passport.hasOwnProperty('user')) {
          this.toggleAuth();
        }
      }
    });
  }
  toggleAuth = () => {
    this.setState(state =>{
      return {
        isAuth: !state.isAuth,
      }
    });
  }
  public render() {
    return (
      <AuthContext.Provider value={{ isAuth: this.state.isAuth, toggleAuth: this.state.toggleAuth }}>
        <Layout>
            <AppHeader />
          <Content>
            {this.state.isAuth ? <Home /> :
              <Row type="flex" justify="center" align="middle" style={{height: 'inherit'}}>
                <Col sm={20} md={10}>Col</Col>
                <Col sm={20} md={10}>
                  <Tabs defaultActiveKey="2">
                    <TabPane tab="Signup" key="1">
                      <Signup />
                    </TabPane>
                    <TabPane tab="Signin" key="2">
                      <Signin />
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            }            
          </Content>
        </Layout>
      </AuthContext.Provider>
    );
  }
}

export default App;
