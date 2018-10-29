import * as React from "react";
import { Component } from "react";

import { Layout, Button } from 'antd';
const { Header } = Layout;

import AuthContext from "../auth-context";

class AppHeader extends Component<{}, {}>{
  static contextType = AuthContext;
  logout() {
    fetch("/user/logout", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.context.toggleAuth();
      })
  }
  render(){
    return(
      <Header>
        {this.context.isAuth ?
          <Button onClick={this.logout.bind(this)}>Logout</Button>
          : null
        }
        
      </Header>
    )
  }
}

export default AppHeader