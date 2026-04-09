<template>
  <section id="center">
    <div class="title-container">
      <h1 v-html="coloredText"></h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const fullTitle = '分享技术、思考与生活点滴。'
const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']

const currentText = ref('')
const index = ref(0)
const isDeleting = ref(false)

const coloredText = computed(() => {
  return currentText.value
    .split('')
    .map((char, i) => {
      const color = colors[i % colors.length]
      return `<span style="color:${color}">${char}</span>`
    })
    .join('')
})

onMounted(() => {
  setInterval(() => {
    if (!isDeleting.value) {
      currentText.value = fullTitle.slice(0, index.value + 1)
      index.value++

      if (index.value === fullTitle.length) {
        isDeleting.value = true
        setTimeout(() => {}, 800) // 停顿
      }
    } else {
      currentText.value = fullTitle.slice(0, index.value - 1)
      index.value--

      if (index.value === 0) {
        isDeleting.value = false
      }
    }
  }, isDeleting.value ? 80 : 150)
})
</script>

<style scoped>
#center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-container {
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  line-height: 1.4;
}
</style>