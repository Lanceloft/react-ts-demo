import * as React from "react";
import { connect } from "react-redux";
import { Button, Input, Table, Modal, Row, Col } from "antd";
import { IStoreState, IGlobalStoreState } from "../reducers/types";
import * as actions from "../actions/index";
import ChooseImagesModal from "../components/ChooseImagesModal";
import EditModal from "@/components/EditModal/EditModal";

const confirm = Modal.confirm;

export interface IHomePageState {
  number: number;
  searchName: string;
  visible: boolean;
  editId: number;
  changeName: string;
  imageUrl: string;
  chooseImagesVisible: boolean;
  editModalVisible: boolean;
}

export interface IHomePageProps {
  global: IGlobalStoreState;
  addNumber: () => void;
  reduceNumber: () => void;
  addTask: (name:string, url:string) => void;
  getTask: (searchNumber: string) => void;
  deleteItem: (id: number) => void;
  editItem: (id: number, name: string, image: string) => void;
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
      imageUrl: "",
      chooseImagesVisible: false,
      editModalVisible: false,
    };
  }

  componentDidMount() {
    this.props.getTask("");
  }

  numberOnChange = (e: any) => {
    this.setState({
      number: e.target.value
    });
  };

  searchNameOnChange = (e: any) => {
    this.setState({
      searchName: e.target.value
    });
  };

  showDeleteConfirm = (id: number) => {
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

  handleOk = () => {
    this.props.editItem(
      this.state.editId,
      this.state.changeName,
      this.state.imageUrl
    );
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      changeName: ""
    });
  };

  showEditModal = (record: any) => {
    this.setState({
      visible: true,
      editId: record.id,
      changeName: record.task,
      imageUrl: record.image
    });
  };

  changeNameOnChange = (e: any) => {
    this.setState({
      changeName: e.target.value
    });
  };

  chooseImagesConfirm = (url: string) => {
    this.props.editItem(this.state.editId, this.state.changeName, url);
    this.setState({
      chooseImagesVisible: false
    });
  };

  chooseImagesCancel = () => {
    this.setState({
      chooseImagesVisible: false
    });
  };

  openUploadModal = (record: any) => {
    this.setState({
      editId: record.id,
      changeName: record.task,
      imageUrl: record.image,
      chooseImagesVisible: true
    });
  };

  editModalConfirm = (name: string, url: string) => {
    this.props.addTask(name, url);
    this.setState({
      editModalVisible: false
    })
  };

  editModalCancel = () => {
    this.setState({
      editModalVisible: false
    })
  };

  openEditModal = () => {
    this.setState({
      editModalVisible: true
    })
  };

  render() {
    const { global } = this.props;

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
        title: "图片",
        render: (text: object, record: any) => (
          <div className="image-operation">
            <img className="image-preview" src={record.image} />
          </div>
        )
      },
      {
        title: "操作",
        render: (text: object, record: any) => (
          <div className="config-operation">
            <span onClick={() => this.showEditModal(record)}>编辑</span>
            <span onClick={() => this.openUploadModal(record)}>选择图片</span>
            <span onClick={() => this.showDeleteConfirm(record.id)}>删除</span>
          </div>
        )
      }
    ];

    return (
      <div>
        <div>
          {global.amount}
        </div>
        <Button onClick={this.props.addNumber}>add number</Button>
        <Button onClick={this.props.reduceNumber}>reduce number</Button>

        <Input
          style={{ width: "200px" }}
          value={this.state.number}
          onChange={this.numberOnChange}
        />
        <Button onClick={() => this.openEditModal()}>增加</Button>

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
          chooseImagesConfirm={url => this.chooseImagesConfirm(url)}
          chooseImagesCancel={this.chooseImagesCancel}
        />

        <EditModal
          editModalVisible={this.state.editModalVisible}
          editModalConfirm={(name:string, url:string) => this.editModalConfirm(name, url)}
          editModalCancel={this.editModalCancel}
        />
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
