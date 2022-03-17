<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventShow', params: { id: event.id } }"
  >
    <div class="event-card -shadow">
      <span class="eyebrow">{{ event.date }} at {{ event.time }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <BaseIcon name="users">
        <span class="attendees">{{ event.attendees.length }} attending</span>
      </BaseIcon>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "EventCard",
  extends: {},
  mixins: [],
  props: {
    event: {
      id: {
        type: [String, Number],
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      attendees: {
        type: Array,
        required: true,
      },
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
  computed: {},
  created() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.attendees {
  margin: 0 0 5px 0;
}

.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
