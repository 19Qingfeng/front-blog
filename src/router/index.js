import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login"
import { getLocalStroage } from "../helpers/utils"

Vue.use(VueRouter);


const isLogin = () => {
  return getLocalStroage('login') === 1
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


const whiteList = ['/login']


router.beforeEach(async(to, from, next) => {
  if (isLogin()) {
      if (to.path === '/login') {
          next({ path: '/' })
      } else {
          // 权限鉴别 获得当前用户权限鉴别list 判断是否包含满足权限 满足通过 不满足不通过
          // if (hasPermission(to.meta.permission)) {
          //     next()
          // } else {
          //     Message.error({
          //         message: '无权访问'
          //     })
          //     next(false)
          // }
          next()
      }
  } else {
      // 没有登陆
      if (whiteList.indexOf(to.path) !== -1) {
          next()
      } else {
          next(`/login`)
      }
  }
})

export default router;
