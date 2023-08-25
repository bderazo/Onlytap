import React from "react";

function ModelDepartment({ isVisible, onClose }) {
  if (!isVisible) return null;

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  return (
    <>
      <div>
        <div className="modal-container">
          <div className="modal-body">
            <div id="close" onClick={handelClose}>
              <div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="input-register my-3"
                    placeholder="Departamento"
                  />
                  <label ></label>
                </div>
                <hr />
                <div className="linea-botones">
                  <button
                    onClick={() => onClose()}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="submit-button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModelDepartment;
