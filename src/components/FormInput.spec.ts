import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormInput from '@/components/FormInput.vue'
import { computed, defineComponent, ref } from 'vue'

describe('FormInput', () => {
  it.only('tests validation', async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
        <FormInput name="foo" v-model="formValue" :status="status" type="input" />
      `,
      setup() {
        const formValue = ref('')
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true,
            }
          } else {
            return {
              valid: false,
              message: 'error',
            }
          }
        })

        return {
          formValue,
          status,
        }
      },
    })

    const wrapper = mount(Parent, {})

    console.log(wrapper.html())
    expect(wrapper.find('.is-danger').text()).toBe('error')

    await wrapper.find('input').setValue('foobar')

    expect(wrapper.find('is-danger').exists()).toBe(false)
  })

  it('renders some errors', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: false,
          message: 'error',
        },
        type: 'input',
      },
    })

    expect(wrapper.find('.is-danger').exists()).toBe(true)
  })

  it('renders no errors', () => {
    const wrapper = mount(FormInput, {
      props: {
        name: 'foo',
        modelValue: 'bar',
        status: {
          valid: true,
          message: 'error',
        },
        type: 'input',
      },
    })

    // console.log(wrapper.html())

    expect(wrapper.find('.is-danger').exists()).toBe(false)
  })
})
