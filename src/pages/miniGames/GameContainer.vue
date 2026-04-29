<template>
    <component :is="currentGame" />
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import NotFoundPage from '@/pages/NotFoundPage.vue'

const gameMap: Record<string, any> = {
  dodgeBall: defineAsyncComponent(() =>
    import('@/pages/miniGames/DodgeBall/main.vue')
  ),
  lassoingGeese: defineAsyncComponent(() =>
    import('@/pages/miniGames/LassoingGeese/main.vue')
  ),
}

const route = useRoute();
const currentGame = computed(() => {
    const gameName = route.params.gameName as string;
    return gameMap[gameName] || NotFoundPage;
});

</script>

<style scoped>

</style>