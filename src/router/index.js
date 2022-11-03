import { createRouter, createWebHashHistory } from "vue-router";

import OverviewPage from "../pages/OverviewPage.vue";
const routes = [
  {
    path: "/",
    name: "overview",
    component: OverviewPage,
  },
  {
    path: "/asset",
    name: "asset",
    component: () => import("../pages/AssetPage.vue"),
  },
  {
    path: "/ht-db",
    name: "ht_db",
    component: () => import("../pages/HtDbPage.vue"),
  },
  {
    path: "/tool",
    name: "tool",
    component: () => import("../pages/ToolPage.vue"),
  },
  {
    path: "/category",
    name: "category",
    component: () => import("../pages/CategoryPage.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../pages/SearchPage.vue"),
  },
  {
    path: "/report",
    name: "report",
    component: () => import("../pages/ReportPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
