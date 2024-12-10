import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import type { Pinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import NavBar from '@/components/NavBar.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '@/router'
import { useUsers } from '@/stores/users'
import type { Router } from 'vue-router'

vi.stubGlobal(
  'fetch',
  vi.fn(() => {
    // ...
  })
)

describe('NavBar', () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  it('Renders signin and signup buttons when not authenticated', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router],
      },
    })

    expect(wrapper.find('#sign-up').exists()).toBe(true)
    expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true)

    console.log(wrapper.html())
  })

  it('Renders new post and logout buttons when authenticated', async () => {
    const users = useUsers()
    users.currentUserId = '2'

    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router],
      },
    })

    expect(wrapper.find('a').text()).toBe('New Post')
    expect(wrapper.find('button').text()).toBe('Log Out')
    await wrapper.find('#logout').trigger('click')
    expect(wrapper.find('#sign-up').exists()).toBe(true)
    expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true)

    await wrapper.find('[data-testid="sign-in"]').trigger('click')

    expect(document.body.querySelector('#signin-form')).toBeTruthy()
    // console.log(document.body.outerHTML)
  })
})
