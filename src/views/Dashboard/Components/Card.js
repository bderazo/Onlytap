/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import facebookIcon from "../../.././assets/img/facebook.png";
import twitterIcon from "../../.././assets/img/Twitter.png";
import instagramIcon from "../../.././assets/img/Instagram.png";
import linkedinIcon from "../../.././assets/img/Linkedin.png";
import youtubeIcon from "../../.././assets/img/Youtube.png";
import tiktokIcon from "../../.././assets/img/Tiktok.png";
import skypeIcon from "../../.././assets/img/skype.png";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import telegramIcon from "../../.././assets/img/telegram.png";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddLocationAltSharpIcon from "@mui/icons-material/AddLocationAltSharp";
import EmailIcon from "@mui/icons-material/Email";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { saveAs } from "file-saver";
import "../../.././styles/card.css";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

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

export default function ActionAreaCardDash() {
  const [datos, setDatos] = useState(null);
  const [twitterUrl, setTwitterUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [skypeUrl, setSkypeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");

  useEffect(() => {
    async function fetchDatos() {
      try {
        const tarjetaId = localStorage.getItem("tarjetaID");

        const { data } = await axios.post(
          baseUrl + `usuario/tarjeta/ver/${tarjetaId}`,
          null
        );
        const socialMedia = data.data.sociales_tarjeta;
        const twitterUrlObject = socialMedia.find(
          (social) => social.text_label === "twitter"
        );
        const twitterUrl = twitterUrlObject ? twitterUrlObject.tipo_social : "";
        const facebookUrlObject = socialMedia.find(
          (social) => social.text_label === "facebook"
        );
        const facebookUrl = facebookUrlObject
          ? facebookUrlObject.tipo_social
          : "";

        const youtubeUrlObject = socialMedia.find(
          (social) => social.text_label === "youtube"
        );
        const youtubeUrl = youtubeUrlObject ? youtubeUrlObject.tipo_social : "";

        const tiktokUrlObject = socialMedia.find(
          (social) => social.text_label === "tiktok"
        );
        const tiktokUrl = tiktokUrlObject ? tiktokUrlObject.tipo_social : "";

        const instagramUrlObject = socialMedia.find(
          (social) => social.text_label === "instagram"
        );
        const instagramUrl = instagramUrlObject
          ? instagramUrlObject.tipo_social
          : "";

        const linkedinUrlObject = socialMedia.find(
          (social) => social.text_label === "linkedin"
        );

        const linkedinUrl = linkedinUrlObject
          ? linkedinUrlObject.tipo_social
          : "";
        const skypeUrlObject = socialMedia.find(
          (social) => social.text_label === "skype"
        );
        const skypeUrl = skypeUrlObject ? skypeUrlObject.tipo_social : "";

        const telegramUrlObject = socialMedia.find(
          (social) => social.text_label === "telegram"
        );
        const telegramUrl = telegramUrlObject
          ? telegramUrlObject.tipo_social
          : "";

        setDatos(data);
        setTwitterUrl(twitterUrl);
        setFacebookUrl(facebookUrl);
        setYoutubeUrl(youtubeUrl);
        setTiktokUrl(tiktokUrl);
        setInstagramUrl(instagramUrl);
        setLinkedinUrl(linkedinUrl);
        setSkypeUrl(skypeUrl);
        setTelegramUrl(telegramUrl);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDatos();
  }, []);

  const handleSaveContact = () => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${datos.data.nombre};;;;`,
      `ORG:${datos.data.profesion}`,
      `TITLE:${datos.data.profesion}`,
      `TEL;TYPE=work,voice;VALUE=uri:${datos.data.telefono}`,
      `EMAIL:${datos.data.correo}`,
      `URL:${datos.data.sitio_web}`,
      `ADR;TYPE=work;LABEL="${datos.data.direccion}":;;${datos.data.direccion}`,
      `NOTE:Contacto agregado mediante OnlyTap`,

      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    saveAs(blob, `${datos.data.nombre}"OnlyTap".vcf`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{ maxWidth: 400 }}
        style={{
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
        }}
      >
        <CardActionArea style={{ backgroundColor: "black" }}>
          {datos && datos.data.img_portada && datos.data.img_portada ? (
            <CardMedia
              component="img"
              height="200"
              image={datos.data.img_portada}
              alt="Imagen de perfil"
            />
          ) : (
            <CardMedia
              component="img"
              height="200"
              image="https://us.123rf.com/450wm/redicka/redicka1410/redicka141000095/32216620-sin-fisuras-patr%C3%B3n-geom%C3%A9trico-negro-para-su-dise%C3%B1o-de-portada-dise%C3%B1o-de-libros-fondo-del-sitio.jpg"
              alt="Imagen de perfil"
            />
          )}

          {datos && datos.data.img_perfil && datos.data.img_perfil ? (
            <div className="author">
              <Avatar
                src={datos.data.img_perfil}
                className="avatar border-gray"
                alt="Imagen de perfil"
              />
            </div>
          ) : (
            <div className="author">
              <Avatar
                src="https://w7.pngwing.com/pngs/52/368/png-transparent-user-profile-computer-icons-avatar-avatar-heroes-monochrome-desktop-wallpaper.png"
                className="avatar border-gray"
                alt="Imagen de perfil"
              />
            </div>
          )}

          <CardContent style={{ backgroundColor: "#efefef" }}>
            {datos && datos.data.nombre && datos.data.nombre && (
              <Typography gutterBottom variant="h4" component="div">
                {datos.data.nombre}
              </Typography>
            )}

            {datos && datos.data.profesion && datos.data.profesion && (
              <Typography gutterBottom variant="h6" component="div">
                {datos.data.profesion}
              </Typography>
            )}

            {datos && datos.data.empresa && datos.data.empresa && (
              <Typography gutterBottom variant="h7" component="div">
                {datos.data.empresa}
              </Typography>
            )}

            <div className="social-icons my-3">
              {facebookUrl && (
                <div className="social-icon-container">
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon`}
                      src={facebookIcon}
                      alt="Icono de Facebook"
                    />
                  </a>
                </div>
              )}

              {twitterUrl && (
                <div className="social-icon-container">
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon`}
                      src={twitterIcon}
                      alt="Icono de Facebook"
                    />
                  </a>
                </div>
              )}

              {instagramUrl && (
                <div className="social-icon-container">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon`}
                      src={instagramIcon}
                      alt="Icono de Facebook"
                    />
                  </a>
                </div>
              )}

              {linkedinUrl && (
                <div className="social-icon-container">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon`}
                      src={linkedinIcon}
                      alt="Icono de Facebook"
                    />
                  </a>
                </div>
              )}
            </div>
            <div className="social-icons">
              {youtubeUrl && (
                <div className="social-icon-container">
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon`}
                      src={youtubeIcon}
                      alt="Icono de Facebook"
                    />
                  </a>
                </div>
              )}

              {tiktokUrl && (
                <div className="social-icon-container">
                  <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      className={`social-icon`}
                      src={tiktokIcon}
                      alt="Icono de Facebook"
                    />
                  </a>
                </div>
              )}

              {skypeUrl && (
                <div className="social-icon-container">
                  <a href={skypeUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      className={`social-icon`}
                      src={skypeIcon}
                      alt="Icono de Facebook"
                    />
                  </a>
                </div>
              )}

              {telegramUrl && (
                <div className="social-icon-container">
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className={`social-icon`}
                      src={telegramIcon}
                      alt="Icono de Telegram"
                    />
                  </a>
                </div>
              )}
            </div>

            <div>
              {datos && datos.data.sitio_web && datos.data.sitio_web && (
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText primary={datos.data.sitio_web} />
                  </ListItemButton>
                </ListItem>
              )}

              {datos && datos.data.direccion && datos.data.direccion && (
                <ListItem>
                  <ListItemButton
                    component="a"
                    href={`https://www.google.com/maps/place/${encodeURIComponent(
                      datos.data.direccion
                    )}`}
                    target="_blank"
                  >
                    <ListItemIcon>
                      <AddLocationAltSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary={datos.data.direccion} />
                  </ListItemButton>
                </ListItem>
              )}

              {datos && datos.data.correo && datos.data.correo && (
                <ListItem>
                  <Link href={`mailto:${datos.data.correo}`} underline="none">
                    <ListItemButton>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary={datos.data.correo} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              )}
            </div>

            <div className="my-2 text-center">
              {datos && datos.data.telefono && datos.data.telefono && (
                <MyButton onClick={handleSaveContact}>
                  <Box display="flex" alignItems="center">
                    <MyPhoneIcon />
                    <span>Guardar contacto</span>
                  </Box>
                </MyButton>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}
