import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import logo from "../../assets/img/onlytap.jpg";

const ExampleComponent = () => {
  const [id, setId] = useState("");
  const basePath = "/OnlyTap/Presentacion";

  useEffect(() => {
    const fetchTarjeta = async () => {
      try {
        const tarjetaId = localStorage.getItem("tarjetaID");
        setId(tarjetaId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTarjeta();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "80vh",
      }}
    >
      <QRCode
        value={`https://onlytap.proatek.com${basePath}/${id}`}
        size={250}
        logoImage={logo}
        logoWidth={60}
        logoHeight={60}
      />
    </div>
  );
};

export default ExampleComponent;
