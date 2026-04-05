<template>
  <ElAvatar
    :src="currentSrc"
    :alt="props.alt"
    :size="props.size"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElAvatar } from 'element-plus';
import defaultAvatar from '@/assets/default_avatar.png';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '头像',
  },
  size: {
    type: [Number],
    default: 'small',
  },
});

const currentSrc = ref(defaultAvatar);

function handleError() {
  currentSrc.value = defaultAvatar;
  return false;
}

onMounted(() => {
  currentSrc.value = props.src;
});
</script>

<style scoped>
:deep(.el-avatar img) {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}
</style>