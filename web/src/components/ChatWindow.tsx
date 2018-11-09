import * as React from "react";
import { UserModel, MessageModel } from 'src/models';

import { List } from 'antd';

interface IProps {
  user: UserModel
  roomMessages: Array<MessageModel>
}

class ChatWindow extends React.Component<IProps, {}>{
  render(){
    console.log(this.props.roomMessages)
    return(
      // <ul>
      //   {this.props.roomMessages.map(message => {
      //     if(message.from._id === this.props.user._id){
      //       return (
      //         <li key={message._id} style={{textAlign: 'right'}}>{message.message} </li>
      //       )
      //     } else {
      //       return (
      //         <li key={message._id} style={{color: 'blue'}}>{message.message} | {message.from.username}</li>
      //       )
      //     }
      //   })}
      // </ul>
      <List
        size="large"
        bordered
        dataSource={this.props.roomMessages}
        renderItem={(item: MessageModel) => {
          if (item.from._id === this.props.user._id) {
            return (
              <List.Item key={item._id}>
                <List.Item.Meta
                  description={item.date}
                />
              {item.message} </List.Item>
            )
          } else {
            return (
              <List.Item key={item._id} style={{ color: 'blue' }}>
                <List.Item.Meta
                  title={item.from.username}
                  description={item.date}
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