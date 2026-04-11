<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElInput, ElButton } from 'element-plus';
import { initSnowBackground } from './assets/rootPageAssets/ts/SnowflakeFallingEffect.ts'

initSnowBackground()

const keyword = ref('');
const sentinel = ref<HTMLElement | null>(null);
const isSticky= ref<boolean>(false)

const handleSearch = () => {
  console.log('搜索内容:', keyword.value);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isSticky.value = !entry.isIntersecting
    },
    {
      threshold: 0
    }
  )

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

</script>

<template>
  <div id="app">
    <div ref="sentinel"></div>

    <header :class="{ stickyActive: isSticky }">
      <div class="header-bar">
        <div class="header-nav-bar">
          <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/posts-list">文章</router-link>
            <router-link to="/mini-game">小游戏</router-link>
            <router-link to="/about">关于作者</router-link>
          </nav>
        </div>
        <div class="header-search-bar">
          <ElInput v-model="keyword" placeholder="请输入关键词" clearable @keyup.enter="handleSearch">
            <template #append>
              <ElButton @click="handleSearch">搜索</ElButton>
            </template>
          </ElInput>
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; {{ new Date().getFullYear() }} 迷路的77的博客. 所有版权归作者所有.</p>
    </footer>
  </div>
</template>

<style scoped>

#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

header {
  position: sticky;
  height: auto;
  width: 100wh;
  padding: 1em 0;
  top: 0;
  transition: background-color 0.3s, backdrop-filter 0.3s;
}

/* sticky 触发后 */
header.stickyActive {
  background-color: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px); 
}

header h1 {
  margin: 0 0 12px;
  font-size: 32px;
}


nav {
  display: flex;
  gap: 24px;
  justify-content: center;
}

/* router-link 默认渲染为 a 标签，因此选择器仍适用 */
nav a {
  color: var(--text);
  text-decoration: none;
}

nav a:hover {
  color: var(--accent);
}

nav a.router-link-exact-active {
  color: var(--accent) !important;
  text-decoration: underline !important;
}

footer {
  padding: 24px 0;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

footer p {
  margin: 4px 0;
}

footer a {
  color: var(--text);
  text-decoration: none;
}

footer a:hover {
  color: var(--accent);
}

.header-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
}

.header-nav-bar {
  display: flex;
  flex: 1;
  justify-content: end;
  transform: translateX(-30%);
}

.header-search-bar {
  display: flex;
  flex: 1;
  max-width: 300px;
  margin: 0 16px;
}



/* 移动端适配 */
@media (max-width: 768px) {
  .header-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px 0;
  }

  .header-nav-bar {
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .header-search-bar {
    width: 100%;
    max-width: none;
    margin: 0 16px;
  }

  nav {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>