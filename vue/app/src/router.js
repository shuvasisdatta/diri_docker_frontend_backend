/* eslint-disable no-console */
import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home";
import About from "@/pages/Contact";
import Login from "@/pages/Login";

import newsDetail from "@/pages/NewsDetail";
import eventDetail from "@/pages/EventDetail";
import Error404 from "@/pages/404";

import Dashboard from "@/pages/admin/Dashboard";
import adminMenu from "@/pages/admin/menu";
import adminNews from "@/pages/admin/news";
import adminEvent from "@/pages/admin/event";
// import other pages for routes here


Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
      layout: 'blank',
    },
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: true,
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: About,
    meta: {
      title: "Contact",
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Dashboard,
    meta: {
      title: "Admin",
      layout: 'admin',
      requiresAdminAuth: true,
    },
  },
  {
    path: "/admin/menu",
    name: "Menu",
    component: adminMenu,
    meta: {
      title: "Menu",
      layout: 'admin',
      requiresAdminAuth: true,
    },
  },
  {
    path: "/admin/news",
    name: "News",
    component: adminNews,
    meta: {
      title: "News",
      layout: 'admin',
      requiresAdminAuth: true,
    },
  },
  {
    path: "/news/:id",
    name: "NewsDetail",
    component: newsDetail,
    meta: {
      title: "News Detail",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/event",
    name: "Events",
    component: adminEvent,
    meta: {
      title: "Events",
      layout: 'admin',
      requiresAdminAuth: true,
    },
  },
  {
    path: "/event/:id",
    name: "EventDetail",
    component: eventDetail,
    meta: {
      title: "Event Detail",
      requiresAuth: true,
    },
  },
  {
    // catch all not found routes(404) - define at the very end
    path: "*",
    name: "404",
    component: Error404,
    meta: {
      title: "404",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// app title update 
router.beforeEach(async(to, from, next) => {  
  await Vue.nextTick()
  // document.title = this.$APP_TITLE + " | " + to.meta.title;
  // Todo: requiresAuth meta for admin pages
  document.title = to.meta.title;
  // if (!router.app.access_token) {   
  //   if(to.path != '/login') next({
  //     path: '/login',
  //     query: { redirect: to.fullPath }
  //   })
  //   else next()
  // }
  // else {  
  //   if(to.path == '/login') next('/')
  //   else next()
  // }
  
  if (to.matched.some(record => record.meta.requiresAuth) || to.matched.some(record => record.meta.requiresAdminAuth)) {
    if (!router.app.access_token) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else if (to.matched.some(record => record.meta.requiresAdminAuth)) {
      if (router.app.isAdmin) next() 
      else next('/404')
    } else next()  
  } else {
    // if the url is login and user is already authenticated then route to root url else pass the next()
    if (to.path === '/login' && (router.app.access_token)) next('/')
    else next()
  }


});

export default router;

