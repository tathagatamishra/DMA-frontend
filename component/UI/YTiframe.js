import React from "react";
import "../Style/YTiframe.css"
function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

export default function YTiframe(props) {
  props = useDefaultProps(props);

  const borderRadiusNumeric = parseInt(props.radius, 10);

  const iframeStyle = {
    borderRadius: props.radius,
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    border: "0",
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  const boxStyle = {
    width: props.width,
    border: props.border,
    paddingBottom: props.height,
    borderRadius: `${borderRadiusNumeric + 2}px`,
    position: "absolute",
    top:"50%",
    left:"50%",
    transform: "translate(-50%, -50%)",
    transition: "300ms",
    // width: 37rem,
    // height: 42rem
    // object-fit: cover;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
  };

  return (
    <div style={boxStyle}>
      <iframe
        src={props.link ? props.link : "https://www.youtube.com/embed/"}
        style={iframeStyle}
        frameBorder="0"
        allowFullScreen
        loading="lazy"
        referrerPolicy={props.referrerPolicy}
        title={""}
      ></iframe>
    </div>
  );
}

const defaultProps = {
  radius: "15px",
  border: "",
  height: "27%",
  width: "48%",
};

{
  /* <IFrame link='https://youtube.com/embed/JXrWPLNp9tw' width='16%' height='9%' radius='10px' /> */
}
