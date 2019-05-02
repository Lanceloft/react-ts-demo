import * as React from "react";
import { Modal } from "antd";

export interface IHomePageState {}

export interface IHomePageProps {
  chooseImagesVisible: boolean;
  chooseImagesConfirm: () => void;
  chooseImagesCancel: () => void;
}

class ChooseImagesModal extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  render() {
    return (
      <Modal
        title="Basic Modal"
        visible={this.props.chooseImagesVisible}
        onOk={this.props.chooseImagesConfirm}
        onCancel={this.props.chooseImagesCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}

export default ChooseImagesModal;
