import React from "react";
import styles from './BotonRegister.module.css'
function BotonRegister(props) {
  return (
    <>
    { props.disabled ? (
      <button
        type="button"
        disabled={props.disabled}
        className={`${styles.botonesRegisterD} mx-1`}
      >
        <ion-icon name={props.icon}></ion-icon>
        <p>{props.name}</p>
      </button>
    ):
    <button
        type="button"
        className={`${styles.botonesRegister} mx-1`}
      >
        <ion-icon name={props.icon}></ion-icon>
        <p>{props.name}</p>
      </button>
    }
      
    </>
  );
}

export default BotonRegister;