import * as React from "react";
import { connect } from "react-redux";
import { Button, Input, Table, Modal, Row, Col } from "antd";
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
import ChooseImagesModal from "./components/ChooseImagesModal";

import "./App.less";

const confirm = Modal.confirm;

export interface IHomePageState {
  number: number;
  searchName: string;
  visible: boolean;
  editId: number;
  changeName: string;
  chooseImagesVisible: boolean;
}

export interface IHomePageProps {
  global: IGlobalStoreState;
  addNumber: () => void;
  reduceNumber: () => void;
  setNumber: (number: Number) => void;
  getTask: (searchNumber: string) => void;
  deleteItem: (id: number) => void;
  editItem: (id: number, name: string) => void;
}

class HomeComponent extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      number: 0,
      searchName: "",
      visible: false,
      editId: 0,
      changeName: "",
      chooseImagesVisible: false
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
    this.props.deleteItem(id);
  };

  public showDeleteConfirm = (id: number) => {
    confirm({
      title: "Are you sure delete this task?",
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        this.props.deleteItem(id);
      },
      onCancel: () => {}
    });
  };

  public handleOk = () => {
    this.props.editItem(this.state.editId, this.state.changeName);
    this.handleCancel();
  };

  public handleCancel = () => {
    this.setState({
      visible: false,
      changeName: ""
    });
  };

  public showEditModal = (id: number, task: string) => {
    this.setState({
      visible: true,
      editId: id,
      changeName: task
    });
  };

  public changeNameOnChange = (e: any) => {
    this.setState({
      changeName: e.target.value
    });
  };

  public chooseImagesConfirm = () => {};

  public chooseImagesCancel = () => {
    this.setState({
      chooseImagesVisible: false
    });
  };

  public openUploadModal = () => {
    this.setState({
      chooseImagesVisible: true
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
          <div className="config-operation">
            <span onClick={() => this.showEditModal(record.id, record.task)}>
              编辑
            </span>
            <span onClick={() => this.openUploadModal()}>上传图片</span>
            <span onClick={() => this.showDeleteConfirm(record.id)}>删除</span>
          </div>
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
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={6}>名称:</Col>
            <Col span={6}>
              <Input
                value={this.state.changeName}
                onChange={this.changeNameOnChange}
              />
            </Col>
          </Row>
        </Modal>

        <ChooseImagesModal
          chooseImagesVisible={this.state.chooseImagesVisible}
          chooseImagesConfirm={this.chooseImagesConfirm}
          chooseImagesCancel={this.chooseImagesCancel}
        />

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
