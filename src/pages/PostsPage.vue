<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPosts, type PostMeta } from '@/posts/posts';

const posts = ref<PostMeta[]>([]);

onMounted(async () => {
  posts.value = await getPosts();
});
</script>

<template>
  <section class="posts-list">
    <ul>
      <li v-for="post in posts" :key="post.slug" class="post-card">
        <a :href="post.url" class="post-title">
          {{ post.title }}
        </a>
        <p class="post-meta">{{ post.date }}</p>
        <p class="post-excerpt">{{ post.excerpt }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.posts-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
}

.list-header h1 {
  margin: 0;
  font-size: 2rem;
}

.list-header p {
  margin: 8px 0 24px;
  color: var(--text);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.post-card {
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 18px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.post-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
}

.post-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-h);
  text-decoration: none;
}

.post-title:hover {
  color: var(--accent);
}

.post-meta {
  margin: 10px 0 0;
  color: var(--text);
  font-size: 0.95rem;
}

.post-excerpt {
  margin: 12px 0 0;
  color: var(--text);
  line-height: 1.8;
}
</style>