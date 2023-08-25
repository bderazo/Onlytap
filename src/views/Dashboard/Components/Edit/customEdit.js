import React, { useState, useEffect } from "react";
import BotonRegister from "../../../../compontents/common/BotonRegister";
import styles from "../../../Register/Components/CustonLayout.module.css";

import {
  ModelCoverPhono,
  ModelPictureProfile,
  ModelAccreditation,
  ModelAddress,
  ModelCashapp,
  ModelDescripcion,
  ModelDepartment,
  ModelDiscord,
  ModelFacebook,
  ModelGithub,
  ModelInstagram,
  ModelJob,
  ModelLinkedin,
  ModelName,
  ModelPaypal,
  ModelPhone,
  ModelSkype,
  ModelSnapchat,
  ModelTelegram,
  ModelTiktok,
  ModelTwitter,
  ModelTwitch,
  ModelUrl,
  ModelVenmo,
  ModelWhatsapp,
  ModelYoutube,
  ModelEmail,
} from "../../../Register/Components/modals/index";

function CustomEdit() {
  const [profesion, setProfesion] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [skype, setSkype] = useState("");
  const [telegram, setTelegram] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [mail, setMail] = useState("");
  const [url, setUrl] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  useEffect(() => {
    const storedValue = localStorage.getItem("Profesion");
    const storeValueNombre = localStorage.getItem("Nombre");
    const storedValueDescripcion = localStorage.getItem("Descripcion");
    const storedValueTwitter = localStorage.getItem("Twitter");
    const storedValueInstragram = localStorage.getItem("Instagram");
    const storedValueLinkedin = localStorage.getItem("Linkedin");
    const storedValueFacebook = localStorage.getItem("Facebook");
    const storedValueYoutube = localStorage.getItem("Youtube");
    const storedValueTiktok = localStorage.getItem("Tiktok");
    const storedValuePhone = localStorage.getItem("Phone");
    const storedValueMail = localStorage.getItem("Mail");
    const storedValueWhatsapp = localStorage.getItem("Whatsapp");
    const storedValueTelegram = localStorage.getItem("Telegram");
    const storedValueSkype = localStorage.getItem("Skype");
    const storedValueUrl = localStorage.getItem("Url");
    const storedValueUbicacion = localStorage.getItem("Ubicacion");
    if (
      storedValue ||
      storeValueNombre ||
      storedValueDescripcion ||
      storedValueTwitter ||
      storedValueInstragram ||
      storedValueLinkedin ||
      storedValueFacebook ||
      storedValueYoutube ||
      storedValueTiktok ||
      storedValuePhone ||
      storedValueMail ||
      storedValueWhatsapp ||
      storedValueTelegram ||
      storedValueSkype ||
      storedValueUrl ||
      storedValueUbicacion
    ) {
      setProfesion(storedValue);
      setNombre(storeValueNombre);
      setDescripcion(storedValueDescripcion);
      setTwitter(storedValueTwitter);
      setInstagram(storedValueInstragram);
      setLinkedin(storedValueLinkedin);
      setFacebook(storedValueFacebook);
      setYoutube(storedValueYoutube);
      setTiktok(storedValueTiktok);
      setPhone(storedValuePhone);
      setMail(storedValueMail);
      setWhatsapp(storedValueWhatsapp);
      setTelegram(storedValueTelegram);
      setSkype(storedValueSkype);
      setUrl(storedValueUrl);
      setUbicacion(storedValueUbicacion);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedValue = localStorage.getItem("Profesion");
      const storeValueNombre = localStorage.getItem("Nombre");
      const storedValueDescripcion = localStorage.getItem("Descripcion");
      const storedValueTwitter = localStorage.getItem("Twitter");
      const storedValueInstragram = localStorage.getItem("Instagram");
      const storedValueLinkedin = localStorage.getItem("Linkedin");
      const storedValueFacebook = localStorage.getItem("Facebook");
      const storedValueYoutube = localStorage.getItem("Youtube");
      const storedValueTiktok = localStorage.getItem("Tiktok");
      const storedValuePhone = localStorage.getItem("Phone");
      const storedValueMail = localStorage.getItem("Mail");
      const storedValueWhatsapp = localStorage.getItem("Whatsapp");
      const storedValueTelegram = localStorage.getItem("Telegram");
      const storedValueSkype = localStorage.getItem("Skype");
      const storedValueUrl = localStorage.getItem("Url");
      const storedValueUbicacion = localStorage.getItem("Ubicacion");
      if (
        storedValue !== profesion ||
        storeValueNombre !== nombre ||
        storedValueDescripcion !== descripcion ||
        storedValueTwitter !== twitter ||
        storedValueInstragram !== instagram ||
        storedValueLinkedin !== linkedin ||
        storedValueFacebook !== facebook ||
        storedValueYoutube !== youtube ||
        storedValueTiktok !== tiktok ||
        storedValuePhone !== phone ||
        storedValueMail !== mail ||
        storedValueWhatsapp !== whatsapp ||
        storedValueTelegram !== telegram ||
        storedValueSkype !== skype ||
        storedValueUrl !== url ||
        storedValueUbicacion !== ubicacion
      ) {
        setProfesion(storedValue);
        setNombre(storeValueNombre);
        setDescripcion(storedValueDescripcion);
        setTwitter(storedValueTwitter);
        setInstagram(storedValueInstragram);
        setLinkedin(storedValueLinkedin);
        setFacebook(storedValueFacebook);
        setYoutube(storedValueYoutube);
        setTiktok(storedValueTiktok);
        setPhone(storedValuePhone);
        setMail(storedValueMail);
        setWhatsapp(storedValueWhatsapp);
        setTelegram(storedValueTelegram);
        setSkype(storedValueSkype);
        setUrl(storedValueUrl);
        setUbicacion(storedValueUbicacion);
      }
    });

    return () => clearInterval(intervalId);
  }, [
    profesion,
    nombre,
    descripcion,
    twitter,
    instagram,
    linkedin,
    facebook,
    youtube,
    tiktok,
    phone,
    mail,
    whatsapp,
    telegram,
    skype,
    url,
    ubicacion,
  ]);

  const [showModal, setShowModal] = useState(false);
  const [ShowModalDepartment, setShowModalDepartment] = useState(false);
  const [ShowModalJob, setShowModalJob] = useState(false);
  const [ShowModalDescripcion, setShowModalDescripcion] = useState(false);
  const [ShowModalAccreditation, setShowModalAccreditation] = useState(false);
  const [ShowModalPhone, setShowModalPhone] = useState(false);
  const [ShowModalUrl, setShowModalUrl] = useState(false);
  const [ShowModalAddress, setShowModalAddress] = useState(false);
  const [ShowModalTwitter, setShowModalTwitter] = useState(false);
  const [ShowModalInstagram, setShowModalInstagram] = useState(false);
  const [ShowModalLinkedin, setShowModalLinkedin] = useState(false);
  const [ShowModalFacebook, setShowModalFacebook] = useState(false);
  const [ShowModalYoutube, setShowModalYoutube] = useState(false);
  const [ShowModalTwitch, setShowModalTwitch] = useState(false);
  const [ShowModalSnapchat, setShowModalSnapchat] = useState(false);
  const [ShowModalTiktok, setShowModalTiktok] = useState(false);
  const [ShowModalWhatsapp, setShowModalWhatsapp] = useState(false);
  const [ShowModalDiscord, setShowModalDiscord] = useState(false);
  const [ShowModalTelegram, setShowModalTelegram] = useState(false);
  const [ShowModalSkype, setShowModalSkype] = useState(false);
  const [ShowModalGithub, setShowModalGithub] = useState(false);
  const [ShowModalPaypal, setShowModalPaypal] = useState(false);
  const [ShowModalVenmo, setShowModalVenmo] = useState(false);
  const [ShowModalCash, setShowModalCash] = useState(false);
  const [ShowModalPictureProfile, setShowModalPictureProfile] = useState(false);
  const [ShowModalCoverPhono, setShowModalCoverPhoto] = useState(false);
  const [ShowModalMail, setShowModalMail] = useState(false);
  return (
    <div>
      <div className={`${styles.container} py-2 px-5`}>
        <h1 className="fw-bold">
          <strong>Editar Tarjeta</strong>{" "}
        </h1>
        <p>
          Selecciona y añade los datos que quieres que aparezcan en tu tarjeta
        </p>
      </div>
      <div className={`${styles.container} mx-5`}>
        <h3>
          <strong>Agrega Imágenes</strong>
        </h3>
        <div className={styles.linea}>
          <div
            className="mx-2 "
            onClick={() => setShowModalPictureProfile(true)}
          >
            <BotonRegister icon="add-outline" name="Foto de perfil" />
          </div>
          <div className="mx-2" onClick={() => setShowModalCoverPhoto(true)}>
            <BotonRegister icon="add-outline" name="Foto de portada" />
          </div>
        </div>
      </div>
      <div className="my-4 mx-5 ">
        <h3>
          <strong>Agrega más detalles</strong>{" "}
        </h3>
        <div className={styles.container}>
          <h5>
            <small>Personal</small>{" "}
          </h5>
          <div className={styles.linea}>
            {nombre ? (
              <div className={` mx-2`} onClick={() => setShowModal(true)}>
                <BotonRegister
                  icon="person-sharp"
                  disabled={true}
                  name="Nombre"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModal(true)}>
                <BotonRegister icon="person-sharp" name="Nombre" />
              </div>
            )}

            {profesion ? (
              <div className={` mx-2`} onClick={() => setShowModalJob(true)}>
                <BotonRegister icon="bag" disabled={true} name="Profesión" />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalJob(true)}>
                <BotonRegister icon="bag" name="Profesión" />
              </div>
            )}

            {descripcion ? (
              <div
                className={` mx-2`}
                onClick={() => setShowModalDescripcion(true)}
              >
                <BotonRegister
                  icon="chatbox"
                  disabled={true}
                  name="Descripción"
                />
              </div>
            ) : (
              <div
                className="mx-2"
                onClick={() => setShowModalDescripcion(true)}
              >
                <BotonRegister icon="chatbox" name="Descripción" />
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.container} my-3`}>
          <h5>
            <small>General</small>{" "}
          </h5>
          <div className={styles.linea}>
            {phone ? (
              <div className={` mx-2`} onClick={() => setShowModalPhone(true)}>
                <BotonRegister
                  icon="call-sharp"
                  disabled={true}
                  name="Celular"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalPhone(true)}>
                <BotonRegister icon="call-sharp" name="Celular" />
              </div>
            )}

            {mail ? (
              <div className={`mx-2`} onClick={() => setShowModalMail(true)}>
                <BotonRegister icon="mail-open" disabled={true} name="Email" />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalMail(true)}>
                <BotonRegister icon="mail-open" name="Email" />
              </div>
            )}

            {url ? (
              <div className={` mx-2`} onClick={() => setShowModalUrl(true)}>
                <BotonRegister
                  icon="browsers"
                  disabled={true}
                  name="Página Web"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalUrl(true)}>
                <BotonRegister icon="browsers" name="Página Web" />
              </div>
            )}
            {ubicacion ? (
              <div className={`mx-2`} onClick={() => setShowModalAddress(true)}>
                <BotonRegister
                  icon="location-sharp"
                  disabled={true}
                  name="Dirección"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalAddress(true)}>
                <BotonRegister icon="location-sharp" name="Dirección" />
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.container} my-3`}>
          <h5>
            <small>Redes sociales</small>{" "}
          </h5>
          <div className={styles.linea}>
            {twitter ? (
              <div
                className={` mx-2`}
                onClick={() => setShowModalTwitter(true)}
              >
                <BotonRegister
                  icon="logo-twitter"
                  disabled={true}
                  name="Twitter"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalTwitter(true)}>
                <BotonRegister icon="logo-twitter" name="Twitter" />
              </div>
            )}

            {instagram ? (
              <div
                className={` mx-2`}
                onClick={() => setShowModalInstagram(true)}
              >
                <BotonRegister
                  icon="logo-instagram"
                  disabled={true}
                  name="Instagram"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalInstagram(true)}>
                <BotonRegister icon="logo-instagram" name="Instagram" />
              </div>
            )}

            {facebook ? (
              <div
                className={` mx-2`}
                onClick={() => setShowModalFacebook(true)}
              >
                <BotonRegister
                  icon="logo-facebook"
                  disabled={true}
                  name="Facebook"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalFacebook(true)}>
                <BotonRegister icon="logo-facebook" name="Facebook" />
              </div>
            )}

            {youtube ? (
              <div
                className={` mx-2`}
                onClick={() => setShowModalYoutube(true)}
              >
                <BotonRegister
                  icon="logo-youtube"
                  disabled={true}
                  name="Youtube"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalYoutube(true)}>
                <BotonRegister icon="logo-youtube" name="Youtube" />
              </div>
            )}

            {tiktok ? (
              <div className={` mx-2`} onClick={() => setShowModalTiktok(true)}>
                <BotonRegister
                  icon="logo-tiktok"
                  disabled={true}
                  name="Tiktok"
                />
              </div>
            ) : (
              <div className="mx-2" onClick={() => setShowModalTiktok(true)}>
                <BotonRegister icon="logo-tiktok" name="Tiktok" />
              </div>
            )}
          </div>
        </div>
        <h5>
          <small>Mensajería</small>{" "}
        </h5>
        <div className={styles.linea}>
          {whatsapp ? (
            <div className={` mx-2`} onClick={() => setShowModalWhatsapp(true)}>
              <BotonRegister
                icon="logo-whatsapp"
                disabled={true}
                name="WhatsApp"
              />
            </div>
          ) : (
            <div className="mx-2" onClick={() => setShowModalWhatsapp(true)}>
              <BotonRegister icon="logo-whatsapp" name="WhatsApp" />
            </div>
          )}

          {skype ? (
            <div className={` mx-2`} onClick={() => setShowModalSkype(true)}>
              <BotonRegister icon="logo-skype" disabled={true} name="Skype" />
            </div>
          ) : (
            <div className="mx-2" onClick={() => setShowModalSkype(true)}>
              <BotonRegister icon="logo-skype" name="Skype" />
            </div>
          )}
          {telegram ? (
            <div className={` mx-2`} onClick={() => setShowModalTelegram(true)}>
              <BotonRegister icon="navigate" disabled={true} name="Telegram" />
            </div>
          ) : (
            <div className="mx-2" onClick={() => setShowModalTelegram(true)}>
              <BotonRegister icon="navigate" name="Telegram" />
            </div>
          )}
        </div>

        <h5>
          <small>Business</small>{" "}
        </h5>
        <div className={styles.linea}>
          {linkedin ? (
            <div className={` mx-2`} onClick={() => setShowModalLinkedin(true)}>
              <BotonRegister
                icon="logo-linkedin"
                disabled={true}
                name="LinkedIn"
              />
            </div>
          ) : (
            <div className="mx-2" onClick={() => setShowModalLinkedin(true)}>
              <BotonRegister icon="logo-linkedin" name="LinkedIn" />
            </div>
          )}
        </div>
      </div>
      <ModelName isVisible={showModal} onClose={() => setShowModal(false)} />
      <ModelDepartment
        isVisible={ShowModalDepartment}
        onClose={() => setShowModalDepartment(false)}
      />
      <ModelJob
        isVisible={ShowModalJob}
        onClose={() => setShowModalJob(false)}
      />
      <ModelDescripcion
        isVisible={ShowModalDescripcion}
        onClose={() => setShowModalDescripcion(false)}
      />
      <ModelAccreditation
        isVisible={ShowModalAccreditation}
        onClose={() => setShowModalAccreditation(false)}
      />
      <ModelPhone
        isVisible={ShowModalPhone}
        onClose={() => setShowModalPhone(false)}
      />
      <ModelUrl
        isVisible={ShowModalUrl}
        onClose={() => setShowModalUrl(false)}
      />
      <ModelAddress
        isVisible={ShowModalAddress}
        onClose={() => setShowModalAddress(false)}
      />
      <ModelTwitter
        isVisible={ShowModalTwitter}
        onClose={() => setShowModalTwitter(false)}
      />
      <ModelInstagram
        isVisible={ShowModalInstagram}
        onClose={() => setShowModalInstagram(false)}
      />
      <ModelLinkedin
        isVisible={ShowModalLinkedin}
        onClose={() => setShowModalLinkedin(false)}
      />
      <ModelFacebook
        isVisible={ShowModalFacebook}
        onClose={() => setShowModalFacebook(false)}
      />
      <ModelYoutube
        isVisible={ShowModalYoutube}
        onClose={() => setShowModalYoutube(false)}
      />
      <ModelSnapchat
        isVisible={ShowModalSnapchat}
        onClose={() => setShowModalSnapchat(false)}
      />
      <ModelTiktok
        isVisible={ShowModalTiktok}
        onClose={() => setShowModalTiktok(false)}
      />
      <ModelTwitch
        isVisible={ShowModalTwitch}
        onClose={() => setShowModalTwitch(false)}
      />
      <ModelWhatsapp
        isVisible={ShowModalWhatsapp}
        onClose={() => setShowModalWhatsapp(false)}
      />
      <ModelDiscord
        isVisible={ShowModalDiscord}
        onClose={() => setShowModalDiscord(false)}
      />
      <ModelSkype
        isVisible={ShowModalSkype}
        onClose={() => setShowModalSkype(false)}
      />
      <ModelTelegram
        isVisible={ShowModalTelegram}
        onClose={() => setShowModalTelegram(false)}
      />
      <ModelGithub
        isVisible={ShowModalGithub}
        onClose={() => setShowModalGithub(false)}
      />
      <ModelPaypal
        isVisible={ShowModalPaypal}
        onClose={() => setShowModalPaypal(false)}
      />
      <ModelVenmo
        isVisible={ShowModalVenmo}
        onClose={() => setShowModalVenmo(false)}
      />
      <ModelCashapp
        isVisible={ShowModalCash}
        onClose={() => setShowModalCash(false)}
      />

      <ModelPictureProfile
        isVisible={ShowModalPictureProfile}
        onClose={() => setShowModalPictureProfile(false)}
      />
      <ModelCoverPhono
        isVisible={ShowModalCoverPhono}
        onClose={() => setShowModalCoverPhoto(false)}
      />
      <ModelEmail
        isVisible={ShowModalMail}
        onClose={() => setShowModalMail(false)}
      />
    </div>
  );
}
export default CustomEdit;
