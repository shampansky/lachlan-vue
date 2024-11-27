import { defineStore } from 'pinia'
import type { NewUser } from '@/users'

interface UserState {
  currentUserId?: string
}

export const useUsers = defineStore('users', {
  state: (): UserState => ({
    currentUserId: undefined,
  }),

  actions: {
    async authenticate() {
      const res = await window.fetch('/api/current-user', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        return res.statusText
      }
      const result = await res.json()
      this.currentUserId = result.id
    },

    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser)
      await window.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      return this.authenticate()
    },
  },
})
