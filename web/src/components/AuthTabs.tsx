import * as React from "react";

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import Signin from "./Signin";
import Signup from "./Signup";

class AuthenticationTabs extends React.Component<{}, {}> {
  
  render() {
    return (
      <Tabs defaultActiveKey="2">
        <TabPane tab="Signup" key="1">
          <Signup />
        </TabPane>
        <TabPane tab="Signin" key="2">
          <Signin />
        </TabPane>
      </Tabs>
    )
  }
}

export default AuthenticationTabs;