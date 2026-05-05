<template>
    <div class="mini-game-container">
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.mini-game-container {
    display: grid;
    justify-content: center;
    padding: 40px;
    grid-template-rows: auto auto auto auto auto;
    grid-template-columns: auto auto;
}

.mini-game-container > .mini-game-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-decoration: none;
    color: black;
    font-size: 20px;
    font-weight: bold;
}

img {
    width: 200px;
    height: 150px
}
</style>