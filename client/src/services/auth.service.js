import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL+"/auth/";

// Create User with authentication
const register = (name, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
};

// get authenticated by email and password
// and save User authentication data to LocalStorage 
const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

// Remove User authentication data from LocalStorage 
const logout = () => {
  localStorage.removeItem("user");
};

// Get User authentication data from LocalStorage 
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;