<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TimeLinePost } from '@/posts'

const props = defineProps<{ post: TimeLinePost }>()
const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})

function handleInput() {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value?.innerText
}
</script>

<template>
  <div class="columns">
    <div class="column">
      {{ title }}
      <div class="field">
        <div class="label">Post Title</div>
        <input v-model="title" type="text" class="input" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable="true" ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      {{ content }}
    </div>
  </div>
</template>
