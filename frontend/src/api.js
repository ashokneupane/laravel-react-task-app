import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const csrfCookie = () => {
  let url = API_BASE_URL;

  return axios.get(url, {
    withCredentials: true,
  });
};

export const getTask = (status) => {
  let url = API_BASE_URL + "/task";
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
  console.log(API_BASE_URL);
  return axios({
    method: "post",
    url: API_BASE_URL + "/task",
    data: {
      title: title,
      status: status,
    },
  });
};

export const updateTask = (taskDetail) => {
  return axios({
    method: "put",
    url: API_BASE_URL + "/task/" + taskDetail.id,
    data: {
      id: taskDetail.id,
      status: taskDetail.status,
      description: taskDetail.description,
      due_date: taskDetail.due_date,
    },
  });
};

export const deleteTask = (id) => {
  return axios({
    method: "Delete",
    url: API_BASE_URL + "/task/" + id,
  });
};

export const updateTaskStatus = (id, status) => {
  return axios({
    method: "POST",
    url: API_BASE_URL + "/task/change_status/" + id,
    data: {
      id: id,
      status: status,
    },
  });
};

export const registerUser = (values) => {
  return axios({
    method: "post",
    url: API_BASE_URL + "/register",
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
    url: API_BASE_URL + "/login",
    data: {
      email: values.email,
      password: values.password,
    },
  });
};
