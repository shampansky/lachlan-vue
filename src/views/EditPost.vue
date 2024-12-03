<script setup lang="ts">
import PostWriter from '@/components/PostWriter.vue'
import { useRoute, useRouter } from 'vue-router'
import { usePosts } from '@/stores/posts'
import type { Post } from '@/posts'

const route = useRoute()
const postsStore = usePosts()
const router = useRouter()

const id = route.params.id as string
const post = postsStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}

const handleSubmit = async (post: Post) => {
  await postsStore.updatePost(post)
  await router.push('/')
}
</script>

<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
