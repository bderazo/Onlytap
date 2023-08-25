import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../../.././auth-service";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import logo from "../../../assets/img/favicon.ico";

import { uploadFileToFBbdd } from "../../../firebaseConfig";
const theme = createTheme();

export default function SignUp() {
  const [portada, setPortada] = useState("");
  const [perfil, setPerfil] = useState("");
  const name = localStorage.getItem("Nombre");
  const profesion = localStorage.getItem("Profesion");
  const descripcion = localStorage.getItem("Descripcion");
  const telefono = localStorage.getItem("Phone");
  const direccion = localStorage.getItem("Ubicacion");
  const correo = localStorage.getItem("Mail");
  const web = localStorage.getItem("Url");
  const twitter = localStorage.getItem("Twitter");
  const facebook = localStorage.getItem("Facebook");
  const instagram = localStorage.getItem("Instagram");
  const linkedin = localStorage.getItem("Linkedin");
  const youtube = localStorage.getItem("Youtube");
  const tiktok = localStorage.getItem("Tiktok");
  const skype = localStorage.getItem("Skype");
  const telegram = localStorage.getItem("Telegram");
  const [showInput, setShowInput] = useState(false);

  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const handleClick = () => {
    setShowInput(!showInput);
  };

  const buttonColor = showInput ? "secondary" : "primary";

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

  const [formData] = useState({
    name: name,
    rol: "USER",
    registerBy: "ADMIN",
    profesion: profesion,
    empresa: descripcion,
    telefono: telefono,
    direccion: direccion,
    correo: correo,
    web: web,
    twitter: twitter,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    handleSignup();
  };

  const handleSignup = async (e) => {
    if (!codigo) {
      const tiktokup = JSON.parse(tiktok);
      const twitterup = JSON.parse(twitter);
      const facebookup = JSON.parse(facebook);
      const telegramup = JSON.parse(telegram);
      const youtubeup = JSON.parse(youtube);
      const linkedinup = JSON.parse(linkedin);
      const instagramup = JSON.parse(instagram);
      let myArray = [
        twitterup,
        facebookup,
        telegramup,
        youtubeup,
        tiktokup,
        linkedinup,
        instagramup,
      ];
      myArray = myArray.filter((value) => value !== null);
      console.log(myArray);
      const redesSociales = myArray.map((value, index) => {
        const socialName = value.tipo_social
          .match(/\/\/(?:www\.)?([^]+)/)[1]
          .split(".")[0];
        return {
          id: socialName, // Puedes utilizar el índice del elemento más 1 como identificador
          value: value.tipo_social,
        };
      });

      try {
        const signupResponse = await AuthService.signup(
          formData.name,
          email,
          formData.name,
          password,
          formData.rol,
          formData.registerBy
        );
        const userID = signupResponse.data.id;
        const loginResponse = await AuthService.login(email, password);
        const token = loginResponse.authorisation.token;
        const user = localStorage.getItem("user");
        console.log(signupResponse.data);
        localStorage.setItem("token", token);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };
        // console.log(baseUrl);
        const cardCreateResponse = await axios.post(
          baseUrl + "usuario/tarjeta/crear",
          {
            usuario_id: userID,
            img_portada: portada,
            img_perfil: perfil,
            nombre: formData.name,
            profesion: formData.profesion,
            empresa: formData.empresa,
            acreditaciones: "",
            telefono: formData.telefono,
            direccion: formData.direccion,
            correo: formData.correo,
            sitio_web: formData.web,
          },
          { headers }
        );
        console.log(cardCreateResponse.data.data.id);
        const tarjetaId = cardCreateResponse.data.data.id;

        for (const redSocial of redesSociales) {
          try {
            const socialCreateResponse = await axios.post(
              baseUrl + "tarjeta/sociales/crear",
              {
                user_tarjeta_id: tarjetaId,
                text_label: redSocial.id,
                tipo_social: redSocial.value,
                icon_social: "URL",
              },
              { headers }
            );

            console.log(
              "Usuario y tarjeta creada correctamente" +
                socialCreateResponse.data
            );
          } catch (error) {
            console.log("Error al crear las redes sociales");
            handleClose();
          }
        }

        localStorage.clear();
        localStorage.setItem("tarjetaID", cardCreateResponse.data.data.id);
        localStorage.setItem("token", token);

        localStorage.setItem("user", user);
        window.location.href = "/OnlyTap";
      } catch (error) {
        console.log(error);
        setError("Credenciales incorrectas, por favor intente de nuevo");
        handleClose();
      }
    } else {
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
        const consultarId = await axios.post(
          baseUrl + `verificar-id/${codigo}`
        );

        if (consultarId.data.existe) {
          console.log("hola");
          const register = await AuthService.signup(
            formData.name,
            email,
            formData.name,
            password,
            formData.rol,
            formData.registerBy
          );

          console.log(register);

          const loginResponse = await AuthService.login(email, password);
          const token = loginResponse.authorisation.token;
          const user = localStorage.getItem("user");
          const userId = register.data.id;
          const TarjetaID = codigo;
          localStorage.setItem("token", token);
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          };

          const updatedFormData = {
            name: formData.name,
            profesion: localStorage.getItem("Profesion"),
            empresa: localStorage.getItem("Descripcion"),
            telefono: formData.telefono,
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
              usuario_id: userId,
            },
            { headers }
          );

          console.log(cardCreateResponse);
          for (const redSocial of redesSociales) {
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
                  "Red Social actualizada correctamente" +
                    socialCreateResponse.data
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
        } else {
          setError(
            "Credenciales incorrectas o codigo de tarjeta incorrecto, por favor intente de nuevo"
          );
          handleClose();
        }
      } catch (error) {
        console.log(error);
        setError(
          "Credenciales incorrectas o codigo de tarjeta incorrecto, por favor intente de nuevo"
        );
        handleClose();
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!/\S+@\S+\.\S+/.test(event.target.value)) {
      setEmailError("El correo electrónico no es válido");
    } else {
      setEmailError("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={logo}
              alt="Descripción de la imagen"
            />
          </Card>
          <Typography component="h1" variant="h5">
            Registrate
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Usario o Correo Electronico"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
                error={emailError !== ""}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <div>
            <Button
              type="button"
              onClick={handleClick}
              color={buttonColor}
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
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
              </Grid>
            )}
          </div>
          <div>
            <Button
              type="button"
              onClick={handleOpen}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              REGISTRARSE
            </Button>
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
            {error && (
              <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
            )}
          </div>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Ya tienes una cuenta? Inicia Sesion
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
