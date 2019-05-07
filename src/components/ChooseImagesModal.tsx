import * as React from "react";
import { Modal } from "antd";
import http from "../common/http";
import ImageContent from "./ImageContent/ImageContent";
import UploadImages from "./UploadImages";

export interface IHomePageState {
  getImagesList?: () => void;
  imageList: object[];
  chooseImageUrl?: string;
}

export interface IHomePageProps {
  chooseImagesVisible: boolean;
  chooseImagesConfirm: (url: any) => void;
  chooseImagesCancel: () => void;
}

export interface ChooseImage {
  url?: string;
}

class ChooseImagesModal extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      imageList: [],
      chooseImageUrl: ""
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

  public chooseImage = (item: ChooseImage) => {
    this.setState({
      chooseImageUrl: item.url
    });
  };

  public chooseImagesCancel = () => {
    this.setState({
      chooseImageUrl: ""
    });
    this.props.chooseImagesCancel();
  };

  public chooseImagesConfirm = () => {
    this.setState({
      chooseImageUrl: ""
    });
    this.props.chooseImagesConfirm(this.state.chooseImageUrl);
  };

  render() {
    const { imageList } = this.state;

    return (
      <Modal
        title="Basic Modal"
        visible={this.props.chooseImagesVisible}
        onOk={this.chooseImagesConfirm}
        onCancel={this.chooseImagesCancel}
      >
        {imageList.map((item, index) => (
          <ImageContent
            key={index}
            data={item}
            chooseImageUrl={this.state.chooseImageUrl}
            chooseImage={() => {
              this.chooseImage(item);
            }}
          />
        ))}
        <UploadImages getImagesList={this.getImagesList} />
      </Modal>
    );
  }
}

export default ChooseImagesModal;
