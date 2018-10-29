import * as React from "react";
import { Component } from "react";

import AuthContext from "../auth-context";

import AuthTabs from "../components/AuthTabs";
import Home from "../components/Home";

class IndexPage extends Component<{}, {}>{
  static contextType = AuthContext;
  render() {
    console.log(this.context.isAuth)
    return (
      this.context.isAuth ? <Home /> : <AuthTabs />
      
    )
  }
}

export default IndexPage;