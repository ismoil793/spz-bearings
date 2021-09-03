import React from 'react'
import Magnifier from "react-magnifier";

const ModalImage = (props) => {
  return (
    <>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
      {props.src ? (
        <div className="zoom-modal">
          <button
            onClick={() => props.hide()}
            type="button"
            className="modal-button close"
          >
            <span aria-hidden="true">
              <i className="ec ec-close-remove text-gray-90 font-size-20"></i>
            </span>
          </button>
          <div className="zoomed-image">
          <Magnifier src={props.src}  /></div>
        </div>
      ) : null}
    </>
  );
};


export default ModalImage;
