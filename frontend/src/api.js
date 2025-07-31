import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


const API_BASE_URL = "http://localhost:8000/task";

export const getTask = (status) => {
  let url = API_BASE_URL;
  if (status === "TODO") {
    url += "?filter_status=TODO";
  } else if (status === "IN_PROGRESS") {
    url += "?filter_status=1";
  } else if (status === "DONE") {
    url += "?filter_status=DONE";
  }
  return axios.get(url);
};

export const createTask = (title, status = "TODO") => {
  return axios({
    method: "post",
    url: API_BASE_URL,
    data: {
      title: title,
      status: status,
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

export const updateTaskStatus = (id,status) => {
  return axios({
    method: "POST",
    url: API_BASE_URL + "/change_status/" + id,
    data: {
      id: id,
      status: status,
    },
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
