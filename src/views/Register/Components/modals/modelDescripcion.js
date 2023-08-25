import React, { useState, useEffect } from "react";

function ModelDescripcion({ isVisible, onClose }) {
  const [descripcion, setDescripcion] = useState(
    localStorage.getItem("Descripcion") || ""
  );
  const [isDescripcionValid, setIsDescripcionValid] = useState(false);

  useEffect(() => {
    setIsDescripcionValid(!!descripcion.trim());
  }, [descripcion]);

  if (!isVisible) return null;

  const handleDescripcionChange = (event) => {
    const newDescripcion = event.target.value;
    localStorage.setItem("Descripcion", newDescripcion);
    setDescripcion(newDescripcion);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    localStorage.setItem("Descripcion", descripcion);
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
                    name="description"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    className="input-register my-3"
                    placeholder="Agrega una descripcion tuya"
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
                    disabled={!isDescripcionValid}
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

export default ModelDescripcion;
