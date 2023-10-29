import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjg1ZDc2M2JiMDNlNGNjYTM1YmMxZGM2MjI1NzdhMSIsInN1YiI6IjY1M2RjMjU3NTkwN2RlMDExYmM0ZmEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AjAlanWvwkRSEYwOvwSuOgA9XLc8KuE2DKA-p9fbv8Q",
  },
});
