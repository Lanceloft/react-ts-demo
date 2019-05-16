import * as React from "react";
import { Input, Button } from "antd";
import http from "@/common/http.js";
import { setCookie } from "../../common/cookies";

export interface IHomePageState {
  userName: string;
  password: string;
}

export interface IHomePageProps {}

class LoginComponent extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  public userNameOnChange = (e: any) => {
    this.setState({
      userName: e.target.value
    });
  };

  public passwordOnChange = (e: any) => {
    this.setState({
      password: e.target.value
    });
  };

  public register = () => {
    let param = {
      username: this.state.userName,
      password: this.state.password
    };

    http.post("/test/register", param).then(data => {
      console.log(data);
    });
  };

  render() {
    return (
      <div className="login-form">
        <div>注册:</div>
        <div className="login-item">
          <div className="item-name">用户名</div>
          <Input
            className="item-value"
            placeholder="user name"
            value={this.state.userName}
            onChange={this.userNameOnChange}
          />
        </div>
        <div className="login-item">
          <div className="item-name">密码</div>
          <Input
            className="item-value"
            placeholder="password"
            value={this.state.password}
            onChange={this.passwordOnChange}
          />
        </div>
        <Button type="primary" onClick={this.register}>
          注册
        </Button>
      </div>
    );
  }
}

export default LoginComponent;