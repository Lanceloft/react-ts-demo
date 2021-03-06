import * as React from "react";
import "./ImageContent.less";

export interface IHomePageProps {
  data: {
    url?: string;
    name?: string;
  };
  chooseImage?: () => void;
  chooseImageUrl?: string;
}

const ImageContent: React.SFC<IHomePageProps> = (props: IHomePageProps) => (
  <div
    className={`image-content ${
      props.chooseImageUrl === props.data.url ? "image-content-active" : null
    }`}
    onClick={props.chooseImage}
  >
    <div className="image-box">
      <img className="box-image" src={props.data.url} />
    </div>
    <div className="image-text">{props.data.name}</div>
  </div>
);

export default ImageContent;
