import * as React from "react";
import { Input, Button } from "antd";
import http from "@/common/http.js";
import PropTypes from "prop-types";
import { setCookie } from "../../common/cookies";

export interface IHomePageState {
  loginUserName: string;
  loginPassword: string;
}

export interface IHomePageProps {
  history: any;
}

class LoginComponent extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      loginUserName: "",
      loginPassword: ""
    };
  }

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

  public login = () => {
    let param = {
      username: this.state.loginUserName,
      password: this.state.loginPassword
    };

    http.loginPost("/test/login", param).then(data => {
      console.log(data);
      if (data.status === 0) {
        const { history } = this.props;
        setCookie("TOKEN", data.token);
        history.push("/");
      }
    });
  };

  public toRegister = () => {
    const { history } = this.props;
    history.push("/register");
  };

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="login-form">
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
        <Button type="primary" onClick={this.login}>
          登录
        </Button>
        <a style={{ marginLeft: "10px" }} onClick={this.toRegister}>
          没有账号?注册
        </a>
      </div>
    );
  }
}

export default LoginComponent;
