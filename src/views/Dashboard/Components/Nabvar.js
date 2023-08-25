/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, SecondaryListItems } from "./ListItems";
import ActionAreaCardDasd from "./Card";
import ExampleComponent from "../../Presentasion/Qr";
import AuthService from "../../../auth-service";
import axios from "axios";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import Switch from "@mui/material/Switch";
import { ListItemIcon } from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useState, useRef } from "react";
import { Reports } from "./Reports";
import WhatsAppButton from "../../../compontents/WhatsAppButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

{
  /* <GraficoClics info={info} /> */
}

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const settings = ["Cerrar Sesión"];
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledTable = styled(Table)`
  background-color: white;
`;

const StyledTableHeader = styled(TableCell)`
  background-color: lightgray;
  font-weight: bold;
`;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [abrir, setAbrir] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [nombre, setNombre] = React.useState("");
  const [perfil, setPerfil] = React.useState("");
  const [fotoPortada, setFotoPortada] = React.useState("");
  const [profesion, setProfesion] = React.useState("");
  const [empresa, setEmpresa] = React.useState("");
  const [twitterUrl, setTwitterUrl] = React.useState("");
  const [facebookUrl, setFacebookUrl] = React.useState("");
  const [youtubeUrl, setYoutubeUrl] = React.useState("");
  const [tiktokUrl, setTiktokUrl] = React.useState("");
  const [linkedinUrl, setLinkedinUrl] = React.useState("");
  const [skypeUrl, setSkypeUrl] = React.useState("");
  const [instagramUrl, setInstagramUrl] = React.useState("");
  const [telegramUrl, setTelegramUrl] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [rol, setRol] = React.useState("");
  const [numTarjetas, setNumTarjetas] = React.useState("");
  const [tarjetas, setTarjetas] = React.useState([]);
  const [paginaActual, setPaginaActual] = React.useState(1);
  const elementosPorPagina = 5;
  const numerosPaginaMostrados = 4;
  const [info, setInfo] = React.useState({});
  const [mostrarReportes, setMostrarReportes] = useState(false);
  // Obtener un valor almacenado en localStorage
  const tarjetaID = localStorage.getItem("tarjetaID");
  const [showInput, setShowInput] = useState(false);
  const buttonColor = showInput ? "secondary" : "primary";
  const [codigo, setCodigo] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [user, setUser] = useState(null);

  const handleClose = () => {
    setAbrir(false);
  };

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const handleVincular = () => {
    setAbrir(true);
    handleUpdate();
  };

  const handleUpdate = async (e) => {
    console.log(codigo);
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const { data } = await axios.post(
        baseUrl + `verificar-id/${codigo}`,
        null, // aquí debe ir el body, pero en este caso no es necesario enviar datos adicionales
        config // aquí se pasa el objeto `config` como segundo parámetro
      );
      console.log(data);
      if (data.existe) {
        console.log(1);
        if (data.data.usuario_id) {
          console.log(2);
          setFeedback(
            "Esta tarjeta pertenece a otro usuario, revisa tu código"
          );
          setAbrir(false);
        } else {
          console.log(3);
          console.log(codigo, user.id, baseUrl);
          const update = await axios.post(
            baseUrl + `usuario/tarjeta/actualizar/${codigo}`,
            { usuario_id: "" + user.id }, // aquí debe ir el body, pero en este caso no es necesario enviar datos adicionales
            config // aquí se pasa el objeto `config` como segundo parámetro
          );
          if (update.status === 200) {
            toast.success("Tarjeta vinculada con éxito");
            localStorage.setItem("tarjetaID", update.data.data.id);
            fetchDatos();
          }
          console.log(update);
        }
      } else {
        console.log(4);
        setFeedback(
          "No existe una tarjeta con ese código, vuelve a intentarlo"
        );
        setAbrir(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const tarjetaId = localStorage.getItem("tarjetaID");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const { data } = await axios.post(
        baseUrl + `usuario/tarjeta/ver/${tarjetaId}`,
        null, // aquí debe ir el body, pero en este caso no es necesario enviar datos adicionales
        config // aquí se pasa el objeto `config` como segundo parámetro
      );
      setInfo(data.data);
      localStorage.setItem("Tarjeta", JSON.stringify(data.data));
      console.log(data);
      const socialMedia = data.data.sociales_tarjeta;

      const twitterUrlObject = socialMedia.find(
        (social) => social.text_label === "twitter"
      );
      const twitterUrl = twitterUrlObject ? twitterUrlObject : "";

      const facebookUrlObject = socialMedia.find(
        (social) => social.text_label === "facebook"
      );
      const facebookUrl = facebookUrlObject ? facebookUrlObject : "";

      const youtubeUrlObject = socialMedia.find(
        (social) => social.text_label === "youtube"
      );
      const youtubeUrl = youtubeUrlObject ? youtubeUrlObject : "";

      const tiktokUrlObject = socialMedia.find(
        (social) => social.text_label === "tiktok"
      );
      const tiktokUrl = tiktokUrlObject ? tiktokUrlObject : "";

      const instagramUrlObject = socialMedia.find(
        (social) => social.text_label === "instagram"
      );
      const instagramUrl = instagramUrlObject ? instagramUrlObject : "";

      const linkedinUrlObject = socialMedia.find(
        (social) => social.text_label === "linkedin"
      );
      const linkedinUrl = linkedinUrlObject ? linkedinUrlObject : "";

      const skypeUrlObject = socialMedia.find(
        (social) => social.text_label === "skype"
      );
      const skypeUrl = skypeUrlObject ? skypeUrlObject : "";

      const telegramUrlObject = socialMedia.find(
        (social) => social.text_label === "telegram"
      );
      const telegramUrl = telegramUrlObject ? telegramUrlObject : "";

      setNombre(data.data.nombre);
      setPerfil(data.data.img_perfil);
      setFotoPortada(data.data.img_portada);
      setProfesion(data.data.profesion);
      setEmpresa(data.data.empresa);
      setTwitterUrl(twitterUrl);
      setFacebookUrl(facebookUrl);
      setYoutubeUrl(youtubeUrl);
      setTiktokUrl(tiktokUrl);
      setInstagramUrl(instagramUrl);
      setLinkedinUrl(linkedinUrl);
      setSkypeUrl(skypeUrl);
      setTelegramUrl(telegramUrl);
      setUrl(data.data.sitio_web);
      setDireccion(data.data.direccion);
      setCorreo(data.data.correo);
      setTelefono(data.data.telefono);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(baseUrl + "usuario/tarjeta/listar");
        //console.log(response.data.data)
        setTarjetas(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const obtenerTarjetasPaginadas = () => {
    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    return tarjetas.slice(indiceInicio, indiceFin);
  };

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const irAPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const irAPaginaSiguiente = () => {
    const totalPages = Math.ceil(tarjetas.length / elementosPorPagina);
    if (paginaActual < totalPages) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const totalPages = Math.ceil(tarjetas.length / elementosPorPagina);
  const indiceInicioNumerosPagina = Math.max(paginaActual - 1, 0);
  const numerosPagina = Array.from(
    { length: numerosPaginaMostrados },
    (_, index) => index + indiceInicioNumerosPagina + 1
  );

  const cambiarEstadoTarjeta = async (idTarjeta, nuevoEstado) => {
    try {
      console.log(idTarjeta);
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const response = await axios.post(
        baseUrl + `usuario/tarjeta/actualizar/${idTarjeta}`,
        { estado: nuevoEstado },
        { headers }
      );
      if (response.status === 200) {
        const nuevasTarjetas = tarjetas.map((tarjeta) => {
          if (tarjeta.id === idTarjeta) {
            return {
              ...tarjeta,
              estado: nuevoEstado,
            };
          }
          return tarjeta;
        });
        setTarjetas(nuevasTarjetas);
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la tarjeta:", error);
    }
  };

  const handleChangeTarjetas = (event) => {
    const newNumTarjeta = event.target.value;
    setNumTarjetas(newNumTarjeta);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleShowReportes = () => {
    setMostrarReportes(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/";
  };

  const editarDatos = () => {
    if (nombre !== null) {
      localStorage.setItem("Nombre", nombre);
    }

    if (perfil !== null) {
      localStorage.setItem("FotoPerfil", perfil);
    }

    if (fotoPortada !== null) {
      localStorage.setItem("FotoPortada", fotoPortada);
    }

    if (profesion !== null) {
      localStorage.setItem("Profesion", profesion);
    }

    if (empresa !== null) {
      localStorage.setItem("Descripcion", empresa);
    }

    if (twitterUrl !== null && twitterUrl !== "") {
      localStorage.setItem("Twitter", JSON.stringify(twitterUrl));
    }

    if (facebookUrl !== null && facebookUrl !== "") {
      localStorage.setItem("Facebook", JSON.stringify(facebookUrl));
    }

    if (youtubeUrl !== null && youtubeUrl !== "") {
      localStorage.setItem("Youtube", JSON.stringify(youtubeUrl));
    }

    if (tiktokUrl !== null && tiktokUrl !== "") {
      localStorage.setItem("Tiktok", JSON.stringify(tiktokUrl));
    }

    if (instagramUrl !== null && instagramUrl !== "") {
      localStorage.setItem("Instagram", JSON.stringify(instagramUrl));
    }

    if (linkedinUrl !== null && linkedinUrl !== "") {
      localStorage.setItem("Linkedin", JSON.stringify(linkedinUrl));
    }

    if (skypeUrl !== null && skypeUrl !== "") {
      localStorage.setItem("Skype", JSON.stringify(skypeUrl));
    }

    if (telegramUrl !== null && telegramUrl !== "") {
      localStorage.setItem("Telegram", JSON.stringify(telegramUrl));
    }

    if (url !== null) {
      localStorage.setItem("Url", url);
    }

    if (direccion !== null) {
      localStorage.setItem("Ubicacion", direccion);
    }

    if (correo !== null) {
      localStorage.setItem("Mail", correo);
    }

    if (telefono !== null) {
      localStorage.setItem("Phone", telefono);
    }

    window.location.href = "/OnlyTap/CardEdit";
  };

  useEffect(() => {
    const tarjetaId = localStorage.getItem("tarjetaID");
    const { authorisation } = JSON.parse(localStorage.getItem("user"));
    const userDataJSON = localStorage.getItem("user");
    if (userDataJSON) {
      const { authorisation } = JSON.parse(userDataJSON);
      console.log(authorisation);
      setUser(authorisation.data);
    }

    //console.log(authorisation.data.rol)
    setRol(authorisation.data.rol);
    const shareUrl = `https://onlytap.proatek.com/OnlyTap/Presentacion/${tarjetaId}`; // URL que deseas compartir
    setShareUrl(shareUrl);
    fetchDatos();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [shareUrl, setShareUrl] = React.useState("");
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const crearDatos = async () => {
    const params = {
      cantidad: numTarjetas,
    };

    axios({
      url: baseUrl + "usuario/tarjeta/cargar",
      method: "POST",
      params,
      responseType: "blob",
    })
      .then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.xlsx");
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log("Error downloading Excel file:", error);
      });
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl); // Copia el enlace al portapapeles
    alert("¡Enlace copiado al portapapeles!");
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              OnlyTAP
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={perfil ? perfil : nombre}>
                  {perfil ? (
                    <img src={perfil} style={{ width: "50px" }} />
                  ) : (
                    nombre?.charAt(0)
                  )}
                </Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      if (setting === "Cerrar Sesión") {
                        handleLogout();
                      } else {
                        handleCloseUserMenu();
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems onShowReportes={handleShowReportes} />
            <Divider sx={{ my: 1 }} />
            {SecondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
            {mostrarReportes ? (
              // Mostrar pantalla de reportes
              <Reports />
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={6} lg={5}>
                  <ActionAreaCardDasd></ActionAreaCardDasd>
                </Grid>
                <Grid item xs={8} sm={4} md={4} lg={3}>
                  <Button
                    onClick={editarDatos}
                    variant="contained"
                    endIcon={<EditIcon />}
                    sx={{ width: "100%", marginBottom: "8px" }} // Añadimos un margen inferior de 8px
                  >
                    Editar
                  </Button>
                  <br />
                  <div>
                    <Button
                      variant="contained"
                      endIcon={<ShareIcon />}
                      sx={{ width: "100%", marginBottom: "8px" }} // Añadimos un margen inferior de 8px
                      onClick={handleMenuOpen}
                    >
                      Compartir
                    </Button>
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
                  {tarjetaID === "undefined" ? <WhatsAppButton /> : <div />}

                  {tarjetaID === "undefined" ? (
                    <div>
                      <Button
                        type="button"
                        onClick={handleClick}
                        color={buttonColor}
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2, width: "100%", marginBottom: "8px" }} // Añadimos un margen inferior de 8px
                      >
                        Tengo código de tarjeta
                      </Button>
                      {showInput && (
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="codigo"
                            label="Codigo de tarjeta"
                            name="codigo"
                            autoComplete="codigo"
                            onChange={(event) => setCodigo(event.target.value)}
                          />
                          <Button
                            type="button"
                            onClick={handleVincular}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            VINCULAR
                          </Button>
                          <Backdrop
                            sx={{
                              color: "#fff",
                              zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={abrir}
                          >
                            <CircularProgress color="inherit" />
                          </Backdrop>
                        </Grid>
                      )}
                      {feedback && (
                        <div style={{ color: "red", marginTop: "10px" }}>
                          {feedback}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div />
                  )}
                  {rol === "ADMIN" && (
                    <>
                      <Toolbar />
                      <TextField
                        id="outlined-basic"
                        value={numTarjetas}
                        onChange={handleChangeTarjetas}
                        label="Crear tarjetas"
                        type="number"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                      <Button
                        onClick={crearDatos}
                        variant="contained"
                        sx={{ width: "100%" }}
                      >
                        Crear
                      </Button>
                      <Toolbar />
                      <div>
                        <StyledTable>
                          <TableHead>
                            <TableRow>
                              <StyledTableHeader>N° </StyledTableHeader>
                              <StyledTableHeader>Nombre</StyledTableHeader>
                              <StyledTableHeader>Profesión</StyledTableHeader>
                              <StyledTableHeader>ID tarjeta</StyledTableHeader>
                              <StyledTableHeader>Estado</StyledTableHeader>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {obtenerTarjetasPaginadas().map(
                              (tarjeta, index) => (
                                <TableRow key={tarjeta.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{tarjeta.nombre}</TableCell>
                                  <TableCell>{tarjeta.profesion}</TableCell>
                                  <TableCell>{tarjeta.id}</TableCell>
                                  <TableCell>
                                    <Switch
                                      checked={tarjeta.estado === "1"}
                                      color="primary"
                                      onChange={(event) =>
                                        cambiarEstadoTarjeta(
                                          tarjeta.id,
                                          event.target.checked ? "1" : "0"
                                        )
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </StyledTable>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            marginTop: "10px",
                          }}
                        >
                          <Button
                            disabled={paginaActual === 1}
                            onClick={irAPaginaAnterior}
                          >
                            <KeyboardArrowLeft />
                          </Button>
                          <div style={{ display: "flex" }}>
                            {numerosPagina.map((numero) => (
                              <Button
                                key={numero}
                                variant={
                                  numero === paginaActual
                                    ? "contained"
                                    : "outlined"
                                }
                                onClick={() => irAPagina(numero)}
                              >
                                {numero}
                              </Button>
                            ))}
                          </div>
                          <Button
                            disabled={paginaActual === totalPages}
                            onClick={irAPaginaSiguiente}
                          >
                            <KeyboardArrowRight />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                  <Toolbar />
                </Grid>

                <Grid item xs={12} sm={6} md={5} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 320,
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
                      textAlign: "center", // Centro el texto
                    }}
                  >
                    <span
                      sx={{
                        fontWeight: "bold", // Hago que el texto sea negrita
                        fontSize: "1.5rem", // Aumento el tamaño del texto
                      }}
                    >
                      Código QR de la Tarjeta
                    </span>
                    <ExampleComponent />
                  </Paper>
                </Grid>
              </Grid>
            )}
            <ToastContainer />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
