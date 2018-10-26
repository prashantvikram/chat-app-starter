import * as React from "react";
import { Component } from "react";

import { Layout } from 'antd';

const { Header } = Layout;

interface IProps {
  // history: MemoryHistory
}

interface IState {
  // isAuthenticated: boolean
}

class AppHeader extends Component<IProps, IState>{
  render(){
    return(
      <Header>Header</Header>
    )
  }
}

export default AppHeader