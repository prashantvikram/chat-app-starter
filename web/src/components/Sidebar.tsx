import * as React from "react";

import { Input, List, Avatar } from 'antd';
const Search = Input.Search;

import { RoomModel, UserModel } from "../models";

interface IProps {
  user: UserModel
  rooms: Array<RoomModel>,
  selectRoom: any,
  search: any,
  createRoom: any,
  searchResult: UserModel
}
class Sidebar extends React.Component<IProps, {}>{
  render(){
    return(
      <div>
        <Search
          placeholder="input search text"
          onSearch={value => this.props.search(value)}
          style={{ width: 200 }}
        />
        {this.props.searchResult.hasOwnProperty('username') ?
          <div onClick={() => this.props.createRoom(this.props.searchResult._id)}>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={this.props.searchResult.username}
              />
            </List.Item>
          </div>
        :
        null
        }

        <h2>Friends List</h2>
        <ul>
          {this.props.rooms.map((r, i) => {
            if(r.members.length > 2){
              return (
                <li key={i}>
                  {r._id}
                </li>
              ) 
            } else {
              const f = r.members.filter(m => { return m._id !== this.props.user._id })[0];
              return (
                <li 
                  key={i} 
                  style={{
                    backgroundColor: f.isOnline ? '#f0f5ff' : '#DDD',
                    cursor: "pointer"
                  }}
                  onClick={() => this.props.selectRoom(r._id)}>                  
                  <List.Item.Meta                    
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={f.username}
                    description={<i>last message in this room</i>}
                  />
                </li>
              )
            }
          })}
        </ul>
      </div>
      
    )
  }
}

export default Sidebar;