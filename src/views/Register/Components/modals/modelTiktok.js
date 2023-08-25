import React, { useState, useEffect } from "react";

function ModelTiktok({ isVisible, onClose }) {
  const [tiktok] = useState(
    JSON.parse(localStorage.getItem("Tiktok")) || ""
  );

  const [isTiktokValid, setIsTiktokValid] = useState(false);
  const [valueTiktok, setValueTiktok] = useState(tiktok.tipo_social);

  useEffect(() => {
    if (valueTiktok) {
      setIsTiktokValid(!!valueTiktok.trim().startsWith("https://"));
    }
  }, [valueTiktok]);

  if (!isVisible) return null;

  const handleTiktokChange = (event) => {
    const newTiktok = event.target.value;
    setValueTiktok(newTiktok);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    let estado = "1" ;
    const newTiktok = {
      id: tiktok.id,
      text_label: tiktok.text_label,
      tipo_social: valueTiktok,
      estado: estado
    };
    localStorage.setItem("Tiktok", JSON.stringify(newTiktok));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const errorMessage = !isTiktokValid && (
    <div className="error-message">
      Por favor, ingrese una URL de Tiktok válida que comience con https://
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
                    name="tiktok"
                    placeholder="https://www.tiktok.com/username"
                    value={valueTiktok}
                    onChange={handleTiktokChange}
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
                    disabled={!isTiktokValid}
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

export default ModelTiktok;
