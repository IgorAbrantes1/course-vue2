<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        :options="categories"
        label="Select a category"
        class="field"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        type="text"
        v-model="event.title"
        label="Title"
        placeholder="Add a title"
        class="field"
      />

      <BaseInput
        type="text"
        v-model="event.description"
        label="Description"
        placeholder="Add a description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        v-model="event.location"
        label="Location"
        placeholder="Add a location"
        class="field"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          format="dd/MM/yyyy"
        />
      </div>

      <BaseSelect
        v-model="event.time"
        :options="times"
        label="Select a time"
        class="field"
      />

      <BaseInput type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";

export default {
  name: "EventCreate",
  components: {
    Datepicker,
  },
  data() {
    const times = [];

    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }

    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
    };
  },
  methods: {
    createEvent() {
      const date =
        this.event.date !== ""
          ? this.event.date.toISOString().substr(0, 10).split(/-/)
          : "";

      this.event.date =
        date !== "" ? [date[2], date[1], date[0]].join("/") : "";

      NProgress.start();

      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "EventShow",
            params: { id: this.event.id },
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => NProgress.done());
    },

    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);

      return {
        id: id,
        user: user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
