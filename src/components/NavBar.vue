<script setup lang="ts">
import { useModal } from '@/composables/modal'
import { useUsers } from '@/stores/users'
import { useRouter } from 'vue-router'

const userStore = useUsers()
const modal = useModal()
const router = useRouter()

async function logout() {
  await userStore.logout()
  await router.push({ path: '/' })
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="userStore.currentUserId" class="buttons">
        <RouterLink to="/posts/new" class="button"> New Post </RouterLink>
        <button class="button" @click="logout">Log Out</button>
      </div>

      <div v-else class="buttons">
        <button class="button" @click="modal.showModal('signUp')">Sign Up</button>
        <button class="button" @click="modal.showModal('signIn')">Sign In</button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
