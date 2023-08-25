import React, { useState } from "react";
import { uploadFileToFB } from "../../../../firebaseConfig";
import { Button, InputLabel, Input, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const UploadFormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  border: "2px dashed",
  borderColor: "#3f51b5",
  borderRadius: "4px",
  backgroundColor: "#f5f5f5",
  color: "#616161",
  outline: "none",
  transition: "border .24s ease-in-out",
  "&:hover": {
    borderColor: "#283593",
  },
});

function ModelCoverPhono({ isVisible, onClose }) {
  const [imageUrl, setImageUrl] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [urlPortada, setUrlPortada] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    setLoading(true);

    const file = e.target.files[0];
    const validExts = ["png", "jpg", "jpeg", ".PNG"];

    if (file) {
      const ext = file.name.split(".")[1];
      const uploadedUrl = await uploadFileToFB(file, "registerPortada");
      setUrlPortada(uploadedUrl.url);

      if (!validExts.includes(ext)) {
        alert(
          "Error",
          `El archivo con extensión .${ext} no está permitido como logo`,
          "error"
        );
        setLoading(false);
        return;
      }

      setImgFile(file);
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setShowImage(true);
    //localStorage.setItem("FotoPortada", urlPortada);
    setLoading(false);
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setShowImage(false);
  };

  if (!isVisible) return null;

  const handelClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imgFile !== null) {
      setLoading(true);
      const uploadedUrl = await uploadFileToFB(imgFile, "storagePortada");
      setLoading(false);
      localStorage.setItem("FotoPortada", urlPortada);
      const perfil = localStorage.getItem("FotoPerfil");
      if (
        perfil === null ||
        perfil === "undefined" ||
        perfil === ""
      ) {
        localStorage.setItem(
          "FotoPerfil",
          "https://w7.pngwing.com/pngs/52/368/png-transparent-user-profile-computer-icons-avatar-avatar-heroes-monochrome-desktop-wallpaper.png"
        );
      }
      setUrl(uploadedUrl.url);
    }
    window.location.reload();
  };

  

  return (
    <>
      <div>
        <div className="modal-container">
          <div className="modal-body">
            <div id="close" onClick={handelClose}>
              <div className="input-container">
                <br />
                {showImage ? (
                  <>
                    <div className="form-floating mb-5">
                      <div className="image-preview-container">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          width={200}
                          height={200}
                        />
                        <button
                          type="button"
                          className="remove-image-button"
                          onClick={handleRemoveImage}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <UploadFormContainer>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <InputLabel
                          htmlFor="upload-input"
                          style={{ marginBottom: "8px" }}
                        >
                          Subir foto portada
                        </InputLabel>
                        <Input
                          id="upload-input"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                        <label htmlFor="upload-input">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            Seleccionar foto
                          </Button>
                        </label>
                      </>
                    )}
                  </UploadFormContainer>
                )}
                <hr />
                <div className="linea-botones">
                  <button
                    className="cancel-button"
                    onClick={() => {
                      onClose();
                    }}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="submit-button"
                    disabled={loading}
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

export default ModelCoverPhono;
