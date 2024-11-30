import { defineStore } from 'pinia'
import type { Post, TimeLinePost } from '@/posts'
import type { Period } from '@/constants'
import { DateTime } from 'luxon'

interface PostState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500))
}

export const usePosts = defineStore('posts', {
  state: (): PostState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: 'Today',
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    },

    createPost(post: Post) {
      const body = JSON.stringify(post)
      return window.fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
    },

    async fetchPosts() {
      const res = await window.fetch('/api/posts')
      const data = (await res.json()) as Post[]
      await delay()

      const ids: string[] = []
      const all = new Map<string, Post>()
      for (const post of data) {
        ids.push(post.id)
        all.set(post.id, post)
      }

      this.ids = ids
      this.all = all
    },
  },

  getters: {
    filteredPosts: (state): TimeLinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id)
          if (!post) {
            throw Error(`Post with id of ${id} was expected but not found`)
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          }
        })
        .filter((post) => {
          if (state.selectedPeriod === 'Today') {
            return post.created >= DateTime.now().minus({ day: 1 })
          }
          if (state.selectedPeriod === 'This Week') {
            return post.created >= DateTime.now().minus({ week: 1 })
          }
          return post
        })
    },
  },
})
