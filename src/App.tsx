import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { getCookie } from "./common/cookies";

import "./App.less";

export interface IHomePageState {}

export interface IHomePageProps {}

class AppComponent extends React.Component<IHomePageProps, IHomePageState> {
  requireAuth = (Layout: any, props: any) => {
    if (!getCookie("TOKEN")) {
      return <Redirect to="/login" />;
    } else return <Layout {...props} />;
  };

  componentDidMount() {}

  public render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={(props: any) => this.requireAuth(Main, props)}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Router>
    );
  }
}

export default AppComponent;
