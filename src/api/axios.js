import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.01:8000/api/",
  // baseURL: "https://cbilling-api.azurewebsites.net/api/",
});
