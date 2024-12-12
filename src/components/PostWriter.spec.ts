import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import type { Pinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import PostWriter from '@/components/PostWriter.vue'
import { routes } from '@/router'
import { useUsers } from '@/stores/users'

describe('PostWriter', () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    const users = useUsers()
    users.currentUserId = '1'
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  it('Writes a post using markdown', () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve) => {
      const wrapper = mount(PostWriter, {
        global: {
          plugins: [pinia, router],
        },
        props: {
          post: {
            id: '1',
            title: '',
            authorId: '1',
            created: '',
            markdown: '',
            html: '',
          },
        },
      })

      wrapper.find<HTMLDivElement>('#contenteditable').element.innerText = '# Title'

      await wrapper.find('#contenteditable').trigger('input')

      setTimeout(async () => {
        await wrapper.find('#submit').trigger('click')
        console.log(wrapper.html())
        console.log(wrapper.emitted().submit[0])
        expect(wrapper.emitted().submit[0]).toMatchInlineSnapshot(`
          [
            {
              "authorId": "1",
              "created": "",
              "html": "<h1>Title</h1>
          ",
              "id": "1",
              "markdown": "# Title",
              "title": "",
            },
          ]
        `)
        expect(wrapper.emitted().submit[0]).toEqual([
          {
            id: '1',
            title: '',
            authorId: '1',
            created: '',
            markdown: '# Title',
            html: '<h1>Title</h1>\n',
          },
        ])
        resolve()
      }, 300)
    })
  })
})
