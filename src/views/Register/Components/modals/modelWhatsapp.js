import React, { useState, useEffect }  from "react";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'

function ModelWhatsapp({ isVisible, onClose }) {
  const [whatsapp, setWhatsapp] = useState(
    localStorage.getItem("Whatsapp") || ""
  );
  const [isWhatsappValid, setIsWhatsappValid] = useState(false);


  useEffect(() => {
    setIsWhatsappValid(!!whatsapp);
  }, [whatsapp]);

  if (!isVisible) return null;

  

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
    
  };

  const handleSaveClick = () => {
    localStorage.setItem("Whatsapp", whatsapp);
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
              <div className="input-container my-3">
                <PhoneInput
                  placeholder="Ingresa tu numero de whatsapp"
                  value={whatsapp}
                  onChange={setWhatsapp}
                  defaultCountry="EC" 
                />
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
                    disabled={!isWhatsappValid}
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

export default ModelWhatsapp;
