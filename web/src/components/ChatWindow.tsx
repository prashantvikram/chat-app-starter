import * as React from "react";
import { MessageModel } from 'src/models';

interface IProps {
  roomMessages: Array<MessageModel>
}

class ChatWindow extends React.Component<IProps, {}>{
  render(){
    console.log(this.props.roomMessages)
    return(
      <div>Chat Window</div>
    )
  }
}

export default ChatWindow