<template>
  <div class="root-user-info">
    <Avatar class="user-avatar" :src="avatarSrc" alt="用户头像" :size="80" />
    <div class="user-info">
      <span class="user-name">一只迷路的77</span>
      <div class="user-contact-info">
        <a class="user-github-url" href="https://github.com/milude77" target="_blank" rel="noopener noreferrer">
          <Icon icon="mdi:github" width="24" height="24" />
        </a>
        <a class="user-bilibili-url" href="https://space.bilibili.com/1788933807" target="_blank"
          rel="noopener noreferrer">
          <Icon icon="simple-icons:bilibili" width="24" height="24" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '../components/Avatar.vue'
import { Icon } from '@iconify/vue'
const avatarSrc = new URL('@/assets/milude77Avatar.jpg', import.meta.url).href

</script>

<style scoped>
.root-user-info {
  background-color: rgba(0, 0, 0, 0.3);
  color: var(--text);
  margin: 0;
  padding-top: 0;
  width: 15em;
  height: 8em;
  display: grid;
  text-overflow: clip;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.user-info {
  display: grid;
  grid-template-rows: auto 1fr;
}

.user-contact-info {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
}
</style>