import React, { useState } from "react";

export default function AdminBtn(props) {
  const [clicked, setClicked] = useState(false);
  return (
    <div className={`relative ${props.className}`}>
      {props.message && clicked && (
        <p className="message absolute z-[100] bg-[#000000c0] rounded-[6px] text-[white] px-[10px] py-[2px]">
          {props.message}
        </p>
      )}

      <button
        className="AdminBtn"
        style={{
          backgroundColor:
            props.btnColor === "red"
              ? "#f6dbdb"
              : props.btnColor === "green"
              ? "#dbf6df"
              : props.btnColor,
          fontSize: props.fontSize,
          padding: props.padding,
          width: props.width,
          height: props.height,
        }}
        onClick={() => {
          props.onClick();
          setClicked(true);
          setTimeout(() => setClicked(false), 1000);
        }}
      >
        {props.text}
      </button>
    </div>
  );
}
