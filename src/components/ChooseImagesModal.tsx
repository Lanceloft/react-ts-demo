import * as React from "react";
import { Modal } from "antd";
import http from "../common/http";
import ImageContent from "./ImageContent/ImageContent";
import UploadImages from "./UploadImages";

export interface IHomePageState {
  getImagesList?: () => void;
  imageList: object[];
}

export interface IHomePageProps {
  chooseImagesVisible: boolean;
  chooseImagesConfirm: () => void;
  chooseImagesCancel: () => void;
}

class ChooseImagesModal extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      imageList: []
    };
  }

  componentDidMount() {
    this.getImagesList();
  }

  public getImagesList = () => {
    http.get("/test/getImagesList").then(data => {
      if (data.status === 0) {
        this.setState({
          imageList: data.list
        });
      }
    });
  };

  render() {
    const { imageList } = this.state;

    return (
      <Modal
        title="Basic Modal"
        visible={this.props.chooseImagesVisible}
        onOk={this.props.chooseImagesConfirm}
        onCancel={this.props.chooseImagesCancel}
      >
        {imageList.map((item, index) => (
          <ImageContent key={index} data={item} />
        ))}
        <UploadImages />
      </Modal>
    );
  }
}

export default ChooseImagesModal;
