

import styles from "./MultiStepFrom.module.css";
import SignUp from "./RegisterLayout";

function StepForm() {
  return (
    <form className={styles.form}>
      
      <SignUp></SignUp>
    </form>
  );
}

export default StepForm;