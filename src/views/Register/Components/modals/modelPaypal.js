import React, {useState} from "react";

function ModelPaypal({ isVisible, onClose }) {
  const [texto, setTexto] = useState("paypal.me/");
  if (!isVisible) return null;

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
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
                    placeholder="URL"
                    value={texto} 
                    onChange={e => setTexto(e.target.value)}
                  />
                  <label ></label>
                
                  <input
                    type="text"
                    className="input-register my-3"
                    
                    placeholder="Title"
                  />
                  <label></label>
                </div>
                <hr />
                <div className="linea-botones">
                  <button
                    onClick={() => onClose()}
                    className="cancel-button"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
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

export default ModelPaypal;
