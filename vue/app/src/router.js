import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home";
import About from "@/pages/Contact";
import Login from "@/pages/Login";
import Error404 from "@/pages/404";

import Dashboard from "@/pages/admin/Dashboard";
import adminMenu from "@/pages/admin/menu";
import adminNews from "@/pages/admin/news";
// import other pages for routes here


Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
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
      hello: 'sad'
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
    path: "/admin/news",
    name: "News",
    component: adminNews,
    meta: {
      title: "News",
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
router.beforeEach(async(to, from, next) => {
  await Vue.nextTick()
  // document.title = this.$APP_TITLE + " | " + to.meta.title;
  document.title = to.meta.title;
  if (!router.app.access_token) { 
    if(to.path != '/login') next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    else next()
  }
  else {
    if(to.path === '/login') next('/')
    else next()
  }
});

export default router;

