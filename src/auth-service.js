import axios from "axios";

// API url
const API_URL = process.env.REACT_APP_BACKEND_URL;

// config header
const config = {
  headers: {
    Accept: "application/json",
  },
};
// Sign up function
const signup = (apellidos, correo, nombres, password, rol, registrado_por) => {
  return axios
    .post(
      API_URL + "usuario/crear",
      {
        apellidos,
        correo,
        nombres,
        password,
        rol,
        registrado_por,
      },
      config
    )
    .then(({ data }) => {
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
      }

      return data;
    });
};
// Login function
const login = (correo, password) => {
  return axios
    .post(
      API_URL + "auth/login",
      {
        correo,
        password,
      },
      config
    )
    .then(({ data }) => {
      if (data.authorisation.token) {
        localStorage.setItem("user", JSON.stringify(data));
      }

      return data;
    });
};

// Logout function\n
const logout = () => {
  localStorage.removeItem("user");
  localStorage.clear();
};

// Get current user function
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// AuthService object
const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

// Export the AuthService object
export default AuthService;
