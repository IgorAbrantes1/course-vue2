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
import { mapState } from "vuex";

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  created() {
    this.perPage = 4;

    this.$store.dispatch("event/fetchEvents", {
      perPage: this.perPage,
      page: this.page,
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage;
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
