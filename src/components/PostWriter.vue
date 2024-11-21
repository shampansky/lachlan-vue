<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import type { TimeLinePost } from '@/posts'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { debounce } from 'lodash'
import { usePosts } from '@/stores/posts'

const props = defineProps<{ post: TimeLinePost }>()

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

const posts = usePosts();

function handleInput() {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value?.innerText
}

function handleClick() {
  const newPost: TimeLinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value as string,
  };
  posts.createPost(newPost);
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
      <div contenteditable="true" ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button
        class="button is-primary is-pulled-right"
        @click="handleClick"
      >
        Save Post
      </button>
    </div>
  </div>
</template>
