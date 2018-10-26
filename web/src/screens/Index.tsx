import * as React from "react";
import { Component } from "react";

import Signin from "../components/Signin";
import Home from "../components/Home";

export interface IProps {}

export interface IState {
  isAuthenticated: boolean
}

class IndexPage extends Component<IProps, IState>{
  constructor(props: IProps){
    super(props);

    this.state = {
      isAuthenticated: false
    }
  }
  render() {
    return (
      this.state.isAuthenticated ? <Home /> : <Signin />
      
    )
  }
}

export default IndexPage;