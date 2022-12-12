import axios from "axios";

export default axios.create({
  baseURL: "https://cbilling-api.azurewebsites.net/api/",
});
