<template>
    <div>
        <router-link class="mini-game-page" to="/miniGame/dodgeBall">
            <img loading="lazy" :src="dodgeBall" alt="题目图">
            躲避球
        </router-link>
    </div>
</template>

<script setup lang="ts">
import dodgeBall from "@/assets/gameImages/dodgeBall.png";

</script>

<style scoped>

.mini-game-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: auto;
    width: 250px;
    height: 220px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    text-decoration: none;
    font-size: 20px;
    color: aliceblue;
}

img {
    width: 200px;
    height: 150px
}

</style>