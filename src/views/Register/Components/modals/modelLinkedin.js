import React, { useState, useEffect } from "react";

function ModelLinkedin({ isVisible, onClose }) {
  const [linkedin] = useState(
    JSON.parse(localStorage.getItem("Linkedin")) || ""
  );
  const [isLinkedinValid, setIsLinkedinValid] = useState(false);
  const [valueLinkedin, setValueLinkedin] = useState(linkedin.tipo_social);

  useEffect(() => {
    if (valueLinkedin) {
      setIsLinkedinValid(!!valueLinkedin.trim().startsWith("https://"));
    }
  }, [valueLinkedin]);

  if (!isVisible) return null;

  const handleLinkedinChange = (event) => {
    const newLinkedin = event.target.value;
    setValueLinkedin(newLinkedin);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    let estado = "1" ;
    const newLinkedin = {
      id: linkedin.id,
      text_label: linkedin.text_label,
      tipo_social: valueLinkedin,
      estado: estado
    };
    localStorage.setItem("Linkedin", JSON.stringify(newLinkedin));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const errorMessage = !isLinkedinValid && (
    <div className="error-message">
      Por favor, ingrese una URL de Linkedin válida que comience con https://
    </div>
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
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
                    name="linkedin"
                    placeholder="https://www.linkedin.com/in/username"
                    value={valueLinkedin}
                    onChange={handleLinkedinChange}
                    onKeyPress={handleKeyPress}
                  />
                  <label></label>
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
                    disabled={!isLinkedinValid}
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

export default ModelLinkedin;
