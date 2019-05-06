import * as React from "react";
import { Upload, Icon, message } from "antd";
import OSS from "ali-oss";

export interface IHomePageState {
  loading: boolean;
  imageUrl: string;
}

export interface IHomePageProps {}

const client = new OSS({
  region: "oss-ap-southeast-1",
  accessKeyId: "LTAIEVSSmwrMsEkn",
  accessKeySecret: "ZGHUz0XVhoWjK6KQ7JgALmBLtV5SSo",
  bucket: "ts-img"
});

const UploadToOss = (file: any) => {
  return new Promise((resolve, reject) => {
    client
      .put(file.name, file)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

function beforeUpload(file: any) {
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJPG) {
    message.error("You can only upload JPG/PNG file!");
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      UploadToOss(file).then((data: any) => {
        console.log(data.res.status);
        if (data.res.status === 200) {
        }
      });
    };
  }
  return false;
}

class UploadImages extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: ""
    };
  }

  public uploadOnChange = (info: any) => {
    console.log(info);
  };

  render() {
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.uploadOnChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

export default UploadImages;
