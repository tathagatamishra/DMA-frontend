import React, { useRef, useState } from "react";
import AdminBtn from "./AdminBtn";
import { LuEye, LuEyeOff } from "react-icons/lu";
import JoditEditor from "jodit-react";

export default function AdminInput(props) {
  const [popup, setPopup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [inputType, setInputType] = useState(props.inputType);
  const editor = useRef(null);


  return (
    <div className={props.className}>
      {props.label && <label className="AdminLabel">{props.label}</label>}

      {
        props.type == "edit" && (
          <JoditEditor
			ref={editor}
			value={props.value}
			// config={config}
			tabIndex={2} // tabIndex of textarea
			// onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={(content)=>props.onChange(content)}
      
		/>
        )
      }

      {props.type === "textarea" && (
        <textarea
          className="AdminInput"
          value={props.value}
          onChange={props.onChange}
        />
      )}

      <div className="relative flex flex-row items-center w-full gap-[10px]">
        {props.type === "input" && (
          <input
            type={inputType}
            className="AdminInput"
            value={props.value}
            onChange={props.onChange}
          />
        )}

        {props.inputType === "password" &&
          (showPass ? (
            <LuEye
              className="absolute right-0 mr-[10px] text-[18px]"
              onClick={() => {
                setShowPass(false);
                setInputType("password");
              }}
            />
          ) : (
            <LuEyeOff
              className="absolute right-0 mr-[10px] text-[18px]"
              onClick={() => {
                setShowPass(true);
                setInputType("text");
              }}
            />
          ))}

        {props.crossBtn && (
          <AdminBtn
            text="✕"
            btnColor="#f6dbdb"
            onClick={() => setPopup(true)}
          />
        )}
      </div>

      {popup && (
        <div className="w-full h-fit flex flex-col gap-[10px] mt-[10px] bg-white rounded-[15px]">
          <p className="text-[#ff3636] pl-[2px]">
            {props.warningMsg ? props.warningMsg : "Are you sure you want to delete this?"}
          </p>
          <div className="flex gap-[10px]">
            <AdminBtn text="Cancel" onClick={() => setPopup(false)} />
            <AdminBtn
              text="Delete"
              btnColor="#f6dbdb"
              onClick={props.onClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
