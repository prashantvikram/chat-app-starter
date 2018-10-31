import * as React from "react";
import { Component } from "react";

import { Layout, Button, Avatar, Popover } from 'antd';
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
    const content = (
      <div>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    );
    return(
      <Header>
        {this.context.isAuth ?
        <div>
          <Popover content={content} title={this.context.userId} trigger="click" placement="bottomRight">
              <Avatar size="large" src="https://api.adorable.io/avatars/face/eyes4/nose4/mouth10/FFF" />
          </Popover>          
        </div>
          : null
        }
        
      </Header>
    )
  }
}

export default AppHeader