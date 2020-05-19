import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home.vue";
import About from "@/pages/Contact.vue";
import Error404 from "@/pages/404.vue";
// import other pages for routes here

// App title at browser tab is like "YOUR_APP_TITLE | CURRENT_PAGE_TITLE"
import { name as APP_TITLE } from "@/../package.json";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  // other menus goes there
  {
    path: "/contact",
    name: "contact",
    component: About,
    meta: {
      title: "Contact",
    },
  },
  {
    // catch all not found routes(404) - define at the very end
    path: "*",
    component: Error404,
    meta: {
      title: "404",
    },
  },
];

const router = new VueRouter({
  // mode: "history",
  routes,
});

// app title update
router.beforeEach((to, from, next) => {
  document.title = APP_TITLE + " | " + to.meta.title;
  next();
});

export default router;