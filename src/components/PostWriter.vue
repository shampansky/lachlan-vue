<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import type { TimeLinePost, Post } from '@/posts'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { debounce } from 'lodash'
import { useUsers } from '@/stores/users'

const props = defineProps<{ post: TimeLinePost | Post }>()

const emit = defineEmits<{
  (event: 'submit', post: Post): void
}>()

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
)
const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html: Ref<string | Promise<string>> = ref('')
const contentEditable = ref<HTMLDivElement>()

const usersStore = useUsers()

function handleInput() {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  console.log(contentEditable.value?.innerText)
  content.value = contentEditable.value?.innerText
}

async function handleSavePost() {
  if (!usersStore.currentUserId) {
    throw Error('User was not found')
  }
  const newPost: Post = {
    ...props.post,
    created:
      typeof props.post.created === 'string'
        ? props.post.created
        : props.post.created.toISO() || '',
    title: title.value,
    authorId: usersStore.currentUserId,
    markdown: content.value,
    html: html.value as string,
  }
  emit('submit', newPost)
}

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})

watch(
  content,
  debounce((newContent) => {
    html.value = marked.parse(newContent)
  }, 150),
  { immediate: true }
)
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
      <div id="contenteditable" contenteditable="true" ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button id="submit" class="button is-primary is-pulled-right" @click="handleSavePost">
        Save Post
      </button>
    </div>
  </div>
</template>
