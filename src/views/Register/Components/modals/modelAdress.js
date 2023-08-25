import React, { useState, useEffect } from "react";

function ModelAddress({ isVisible, onClose }) {
  const [ubicacion, setUbicacion] = useState(
    localStorage.getItem("Ubicacion") || ""
  );
  const [isUbicacionValid, setIsUbicacionValid] = useState(false);

  useEffect(() => {
    setIsUbicacionValid(!!ubicacion.trim());
  }, [ubicacion]);

  if (!isVisible) return null;

  const handleUbicacionChange = (event) => {
    const newUbicacion = event.target.value;
    localStorage.setItem("Ubicacion", newUbicacion);
    setUbicacion(newUbicacion);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSaveClick = () => {
    localStorage.setItem("Ubicacion", ubicacion);
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
                <div className="form-floating ">
                  <input
                    type="text"
                    name="ubicacion"
                    value={ubicacion}
                    onChange={handleUbicacionChange}
                    className="input-register my-3"
                    id="floatingUrl"
                    placeholder="Direccion"
                  />
                </div>
                <hr />
                <div className="linea-botones">
                  <button onClick={handleCancel} className="cancel-button">
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    disabled={!isUbicacionValid}
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

export default ModelAddress;
