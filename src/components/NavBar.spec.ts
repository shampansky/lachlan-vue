import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import NavBar from '@/components/NavBar.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from '@/router'
import { useUsers } from '@/stores/users'

describe('NavBar', () => {
  it('Renders signin and signup buttons when not authenticated', async () => {
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    const pinia = createPinia()
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router],
      },
    })

    expect(wrapper.find('#sign-up').exists()).toBe(true)
    expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true)

    console.log(wrapper.html())
  })

  it.only('Renders new post and logout buttons when authenticated', async () => {
    const el = document.createElement('div')
    el.id = 'modal'
    document.body.appendChild(el)

    const pinia = createPinia()
    setActivePinia(pinia)
    const users = useUsers()
    users.currentUserId = '2'
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    const wrapper = mount(NavBar, {
      global: {
        plugins: [pinia, router],
      },
    })

    expect(wrapper.find('a').text()).toBe('New Post')
    expect(wrapper.find('button').text()).toBe('Log Out')

    console.log(wrapper.html())
  })
})
