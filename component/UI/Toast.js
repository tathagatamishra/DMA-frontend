import React, { useEffect, useState } from "react";

// Default properties for the toast
const defaultProps = {
  backgroundColor: "#335BF5",
  color: "#fff",
};

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

function Toast(props) {
  const [visible, setVisible] = useState(false); // Start with the toast hidden

  useEffect(() => {
    if (props.visible) {
      setVisible(true); // Show the toast instantly
      const timer = setTimeout(() => {
        setVisible(false); // Hide after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [props.visible]);

  props = useDefaultProps(props);

  const style = {
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor || "#ddd",
    border: props.border || "1px solid #ccc",
    color: props.color,
    fontFamily: props.fontFamily || "Arial, sans-serif",
    fontSize: props.fontSize || "18px", // Increased font size
    borderRadius: props.borderRadius || "10px", // Increased border radius for a rounder look
    padding: "15px 25px", // Increased padding for bigger toast
    marginTop: "10px",
    display: visible ? "block" : "none", // Show/Hide based on visibility
    position: "fixed", // Fixed position
    bottom: "20px", // Distance from the bottom of the screen
    left: "50%", // Center horizontally
    transform: "translateX(-50%)", // Offset by 50% to center the element
    width: "auto", // Allow width to adjust based on content
    maxWidth: "500px", // Max width for better visibility
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Slightly more prominent shadow
    zIndex: 9999, // Ensure it's on top of other elements
    transition: "all 0.3s ease-in-out", // Smooth transition
  };

  return (
    <div style={style}>
      <p>{props.text}</p>
    </div>
  );
}

export default Toast;
