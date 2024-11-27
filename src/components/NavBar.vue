<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { useUsers } from '@/stores/users'
import SignupForm from '@/components/SignupForm.vue'

const userStore = useUsers()
const modal = useModal()
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="userStore.currentUserId" class="buttons">
        <RouterLink to="/posts/new" class="button"> New Post </RouterLink>
        <button class="button" @click="modal.showModal">Log Out</button>
      </div>

      <div v-else class="buttons">
        <button class="button" @click="modal.showModal">Sign Up</button>
        <RouterLink to="/posts/new" class="button"> Sign In </RouterLink>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <SignupForm />
  </Teleport>
</template>
