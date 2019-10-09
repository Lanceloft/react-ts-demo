import * as React from "react";
import {Col, Input, Modal, Row} from "antd";
import './EditModal.less'
import ChooseImagesModal from "@/components/ChooseImagesModal";

export interface IEditModalProps {
  editModalVisible: boolean;
  editModalConfirm: (name:string, url: string) => void;
  editModalCancel: () => void;
}

export interface IEditModalState {

}

class EditModal extends React.Component<IEditModalProps, IEditModalState> {
  state = {
    chooseImagesVisible: false,
    editName: "",
    imageUrl: ""

  }

  editNameOnChange = (value: string) => {
    this.setState({
      editName: value
    })
  };

  chooseImagesConfirm = (url: string) => {
    this.setState({
      imageUrl: url,
      chooseImagesVisible: false
    })
  };

  chooseImagesCancel = () => {
    this.setState({
      chooseImagesVisible: false
    })
  };

  openChooseImagesModal = () => {
    this.setState({
      chooseImagesVisible: true
    })
  };

  editModalConfirm = () => {
    this.props.editModalConfirm(this.state.editName, this.state.imageUrl);
    this.setState({
      editName: "",
      imageUrl: ""
    });
  };

  editModalCancel = () => {
    this.setState({
      editName: "",
      imageUrl: ""
    });
    this.props.editModalCancel();
  };

  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.props.editModalVisible}
          onOk={this.editModalConfirm}
          onCancel={this.editModalCancel}
        >
          <div className="edit-modal">
            <Row>
              <Col span={6}>名称:</Col>
              <Col span={6}>
                <Input
                  value={this.state.editName}
                  onChange={(e) => this.editNameOnChange(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col span={6}>图片:</Col>
              <Col span={6}>
                <div className="image-content">
                  {
                    this.state.imageUrl === "" ?
                      <div className="image-box" onClick={this.openChooseImagesModal}>+</div>
                      :
                      <div className="image-box">
                        <img
                          className="box-image"
                          src={this.state.imageUrl}
                          onClick={this.openChooseImagesModal}/>
                      </div>
                  }
                </div>
              </Col>
            </Row>
          </div>
        </Modal>

        <ChooseImagesModal
          chooseImagesVisible={this.state.chooseImagesVisible}
          chooseImagesConfirm={url => this.chooseImagesConfirm(url)}
          chooseImagesCancel={this.chooseImagesCancel}
        />
      </div>
    )
  }
}

export default EditModal
