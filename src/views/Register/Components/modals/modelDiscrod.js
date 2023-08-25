import React, {useState} from "react";

function ModelDiscord({ isVisible, onClose }) {
    const [texto, setTexto] = useState("discord.gg/");

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
                    placeholder="Usuario/URL"
                    value={texto} 
                    onChange={e => setTexto(e.target.value)}
                  />
                  <label ></label>
                
                  <input
                    type="text"
                    className=" input-register my-3"
                    placeholder="Titulo"
                  />
                  <label></label>
                </div>
                <hr />
                <div className="linea-botones">
                  <button
                    onClick={() => onClose()}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="submit-button"
                  >
                    Submit
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

export default ModelDiscord;
