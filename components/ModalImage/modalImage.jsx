import React, { useEffect } from 'react'
import Magnifier from "react-magnifier";

const ModalImage = (props) => {
  useEffect(() => {
    document.body.className = "overflow";
    return () => {
      document.body.className = "";
    }
  }, [])
  return (
    <>
      {props.src ? (
        <div className="zoom-modal">
          <button
            onClick={() => props.hide()}
            type="button"
            className="modal-button close"
          >X
          </button>
          <div className="zoomed-image">
          <Magnifier src={props.src}  /></div>
        </div>
      ) : null}
    </>
  );
};


export default ModalImage;
