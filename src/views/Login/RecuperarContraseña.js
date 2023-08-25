import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(baseUrl + "auth/password/recuperar", {
        correo: email,
      });

      console.log(response.data);

      if (response.data.status === 200) {
        setSuccessMessage("Correo de recuperación enviado");
        window.location.href = "/";
      } else if (response.data.status === 400) {
        setSuccessMessage(
          "Ya se ha realizado una petición de cambio de contraseña para este correo electrónico."
        );
      }
    } catch (error) {
      console.error(error);
      setError("Error al enviar el correo de recuperación");
    }

    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {isLoading && <CircularProgress />}
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h5" align="center" gutterBottom>
          Recuperar Contraseña
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Correo Electrónico"
            fullWidth
            required
            value={email}
            onChange={handleEmailChange}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Correo de Recuperación"}
          </Button>
        </form>
      </Grid>
      {successMessage && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage("")}
          message={successMessage}
        />
      )}
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setError("")}
          message={error}
        />
      )}
    </div>
  );
};

export default PasswordRecovery;
