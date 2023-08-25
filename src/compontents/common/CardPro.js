/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import facebookIcon from "../.././assets/img/facebook.png";
import twitterIcon from "../.././assets/img/Twitter.png";
import instagramIcon from "../.././assets/img/Instagram.png";
import linkedinIcon from "../.././assets/img/Linkedin.png";
import youtubeIcon from "../.././assets/img/Youtube.png";
import tiktokIcon from "../.././assets/img/Tiktok.png";
import skypeIcon from "../../assets/img/skype.png";
import provi from "../../../src/assets/img/placeRegister.jpg";
import telegramIcon from "../../assets/img/telegram.png";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddLocationAltSharpIcon from "@mui/icons-material/AddLocationAltSharp";
import EmailIcon from "@mui/icons-material/Email";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import "../.././styles/card.css";

const MyButton = styled(Button)({
  backgroundColor: "#EBE9E9", // color de fondo transparente
  color: "#2d2d2d", // color de texto
  borderRadius: "30px", // borde redondeado// sombra
  "&:hover": {
    backgroundColor: "#F50057", // color de fondo al pasar el mouse
    color: "white", // color de texto al pasar el mouse
  },
  fontSize: "1.2rem", // tamaño de fuente
});

const MyPhoneIcon = styled(PhoneIcon)({
  marginRight: "0.5rem", // espacio a la derecha del ícono
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d2d2d", // Cambiar a rojo
    },
  },
});

