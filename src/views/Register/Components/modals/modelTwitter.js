import React, { useState, useEffect } from "react";

function ModelTwitter({ isVisible, onClose }) {
  const [twitter] = useState(
    JSON.parse(localStorage.getItem("Twitter")) || ""
  );
  const [isTwitterValid, setIsTwitterValid] = useState(false);
  const [valueTwitter, setValueTwitter] = useState(twitter.tipo_social);

  useEffect(() => {
    if (valueTwitter) {
      setIsTwitterValid(!!valueTwitter.trim().startsWith("https://"));
    }
  }, [valueTwitter]);

  if (!isVisible) return null;

  const handleTwitterChange = (event) => {
    const newTwitter = event.target.value;
    setValueTwitter(newTwitter);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    let estado = "1" ;
    const newTwitter = {
      id: twitter.id,
      text_label: twitter.text_label,
      tipo_social: valueTwitter,
      estado: estado
    };

    localStorage.setItem("Twitter", JSON.stringify(newTwitter));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const errorMessage = !isTwitterValid && (
    <div className="error-message">
      Por favor, ingrese una URL de Twitter válida que comience con https://
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
                    className="input-register my-3"
                    placeholder="https://twitter.com/username"
                    name="twitter"
                    value={valueTwitter}
                    onChange={handleTwitterChange}
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
                    disabled={!isTwitterValid}
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

export default ModelTwitter;
