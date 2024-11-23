<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FormInput from '@/components/FormInput.vue'
import { computed, ref } from 'vue'
import { useModal } from '@/composables/modal'

const username = ref('')

const modal = useModal()

const modalStyle = computed(() => {
  return { display: modal.show.value ? 'block' : 'none' }
})
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
      <FormInput name="Username" v-model="username" />
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>
