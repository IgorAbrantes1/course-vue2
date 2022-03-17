import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "EventList",
    props: true,
    component: () => import("@/views/EventList.vue"),
  },
  {
    path: "/event/create",
    name: "EventCreate",
    component: () => import("@/views/EventCreate.vue"),
  },
  {
    path: "/event/:id",
    name: "EventShow",
    props: true,
    component: () => import("@/views/EventShow.vue"),
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch("event/fetchEvent", routeTo.params.id).then((event) => {
        routeTo.params.event = event;
        next();
      });
    },
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

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
