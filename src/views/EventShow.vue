<template>
  <div>
    <h1>Showing event #{{ id }}</h1>
  </div>
</template>

<script>
export default {
  name: "EventShow",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
