<template>
    <component :is="currentGame" />
</template>

<script setup lang="ts">

import { computed } from 'vue'
import { useRoute } from 'vue-router';
import NotFoundPage from '@/pages/NotFoundPage.vue'

const gameMap: Record<string, any> = {

}

const route = useRoute();
const currentGame = computed(() => {
    const gameName = route.params.gameName as string;
    return gameMap[gameName] || NotFoundPage;
});

</script>

<style scoped></style>