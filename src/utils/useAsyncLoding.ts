import { ref } from "vue";
import { ElMessage } from "element-plus";

export default function useAsyncLoading(fn: Function) {
  const loading = ref<boolean>(false);
  const run = async (...args: any[]) => {
    if (loading.value) {
      return;
    }
    loading.value = true;
    ElMessage.info("提交中......")
    try {
      await fn(...args);
      ElMessage.success("提交成功")
    }
    catch{
      ElMessage.error('提交失败，请稍后再试')
    }
     finally {
      loading.value = false;
    }
    return { loading, run };
  };

  return {
    loading,
    run,
  };
}

function deBounce(fn: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
      timeout = null;
    }, delay);
  };
}

function throttle(fn: Function, delay: number) {
  let lastTime: number = 0;
  return function (this: any, ...args: any[]) {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
