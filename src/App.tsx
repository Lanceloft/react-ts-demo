import * as React from "react";
import { observer, inject } from "mobx-react";
import { Button, Input, Table } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import Test from "./pages/Test/Index";
import New from "./pages/New/Index";
import { IMobxStore } from './store/Global'

export interface IHomePageState {
}

export interface IHomePageProps {
  rootStore ? : {
    globalStore ? : IMobxStore
  };
}

@inject('rootStore') @observer
class HomeComponent extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  reduceNumber = () => {

  }



  public render() {
    const globalStore = this.props.rootStore!.globalStore
    return (
      <div>
        <div>{globalStore!.number}</div>
        <Button onClick={globalStore!.addNumber}>add</Button>
        <Button onClick={globalStore!.reduceNumber}>reduce</Button>
        <Router>
          <NavLink exact to="/">
            TO TEST
          </NavLink>
          <NavLink exact to="/new">
            TO NEW
          </NavLink>
          <Switch>
            <Route path="/" exact component={Test} />
            <Route path="/new" exact component={New} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default HomeComponent
