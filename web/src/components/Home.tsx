import * as React from "react";
import { Component } from "react";

import { Layout } from 'antd';

const { Sider, Content } = Layout;

import AuthContext from "../auth-context";

interface IProps {}

class Home extends Component<IProps, {}> {
  static contextType = AuthContext;
  render() {
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          Content
        </Content>
      </Layout>
    )
  }
}

export default Home;