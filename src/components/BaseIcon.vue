<template>
  <div class="icon-wrapper">
    <span class="svg" v-html="svg"></span>
    <slot />
  </div>
</template>

<script>
import feather from "feather-icons";

export default {
  name: "BaseIcon",
  extends: {},
  mixins: [],
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
  computed: {
    svg() {
      return feather.icons[this.name].toSvg({
        class: "icon",
        width: this.width,
        height: this.height,
      });
    },
  },
  created() {},
  beforeDestroy() {},
};
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
  margin-right: 6px;
}

.icon-wrapper > .svg {
  margin-right: 6px;
  margin-left: 10px;
}
</style>
