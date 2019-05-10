import * as React from "react";
import { Input, Button } from "antd";
import http from "@/common/http.js";
import "./Index.less";

export interface IHomePageState {
  userName: string;
  password: string;
  loginUserName: string;
  loginPassword: string;
}

export interface IHomePageProps {}

class LoginComponent extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      loginUserName: "",
      loginPassword: ""
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

  public loginUserNameOnChange = (e: any) => {
    this.setState({
      loginUserName: e.target.value
    });
  };

  public loginPasswordOnChange = (e: any) => {
    this.setState({
      loginPassword: e.target.value
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
        <div>登录:</div>
        <div className="login-item">
          <div className="item-name">用户名</div>
          <Input
            className="item-value"
            placeholder="user name"
            value={this.state.loginUserName}
            onChange={this.loginUserNameOnChange}
          />
        </div>
        <div className="login-item">
          <div className="item-name">密码</div>
          <Input
            className="item-value"
            placeholder="password"
            value={this.state.loginPassword}
            onChange={this.loginPasswordOnChange}
          />
        </div>
        <Button type="primary">登录</Button>
      </div>
    );
  }
}

export default LoginComponent;
