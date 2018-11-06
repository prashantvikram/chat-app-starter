import { UserModel } from "../models";

class User {
  
  constructor(public id: string = "", public username: string = ""){}

  setUser = (creds: UserModel) =>{
    this.id = creds.id
    this.username = creds.username;
  }

  getUser(){
    return {
      id: this.id,
      username: this.username
    }
  }

  async checkExistingSession(){
    let response = await fetch("/user/", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
    let json = await response.json();
    if (json.hasOwnProperty('id') && json.hasOwnProperty('username')) {
      this.setUser(json);
      return true; // session found; return value for isAuth
    }

    return false // no existing session
  }

  async signin(values: any){
    let response = await fetch("/user/signin", {
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
    });
    let json = await response.json();
    if(json.hasOwnProperty('id') && json.hasOwnProperty('username')){
      this.setUser(json);
      return true; // sign in success; return value for isAuth
    }
    
    return false // could not sign in
  }

  async signup(values: any){
    let response = await fetch("/user/signup", {
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
    });
    let json = await response.json();

    if (json.hasOwnProperty('id') && json.hasOwnProperty('username')) {
      this.setUser(json);
      return true; // sign up success; return value for isAuth
    }

    return false // could not sign up
  }
  async signout(){
    let response = await fetch("/user/logout", {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
    })
    let json = await response.json();
    if (json.message === "logged out successfully"){
      this.id = "";
      this.username = "";
      return false // return value for isAuth
    }

    return true // in case of failed log out attempt
  }

  async getRooms() {
    let response = await fetch(`/rooms/get_user_rooms?id=${this.id}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
    let json = await response.json();
    return json
  }

  async searchUsers(username: string) {
    let response = await fetch(`/user/find_by_username?username=${username}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
    let json = await response.json();
    return json
  }

}

export default User;