<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <div
      class="pagination"
      :class="page !== 1 ? 'pagination-between' : 'right'"
    >
      <template v-if="page !== 1">
        <router-link
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
        >
          Prev Page
        </router-link>
      </template>
      <router-link
        v-if="hasNextPage"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link>
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import store from "@/store";
import { mapState } from "vuex";

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;

  store
    .dispatch("event/fetchEvents", {
      page: currentPage,
    })
    .then(() => {
      routeTo.params.page = currentPage;
      next();
    });
}

export default {
  name: "EventList",
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState({
      event: (state) => state.event,
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
}

.pagination-between {
  justify-content: space-between;
}

.right {
  float: right;
}
</style>
