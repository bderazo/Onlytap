import React, { useState, useEffect } from "react";

function ModelJob({ isVisible, onClose }) {
  const [profesion, setProfesion] = useState(
    localStorage.getItem("Profesion") || ""
  );
  const [isProfesionValid, setIsProfesionValid] = useState(false);

  useEffect(() => {
    setIsProfesionValid(!!profesion.trim());
  }, [profesion]);

  if (!isVisible) return null;

  const handleProfesionChange = (event) => {
    const newProfesion = event.target.value;
    localStorage.setItem("Profesion", newProfesion);
    setProfesion(newProfesion);
  };

  const handelClose = (e) => {
    if (e.target.id === "close")  onClose();
  };

 

  const handleSaveClick = () => {
      localStorage.setItem("Profesion", profesion);
      onClose();
  };

  

  const handleCancel = () => {
    setProfesion("");
    onClose();
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
                  name="profesion"
                  value={profesion}
                  onChange={handleProfesionChange}
                  className="input-register"
                  placeholder="Profesion"
                />
                <label></label>
              </div>
              <hr />
              <div className="linea-botones">
                <button onClick={handleCancel} className="cancel-button">
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="submit-button"
                  disabled={!isProfesionValid}
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

export default ModelJob;
