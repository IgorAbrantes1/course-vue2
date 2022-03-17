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
      store
        .dispatch("event/fetchEvent", routeTo.params.id)
        .then((event) => {
          routeTo.params.event = event;
          next();
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            next({ name: "404", params: { resource: "event" } });
          } else {
            next({ name: "NetworkIssue" });
          }
        });
    },
  },
  {
    path: "/404",
    name: "404",
    props: true,
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/network-issue",
    name: "NetworkIssue",
    component: () => import("@/views/NetworkIssue.vue"),
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } },
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
