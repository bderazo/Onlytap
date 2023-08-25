import CustomEdit from "./customEdit";
import React, { useState, useEffect } from "react";
import styles from "../../../Register/Components/MultiStepFrom.module.css";
import { uploadFileToFBbdd } from "../../../../firebaseConfig";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

function FormEdit() {
  const [nombre, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [portada, setPortada] = useState("");
  const [perfil, setPerfil] = useState("");

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchImageURL = async () => {
      const newestImageURL = localStorage.getItem("FotoPortada");
      const newestImagePerfilURL = localStorage.getItem("FotoPerfil");
      setPortada(newestImageURL);
      setPerfil(newestImagePerfilURL);

      await uploadFileToFBbdd(newestImageURL, "ActivoPortada");
      await uploadFileToFBbdd(newestImagePerfilURL, "ActivoPerfil");
    };
    fetchImageURL();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    handleUpdate();
  };
  const handleUpdate = async (e) => {
    const twitter = localStorage.getItem("Twitter");
    const facebook = localStorage.getItem("Facebook");
    const instagram = localStorage.getItem("Instagram");
    const linkedin = localStorage.getItem("Linkedin");
    const youtube = localStorage.getItem("Youtube");
    const tiktok = localStorage.getItem("Tiktok");
    const skype = localStorage.getItem("Skype");
    const telegram = localStorage.getItem("Telegram");
    const tiktokup = JSON.parse(tiktok);
    const twitterup = JSON.parse(twitter);
    const youtubeup = JSON.parse(youtube);
    const telegramup = JSON.parse(telegram);
    const linkedinup = JSON.parse(linkedin);
    const instagramup = JSON.parse(instagram);
    const facebookup = JSON.parse(facebook);

    let myArray = [
      twitterup,
      facebookup,
      telegramup,
      youtubeup,
      tiktokup,
      linkedinup,
      instagramup,
      skype,
    ];
    myArray = myArray.filter((value) => value !== null);
    console.log(myArray);
    const redesSociales = myArray.map((value, index) => {
      if (value.tipo_social) {
        if (!value.text_label) {
          const socialName = value.tipo_social
            .match(/\/\/(?:www\.)?([^]+)/)[1]
            .split(".")[0];
          return {
            url: socialName, // Puedes utilizar el índice del elemento más 1 como identificador
            value: value.tipo_social,
          };
        } else {
          const socialName = value.text_label;
          const id = value.id;
          return {
            id: id,
            url: socialName, // Puedes utilizar el índice del elemento más 1 como identificador
            value: value.tipo_social,
            estado: value.estado,
          };
        }
      }
    });

    try {
      const TarjetaID = localStorage.getItem("tarjetaID");
      const token = localStorage.getItem("token");

      const user = localStorage.getItem("user");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const updatedFormData = {
        name: nombre,
        profesion: localStorage.getItem("Profesion"),
        empresa: localStorage.getItem("Descripcion"),
        telefono: phone,
        direccion: localStorage.getItem("Ubicacion"),
        correo: localStorage.getItem("Mail"),
        web: localStorage.getItem("Url"),
      };

      const cardCreateResponse = await axios.post(
        baseUrl + `usuario/tarjeta/actualizar/${TarjetaID}`,
        {
          img_portada: portada,
          img_perfil: perfil,
          nombre: updatedFormData.name,
          profesion: updatedFormData.profesion,
          empresa: updatedFormData.empresa,
          acreditaciones: "",
          telefono: updatedFormData.telefono,
          direccion: updatedFormData.direccion,
          correo: updatedFormData.correo,
          sitio_web: updatedFormData.web,
        },
        { headers }
      );

      for (const redSocial of redesSociales) {
        //console.log(redSocial);
        if (!redSocial.id) {
          try {
            const socialCreateResponse = await axios.post(
              baseUrl + "tarjeta/sociales/crear",
              {
                user_tarjeta_id: TarjetaID,
                text_label: redSocial.url,
                tipo_social: redSocial.value,
                icon_social: "URL",
              },
              { headers }
            );

            console.log(
              "Red Social creada correctamente" + socialCreateResponse.data
            );
          } catch (error) {
            console.log("Error al crear las redes sociales");
            handleClose();
          }
        } else {
          try {
            const socialCreateResponse = await axios.post(
              baseUrl + `tarjeta/sociales/actualizar/${redSocial.id}`,
              {
                text_label: redSocial.url,
                tipo_social: redSocial.value,
                estado: redSocial.estado,
                icon_social: "URL",
              },
              { headers }
            );
            console.log(
              "Red Social actualizada correctamente" + socialCreateResponse.data
            );
          } catch (error) {
            console.log("Error al crear las redes sociales");
            handleClose();
          }
        }
      }

      localStorage.clear();
      localStorage.setItem("tarjetaID", cardCreateResponse.data.data.id);
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      window.location.href = "/OnlyTap";
    } catch (error) {
      console.log(error);
      handleClose();
    }
  };

  useEffect(() => {
    const storeValueNombre = localStorage.getItem("Nombre");
    const storedValuePhone = localStorage.getItem("Phone");
    if (storeValueNombre || storedValuePhone) {
      setNombre(storeValueNombre);
      setPhone(storedValuePhone);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storeValueNombre = localStorage.getItem("Nombre");
      const storedValuePhone = localStorage.getItem("Phone");
      if (storeValueNombre !== nombre || storedValuePhone !== phone) {
        setNombre(storeValueNombre);
        setPhone(storedValuePhone);
      }
    });

    return () => clearInterval(intervalId);
  }, [nombre, phone]);

  return (
    <form className={styles.form}>
      <CustomEdit />

      {nombre && phone ? (
        <div className={`${styles.headContinuar}`}>
          <button
            className={styles.nextStep}
            onClick={handleOpen}
            type="button"
          >
            Guardar Cambios
          </button>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <div className={`${styles.headContinuar}`}>
          <button
            className={styles.nextStepNada}
            type="button"
            onClick={() => {
              if (!nombre || !phone) {
                alert("Por favor llene su nombre y número de teléfono.");
              }
            }}
          >
            Continuar
          </button>
        </div>
      )}
    </form>
  );
}

export default FormEdit;
