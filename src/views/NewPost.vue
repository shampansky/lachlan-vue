<script setup lang="ts">
import { DateTime } from 'luxon'
import PostWriter from '../components/PostWriter.vue'
import type { TimeLinePost } from '@/posts'

const post: TimeLinePost = {
  id: '-1',
  title: 'Title',
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>',
}
</script>

<template>
  <PostWriter :post="post" />
</template>
