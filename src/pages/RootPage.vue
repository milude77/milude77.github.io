<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem('color-scheme', 'dark')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    localStorage.setItem('color-scheme', 'light')
  }
}

onMounted(() => {
  const savedScheme = localStorage.getItem('color-scheme')
  if (savedScheme) {
    isDark.value = savedScheme === 'dark'
    if (savedScheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.add('light')
    }
  } else {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = isSystemDark
  }
})
</script>

<template>
  <section id="center">
    <div>
      <h1>Welcome to My Blog</h1>
      <p>分享技术、思考与生活点滴。</p>
    </div>
    
    <!-- 主题切换按钮 -->
    <button class="counter" @click="toggleDark">
      {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>

    <!-- React 和 Vue 相关文章 -->
    <div class="posts-preview">
      <h2>React & Vue 专题文章</h2>
      <ul>
        <li>
          <a href="#">React 与 Vue：现代前端框架对比指南</a>
          <p>深入比较 React 和 Vue 在响应式原理、生态、学习曲线等方面的异同，帮助你选择适合项目的框架。</p>
        </li>
        <li>
          <a href="#">Vue 3 核心新特性全解析</a>
          <p>从 Composition API 到 Teleport、Suspense，全面解读 Vue 3 带来的开发体验升级与性能优化。</p>
        </li>
        <li>
          <a href="#">如何用 Vite 同时构建 React 和 Vue 应用？</a>
          <p>探索 Vite 的多框架支持能力，实现一个仓库管理多个前端技术栈的高效开发流程。</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.posts-preview {
  margin-top: 32px;
  text-align: left;
  max-width: 600px;
}
.posts-preview h2 {
  margin-bottom: 16px;
}
.posts-preview ul {
  list-style: none;
  padding: 0;
}
.posts-preview li {
  margin: 16px 0;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 16px;
}
.posts-preview a {
  color: var(--text-h);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
}
.posts-preview a:hover {
  text-decoration: underline;
}
.posts-preview p {
  margin-top: 6px;
  font-size: 14px;
  color: var(--text);
  line-height: 1.4;
}
</style>