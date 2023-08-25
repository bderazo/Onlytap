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

function ModelPictureProfile({ isVisible, onClose }) {
  const [imageUrl, setImageUrl] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [urlPerfil, setUrlPerfil] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {

    setLoading(true);

    const file = e.target.files[0];

    const validExts = ["png", "jpg", "jpeg", ".PNG"];
    if (file) {
      const ext = file.name.split(".")[1];
      const uploadedUrl = await uploadFileToFB(file, "registerPerfil");
      setUrlPerfil(uploadedUrl.url);
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
    //localStorage.setItem("FotoPerfil", urlPerfil);

    setLoading(false);
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setShowImage(false);

  };

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "close") onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imgFile !== null) {
      const uploadedUrl = await uploadFileToFB(imgFile, "storagePerfil");
      localStorage.setItem("FotoPerfil", urlPerfil);
      const portada = localStorage.getItem("FotoPortada");
      if (portada === null || portada === "undefined" || portada === "") {
        localStorage.setItem("FotoPortada", "https://us.123rf.com/450wm/redicka/redicka1410/redicka141000095/32216620-sin-fisuras-patr%C3%B3n-geom%C3%A9trico-negro-para-su-dise%C3%B1o-de-portada-dise%C3%B1o-de-libros-fondo-del-sitio.jpg")
      }
      setUrl(uploadedUrl.url);
    }
    window.location.reload();
    // aquí puedes enviar la imagen al servidor si lo necesitas
    onClose();
  };


  return (
    <>
      <div>
        <div className="modal-container">
          <div className="modal-body">
            <div id="close" onClick={handleClose}>
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
                    ) :
                      <>
                        <InputLabel
                          htmlFor="upload-input"
                          style={{ marginBottom: "8px" }}
                        >
                          Subir foto selfie
                        </InputLabel>
                        <Input
                          id="upload-input"
                          type="file"
                          style={{ display: 'none' }}
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
                    }
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

export default ModelPictureProfile;
