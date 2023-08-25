import React, { useState, useEffect } from "react";

function ModelFacebook({ isVisible, onClose }) {
  const [facebook] = useState(
    JSON.parse(localStorage.getItem("Facebook")) || ""
  );
  const [isFacebookValid, setIsFacebookValid] = useState(false);
  const [valueFacebook, setValueFacebook] = useState(facebook.tipo_social);
  
  useEffect(() => {
    if (valueFacebook) {
      setIsFacebookValid(!!valueFacebook.trim().startsWith("https://"));
    }
  }, [valueFacebook]);

  if (!isVisible) return null;

  const handleFacebookChange = (event) => {
    const newFacebook = event.target.value;
    setValueFacebook(newFacebook);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    let estado = "1" 
    const newFacebook = {
      id: facebook.id,
      text_labdel: facebook.text_labdel,
      tipo_social: valueFacebook,
      estado: estado
    };
    localStorage.setItem("Facebook", JSON.stringify(newFacebook));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const errorMessage = !isFacebookValid && (
    <div className="error-message">
      Por favor, ingrese una URL de Facebook válida que comience con https://
    </div>
  );

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSaveClick();
    }
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
                    className="input-register my-3"
                    name="facebook"
                    placeholder="https://www.facebook.com/username"
                    value={valueFacebook}
                    onChange={handleFacebookChange}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <hr />
                {errorMessage}
                <div className="linea-botones">
                  <button onClick={handleCancel} className="cancel-button">
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    disabled={!isFacebookValid}
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

export default ModelFacebook;
