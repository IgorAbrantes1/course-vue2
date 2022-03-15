import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents() {
    return api.get("/events");
  },
  getEvent(id) {
    return api.get(`/events/${id}`);
  },
};
