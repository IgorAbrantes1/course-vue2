import Api from "@/services/Api";

export default {
  getEvents(perPage, page) {
    return Api().get(`/events?_limit=${perPage}&_page=${page}`);
  },
  getEvent(id) {
    return Api().get(`/event/${id}`);
  },
  postEvent(event) {
    return Api().post("/events", event);
  },
};
