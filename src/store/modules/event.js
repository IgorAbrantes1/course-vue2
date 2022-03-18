import EventService from "@/services/EventService";

export default {
  namespaced: true,
  state: {
    events: [],
    eventsTotal: 0,
    event: {},
    perPage: 4,
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
      return EventService.postEvent(event)
        .then((response) => {
          commit("ADD_EVENT", event);

          const notification = {
            type: "success",
            message: "Your event has been created successfully!",
          };
          dispatch("notification/add", notification, { root: true });
          return response;
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
    fetchEvents({ commit, dispatch, state }, { page }) {
      return EventService.getEvents(state.perPage, page)
        .then((response) => {
          commit("SET_EVENTS_TOTAL", response.data.total);
          commit(
            "SET_EVENTS",
            Object.keys(response.data.events).map(
              (e) => response.data.events[e]
            )
          );
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: error.message,
          };
          dispatch("notification/add", notification, { root: true });
        });
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
        return event;
      } else {
        return EventService.getEvent(id).then((response) => {
          commit("SET_EVENT", response.data);
          return response.data;
        });
      }
    },
  },
};
