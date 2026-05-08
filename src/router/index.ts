import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/pages/RootPage.vue"),
  },
  {
    path: "/posts-list",
    component: () => import("@/pages/PostsPage.vue"),
  },
  {
    path: "/about",
    component: () => import("@/pages/AboutPage.vue"),
  },
  {
    path: "/notepad",
    component: () => import("@/pages/NotepadPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*", // 404 页面
    component: () => import("@/pages/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
