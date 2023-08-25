import React from "react";
import ActionAreaCard from "../../compontents/common/CardPro";
import styles from "./RegisterView.module.css";
import StepForm from "./Components/MultiStepFromRegister";

const RegisterView = () => (
  <div>
    <section id={styles.division}>
      <div className={`${styles.tarjeta} overflow-auto d-none d-lg-flex`}>
        <ActionAreaCard />
      </div>
      <div className="form overflow-auto">
        <StepForm />
      </div>
    </section>
  </div>
);

export default RegisterView;
