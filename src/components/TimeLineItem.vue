<script setup lang="ts">
import type { TimeLinePost } from '@/posts'

defineProps<{
  post: TimeLinePost
}>()
</script>

<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <span>{{ post.title }}</span>
    <div>{{ post.created.toFormat('d MMM') }}</div>
  </RouterLink>
</template>
