import * as React from "react";
import { Layout } from 'antd';
const { Sider, Content } = Layout;

import AuthContext from "../auth-context";

import Sidebar from "./Sidebar"
interface IProps {}
interface IState {
  rooms: Array<any>,
}

class Home extends React.Component<IProps, IState> {
  static contextType = AuthContext;
  constructor(props: IProps){
    super(props);

    this.state = {
      rooms: []
    }
  }  

  componentDidMount(){
    this.getUserRooms();
  }

  getUserRooms(){
    fetch(`/rooms/get_user_rooms?id=${this.context.userId}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
    .then(res => res.json())
    .then(json => {
      // tslint:disable-next-line:no-console
      console.log(json);
      this.setState({ rooms: json })
    })
    .catch(error => {
      // tslint:disable-next-line:no-console
      console.log(error);
    })
  }

  render() {
    return (
      <Layout>
        <Sider style={{ background: '#fff' }}>
          <Sidebar rooms={this.state.rooms} />
        </Sider>
        <Content>
          Content
        </Content>
      </Layout>
    )
  }
}

export default Home;