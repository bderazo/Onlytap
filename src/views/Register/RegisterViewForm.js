import React from "react";

import ActionAreaCard from "../../compontents/common/CardPro";
import styles from "./RegisterView.module.css";
import Step1 from "./Components/MultiStepFrom";
const RegisterViewForm = () => (
  <div>
    <section id={styles.division}>
      <div className={`${styles.tarjeta} overflow-auto d-none d-lg-flex`}>
        <ActionAreaCard />
      </div>
      <div className="form overflow-auto">
        <Step1></Step1>
      </div>
    </section>
  </div>
);

export default RegisterViewForm;
