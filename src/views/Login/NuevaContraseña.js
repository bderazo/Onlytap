import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const PasswordRecovery = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const query = new URLSearchParams(useLocation().search);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = query.get("token");
    const email = query.get("email");

    setToken(token);
    setEmail(email);
  }, []);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    setError("");

    console.log(token, email, password, confirmPassword);

    try {
      const response = await axios.post(
        baseUrl + "auth/password/cambiar-password",
        {
          token: token,
          correo: email,
          password: password,
          password_confirmation: confirmPassword,
        }
      );

      console.log(response.data);
      setShowSnackbar(true);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setError("Hubo un error al cambiar la contraseña");
    }

    setIsLoading(false);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const validatePassword = (newPassword) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número."
      );
    } else {
      setPasswordError("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ padding: 16 }}
      >
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h5" align="center" gutterBottom>
            Contraseña Nueva
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              fullWidth
              required
              value={password}
              onChange={handlePasswordChange}
              error={passwordError !== ""}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Repetir Contraseña"
              fullWidth
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              Cambiar Contraseña
            </Button>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Contraseña cambiada exitosamente"
      />
      <Snackbar
        open={error !== ""}
        autoHideDuration={2000}
        onClose={() => setError("")}
        message={error}
      />
    </div>
  );
};

export default PasswordRecovery;
