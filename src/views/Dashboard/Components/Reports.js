import { useState, useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const Reports = () => {
  const [info, setInfo] = useState(null);
  const [clicsRealizados, setClicsRealizados] = useState(0);
  const [clicsGuardar, setClicsGuardar] = useState(0);
  const [clicsCorreo, setClicsCorreo] = useState(0);
  const [clicsSitioWeb, setClicsSitioWeb] = useState(0);
  const [sociales, setSociales] = useState([]);
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const grayscaleColors = [
    "rgba(128, 128, 128, 0.5)",
    "rgba(192, 192, 192, 0.5)",
    "rgba(224, 224, 224, 0.5)",
    "rgba(240, 240, 240, 0.5)",
  ];

  useEffect(() => {
    const tarjeta = localStorage.getItem("Tarjeta");
    console.log(tarjeta);
    setInfo(tarjeta);

    if (tarjeta !== undefined) {
      const parsedTarjeta = JSON.parse(tarjeta);
      setClicsRealizados(parseInt(parsedTarjeta.clics_realizados, 10));
      setClicsGuardar(parseInt(parsedTarjeta.clics_guardar, 10));
      setClicsCorreo(parseInt(parsedTarjeta.clics_correo, 10));
      setClicsSitioWeb(parseInt(parsedTarjeta.clics_sitio_web, 10));
      const parsedSociales = parsedTarjeta.sociales_tarjeta.map((social) => {
        return {
          label: social.text_label,
          value: social.clics_realizados,
        };
      });
      setSociales(parsedSociales);
    }
  }, []);

  useEffect(() => {
    const maxClicsValue = Math.max(
      clicsRealizados,
      clicsGuardar,
      clicsCorreo,
      clicsSitioWeb
    );
    const maxClicsValueIndex = [
      clicsRealizados,
      clicsGuardar,
      clicsCorreo,
      clicsSitioWeb,
    ].indexOf(maxClicsValue);
    const highestValueColor = "rgba(15, 107, 233, 0.5)";

    const backgroundColors = [
      clicsRealizados === maxClicsValue
        ? highestValueColor
        : grayscaleColors[0], // Gris oscuro para el valor más alto
      clicsGuardar === maxClicsValue ? highestValueColor : grayscaleColors[1], // Gris medio
      clicsCorreo === maxClicsValue ? highestValueColor : grayscaleColors[2], // Gris claro
      clicsSitioWeb === maxClicsValue ? highestValueColor : grayscaleColors[3], // Gris muy claro
    ];

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("clicsChart").getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "doughnut", // Cambiar el tipo de gráfico a doughnut
      data: {
        labels: ["Visitas", "Guardado", "Correos", "Sitio Web"],
        datasets: [
          {
            label: "Clics",
            data: [clicsRealizados, clicsGuardar, clicsCorreo, clicsSitioWeb],
            backgroundColor: backgroundColors,
            borderColor: (context) => {
              if (context.dataIndex === maxClicsValueIndex) {
                return highestValueColor;
              } else {
                return "white"; // Borde blanco para los demás componentes
              }
            },
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "55%", // Controla el tamaño del agujero del centro (para hacerlo dona)
        plugins: {
          legend: {
            position: "bottom", // Cambia la posición de las etiquetas (top, bottom, left, right)
          },
        },
      },
    });
  }, [clicsRealizados, clicsGuardar, clicsCorreo, clicsSitioWeb]);

  useEffect(() => {
    if (chartRef2.current) {
      chartRef2.current.destroy();
    }

    const ctx2 = document.getElementById("socialesChart").getContext("2d");

    chartRef2.current = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: sociales.map((social) => social.label),
        datasets: [
          {
            label: "Clics Sociales",
            data: sociales.map((social) => social.value),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            anchor: "end",
            align: "end",
            color: "black",
            font: {
              weight: "bold",
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  }, [sociales]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc", // Añade un borde alrededor del div
          borderRadius: "10px", // Ajusta el radio del borde si es necesario
          padding: "30px", // Agrega un espacio interno para el borde
          background: "#131518",
          display: "grid",
          gap: "20px",
        }}
      >
        <canvas
          id="clicsChart"
          width="100"
          height="100"
          style={{ color: "white" }}
        ></canvas>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px", // Tamaño de la cuadrícula
            pointerEvents: "none", // Evita que la cuadrícula interrumpa los eventos
          }}
        ></div>
      </div>
      <div>
        <canvas id="socialesChart" width="400" height="200"></canvas>
      </div>
      <div>{/* Agrega aquí el código para el tercer gráfico */}</div>
    </div>
  );
};

export { Reports };
