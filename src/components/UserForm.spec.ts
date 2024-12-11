import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import type { Pinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import UserForm from '@/components/UserForm.vue'
import { routes } from '@/router'

describe('UserForm', () => {
  let pinia: Pinia
  let router: Router

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
  })

  it('Runs through the workflow', async () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [pinia, router],
      },
    })

    const btn = wrapper.find('button')
    expect(btn.element.disabled).toBe(true)

    expect(wrapper.find('[data-testid="username"]').find('.is-danger').text()).toBe(
      'This field is required'
    )
    expect(wrapper.find('[data-testid="password"]').find('.is-danger').text()).toBe(
      'This field is required'
    )

    await wrapper.find('#Username').setValue('user')
    await wrapper.find('#Password').setValue('password')
    expect(wrapper.find('[data-testid="username"]').find('.is-danger').text()).toBe(
      'This field must bo between 5 and 10'
    )
    expect(wrapper.find('[data-testid="password"]').find('.is-danger').text()).toBe(
      'This field must bo between 10 and 40'
    )

    await wrapper.find('#Username').setValue('username')
    await wrapper.find('#Password').setValue('password123')
    expect(wrapper.find('[data-testid="username"]').find('.is-danger').exists()).toBe(false)
    expect(wrapper.find('[data-testid="password"]').find('.is-danger').exists()).toBe(false)

    expect(btn.element.disabled).toBe(false)

    await wrapper.find('.form').trigger('submit.prevent')

    expect(wrapper.emitted().submit[0]).toEqual([
      {
        username: 'username',
        password: 'password123',
      },
    ])

    console.log(wrapper.html())
    console.log(wrapper.emitted().submit[0])
  })
})
