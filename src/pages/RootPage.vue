<template>
  <section id="center">

    <!-- 标题 -->
    <div class="title-container">
      <h1 v-html="coloredText"></h1>
    </div>

    <div class="web-info">
      <span>此网页使用vue+ts构建</span>
    </div>

    <!-- 舞台区域 -->
    <div class="stage">

      <!-- Vue 图标 -->
      <img class="vue-icon" :class="{ active: mode === 'vue', dim: mode === 'ts' }" @click="handleIconClick('vue')"
        :src="vueIcon" title="点击查看 Vue 能力" alt="vue图标" />

      <!-- TS 图标 -->
      <img class="ts-icon" :class="{ active: mode === 'ts', dim: mode === 'vue' }" @click="handleIconClick('ts')"
        :src="tsIcon" title="TypeScript" alt="ts图标" />

      <!-- Vue 展示面板 -->
      <div class="panel vue-panel" v-if="mode == 'vue'">
        <h2 v-if="mode == 'vue'">Vue 核心特性</h2>

        <ul>
          <li v-for="(item, i) in vueFeatures" :key="i" :style="{ animationDelay: i * 0.15 + 's' }">
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- TS 展示面板 -->
      <div class="panel ts-panel" v-if="mode == 'ts'">
        <h2 v-if="mode == 'ts'">TypeScript 核心特性</h2>

        <ul>
          <li v-for="(item, i) in tsFeatures" :key="i" :style="{ animationDelay: i * 0.15 + 's' }">
            {{ item }}
          </li>
        </ul>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import vueIcon from "@/assets/images/vue.png"
import tsIcon from "@/assets/images/typeScript.png"

type Mode = 'idle' | 'vue' | 'ts'

const mode = ref<Mode>('idle')

const vueFeatures = [
  '响应式系统（Reactive Data Binding）',
  '组件化开发（Component-Based Architecture）',
  '双向绑定（v-model）',
  '虚拟 DOM（Virtual DOM Diff）',
  '组合式 API（Composition API）'
]

const tsFeatures = [
  '静态类型检查（Static Type Checking）',
  '接口和类型别名（Interfaces & Type Aliases）',
  '泛型（Generics）',
  '装饰器（Decorators）',
  '命名空间（Namespaces）'
]

const handleIconClick = (icon: 'vue' | 'ts') => {
  if (icon === 'vue') {
    mode.value = mode.value === 'vue' ? 'idle' : 'vue'
  } else if (icon === 'ts') {
    mode.value = mode.value === 'ts' ? 'idle' : 'ts'
  }
}

/* =======================
   打字 + 彩虹标题
======================= */

const fullTitle = '分享技术、思考与生活点滴。'

const colors = [
  '#ff0000', '#ff7f00', '#ffff00',
  '#00ff00', '#0000ff', '#4b0082', '#9400d3'
]

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
      }
    } else {
      currentText.value = fullTitle.slice(0, index.value - 1)
      index.value--

      if (index.value === 0) {
        isDeleting.value = false
      }
    }
  }, 120)
})
</script>

<style scoped>
/* =======================
   布局
======================= */

#center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-container {
  text-align: center;
  height: 100px;
}

h1 {
  font-size: 2.5rem;
  line-height: 1.4;
}

/* =======================
   舞台区域
======================= */

.stage {
  width: 100%;
  height: 320px;
  margin-top: 40px;
}

/* =======================
   图标
======================= */

.vue-icon,
.ts-icon {
  width: 5em;
  height: 5em;
  cursor: pointer;
  transform: translateY(-50%);
  transition: all 0.8s ease;
}

/* Vue 默认居中 */
.vue-icon {
  position: absolute;
  left: 40%;
  transform: translate(0%, -25%);
}

/* 点击后移动到左侧 */
.vue-icon.active {
  position: absolute;
  left: 10%;
  filter: drop-shadow(0 0 20px #42b883);
  animation: rotate 3s linear infinite;
}

.ts-icon {
  position: absolute;
  right: 40%;
  transform: translate(0%, -25%);
}

.ts-icon.active {
  position: absolute;
  right: 10%;
  filter: drop-shadow(0 0 20px #17878f);
  animation: rotate 3s linear infinite;
}

/* Vue激活后 TS 变暗 */
.ts-icon.dim,
.vue-icon.dim {
  opacity: 0.25;
}

.panel {
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
}

.vue-panel {
  left: 15%;
}

.ts-panel {
  right: 25%;
}


.vue-panel h2 {
  margin-bottom: 10px;
}

/* 列表动画 */
.ts-panel li,
.vue-panel li {
  list-style: none;
  margin: 8px 0;
  opacity: 0;
  transform: translateX(20px);
  animation: fadeIn 0.6s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.vue-icon,
.ts-icon {
  animation: glow 3s ease-in-out infinite;
}

/* Vue */
.vue-icon {
  --glow-color: var(--vue-color);
}

/* TS */
.ts-icon {
  --glow-color: var(--ts-color);
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 6px var(--glow-color));
  }

  50% {
    filter: drop-shadow(0 0 18px var(--glow-color));
  }

  100% {
    filter: drop-shadow(0 0 6px var(--glow-color));
  }
}

@keyframes rotate{
  0% {
    transform: translate(-50%, -50%) scale(1.15) rotateY(0deg);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.15) rotateY(360deg);
  }
}

@media (max-width: 768px) {
  .vue-icon,
  .ts-icon {
    width: 2.5em;
    height: 2.5em;
  }

  .vue-panel,
  .ts-panel {
    top: auto;
    transform: translateY(0);
  }

  .vue-panel {
    left: 50%;
    transform: translate(-50%, 0);
  }

  .ts-panel {
    right: 50%;
    transform: translate(50%, 0);
  }
}
</style>