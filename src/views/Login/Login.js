import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../../auth-service.js";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";

import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import logo from "../../assets/img/favicon.ico";

const theme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");

  localStorage.clear();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    handleLogin();
  };

  const handleLogin = async (e) => {
    try {
      AuthService.login(email, password)
        .then((response) => {
          localStorage.setItem("token", response.authorisation.token);
          localStorage.setItem(
            "tarjetaID",
            response.authorisation.data.user_tarjeta[0]?.id
          );
          window.location.href = "/OnlyTap";
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(
            "Correo y/o contraseña incorrectos, por favor intente nuevamente"
          );
          handleClose();
        });
      console.log(AuthService);
    } catch (error) {
      console.log(error);
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setOpen(true);
      handleLogin();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.eleconomista.com.mx/__export/1668553505105/sites/eleconomista/img/2022/11/15/buen_fin_p15_tarjetas_credito_digitales_pueden_salvarte_fraudes.jpg_185975374.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              Iniciar Sesión
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo o Usuario"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={emailError !== ""}
                helperText={emailError}
              />
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
                onKeyPress={handleKeyPress}
              />
              <div>
                <Button
                  type="button"
                  onClick={handleOpen}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Entrar
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

              <Grid container spacing={2}>
                <Grid item>
                  <Link href="/OnlyTap/Register" variant="body2">
                    {"¿No tienes una cuenta? Registrate"}
                  </Link>
                </Grid>

                <Grid item>
                  <Link href="/OnlyTap/RecuperarContraseña" variant="body2">
                    {"Olvide mi contraseña"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
