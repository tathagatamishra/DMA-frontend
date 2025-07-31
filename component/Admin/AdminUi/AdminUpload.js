import React, { useState } from "react";
import AdminBtn from "./AdminBtn";
import { LuEye, LuEyeOff } from "react-icons/lu";

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

export default function AdminUpload(props) {
  props = useDefaultProps(props);
  const [popup, setPopup] = useState(false);
  const [inputType, setInputType] = useState(props.inputType);

  return (
    <div className={props.className}>
      {props.label && <label className="AdminLabel">{props.label}</label>}

      {props.type === "pdf" && (
        <input
          id="pdf"
          type="file"
          className="w-full mb-[10px] "
          onChange={props.handleUpload}
          accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
        />
      )}
      {props.type === "image" && (
        <input
          id="image"
          type="file"
          className="w-full mb-[10px] "
          onChange={props.handleUpload}
          accept=".jpeg, .jpg, .png, .svg"
        />
      )}

      {props.label && (
        <label className="AdminLabel">Or Enter Url Manually</label>
      )}

      <div className="relative flex flex-row items-center w-full gap-[10px]">
        {props.type === "pdf" && (
          <input
            type={inputType}
            className="AdminInput"
            value={props.value}
            onChange={props.onChange}
          />
        )}
        {props.type === "image" && (
          <input
            type={inputType}
            className="AdminInput"
            value={props.value}
            onChange={props.onChange}
          />
        )}
        {props.type === "pdf" && props.value && (
          <AdminBtn
            width="158px"
            text="View Document"
            btnColor="#f6dbdb"
            onClick={() => {
              window.open(props.value);
            }}
          />
        )}
        {props.crossBtn && (
          <AdminBtn
            text="✕"
            btnColor="#f6dbdb"
            onClick={() => setPopup(true)}
          />
        )}
      </div>

      {props.type === "image" && props.value && <img className="mt-[10px] max-w-full max-h-full w-auto h-[180px] object-contain" src={props.value} />}

      {popup && (
        <div className="w-full h-fit flex flex-col gap-[10px] mt-[10px] bg-white rounded-[15px]">
          <p className="text-[#ff3636] pl-[2px]">
            Are you sure you want to delete this?
          </p>
          <div className="flex gap-[10px]">
            <AdminBtn text="Cancel" onClick={() => setPopup(false)} />
            <AdminBtn
              text="Delete"
              btnColor="#f6dbdb"
              onClick={props.handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const defaultProps = {
  className: "w-full",
};