export default function ActionAreaCard() {
  const [profesion, setProfesion] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [skype, setSkype] = useState("");
  const [telegram, setTelegram] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [mail, setMail] = useState("");
  const [url, setUrl] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [hoveredIcon, setHoveredIcon] = React.useState("");
  const [deleted, setDeleted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [draggedIcon, setDraggedIcon] = useState("");

  const imagenPerfil = localStorage.getItem("FotoPerfil");
  const imagenPortada = localStorage.getItem("FotoPortada");
  //let estado;
  const handleDeleteTwitter = () => {
    const newTwitter = twitter;

    const deleteTwitter = {
      id: newTwitter.id,
      tipo_social: newTwitter.tipo_social,
      text_label: newTwitter.text_label,
      estado: "0",
    };
    console.log(deleteTwitter);
    localStorage.setItem("Twitter", JSON.stringify(deleteTwitter));
    setShowTrash(false);
    setDeleted(true);
  };

  const handleDeleteInstagram = () => {
    const newInstagram = instagram;

    const deleteInstagram = {
      id: newInstagram.id,
      tipo_social: newInstagram.tipo_social,
      text_label: newInstagram.text_label,
      estado: "0",
    };
    localStorage.setItem("Instagram", JSON.stringify(deleteInstagram));
    setShowTrash(false);
    setDeleted(true);
  };

  const handleDeleteLinkedin = () => {
    const newLinkedin = linkedin;

    const deleteLinkedin = {
      id: newLinkedin.id,
      tipo_social: newLinkedin.tipo_social,
      text_label: newLinkedin.text_label,
      estado: "0",
    };
    localStorage.setItem("Linkedin", JSON.stringify(deleteLinkedin));
    setShowTrash(false);
    setDeleted(true);
  };

  const handleDeleteYoutube = () => {
    const newFacebook = facebook;

    const deleteFacebook = {
      id: newFacebook.id,
      tipo_social: newFacebook.tipo_social,
      text_label: newFacebook.text_label,
      estado: "0",
    };
    localStorage.setItem("Facebook", JSON.stringify(deleteFacebook));
    setShowTrash(false);
    setDeleted(true);
  };

  const handleDeleteTiktok = () => {
    const newTiktok = tiktok;

    const deleteTiktok = {
      id: newTiktok.id,
      tipo_social: newTiktok.tipo_social,
      text_label: newTiktok.text_label,
      estado: "0",
    };
    localStorage.setItem("Tiktok", JSON.stringify(deleteTiktok));
    setShowTrash(false);
    setDeleted(true);
  };

  const handleDeleteTelegram = () => {
    localStorage.removeItem("Telegram");
    setShowTrash(false);
    setTelegram("");
    setDeleted(true);
  };

  const handleDeleteSkype = () => {
    localStorage.removeItem("Skype");
    setShowTrash(false);
    setSkype("");
    setDeleted(true);
  };

  const handleDeleteUrl = () => {
    localStorage.removeItem("Url");
    setShowTrash(false);
    setUrl("");
    setDeleted(true);
  };

  const handleDeleteUbicacion = () => {
    localStorage.removeItem("Ubicacion");
    setShowTrash(false);
    setUbicacion("");
    setDeleted(true);
  };

  const handleDeleteFacebook = () => {
    const newFaceook = facebook;

    const deleteFacebook = {
      id: newFaceook.id,
      tipo_social: newFaceook.tipo_social,
      text_label: newFaceook.text_label,
      estado: "0",
    };
    localStorage.setItem("Facebook", JSON.stringify(deleteFacebook));
    setShowTrash(false);
    setDeleted(true);
  };
  
  const handleDeletePhone = () => {
    localStorage.removeItem("Phone");
    setShowTrash(false);
    setPhone("");
    setDeleted(true);
  };

  const handleDeleteWhatsapp = () => {
    localStorage.removeItem("Whatsapp");
    setShowTrash(false);
    setWhatsapp("");
    setDeleted(true);
  };

  const handleDragStart = (event, iconName) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    setShowTrash(true);
    setDragging(true);
    setDraggedIcon(iconName);
  };

  const handleDragEnd = (event) => {
    setShowTrash(false);
    setDragging(false);
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (dragging) {
      if (draggedIcon === "twitter") {
        handleDeleteTwitter();
      } else if (draggedIcon === "instagram") {
        handleDeleteInstagram();
      } else if (draggedIcon === "linkedin") {
        handleDeleteLinkedin();
      } else if (draggedIcon === "facebook") {
        handleDeleteFacebook();
      } else if (draggedIcon === "youtube") {
        handleDeleteYoutube();
      } else if (draggedIcon === "tiktok") {
        handleDeleteTiktok();
      } else if (draggedIcon === "phone") {
        handleDeletePhone();
      } else if (draggedIcon === "mail") {
        handleDeleteMail();
      } else if (draggedIcon === "whatsapp") {
        handleDeleteWhatsapp();
      } else if (draggedIcon === "telegram") {
        handleDeleteTelegram();
      } else if (draggedIcon === "skype") {
        handleDeleteSkype();
      } else if (draggedIcon === "url") {
        handleDeleteUrl();
      } else if (draggedIcon === "ubicacion") {
        handleDeleteUbicacion();
      }
    }
  };

  const handleTrashClick = () => {
    setShowTrash(false);
  };

  function handleMouseOver(iconName) {
    setHoveredIcon(iconName);
  }

  function handleMouseLeave() {
    setHoveredIcon("");
  }

  useEffect(() => {
    const storedValue = localStorage.getItem("Profesion");
    const storeValueNombre = localStorage.getItem("Nombre");
    const storedValueDescripcion = localStorage.getItem("Descripcion");
    const storedValueTwitter = localStorage.getItem("Twitter");
    const storedValueInstragram = localStorage.getItem("Instagram");
    const storedValueLinkedin = localStorage.getItem("Linkedin");
    const storedValueFacebook = localStorage.getItem("Facebook");
    const storedValueYoutube = localStorage.getItem("Youtube");
    const storedValueTiktok = localStorage.getItem("Tiktok");
    const storedValuePhone = localStorage.getItem("Phone");
    const storedValueMail = localStorage.getItem("Mail");
    const storedValueWhatsapp = localStorage.getItem("Whatsapp");
    const storedValueTelegram = localStorage.getItem("Telegram");
    const storedValueSkype = localStorage.getItem("Skype");
    const storedValueUrl = localStorage.getItem("Url");
    const storedValueUbicacion = localStorage.getItem("Ubicacion");
    if (
      storedValue ||
      storeValueNombre ||
      storedValueDescripcion ||
      storedValueTwitter ||
      storedValueInstragram ||
      storedValueLinkedin ||
      storedValueFacebook ||
      storedValueYoutube ||
      storedValueTiktok ||
      storedValuePhone ||
      storedValueMail ||
      storedValueWhatsapp ||
      storedValueTelegram ||
      storedValueSkype ||
      storedValueUrl ||
      storedValueUbicacion
    ) {
      setProfesion(storedValue);
      setNombre(storeValueNombre);
      setDescripcion(storedValueDescripcion);
      setTwitter(JSON.parse(storedValueTwitter));
      setInstagram(JSON.parse(storedValueInstragram));
      setLinkedin(JSON.parse(storedValueLinkedin));
      setFacebook(JSON.parse(storedValueFacebook));
      setYoutube(JSON.parse(storedValueYoutube));
      setTiktok(JSON.parse(storedValueTiktok));
      setPhone(storedValuePhone);
      setMail(storedValueMail);
      setWhatsapp(storedValueWhatsapp);
      setTelegram(storedValueTelegram);
      setSkype(storedValueSkype);
      setUrl(storedValueUrl);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedValue = localStorage.getItem("Profesion");
      const storeValueNombre = localStorage.getItem("Nombre");
      const storedValueDescripcion = localStorage.getItem("Descripcion");
      const storedValueTwitter = localStorage.getItem("Twitter");
      const storedValueInstragram = localStorage.getItem("Instagram");
      const storedValueLinkedin = localStorage.getItem("Linkedin");
      const storedValueFacebook = localStorage.getItem("Facebook");
      const storedValueYoutube = localStorage.getItem("Youtube");
      const storedValueTiktok = localStorage.getItem("Tiktok");
      const storedValuePhone = localStorage.getItem("Phone");
      const storedValueMail = localStorage.getItem("Mail");
      const storedValueWhatsapp = localStorage.getItem("Whatsapp");
      const storedValueTelegram = localStorage.getItem("Telegram");
      const storedValueSkype = localStorage.getItem("Skype");
      const storedValueUrl = localStorage.getItem("Url");
      const storedValueUbicacion = localStorage.getItem("Ubicacion");
      if (
        storedValue !== profesion ||
        storeValueNombre !== nombre ||
        storedValueDescripcion !== descripcion ||
        storedValueTwitter !== twitter ||
        storedValueInstragram !== instagram ||
        storedValueLinkedin !== linkedin ||
        storedValueFacebook !== facebook ||
        storedValueYoutube !== youtube ||
        storedValueTiktok !== tiktok ||
        storedValuePhone !== phone ||
        storedValueMail !== mail ||
        storedValueWhatsapp !== whatsapp ||
        storedValueTelegram !== telegram ||
        storedValueSkype !== skype ||
        storedValueUrl !== url ||
        storedValueUbicacion !== ubicacion
      ) {
        setProfesion(storedValue);
        setNombre(storeValueNombre);
        setDescripcion(storedValueDescripcion);
        setTwitter(JSON.parse(storedValueTwitter));
        setInstagram(JSON.parse(storedValueInstragram));
        setLinkedin(JSON.parse(storedValueLinkedin));
        setFacebook(JSON.parse(storedValueFacebook));
        setYoutube(JSON.parse(storedValueYoutube));
        setTiktok(JSON.parse(storedValueTiktok));
        setPhone(storedValuePhone);
        setMail(storedValueMail);
        setWhatsapp(storedValueWhatsapp);
        setTelegram(storedValueTelegram);
        setSkype(storedValueSkype);
        setUrl(storedValueUrl);
        setUbicacion(storedValueUbicacion);
      }
    });

    return () => clearInterval(intervalId);
  }, [
    profesion,
    nombre,
    descripcion,
    twitter,
    instagram,
    linkedin,
    facebook,
    youtube,
    tiktok,
    phone,
    mail,
    whatsapp,
    telegram,
    skype,
    url,
    ubicacion,
  ]);

  const handleDeleteMail = () => {
    localStorage.removeItem("Mail");
    setUbicacion("");
  };

  const handleDelete = () => {
    localStorage.removeItem("Profesion");
    setProfesion("");
  };

  const handleDeleteNombre = () => {
    localStorage.removeItem("Nombre");
    setNombre("");
  };

  const handleDeleteDescripcion = () => {
    localStorage.removeItem("Descripcion");
    setDescripcion("");
  };

  const handleDeleteWeb = () => {
    localStorage.removeItem("Url");
    setUrl("");
  };

  const handleDeleteUbi = () => {
    localStorage.removeItem("Ubicacion");
    setUbicacion("");
  };

  const handleSaveContact = () => {
    window.location.href = "tel:" + phone;
  };

  const contenidoLocalStorage = localStorage.length > 0;
  return (
    <ThemeProvider theme={theme}>
      {!contenidoLocalStorage ? (
        <Card
          sx={{ maxWidth: 450 }}
          style={{
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
        >
          <CardMedia component="img" image={provi} />
        </Card>
      ) : (
        <Card
          sx={{ maxWidth: 450 }}
          style={{
            boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
        >
          {imagenPortada ? (
            <CardMedia
              component="img"
              height="200"
              image={imagenPortada}
              alt="Imagen de perfil"
            />
          ) : null}

          {imagenPerfil ? (
            <div className="author">
              <Avatar
                src={imagenPerfil}
                className="avatar border-gray"
                alt="Imagen de perfil"
              />
            </div>
          ) : null}

          <CardContent style={{ backgroundColor: "#efefef" }}>
            {nombre && (
              <div className="input-container-card">
                <Typography gutterBottom variant="h4" component="div">
                  {nombre}
                </Typography>
                <button
                  className="delete-button-card"
                  onClick={handleDeleteNombre}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            )}

            {profesion && (
              <div className="input-container-card">
                <Typography gutterBottom variant="h6" component="div">
                  {profesion}
                </Typography>
                <button className="delete-button-card" onClick={handleDelete}>
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            )}

            {descripcion && (
              <div className="input-container-card">
                <Typography gutterBottom variant="h7" component="div">
                  {descripcion}
                </Typography>
                <button
                  className="delete-button-card"
                  onClick={handleDeleteDescripcion}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            )}

            <div className="social-icons my-3">
              {facebook && facebook.estado === "1" &&(
                <div className="social-icon-container">
                  <a
                    href={facebook.tipo_social}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon ${
                        hoveredIcon === "facebook" ? "hovered" : ""
                      }`}
                      src={facebookIcon}
                      alt="Icono de Facebook"
                      onMouseOver={() => handleMouseOver("facebook")}
                      onMouseLeave={handleMouseLeave}
                      draggable="true"
                      onDragStart={(event) =>
                        handleDragStart(event, "facebook")
                      }
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                    />
                    {hoveredIcon === "facebook" && (
                      <div className="icon-text">Facebook</div>
                    )}
                  </a>
                </div>
              )}

              {twitter && twitter.estado === "1" && (
                <div className="social-icon-container">
                  <a
                    href={twitter.tipo_social}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon ${
                        hoveredIcon === "twitter" ? "hovered" : ""
                      }`}
                      src={twitterIcon}
                      alt="Icono de Twitter"
                      onMouseOver={() => handleMouseOver("twitter")}
                      onMouseLeave={handleMouseLeave}
                      draggable="true"
                      onDragStart={(event) => handleDragStart(event, "twitter")}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                    />
                    {hoveredIcon === "twitter" && (
                      <div className="icon-text">Twitter</div>
                    )}
                  </a>
                </div>
              )}

              {instagram && instagram.estado === "1" &&(
                <div className="social-icon-container">
                  <a
                    href={instagram.tipo_social}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon ${
                        hoveredIcon === "instagram" ? "hovered" : ""
                      }`}
                      src={instagramIcon}
                      alt="Icono de Instagram"
                      onMouseOver={() => handleMouseOver("instagram")}
                      onMouseLeave={handleMouseLeave}
                      draggable="true"
                      onDragStart={(event) =>
                        handleDragStart(event, "instagram")
                      }
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                    />
                    {hoveredIcon === "instagram" && (
                      <div className="icon-text">Instagram</div>
                    )}
                  </a>
                </div>
              )}

              {linkedin && linkedin.estado === "1" && (
                <div className="social-icon-container">
                  <a
                    href={linkedin.tipo_social}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon ${
                        hoveredIcon === "linkedin" ? "hovered" : ""
                      }`}
                      src={linkedinIcon}
                      alt="Icono de Linkedin"
                      onMouseOver={() => handleMouseOver("linkedin")}
                      onMouseLeave={handleMouseLeave}
                      draggable="true"
                      onDragStart={(event) =>
                        handleDragStart(event, "linkedin")
                      }
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                    />
                    {hoveredIcon === "linkedin" && (
                      <div className="icon-text">Linkedin</div>
                    )}
                  </a>
                </div>
              )}
            </div>
            <div className="social-icons">
              {youtube && youtube.estado === "1" && (
                <div className="social-icon-container">
                  <a
                    href={youtube.tipo_social}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon ${
                        hoveredIcon === "youtube" ? "hovered" : ""
                      }`}
                      src={youtubeIcon}
                      alt="Icono de Youtube"
                      onMouseOver={() => handleMouseOver("youtube")}
                      onMouseLeave={handleMouseLeave}
                      draggable="true"
                      onDragStart={(event) => handleDragStart(event, "youtube")}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                    />
                    {hoveredIcon === "youtube" && (
                      <div className="icon-text">Youtube</div>
                    )}
                  </a>
                </div>
              )}

              {tiktok &&  tiktok.estado === "1" && (
                <div className="social-icon-container">
                  <a
                    href={tiktok.tipo_social}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon ${
                        hoveredIcon === "tiktok" ? "hovered" : ""
                      }`}
                      src={tiktokIcon}
                      alt="Icono de Tiktok"
                      onMouseOver={() => handleMouseOver("tiktok")}
                      onMouseLeave={handleMouseLeave}
                      draggable="true"
                      onDragStart={(event) => handleDragStart(event, "tiktok")}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                    />
                    {hoveredIcon === "tiktok" && (
                      <div className="icon-text">Tiktok</div>
                    )}
                  </a>
                </div>
              )}

              {skype && (
                <div className="social-icon-container">
                  <a href={skype} target="_blank" rel="noopener noreferrer">
                    <img
                      className={`social-icon ${
                        hoveredIcon === "skype" ? "hovered" : ""
                      }`}
                      src={skypeIcon}
                      alt="Icono de Skype"
                      onMouseOver={() => handleMouseOver("skype")}
                      onMouseLeave={handleMouseLeave}
                      draggable="true"
                      onDragStart={(event) => handleDragStart(event, "skype")}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                    />
                    {hoveredIcon === "skype" && (
                      <div className="icon-text">skype</div>
                    )}
                  </a>
                </div>
              )}

              {telegram && (
                <div className="social-icon-container">
                  <a href={telegram} target="_blank" rel="noopener noreferrer">
                    <img
                      className={`social-icon ${
                        hoveredIcon === "telegram" ? "hovered" : ""
                      }`}
                      src={telegramIcon}
                      alt="Icono de Telegram"
                      onMouseOver={() => handleMouseOver("telegram")}
                      onMouseLeave={handleMouseLeave}
                      draggable="true"
                      onDragStart={(event) =>
                        handleDragStart(event, "telegram")
                      }
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                    />
                    {hoveredIcon === "telegram" && (
                      <div className="icon-text">Telegram</div>
                    )}
                  </a>
                </div>
              )}
              {showTrash && (
                <div
                  className="basurero"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  draggable="true"
                  onClick={handleTrashClick}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </div>
              )}
            </div>

            <div>
              {url && (
                <div className="input-container-card">
                  <ListItem>
                    <ListItemButton>
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText primary={url} />
                    </ListItemButton>
                    <button
                      className="delete-button-card"
                      onClick={handleDeleteWeb}
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                  </ListItem>
                </div>
              )}

              {ubicacion ? (
                <div className="input-container-card">
                  <ListItem>
                    <ListItemButton
                      component="a"
                      href={`https://www.google.com/maps/place/${encodeURIComponent(
                        ubicacion
                      )}`}
                      target="_blank"
                    >
                      <ListItemIcon>
                        <AddLocationAltSharpIcon />
                      </ListItemIcon>
                      <ListItemText primary={ubicacion} />
                    </ListItemButton>
                    <button
                      className="delete-button-card"
                      onClick={handleDeleteUbi}
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </button>
                  </ListItem>
                </div>
              ) : (
                ubicacion
              )}

              {mail && (
                <div className="input-container-card">
                  <ListItem>
                    <Link href={`mailto:${mail}`} underline="none">
                      <ListItemButton>
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={mail} />
                      </ListItemButton>
                      <button
                        className="delete-button-card"
                        onClick={handleDeleteMail}
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                    </Link>
                  </ListItem>
                </div>
              )}
            </div>

            <div className="my-2 text-center">
              {phone && (
                <MyButton onClick={handleSaveContact}>
                  <Box display="flex" alignItems="center">
                    <MyPhoneIcon />
                    Guardar contacto
                  </Box>
                </MyButton>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </ThemeProvider>
  );
}
