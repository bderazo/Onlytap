import React from "react";

import ActionAreaCard from "../../../../compontents/common/CardPro";
import styles from "../../../Register/RegisterView.module.css";
import FormEdit from "./FormEdit";
const CardEdit = () => (
  <div>
    <section id={styles.division}>
      <div className={`${styles.tarjeta} overflow-auto d-none d-lg-flex`}>
        <ActionAreaCard />
      </div>
      <div className="form overflow-auto">
      <FormEdit></FormEdit>
      </div>
    </section>
  </div>
);

export default CardEdit;
