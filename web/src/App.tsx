import * as React from 'react';
import { Component } from "react";
import './App.css';

import { Layout, Tabs, Row, Col } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;

// components
import Home from "./containers/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AppHeader from "./components/AppHeader";

import AuthContext from "./auth-context";
import User from "./controllers/user";

export interface IProps {}

export interface IState {
  isAuth: boolean
  toggleAuth: any
}

class App extends Component<IProps, IState> {
  public user = new User();
  constructor(props: IProps){
    super(props);   

    this.state = {
      isAuth: false,
      toggleAuth: this.toggleAuth
    }

    this.toggleAuth = this.toggleAuth.bind(this);
  }
  componentDidMount(){
    this.user.checkExistingSession()
      .then(isAuth => this.toggleAuth(isAuth))
  }
  signIn(values: any){
    this.user.signin(values)
      .then(isAuth => this.toggleAuth(isAuth))
  }
  signUp(values: any) {
    this.user.signup(values)
      .then(isAuth => this.toggleAuth(isAuth))
  }
  toggleAuth = (isAuth: boolean) =>{
    this.setState({ isAuth })
  }
  public render() {
    return (
      <AuthContext.Provider value={{isAuth: this.state.isAuth, toggleAuth: this.state.toggleAuth}}>
        <Layout>
          <AppHeader user={this.user}/>
          <Content>
            {this.state.isAuth ? <Home user={this.user}/> :
              <Row type="flex" justify="center" align="middle" style={{ height: 'inherit' }}>
                <Col sm={20} md={10}>Col</Col>
                <Col sm={20} md={10}>
                  <Tabs defaultActiveKey="2">
                    <TabPane tab="Signup" key="1">
                      <Signup callback={this.signUp.bind(this)} />
                    </TabPane>
                    <TabPane tab="Signin" key="2">
                      <Signin callback={this.signIn.bind(this)} />
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
