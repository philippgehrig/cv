import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../../../components/layout/Navbar.vue'

const mountNavbar = () => mount(Navbar, {
  global: {
    stubs: {
      NuxtLink: {
        template: '<a :href="to"><slot /></a>',
        props: ['to']
      }
    }
  }
})

describe('Navbar', () => {
  it('renders the site name and decorative monogram', () => {
    const wrapper = mountNavbar()

    expect(wrapper.get('a[href="/"]').text()).toContain('Philipp Gehrig')
    expect(wrapper.get('.monogram').attributes('aria-hidden')).toBe('true')
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Main navigation')
  })

  it('uses home-qualified anchors that also work from policy pages', () => {
    const wrapper = mountNavbar()

    expect(wrapper.get('a[href="/#work"]').text()).toBe('My work')
    expect(wrapper.get('a[href="/#contact"]').text()).toContain('Say hello')
  })

  it('keeps the contact link available without a JavaScript menu', () => {
    const wrapper = mountNavbar()

    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.get('.nav-contact').attributes('href')).toBe('/#contact')
  })
})
