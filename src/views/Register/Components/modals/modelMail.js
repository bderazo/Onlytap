import React, { useState, useEffect } from "react";

function ModelEmail({ isVisible, onClose }) {
  const [mail, setMail] = useState(localStorage.getItem("Mail") || "");
  const [isMailValid, setIsMailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsMailValid(!!mail.trim());
  }, [mail]);

  if (!isVisible) return null;

  const handleMailChange = (event) => {
    const newMail = event.target.value;
    localStorage.setItem("Mail", newMail);
    setMail(newMail);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveClick = () => {
    if (validateEmail(mail)) {
      localStorage.setItem("Mail", mail);
      onClose();
    } else {
      setErrorMessage('Correo incorrecto');
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const Alert = ({ message }) => {
    if (!message) {
      return null;
    }
    return (
      <div className="alertContainer">
        <span className="alertMessage ">{message} </span> 
      </div>
    );
  };

  return (
    <>
      <div className="modal-container">
        <div className="modal-body">
          <div id="close" onClick={handelClose}>
            <div className="input-container">
              <div className="form-floating  ">
                <input
                  type="text"
                  value={mail}
                  name="mail"
                  onChange={handleMailChange}
                  className="input-register my-3"
                  id="floatingInput"
                  placeholder="Email"
                />
                
              </div>
              <Alert message={errorMessage} />
              <hr />
              <div className="linea-botones">
                <button onClick={handleCancel} className="cancel-button">
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveClick}
                  disabled={!isMailValid}
                  className="submit-button"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModelEmail;
