import EventService from "@/services/EventService";

export default {
  namespaced: true,
  state: {
    events: [],
    eventsTotal: 0,
    event: {},
  },

  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    createEvent({ commit, dispatch }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit("ADD_EVENT", event);

          const notification = {
            type: "success",
            message: "Your event has been created successfully!",
          };
          dispatch("notification/add", notification, { root: true });
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: error.message,
          };
          dispatch("notification/add", notification, { root: true });
          throw error;
        });
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit(
            "SET_EVENTS_TOTAL",
            parseInt(response.headers["x-total-count"])
          );
          commit("SET_EVENTS", response.data);
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: error.message,
          };
          dispatch("notification/add", notification, { root: true });
        });
    },
    fetchEvent({ commit, getters, dispatch }, id) {
      const event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data);
          })
          .catch((error) => {
            const notification = {
              type: "error",
              message: error.message,
            };
            dispatch("notification/add", notification, { root: true });
          });
      }
    },
  },
};
