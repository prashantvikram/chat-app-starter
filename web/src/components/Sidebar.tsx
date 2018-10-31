import * as React from "react";
import { List, Avatar } from 'antd';

import AuthContext from "../auth-context";

interface IMember {
  username: string
}

interface IRoom {
  _id: string,
  members: Array<IMember>
}

interface IProps {
  rooms: Array<IRoom>,
}
class Sidebar extends React.Component<IProps, {}>{
  static contextType = AuthContext;
  render(){
    return(
      // <ul>
      //   {this.props.rooms.map((r,i) => {
      //     r.members.splice(this.context.userId, 1)
      //     return (
      //       <li key={i}>{r.members[0].username}</li>
      //     )
      //   })}
      // </ul>
      <List
        itemLayout="horizontal"
        dataSource={this.props.rooms}
        renderItem={(r: IRoom) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://api.adorable.io/avatars/face/eyes7/nose6/mouth7/000" />}
              title={r.members[0].username}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default Sidebar;