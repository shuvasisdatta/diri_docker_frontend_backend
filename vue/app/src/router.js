import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home";
import About from "@/pages/Contact";
import Error404 from "@/pages/404";

import Dashboard from "@/pages/admin/Dashboard";
import adminMenu from "@/pages/admin/menu";
// import other pages for routes here


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
    path: "/admin",
    name: "Admin",
    component: Dashboard,
    meta: {
      title: "Admin",
      layout: 'admin',
    },
  },
  {
    path: "/admin/menu",
    name: "Menu",
    component: adminMenu,
    meta: {
      title: "Menu",
      layout: 'admin',
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
  // document.title = this.$APP_TITLE + " | " + to.meta.title;
  document.title = to.meta.title;
  next();
});

export default router;