import * as React from "react";
import { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from "antd";
import { MemoryHistory } from 'history';

import { Layout } from 'antd';

const { Sider, Content } = Layout;

interface IProps {
  history: MemoryHistory
}

class Home extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }
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
        this.props.history.push('/signin');
      })
  }
  render() {
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Link to='/api'>Api</Link>
          <Button onClick={this.logout.bind(this)}>Logout</Button>
        </Content>
      </Layout>
    )
  }
}

export default Home;