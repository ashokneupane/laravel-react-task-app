import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


const API_BASE_URL = "http://localhost:8000/task";

export const getTask = (status) => {
  let url = API_BASE_URL;
  if (status === "pending") {
    url += "?filter_status=0";
  } else if (status === "completed") {
    url += "?filter_status=1";
  }
  return axios.get(url);
};

export const createTask = (title) => {
  return axios({
    method: "post",
    url: API_BASE_URL,
    data: {
      title: title,
      is_completed: false,
    },
  });
};

export const updateTask = (id, title) => {
  return axios({
    method: "put",
    url: API_BASE_URL + "/" + id,
    data: {
      id: id,
      title: title,
    },
  });
};

export const deleteTask = (id) => {
  return axios({
    method: "Delete",
    url: API_BASE_URL + "/" + id,
  });
};

export const updateTaskStatus = (id) => {
  return axios({
    method: "Get",
    url: API_BASE_URL + "/change_status/" + id,
  });
};

export const registerUser = (values) => {
  return axios({
    method: "post",
    url: "http://localhost:8000/register",
    data: {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    },
  });
};

export const login = (values) => {
  return axios({
    method: "post",
    url: "http://localhost:8000/login",
    data: {
      email: values.email,
      password: values.password,
    },
  });
};
