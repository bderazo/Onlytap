import React, { useState, useEffect } from "react";

function ModelName({ isVisible, onClose }) {
  const [nombre, setNombre] = useState(localStorage.getItem("Nombre") || "");
  

  const [isNombreValid, setIsNombreValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsNombreValid(!!nombre.trim());
  }, [nombre]);

  if (!isVisible) return null;

  const handleNombreChange = (event) => {
    const newNombre = event.target.value;
    localStorage.setItem("Nombre", newNombre);
    setNombre(newNombre);
  };

 

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+(?:\s+[a-zA-ZáéíóúñÁÉÍÓÚÑ]+)*$/;
    return nameRegex.test(name);
  };

  const handleSaveClick = () => {
    if (validateName(nombre)) {
      localStorage.setItem("Nombre", nombre);
      
      onClose();
    } else {
      setErrorMessage("Nombres incorrecto");
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
              <div className="form-floating">
                <input
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={handleNombreChange}
                  className="input-register"
                  placeholder="Nombre y apellido"
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
                  className="submit-button"
                  disabled={!isNombreValid}
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

export default ModelName;
