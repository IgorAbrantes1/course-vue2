<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        v-model="event.category"
        :options="categories"
        label="Select a category"
        class="field"
        :classes="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category's required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        type="text"
        v-model="event.title"
        label="Title"
        placeholder="Add a title"
        class="field"
        :classes="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title's required
        </p>
      </template>

      <BaseInput
        type="text"
        v-model="event.description"
        label="Description"
        placeholder="Add a description"
        class="field"
        :classes="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description's required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        v-model="event.location"
        label="Location"
        placeholder="Add a location"
        class="field"
        :classes="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location's required
        </p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <Datepicker
          v-model="event.date"
          placeholder="Select a date"
          format="dd/MM/yyyy"
          :input-class="{ error: !$v.event.date.required }"
        />
      </div>
      <p v-if="!$v.event.date.required" class="errorMessage">
        Date's required.
      </p>

      <BaseSelect
        v-model="event.time"
        :options="times"
        label="Select a time"
        class="field"
        :classes="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time's required
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="
          !(
            $v.event.category.required ||
            $v.event.title.required ||
            $v.event.description.required ||
            $v.event.location.required ||
            $v.event.date.required ||
            $v.event.time.required
          )
        "
      >
        Submit
      </BaseButton>
      <p
        class="errorMessage"
        v-if="
          !(
            $v.event.category.required ||
            $v.event.title.required ||
            $v.event.description.required ||
            $v.event.location.required ||
            $v.event.date.required ||
            $v.event.time.required
          )
        "
      >
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
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
        .then((response) => {
          this.event.id = response.data.id;
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

      return {
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
