import * as React from 'react';
import { Component } from "react";
// import { Switch, Route } from 'react-router-dom'
import './App.css';

import { Layout } from 'antd';
const { Content } = Layout;

// screens
import IndexScreen from "./screens/Index";

// components
// import Home from "./components/Home";
// import Signin from "./components/Signin";
// import Signup from "./components/Signup";
import AppHeader from "./components/AppHeader";

export interface IProps {}

export interface IState {
  isAuthenticated: boolean
}

class App extends Component<IProps, IState> {
  componentWillMount(){
    // this.props.checkAuthentication()
  }
  public render() {
    return (
      <Layout>
          <AppHeader />
        <Content>
          <IndexScreen />
        </Content>
      </Layout>
    );
  }
}


export default App;
