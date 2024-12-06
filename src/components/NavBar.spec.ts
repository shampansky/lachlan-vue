import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import NavBar from '@/components/NavBar.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '@/router'

describe('NavBar', () => {
  it.only('renders', async () => {
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    const pinia = createPinia()
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    mount(NavBar, {
      global: {
        plugins: [pinia, router],
      },
    })
  })
})
