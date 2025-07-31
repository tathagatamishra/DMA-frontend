import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import "./modal.css"

function useDefaultProps(props) {
  let newProps = { ...props };
  Object.keys(newProps).forEach((key) =>
    newProps[key] === undefined ? delete newProps[key] : {}
  );
  return { ...defaultProps, ...newProps };
}

function DisclaimerModal(props) {
  props = useDefaultProps(props);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (props.onModal) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for all animations to complete before unmounting
      setTimeout(() => setShouldRender(false), 1000);
    }
  }, [props.onModal]);

  const handleClose = () => {
    setIsVisible(false);
    // Delay the parent state update to allow exit animations to play
    setTimeout(() => {
      props.onClick((prev) => !prev);
      props.extraOnClick?.((prev) => !prev);
    }, 600);
  };

  const handleEscape = useCallback((event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape]);

  if (!shouldRender) return null;

  return (
    <div className={`modal-container ${isVisible ? 'show' : 'out'}`}>
      <div className="modal-background">
        <div className="modal-wrapper  ">
          {/* SVG outline animation */}
          <div className="modal-outline">
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <rect className="outline-rect" rx="12" ry="12" x="0" y="0" width="100%" height="100%" />
            </svg>
          </div>
          
          {/* Actual modal content */}
          <div className="modal-content-wrapper">
            <div className="modal-header">
              <h2 className="modal-title">{props.text}</h2>
              {/* <div 
                onClick={handleClose}
                className="close-button"
                role="button"
                tabIndex={0}
              >
                <HiOutlineX className="close-icon" />
              </div> */}
            </div>

            <div className="modal-body">
              {props.children}
            </div>

            {(props.bottomText || props.bottomChild) && (
              <div className="modal-footer">
                {props.bottomText && (
                  <p className="bottom-text">{props.bottomText}</p>
                )}
                {props.bottomChild}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultProps = {
  maxWidth: "640px",
  height: "fit-content",
  borderTopWidth: "2px",
  marginTop: "1.5rem",
  marginBottom: "1.5rem",
};

export default DisclaimerModal;