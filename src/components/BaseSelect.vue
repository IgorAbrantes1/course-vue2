<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
      :class="classes"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    classes: {
      type: Object,
      default: null,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>

<style scoped></style>
