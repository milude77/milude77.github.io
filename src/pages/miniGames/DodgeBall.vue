```vue
<template>
  <div ref="container" class="game-container">
    <!-- 开始界面 -->
    <div v-if="gameState === 'menu'" class="overlay">
      <h1>3D 跑酷</h1>
      <button @click="startGame">开始游戏</button>
    </div>

    <!-- 结束界面 -->
    <div v-if="gameState === 'gameover'" class="overlay">
      <h1>游戏结束</h1>
      <button @click="restartGame">重新开始</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted } from 'vue'

const container = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer

let player: THREE.Mesh
let obstacles: THREE.Mesh[] = []
let ground: THREE.Mesh

// 游戏状态
const gameState = ref<'menu' | 'playing' | 'gameover'>('menu')

// 跑道系统
const lanes = [-2, 0, 2]
let currentLane = 1

// 游戏参数
let forwardSpeed = 0.25
let frame = 0

onMounted(() => {
  init()
  animate()
})

function startGame() {
  gameState.value = 'playing'
}

function onWindowResize() {
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

function restartGame() {
  obstacles.forEach(o => scene.remove(o))
  obstacles = []

  player.position.x = 0
  currentLane = 1

  forwardSpeed = 0.25
  frame = 0

  gameState.value = 'playing'
}

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111111)

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  window.addEventListener('resize', onWindowResize)

  camera.position.set(0, 2, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  container.value?.appendChild(renderer.domElement)

  // 玩家
  const geo = new THREE.BoxGeometry(0.6, 1, 0.6)
  const mat = new THREE.MeshStandardMaterial({ color: 0x00ffcc })
  player = new THREE.Mesh(geo, mat)
  player.position.y = 0.5
  scene.add(player)

  // 地面
  const groundGeo = new THREE.PlaneGeometry(10, 100)
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x222222 })
  ground = new THREE.Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.position.z = -40
  scene.add(ground)

  // 灯光
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5, 10, 5)
  scene.add(light)

  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambient)

  // 控制
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      currentLane = Math.max(0, currentLane - 1)
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
      currentLane = Math.min(2, currentLane + 1)
    }
  })
}

function spawnObstacle() {
  const geo = new THREE.SphereGeometry(0.5, 16, 16)
  const mat = new THREE.MeshStandardMaterial({ color: 0xff4444 })
  const cube = new THREE.Mesh(geo, mat)

  const laneIndex = Math.floor(Math.random() * 3)

  cube.position.x = lanes[laneIndex]
  cube.position.y = 0.5
  cube.position.z = -50

  scene.add(cube)
  obstacles.push(cube)
}

function animate() {
  requestAnimationFrame(animate)

  if (gameState.value !== 'playing') {
    renderer.render(scene, camera)
    return
  }

  frame++

  // 玩家平滑移动
  player.position.x += (lanes[currentLane] - player.position.x) * 0.2

  // 摄像机跟随
  camera.position.x = player.position.x
  camera.lookAt(player.position)

  // 地面循环
  ground.position.z += forwardSpeed
  if (ground.position.z > 0) {
    ground.position.z = -40
  }

  // 生成障碍
  if (frame % 50 === 0) {
    spawnObstacle()
  }

  // 更新障碍
  obstacles.forEach((obj, index) => {
    obj.position.z += forwardSpeed

    const dx = Math.abs(obj.position.x - player.position.x)
    const dz = Math.abs(obj.position.z - player.position.z)

    // 碰撞
    if (dx < 0.7 && dz < 0.7) {
      gameState.value = 'gameover'
    }

    // 移除
    if (obj.position.z > 5) {
      scene.remove(obj)
      obstacles.splice(index, 1)
    }
  })

  forwardSpeed += 0.0005

  renderer.render(scene, camera)
}
</script>

<style scoped>
.game-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
  z-index: 10;
  color: white;
}

button {
  margin-top: 16px;
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
}
</style>
