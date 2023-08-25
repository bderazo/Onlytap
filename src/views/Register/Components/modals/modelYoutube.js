import React, { useState, useEffect } from "react";

function ModelYoutube({ isVisible, onClose }) {
  const [youtube] = useState(
    JSON.parse(localStorage.getItem("Youtube")) || ""
  );
  const [isYoutubeValid, setIsYoutubeValid] = useState(false);
  const [valueYoutube, setValueYoutube] = useState(youtube.tipo_social);

  useEffect(() => {
    if (valueYoutube) {
      setIsYoutubeValid(!!valueYoutube.trim().startsWith("https://"));
    }
  }, [valueYoutube]);

  if (!isVisible) return null;

  const handleYoutubeChange = (event) => {
    const newYoutube = event.target.value;
    setValueYoutube(newYoutube);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    let estado = "1" ;
    const newYoutube = {
      id: youtube.id,
      text_label: youtube.text_label,
      tipo_social: valueYoutube,
      estado: estado
    };
    localStorage.setItem("Youtube", JSON.stringify(newYoutube));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  const errorMessage = !isYoutubeValid && (
    <div className="error-message">
      Por favor, ingrese una URL de Youtube válida que comience con https://
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
                <div className="form-floating">
                  <input
                    type="text"
                    className="input-register my-3"
                    placeholder="https://www.youtube.com/username"
                    name="youtube"
                    value={valueYoutube}
                    onChange={handleYoutubeChange}
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
                    disabled={!isYoutubeValid}
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

export default ModelYoutube;
