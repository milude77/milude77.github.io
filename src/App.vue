<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessage } from 'element-plus';
import { Calendar } from '@element-plus/icons-vue'
import { initSnowBackground } from './assets/rootPageAssets/ts/SnowflakeFallingEffect.ts'
import { login, logout, checkInToday } from './utils/supabase.js'
import Avatar from './components/Avatar.vue'
import { Menu } from '@element-plus/icons-vue' // 导入菜单图标
import { ElDrawer, ElIcon, ElDivider } from 'element-plus'

const drawerVisible = ref(false)

import { useUserStore } from './stores/user'


initSnowBackground()

const sentinel = ref<HTMLElement | null>(null);
const isSticky = ref<boolean>(false)
const checkInLoding = ref<boolean>(false)

const userStore = useUserStore();
const user = computed(() => userStore.user);
const streak = computed(() => userStore.checkInData?.streak || 0);
const isCheckedInToday = computed(() => userStore.isAreadyCheckIn);

const greeting = computed(() => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 9) return '早上好';
  if (currentHour >= 9 && currentHour < 12) return '上午好';
  if (currentHour >= 12 && currentHour < 14) return '中午好';
  if (currentHour >= 14 && currentHour < 18) return '下午好';
  return '晚上好';
});

onMounted(() => {

  userStore.init();

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



const isShow = ref(true)


const handleCheckInToday = async () => {
  if (checkInLoding.value) return;
  checkInLoding.value = true;
  const { updatedStreak, error } = await checkInToday()
  if (error) {
    if (updatedStreak) {
      ElMessage.success(`今日已完成打卡, 已连续打卡 ${updatedStreak} 天`)
    }
    else {
      ElMessage.error(error.message)
    }
  }
  else {
    ElMessage.success(`打卡成功， 已连续打卡 ${updatedStreak} 天`)
  }
  checkInLoding.value = false;
}

watch(checkInLoding, () => {
  if (checkInLoding.value) {
    ElMessage.info('打卡中...')
  }
})

</script>

<template>
  <div id="app">
    <div ref="sentinel"></div>

    <header v-if="isShow" :class="{ stickyActive: isSticky }">
      <div class="header-bar">
        <div class="mobile-menu-btn" @click="drawerVisible = true">
          <el-icon :size="24">
            <Menu />
          </el-icon>
        </div>
        <div class="header-nav-bar">
          <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/posts-list">文章</router-link>
            <router-link to="/notepad">记事本</router-link>
            <router-link to="/about">关于作者</router-link>
          </nav>
        </div>
        <div class="header-right-desktop">
          <div class="header-login-bar" v-if="!user">
            <ElButton type="primary" @click="login">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                </svg>
              </template>
              GitHub 登录
            </ElButton>
          </div>
          <div v-else class="user-info">
            <el-button v-if="!isCheckedInToday" @click="handleCheckInToday" class="check-in-today"
              :icon="Calendar"></el-button>
            <el-button v-else :icon="Calendar" class="check-in-today-completed"">{{ streak }}</el-button>
          <span class=" greeting-text">{{ greeting }}, </span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <span></span>
                  <Avatar :size="32" :src="user.user_metadata.avatar_url" alt="用户头像" />
                  <span class="username">{{ user.user_metadata.full_name || user.user_metadata.user_name }}</span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
          </div>
        </div>
      </div>
    </header>
    <el-drawer v-model="drawerVisible" title="菜单" direction="ltr" size="70%" :with-header="true">
      <div class="mobile-drawer-content">
        <!-- 将用户信息逻辑放入抽屉 -->
        <div v-if="!user" class="drawer-login-section">
          <ElButton type="primary" @click="login" style="width: 100%">GitHub 登录</ElButton>
        </div>
        <div v-else class="drawer-user-section">
          <div class="drawer-user-info">
            <Avatar :size="50" :src="user.user_metadata.avatar_url" />
            <div class="name-box">
              <p class="username">{{ user.user_metadata.full_name || user.user_metadata.user_name }}</p>
              <p class="streak-text">连续打卡 {{ streak }} 天</p>
            </div>
          </div>
          <el-divider />
          <el-button v-if="!isCheckedInToday" @click="handleCheckInToday" type="success" plain>每日打卡</el-button>
          <el-button @click="logout" type="danger" text>退出登录</el-button>
        </div>
      </div>
    </el-drawer>

    <main>
      <router-view />
    </main>

    <footer v-if="isShow">
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

nav a {
  color: var(--text);
  text-decoration: none;
}

nav a:hover {
  color: var(--accent);
}

nav a.router-link-exact-active {
  color: var(--accent);
  text-decoration: underline;
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
}

.header-login-bar,
.user-info {
  position: absolute;
  right: 10px;
  display: flex;
}

.header-nav-bar {
  display: flex;
  flex: 1;
  justify-content: center;
}

.header-login-bar {
  transform: translateX(-30px);
}

.user-info {
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transform: translateX(-30px);
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-primary);
}

.username {
  color: aliceblue;
  font-weight: 500;
}

/* --- 默认状态（PC端） --- */
.mobile-menu-btn {
  display: none;
  /* PC端隐藏菜单按钮 */
  cursor: pointer;
  padding: 0 15px;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
    position: absolute;
    left: 10px;
  }

  /* 隐藏 PC 端的右侧登录条 */
  .header-login-bar,
  .user-info,
  .header-right-desktop {
    display: none !important;
  }

  .header-bar {
    justify-content: center;
    height: 50px;
  }

  .mobile-drawer-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
  }

  .drawer-user-info {
    display: flex;
    align-items: center;
    color: #333;
    gap: 15px;
  }

  .drawer-user-section .username {
    color: #333;
    font-size: 18px;
  }


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

.check-in-today-completed {
  background-color: rgba(174, 248, 174, 0.9);
}
</style>