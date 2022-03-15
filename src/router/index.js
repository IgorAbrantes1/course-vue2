import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "EventList",
    component: () => import("@/views/EventList.vue"),
  },
  {
    path: "/event/:id",
    name: "EventShow",
    props: true,
    component: () => import("@/views/EventShow.vue"),
  },
  {
    path: "/event/create",
    name: "EventCreate",
    component: () => import("@/views/EventCreate.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: to.hash,
      behavior: "smooth",
      top: savedPosition,
    };
  },
});

export default router;
