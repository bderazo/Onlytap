import React from "react";
import ActionAreaCardPresentacion from "../Presentasion/CardPresentation";
import { styled } from "@mui/material/styles";

const RootContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#d9f1fa",
});

const CardContainer = styled(ActionAreaCardPresentacion)({
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "600px",
  maxWidth: "600px",
});

const TarjetaQr = () => {
  return (
    <RootContainer>
      <CardContainer></CardContainer>
    </RootContainer>
  );
};

export default TarjetaQr;
