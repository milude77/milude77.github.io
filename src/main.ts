import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

import router from "./router"; // 导入独立的路由配置
import { ElLoading } from "element-plus";

const app = createApp(App);

// 添加路由加载进度条
let loadingInstance: ReturnType<typeof ElLoading.service> | null = null;

router.beforeEach((_to, _from, next) => {
  // 开始加载
  loadingInstance = ElLoading.service({
    lock: true,
    text: "加载中...",
    background: "rgba(255, 255, 255, 0.7)",
    customClass: "global-loading",
  });
  next();
});

router.afterEach(() => {
  // 结束加载
  if (loadingInstance) {
    const instance = loadingInstance;
    setTimeout(() => {
      instance.close();
      loadingInstance = null;
    }, 300);
  }
});

app.use(router);
app.mount("#app");
