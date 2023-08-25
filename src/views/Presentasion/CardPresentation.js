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
import facebookIcon from "../../assets/img/iconos/facebook.png";
import twitterIcon from "../../assets/img/iconos/twiter.png";
import instagramIcon from "../../assets/img/iconos/instagram.png";
import linkedinIcon from "../../assets/img/iconos/linkedin.png";
import youtubeIcon from "../../assets/img/iconos/youtube.png";
import tiktokIcon from "../../assets/img/iconos/tiktok.png";
import whatsapp from "../../assets/img/iconos/WhatsApp.jpeg";
import skypeIcon from "../../assets/img/skype.png";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import telegramIcon from "../../assets/img/telegram.png";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddLocationAltSharpIcon from "@mui/icons-material/AddLocationAltSharp";
import EmailIcon from "@mui/icons-material/Email";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { saveAs } from "file-saver";
import "../../styles/card.css";
import ShareIcon from "@mui/icons-material/Share";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import ExampleComponent from "./Qr";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import logoMarcaAgua from "../../assets/img/logo.png";
// import animationData from "../../assets/img/lotties/animation_llbn6fo4.json";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const MyButton = styled(Button)({
  backgroundColor: "#c9c9c9", // color de fondo transparente
  color: "#000000", // color de texto
  borderRadius: " 0 0 30px 30px", // borde redondeado// sombra
  "&:hover": {
    backgroundColor: "#9c9c9c", // color de fondo al pasar el mouse
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
async function aumentarWeb(data) {
  console.log("clics web");
  try {
    // obtener las veces que se presiono el boton guardar desde BD
    const clicsWeb = parseInt(data.clics_sitio_web, 10);
    // aumentar el contador en 1 por cada visita realizada a la presentacion
    const nuevoClicsWeb = clicsWeb + 1;
    // almacenar el contador en BD por persistencia
    await axios.post(baseUrl + `usuario/tarjeta/actualizar/${data.id}`, {
      clics_sitio_web: nuevoClicsWeb,
    });
  } catch (error) {
    console.error(error);
  }
}
async function aumentarSocial(data) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    // obtener las veces que se presiono el boton guardar desde BD
    const clicSocial = await axios.post(
      baseUrl + `sociales/clic`,
      { url: data },
      { headers }
    );
    // aumentar el contador en 1 por cada visita realizada a la presentacion
    const nuevoClicsCorreo = clicSocial.data.data + 1;
    // almacenar el contador en BD por persistencia
    await axios.post(
      baseUrl + `sociales/actualizar/label`,
      { url: data, clics_realizados: nuevoClicsCorreo },
      { headers }
    );
  } catch (error) {
    console.error(error);
  }
}
async function aumentarCorreo(data) {
  console.log("clics correo");
  try {
    // obtener las veces que se presiono el boton guardar desde BD
    const clicsCorreo = parseInt(data.clics_correo, 10);
    // aumentar el contador en 1 por cada visita realizada a la presentacion
    const nuevoClicsCorreo = clicsCorreo + 1;
    // almacenar el contador en BD por persistencia
    await axios.post(baseUrl + `usuario/tarjeta/actualizar/${data.id}`, {
      clics_correo: nuevoClicsCorreo,
    });
  } catch (error) {
    console.error(error);
  }
}
async function aumentarGuardar(data) {
  try {
    // obtener las veces que se presiono el boton guardar desde BD
    const clicsGuardar = parseInt(data.clics_guardar, 10);
    // aumentar el contador en 1 por cada visita realizada a la presentacion
    const nuevoClicsGuardar = clicsGuardar + 1;
    // almacenar el contador en BD por persistencia
    await axios.post(baseUrl + `usuario/tarjeta/actualizar/${data.id}`, {
      clics_guardar: nuevoClicsGuardar,
    });
  } catch (error) {
    console.error(error);
  }
}

