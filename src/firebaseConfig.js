import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "imagenestarjeta.firebaseapp.com",
  projectId: "imagenestarjeta",
  storageBucket: "imagenestarjeta.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-J7H9K7J0W9",
});

const storage = getStorage(app);

/**
 * It takes a file and a path as parameters, and returns a promise that resolves to an object with the
 * url of the file uploaded to firebase storage.
 * @param file - the file to be uploaded
 * @param path - the path to the file in the Firebase Storage
 * @returns A promise.
 */
export const uploadFileToFB = async (file, path) => {
  return new Promise(function (resolve, reject) {
    const ext = file.name.split(".")[1];
    const codeFile = Date.now();
    // console.log(codeFile)
    // console.log(ext)

    const fileName = `${codeFile}.${ext} `;
    // console.log(fileName)

    const storageRef = ref(storage, `/${path}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (err) => {
        console.log("Error al cargar en firestorage: ", err);
        reject({
          ok: false,
          msg: err.message || "Error al cargar archivo",
          url: null,
        });
      },
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // console.log('Url del documento: ', url);
          resolve({
            ok: true,
            msg: "File was uploaded succesfully",
            url: url,
          });
        });
      }
    );
  });
};

export const uploadFileToFBbdd = async (file, path) => {
  return new Promise(function (resolve, reject) {
    const ext = file;
    const codeFile = Date.now();
    // console.log(codeFile)
    // console.log(ext)

    const fileName = `${codeFile}.${ext} `;
    // console.log(fileName)

    const storageRef = ref(storage, `/${path}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (err) => {
        console.log("Error al cargar en firestorage: ", err);
        reject({
          ok: false,
          msg: err.message || "Error al cargar archivo",
          url: null,
        });
      },
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // console.log('Url del documento: ', url);
          resolve({
            ok: true,
            msg: "File was uploaded succesfully",
            url: url,
          });
        });
      }
    );
  });
};



// Ejemplo de uso

