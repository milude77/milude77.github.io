import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/pages/RootPage.vue"),
  },
  {
    path: "/about",
    component: () => import("@/pages/AboutPage.vue"),
  },
  {
    path: "/mini-game",
    component: () => import("@/pages/MiniGamePage.vue"),
    children: [
      {
        path: ":id", // 动态参数配置正确
        // 修改为专门的游戏详情组件（假设存在）
        component: () => import("@/pages/RootPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("@/pages/RegisterPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
