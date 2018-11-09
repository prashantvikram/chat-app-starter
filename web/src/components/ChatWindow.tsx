import * as React from "react";
import { UserModel, MessageModel } from 'src/models';
import * as humanDate from "human-date";

import { List } from 'antd';

interface IProps {
  user: UserModel
  roomMessages: Array<MessageModel>
}

class ChatWindow extends React.Component<IProps, {}>{
  render(){
    console.log(this.props.roomMessages)
    return(
      <List
        size="large"
        bordered
        dataSource={this.props.roomMessages}
        renderItem={(item: MessageModel) => {
          if (item.from._id === this.props.user._id) {
            return (
              <List.Item key={item._id}>
                <List.Item.Meta
                  description={humanDate.relativeTime(item.date)}
                />
              {item.message} </List.Item>
            )
          } else {
            return (
              <List.Item key={item._id} style={{ color: 'blue' }}>
                <List.Item.Meta
                  title={item.from.username}
                  description={humanDate.relativeTime(item.date)}
                />
              {item.message}</List.Item>
            )
          }
        }}
      />
    )
  }
}

export default ChatWindow