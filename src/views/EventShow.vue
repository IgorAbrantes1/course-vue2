<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">{{ event.date }} at {{ event.time }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : "" }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map">
      <h2 class="location">Location</h2>
    </BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">
        {{ event.attendees ? event.attendees.length : 0 }}
      </span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "EventShow",
  props: {
    id: {
      type: [String, Number],
      require: true,
    },
  },
  created() {
    this.fetchEvent(this.id);
  },
  computed: mapState({
    event: (state) => state.event.event,
  }),
  components: {},
  methods: {
    ...mapActions("event", ["fetchEvent"]),
  },
};
</script>

<style scoped>
.location {
  margin-top: 22px;
}
.event-header > .title {
  margin: 0;
}

.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
