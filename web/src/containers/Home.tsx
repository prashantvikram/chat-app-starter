import * as React from "react";
import { Layout } from 'antd';
const { Sider, Content } = Layout;

import AuthContext from "../auth-context";
import { RoomModel, MessageModel, FriendModel } from "../models";
import User from "../controllers/user";

import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageForm from "../components/MessageForm";

interface IProps {
  user: User
}
interface IState {
  rooms: Array<RoomModel>,
  searchResult: FriendModel
  roomMessages: Array<MessageModel>
}

class Home extends React.Component<IProps, IState> {
  static contextType = AuthContext;
  constructor(props: IProps){
    super(props);

    this.state = {
      rooms: [],
      searchResult: {} as FriendModel,
      roomMessages: []
    }
  }  

  componentDidMount(){
    this.getUserRooms();
  }

  getUserRooms(){
    this.props.user.getRooms()
    .then(rooms => this.setState({rooms}))
  }

  searchUsers(username: string){
    this.props.user.searchUsers(username)
    .then(searchResult => this.setState({searchResult}));
  }

  getRoomConversation(id: string){
    console.log(id)
  }

  render() {
    return (
      <Layout>
        <Sider style={{ background: '#fff' }}>
          <Sidebar
            user={this.props.user}
            rooms={this.state.rooms}
            selectRoom={this.getRoomConversation}
            search={this.searchUsers.bind(this)}
            searchResult={this.state.searchResult} />
        </Sider>
        <Content>
          <ChatWindow />
          <MessageForm />
        </Content>
      </Layout>
    )
  }
}

export default Home;