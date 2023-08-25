import CustomLayout from "./CustonLayout";
import React, { useState, useEffect } from "react";
import styles from "./MultiStepFrom.module.css";
import { Link } from "react-router-dom";

function Step1() {
  const [nombre, setNombre] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const storeValueNombre = localStorage.getItem("Nombre");
    const storedValuePhone = localStorage.getItem("Phone");
    if (storeValueNombre || storedValuePhone) {
      setNombre(storeValueNombre);
      setPhone(storedValuePhone);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storeValueNombre = localStorage.getItem("Nombre");
      const storedValuePhone = localStorage.getItem("Phone");
      if (
        storeValueNombre !== nombre ||
        storedValuePhone !== phone
      ) {
        setNombre(storeValueNombre);
        setPhone(storedValuePhone);
      }
    });

    return () => clearInterval(intervalId);
  }, [nombre, phone]);

  return (
    <form className={styles.form}>
      
      <CustomLayout />

      {nombre && phone ? (
        <div className={`${styles.headContinuar}`}>
          <Link to="/OnlyTap/RegisterFrom">
            <button className={styles.nextStep} type="button">
              Continuar
            </button>
          </Link>
        </div>
      ) : (
        <div className={`${styles.headContinuar}`}>
          <button
            className={styles.nextStepNada}
            type="button"
            onClick={() => {
              if (!nombre || !phone) {
                alert("Por favor llene su nombre y número de teléfono.");
              }
            }}
          >
            Continuar
          </button>
        </div>
      )}
    </form>
  );
}

export default Step1;
