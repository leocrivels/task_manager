import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL + "/task";

// Get Tasks by Project ID
const getProjectTasks = (id) => {
  return axios.get(`${API_URL}/project/${id}`, { headers: authHeader() });
};
// Add a new Task
const postTask = (data) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};
// Update Task with all fields
const editTask = (data) => {
  return axios.put(`${API_URL}/${data.id}`, data, { headers: authHeader() });
};
// Delete a Task by ID
const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const UserService = {
  getProjectTasks,
  postTask,
  editTask,
  deleteTask,
};
export default UserService;
