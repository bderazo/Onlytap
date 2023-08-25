import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "593987441522";
  const defaultMessage =
    "¡Hola! Me gustaría solicitar una tarjeta física. ¿Podrían brindarme más información sobre cómo obtenerla y los requisitos necesarios? ¡Gracias!";

  const openWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      variant="contained"
      onClick={openWhatsApp}
      sx={{ width: "100%", marginBottom: "8px" }} // Añadimos un margen inferior de 8px
    >
      <WhatsAppIcon />
      Solicitar tarjeta física
    </Button>
  );
};

export default WhatsAppButton;
