import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL + "/projects";

// Get Projects from User logged in
const getUserProjects = () => {
  return axios.get(API_URL, { headers: authHeader() });
};
// Add new Project to User logged in
const postUserProject = (data) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};
// Update Project with all fields
const editProject = (data) => {
  return axios.put(`${API_URL}/${data.id}`, data, { headers: authHeader() });
};
// Delete Project by ID
const deleteProject = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const UserService = {
  getUserProjects,
  postUserProject,
  editProject,
  deleteProject,
};
export default UserService;
