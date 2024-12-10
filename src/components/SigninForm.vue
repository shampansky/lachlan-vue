<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from '@/composables/modal'
import { useUsers } from '@/stores/users'
import type { NewUser } from '@/users'
import UserForm from './UserForm.vue'

const usersStore = useUsers()
const modal = useModal()
const error = ref('')

async function handleSignin(newUser: NewUser) {
  const body = JSON.stringify(newUser)
  const res = await window.fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  if ([401, 404].includes(res.status)) {
    error.value = 'Username or password was incorrect'
  } else {
    await usersStore.authenticate()
    modal.hideModal()
  }
}
</script>

<template>
  <UserForm id="signin-form" @submit="handleSignin" :error="error" />
</template>
