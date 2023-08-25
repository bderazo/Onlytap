import React, { useState, useEffect }  from "react";

function ModelTelegram({ isVisible, onClose }) {

  const [telegram] = useState(
    JSON.parse(localStorage.getItem("Telegram")) || ""
  );
  const [isTelegramValid, setIsTelegramValid] = useState(false);
  const [valueTelegram, setValueTelegram] = useState(telegram.tipo_social)

  useEffect(() => {
    if(valueTelegram){
    setIsTelegramValid(!!valueTelegram.trim());
    }
  }, [valueTelegram]);

  if (!isVisible) return null;

  const handleTelegramChange = (event) => {
    const newTelegram = event.target.value;
    setValueTelegram(newTelegram);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
    
  };

  const handleSaveClick = () => {
    const newTelegram = {
      id: telegram.id,
      text_label: telegram.text_label,
      tipo_social: valueTelegram,
    }
    localStorage.setItem("Telegram", JSON.stringify(newTelegram));
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
                <div className="form-floating">
                  <input
                    type="text"
                    name="telegram"
                    value={valueTelegram}
                    onChange={handleTelegramChange}
                    className="input-register my-3"
                    placeholder="Usuario/URL"
                  />
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
                    disabled={!isTelegramValid}
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

export default ModelTelegram;
