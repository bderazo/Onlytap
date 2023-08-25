import React, { useState, useEffect } from "react";

function ModelInstagram({ isVisible, onClose }) {
  const [instagram] = useState(
    JSON.parse(localStorage.getItem("Instagram")) || ""
  );
  const [isInstagramValid, setIsInstagramValid] = useState(false);
  const [valueInstagram, setValueInstagram] = useState(instagram.tipo_social);

  useEffect(() => {
    if (valueInstagram) {
      setIsInstagramValid(!!valueInstagram.trim().startsWith("https://"));
    }
  }, [valueInstagram]);

  if (!isVisible) return null;

  const handleInstagramChange = (event) => {
    const newInstagram = event.target.value;
    setValueInstagram(newInstagram);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    let estado = "1" ;
    const newInstagram = {
      id: instagram.id,
      text_label: instagram.text_label,
      tipo_social: valueInstagram,
      estado: estado
    };
    localStorage.setItem("Instagram", JSON.stringify(newInstagram));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const errorMessage = !isInstagramValid && (
    <div className="error-message">
      Por favor, ingrese una URL de Instagram válida que comience con https://
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
                <div className="form-floating">
                  <input
                    type="text"
                    className="input-register "
                    name="instagram"
                    placeholder="https://www.instagram.com/username"
                    value={valueInstagram}
                    onChange={handleInstagramChange}
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
                    disabled={!isInstagramValid}
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

export default ModelInstagram;