export default function ActionAreaCardPresentacion() {
  const [datos, setDatos] = useState(null);
  const [twitterUrl, setTwitterUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [skypeUrl, setSkypeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const [shareUrl, setShareUrl] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewQr, setViewQr] = useState(false);
  const [abrir, setAbrir] = React.useState(false);
  const [id, setId] = useState();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl); // Copia el enlace al portapapeles
    alert("¡Enlace copiado al portapapeles!");
  };

  const handleShare = (platform) => {
    switch (platform) {
      case "WhatsApp":
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareUrl
        )}`;
        window.open(whatsappUrl, "_blank");
        break;

      case "Facebook":
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        window.open(facebookUrl, "_blank");
        break;

      case "Telegram":
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
          shareUrl
        )}`;
        window.open(telegramUrl, "_blank");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const tarjetaId = localStorage.getItem("tarjetaID");
    const shareUrl1 = `https://onlytap.proatek.com/OnlyTap/Presentacion/${tarjetaId}`; // URL que deseas compartir
    setShareUrl(shareUrl1);
  }, []);

  useEffect(() => {
    async function fetchDatos() {
      try {
        setAbrir(true);
        const url = window.location.pathname;
        const value = url.split("/Presentacion/")[1];
        localStorage.setItem("tarjetaID", value);
        setId(value);

        const { data } = await axios.post(
          baseUrl + `usuario/tarjeta/ver/${value}`,
          null
        );
        console.log(data);

        if (data.message === "Tarjeta de usuario indicado.") {
          const socialMedia = data.data.sociales_tarjeta;
          const twitterUrlObject = socialMedia.find(
            (social) => social.text_label === "twitter"
          );
          const twitterUrl = twitterUrlObject
            ? twitterUrlObject.tipo_social
            : "";
          const facebookUrlObject = socialMedia.find(
            (social) => social.text_label === "facebook"
          );
          const facebookUrl = facebookUrlObject
            ? facebookUrlObject.tipo_social
            : "";

          const youtubeUrlObject = socialMedia.find(
            (social) => social.text_label === "youtube"
          );
          const youtubeUrl = youtubeUrlObject
            ? youtubeUrlObject.tipo_social
            : "";

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
          // obtener las veces que se visito la tarjeta desde BD
          const clicsRealizados = parseInt(data.data.clics_realizados, 10);
          // aumentar el contador en 1 por cada visita realizada a la presentacion
          const nuevoClicsRealizados = clicsRealizados + 1;
          // almacenar el contador para mostrar en pantalla
          await axios.post(baseUrl + `usuario/tarjeta/actualizar/${value}`, {
            clics_realizados: nuevoClicsRealizados,
          });
        } else {
          setDatos(undefined);
        }
        console.log(datos);
        setAbrir(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDatos();
  }, []);

  const handleSaveContact = () => {
    aumentarGuardar(datos.data);
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

  const handleClick = (numeroTelefono) => {
    window.location.href = `tel:${numeroTelefono}`;
  };

  const handleQr = () => {
    setViewQr(!viewQr);
  };

  const defaultMessage =
    "¡Hola! Obtuve este contacto al escanear tu tarjeta Onlytap...";

  const openWhatsApp = (telefono) => {
    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(url, "_blank");
  };

  const phoneNumber = "593987441522";
  const defaultMessag =
    "Me gustaría obtener mi tarjeta digital. He conseguido este código de descuento: " +
    id;

  const openWhatsAp = () => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      defaultMessag
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={abrir}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {datos ? (
        <ThemeProvider theme={theme}>
          <div>
            <Card
              sx={{
                maxWidth: "400px",
                minWidth: "400px",
                boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
                borderRadius: "30px",
              }}
            >
              <CardActionArea style={{ backgroundColor: "rgb(239, 239, 239)" }}>
                {datos && datos.data.img_portada && datos.data.img_portada ? (
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={datos.data.img_portada}
                      alt="Imagen de perfil"
                    />
                    <img
                      src={logoMarcaAgua} // Ruta a la imagen de marca de agua
                      alt="Marca de agua"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        width: "25%", // Ajusta el tamaño de la marca de agua según tus necesidades
                        height: "10%", // Ajusta el tamaño de la marca de agua según tus necesidades
                        opacity: "0.7", // Ajusta la opacidad de la marca de agua según tus necesidades
                      }}
                    />
                  </div>
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image="https://us.123rf.com/450wm/redicka/redicka1410/redicka141000095/32216620-sin-fisuras-patr%C3%B3n-geom%C3%A9trico-negro-para-su-dise%C3%B1o-de-portada-dise%C3%B1o-de-libros-fondo-del-sitio.jpg"
                    alt="Imagen de perfil"
                  />
                )}

                <CardContent
                  style={{
                    backgroundColor: "#efefef",
                    paddingBottom: "0px",
                  }}
                >
                  <div
                    className="author"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {datos && datos.data.img_perfil && datos.data.img_perfil ? (
                      <Avatar
                        src={datos.data.img_perfil}
                        className="avatar border-gray"
                        alt="Imagen de perfil"
                      />
                    ) : (
                      <Avatar
                        src="https://w7.pngwing.com/pngs/52/368/png-transparent-user-profile-computer-icons-avatar-avatar-heroes-monochrome-desktop-wallpaper.png"
                        className="avatar border-gray"
                        alt="Imagen de perfil"
                      />
                    )}
                  </div>
                  <CardContent
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "40px",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      {datos && datos.data.nombre && datos.data.nombre && (
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="div"
                          style={{ fontFamily: "Roboto", margin: "0px" }}
                        >
                          {datos.data.nombre}
                        </Typography>
                      )}
                      {datos &&
                        datos.data.profesion &&
                        datos.data.profesion && (
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            style={{ fontFamily: "Arial" }}
                          >
                            {datos.data.profesion}
                          </Typography>
                        )}
                      {datos && datos.data.empresa && datos.data.empresa && (
                        <Typography gutterBottom variant="h7" component="div">
                          {datos.data.empresa}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {facebookUrl && (
                      <div className="social-icon-container">
                        <a
                          href={facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => aumentarSocial(facebookUrl)}
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
                          onClick={() => aumentarSocial(twitterUrl)}
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
                          onClick={() => aumentarSocial(instagramUrl)}
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
                          onClick={() => aumentarSocial(linkedinUrl)}
                        >
                          <img
                            className={`social-icon`}
                            src={linkedinIcon}
                            alt="Icono de Facebook"
                          />
                        </a>
                      </div>
                    )}
                    {youtubeUrl && (
                      <div className="social-icon-container">
                        <a
                          href={youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => aumentarSocial(youtubeUrl)}
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
                        <a
                          href={tiktokUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => aumentarSocial(tiktokUrl)}
                        >
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
                        <a
                          href={skypeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => aumentarSocial(skypeUrl)}
                        >
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
                          onClick={() => aumentarSocial(telegramUrl)}
                        >
                          <img
                            className={`social-icon`}
                            src={telegramIcon}
                            alt="Icono de Telegram"
                          />
                        </a>
                      </div>
                    )}
                  </Box>

                  {viewQr ? (
                    <ExampleComponent />
                  ) : (
                    <div>
                      {datos &&
                        datos.data.sitio_web &&
                        datos.data.sitio_web && (
                          <ListItem
                            style={{
                              padding: "0px",
                            }}
                          >
                            <CardContent
                              style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "20px",
                                padding: "0px",
                                width: "100%",
                              }}
                            >
                              <Link
                                href={datos.data.sitio_web}
                                underline="none"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => aumentarWeb(datos.data)}
                                style={{
                                  padding: "0px",
                                }}
                              >
                                <ListItemButton>
                                  <ListItemIcon>
                                    <LanguageIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={datos.data.sitio_web}
                                  />
                                </ListItemButton>
                              </Link>
                            </CardContent>
                          </ListItem>
                        )}

                      {datos &&
                        datos.data.direccion &&
                        datos.data.direccion && (
                          <ListItem
                            style={{
                              padding: "0px",
                              margin: "10px 0px 0px 0px",
                            }}
                          >
                            <CardContent
                              style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "20px",
                                padding: "0px",
                                width: "100%",
                              }}
                            >
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
                            </CardContent>
                          </ListItem>
                        )}

                      {datos && datos.data.correo && datos.data.correo && (
                        <ListItem
                          style={{
                            padding: "0px",
                            margin: "10px 0px 0px 0px",
                          }}
                        >
                          <CardContent
                            style={{
                              backgroundColor: "#ffffff",
                              borderRadius: "20px",
                              padding: "0px",
                              width: "100%",
                            }}
                          >
                            <Link
                              href={`mailto:${datos.data.correo}`}
                              underline="none"
                              onClick={() => aumentarCorreo(datos.data)}
                            >
                              <ListItemButton>
                                <ListItemIcon>
                                  <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary={datos.data.correo} />
                              </ListItemButton>
                            </Link>
                          </CardContent>
                        </ListItem>
                      )}

                      {datos && datos.data.telefono && datos.data.telefono && (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <ListItem
                            style={{
                              padding: "0px",
                              margin: "10px 0px 0px 0px",
                            }}
                          >
                            <CardContent
                              style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "20px",
                                padding: "0px",
                                width: "100%",
                              }}
                            >
                              <ListItemButton
                                onClick={() => handleClick(datos.data.telefono)}
                              >
                                <ListItemIcon>
                                  <MyPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary={datos.data.telefono} />
                              </ListItemButton>
                            </CardContent>
                          </ListItem>

                          <a
                            href={skypeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => openWhatsApp(datos.data.telefono)}
                          >
                            <img
                              className={`social-icon`}
                              src={whatsapp}
                              alt="Icono de whatsapp"
                              style={{
                                width: "45px",
                                height: "45px",
                                padding: "0px",
                                borderRadius: "20%",
                                margin: "10px 10px 0 20px",
                              }}
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  <div
                    className="my-2 text-center"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <MyButton
                      onClick={handleQr}
                      style={{
                        fontSize: "14px",
                        border: "3px solid white",
                        borderRadius: "0 30px 0 30px",
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <span>
                          <b>QR</b>
                        </span>
                      </Box>
                    </MyButton>
                    <MyButton
                      onClick={handleSaveContact}
                      style={{ fontSize: "14px", border: "3px solid white" }}
                    >
                      <Box display="flex" alignItems="center">
                        <span>
                          <b style={{ padding: "0 20px" }}>Guardar contacto</b>
                        </span>
                      </Box>
                    </MyButton>
                    <div>
                      <MyButton
                        onClick={handleMenuOpen}
                        style={{
                          border: "3px solid white",
                          borderRadius: "30px 0 30px 0",
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <ShareIcon
                            style={{ fontSize: "20px", margin: "0px" }}
                          />
                        </Box>
                      </MyButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem>
                          <TextField
                            label="Enlace"
                            value={shareUrl}
                            variant="outlined"
                            fullWidth
                          />
                          <IconButton onClick={handleCopyUrl}>
                            <ContentCopyIcon />
                          </IconButton>
                        </MenuItem>
                        <hr />
                        <MenuItem onClick={() => handleShare("WhatsApp")}>
                          <ListItemIcon>
                            <WhatsAppIcon />
                          </ListItemIcon>
                          WhatsApp
                        </MenuItem>

                        <MenuItem onClick={() => handleShare("Facebook")}>
                          <ListItemIcon>
                            <FacebookIcon />
                          </ListItemIcon>
                          Facebook
                        </MenuItem>

                        <MenuItem onClick={() => handleShare("Telegram")}>
                          <ListItemIcon>
                            <TelegramIcon />
                          </ListItemIcon>
                          Telegram
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
            <footer
              style={{
                textAlign: "center",
                position: "sticky",
                fontSize: "14px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                width: "100%",
                textAlign: "center",
                marginTop: "45px",
              }}
            >
              <p
                style={{
                  margin: "10px 0 10px 0",
                  fontSize: "12px",
                }}
              >
                {" "}
                {/* Cambiamos el color del texto a blanco */}
                Powered by Onlytap
              </p>
              <p style={{ fontSize: "12px" }}>
                {" "}
                {/* Cambiamos el color del texto a blanco */}
                ¿Quieres tu propia tarjeta de presentación digital? ¡Obtén $3 de
                descuento!
              </p>
              <Button
                onClick={openWhatsAp}
                sx={{ margin: "0px", padding: "0px" }}
              >
                <WhatsAppIcon />
                Solicitar mi tarjeta
              </Button>
            </footer>
          </div>
        </ThemeProvider>
      ) : datos === null ? (
        <div></div>
      ) : (
        <div>
          {/* <Lottie animationData={animationData} /> */}
          <h1>Usuario no encontrado</h1>
          <p>
            Lo sentimos, el usuario que estás buscando no ha sido encontrado en
            la tarjeta consultada.
          </p>
        </div>
      )}
    </>
  );
}
