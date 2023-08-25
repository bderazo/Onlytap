import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'

function ModelPhone({ isVisible, onClose }) {
  const [phone, setPhone] = useState(
    localStorage.getItem("Phone") || ""
  );
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    setIsPhoneValid(!!phone);
  }, [phone]);

  if (!isVisible) return null;

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    localStorage.setItem("Phone", phone);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

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
              <div className="input-container my-3">
                <PhoneInput
                  placeholder="Ingresa tu numero"
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="EC" 
                  onKeyPress={handleKeyPress}
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
                    type="submit"
                    onClick={handleSaveClick}
                    disabled={!isPhoneValid}
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

export default ModelPhone;
