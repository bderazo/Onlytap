import React, { useState, useEffect } from "react";

function ModelSkype({ isVisible, onClose }) {
  const [skype, setSkype] = useState(
    localStorage.getItem("Skype") || ""
  );
  const [isSkypeValid, setIsSkypeValid] = useState(false)

  useEffect(() => {
    setIsSkypeValid(!!skype.trim());
  }, [skype]);

  if (!isVisible) return null;

  const handleSkypeChange = (event) => {
    const newSkype = event.target.value;
    localStorage.setItem("Skype", newSkype);
    setSkype(newSkype);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
    
  };

  const handleSaveClick = () => {
    localStorage.setItem("Skype", skype);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <div>
        <div className="modal-container">
          <div className="modal-body">
            <div id="close" onClick={handelClose}>
              <div className="input-container">
                <div className="form-floating ">
                  <input
                    type="text"
                    name="skype"
                    value={skype}
                    onChange={handleSkypeChange}
                    className="input-register"
                    placeholder="Usuario/URL"
                  />
                  <label></label>
                </div>
                <hr />
                <div className="linea-botones">
                  <button
                    onClick={handleCancel}
                    className="cancel-button"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    disabled={!isSkypeValid}
                    className="submit-button"
                  >
                    Guardar
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

export default ModelSkype;
