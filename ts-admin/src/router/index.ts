import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/components/Login.vue";
import Home from "@/views/Home.vue";
import BlogList from "@/views/BlogList.vue";
import BlogCreate from "@/views/BlogCreate.vue";
import CategoryList from "@/views/CategoryList.vue";
import CategoryCreate from "@/views/CategoryCreate.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "blog/list",
        component: BlogList,
      },
      {
        path: "blog/create",
        component: BlogCreate,
      },
      {
        path: "blog/edit/:id",
        component: BlogCreate,
        props: true,
      },
      {
        path: "category/list",
        component: CategoryList,
      },
      {
        path: "category/create",
        component: CategoryCreate,
      },
      {
        path: "category/edit/:id",
        component: CategoryCreate,
        props: true,
      },
      // {
      //   path: "/:resource/list",
      //   component: BlogList
      // },
      // {
      //   path: "/:resource/create",
      //   component: BlogCreate
      // },
      // {
      //   path: "/:resource/edit/:id",
      //   component: BlogCreate,
      //   props:true
      // },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
