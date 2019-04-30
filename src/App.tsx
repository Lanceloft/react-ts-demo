import * as React from "react";
import { connect } from "react-redux";
import { Button, Input, Table, Modal } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import { IStoreState, IGlobalStoreState } from "./reducers/types";
import * as actions from "./actions/index";
import Test from "./pages/Test/Index";
import New from "./pages/New/Index";

const confirm = Modal.confirm;

export interface Record {
  id: number;
}

export interface IHomePageState {
  number: number;
  searchName: string;
}

export interface IHomePageProps {
  global: IGlobalStoreState;
  addNumber: () => void;
  reduceNumber: () => void;
  setNumber: (number: Number) => void;
  getTask: (searchNumber: string) => void;
  deleteItem: (id: number) => void;
}

class HomeComponent extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      number: 0,
      searchName: ""
    };
  }

  componentDidMount() {
    this.props.getTask("");
  }

  public numberOnChange = (e: any) => {
    this.setState({
      number: e.target.value
    });
  };

  public searchNameOnChange = (e: any) => {
    this.setState({
      searchName: e.target.value
    });
  };

  public deleteItem = (id: number) => {
    console.log(id);
    this.props.deleteItem(id);
  };

  public showDeleteConfirm = (id: number) => {
    let that = this;
    confirm({
      title: "Are you sure delete this task?",
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        that.props.deleteItem(id);
      },
      onCancel() {}
    });
  };

  public render() {
    const { global } = this.props;
    const { number } = this.state;

    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "名称",
        dataIndex: "task",
        key: "task"
      },
      {
        title: "操作",
        render: (text: object, record: any) => (
          <div onClick={() => this.showDeleteConfirm(record.id)}>删除</div>
        )
      }
    ];

    return (
      <div>
        <div>
          {name}
          {global.amount}
        </div>
        <Button onClick={this.props.addNumber}>add number</Button>
        <Button onClick={this.props.reduceNumber}>reduce number</Button>

        <Input
          style={{ width: "200px" }}
          value={this.state.number}
          onChange={this.numberOnChange}
        />
        <Button onClick={() => this.props.setNumber(number)}>增加</Button>

        <div>
          <Input
            style={{ width: "200px" }}
            value={this.state.searchName}
            onChange={this.searchNameOnChange}
          />
          <Button onClick={() => this.props.getTask(this.state.searchName)}>
            查询
          </Button>
        </div>

        <Table rowKey="id" dataSource={global.data} columns={columns} />
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

const mapStateToProps = (state: IStoreState) => {
  const { global } = state;
  return {
    global
  };
};

export default connect(
  mapStateToProps,
  actions
)(HomeComponent);
