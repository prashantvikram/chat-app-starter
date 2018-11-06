import * as React from "react";
import { Component } from "react";

import { Layout, Button, Avatar, Popover } from 'antd';
const { Header } = Layout;

import AuthContext from "../auth-context";
import User from 'src/controllers/user';

interface IProps {
  user: User
}

class AppHeader extends Component<IProps, {}>{
  static contextType = AuthContext;
  logout() {
    this.props.user.signout().then(isAuth => this.context.toggleAuth(isAuth))
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
          <Popover content={content} title={this.props.user.username} trigger="click" placement="bottomRight">
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