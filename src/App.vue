<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { computed } from 'vue'
import { useModal } from '@/composables/modal'
import { useUsers } from './stores/users'

const modal = useModal()
const userStore = useUsers()

const modalStyle = computed(() => {
  return { display: modal.show.value ? 'block' : 'none' }
})

userStore.authenticate()
</script>

<template>
  <div class="modal" style="color: white" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>

    <button class="modal-close is-large" @click="modal.hideModal"></button>
  </div>
  <div class="section">
    <div class="container">
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>
