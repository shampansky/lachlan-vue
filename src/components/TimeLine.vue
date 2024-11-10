<script setup lang="ts">
import { ref, computed } from 'vue'
import { TimeLinePost } from '@/posts'
import { DateTime } from 'luxon'
import TimeLineItem from './TimeLineItem.vue'
import { usePosts } from '@/stores/posts'

const postsStore = usePosts()

const periods = ['Today', 'This Week', 'This Month'] as const
type Period = (typeof periods)[number]

const selectedPeriod = ref<Period>(periods[0])

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed<TimeLinePost[]>(() => {
  return postsStore.ids
    .map((id) => {
      const post = postsStore.all.get(id)
      if (!post) {
        throw Error(`Post with id of ${id} was expected but not found`)
      }
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      }
    })
    .filter((post) => {
      if (selectedPeriod.value === 'Today') {
        return post.created >= DateTime.now().minus({ day: 1 })
      }
      if (selectedPeriod.value === 'This Week') {
        return post.created >= DateTime.now().minus({ week: 1 })
      }
      return post
    })
})
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <TimeLineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>
