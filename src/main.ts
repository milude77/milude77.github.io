import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import router from "./router"; // 导入独立的路由配置
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElLoading } from "element-plus";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia())

// 添加路由加载进度条
let loadingInstance: ReturnType<typeof ElLoading.service> | null = null;


// 修改为返回 Promise 而不是使用 next()
router.beforeEach((_to, _from) => {
  // 开始加载
  loadingInstance = ElLoading.service({
    lock: true,
    background: "rgba(0, 0, 0, 0.1)",
    text: "加载中...",
    customClass: "global-loading",
  });
  return true;
});


// 修改为使用 afterEach 的新语法
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
app.use(ElementPlus, {
  locale: zhCn
})

app.mount("#app");
