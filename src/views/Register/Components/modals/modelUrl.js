import React, { useState, useEffect }  from "react";

function ModelUrl({ isVisible, onClose }) {

  const [url, setUrl] = useState(
    localStorage.getItem("Url") || ""
  );
  const [isUrlValid, setIsUrlValid] = useState(false);

  useEffect(() => {
    setIsUrlValid(!!url.trim());
  }, [url]);


  if (!isVisible) return null;

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    localStorage.setItem("Url", newUrl);
    setUrl(newUrl);
  };

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
    
  };

  const handleSaveClick = () => {
    localStorage.setItem("Url", url);
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
                    name="url"
                    value={url}
                    onChange={handleUrlChange}
                    className="input-register my-3"
                    
                    placeholder="URL"
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
                    disabled={!isUrlValid}
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

export default ModelUrl;
