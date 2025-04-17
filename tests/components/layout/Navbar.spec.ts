import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../../../components/layout/Navbar.vue'

// Mock vue-router
vi.mock('vue-router', () => ({
  useRoute: () => ({
    path: '/',
    fullPath: '/',
    matched: []
  })
}))

describe('Navbar', () => {
  beforeEach(() => {
    // Reset jsdom to clear any previous state
    document.body.innerHTML = ''
    
    // Mock window methods
    window.scrollY = 0
    window.addEventListener = vi.fn()
    window.removeEventListener = vi.fn()
  })

  it('renders the site title/logo', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Philipp Gehrig')
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
  })

  it('renders all navigation items', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    // Check both main navigation items exist
    expect(wrapper.find('a[href="/blog"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Blog')
    expect(wrapper.text()).toContain('Home')
  })

  it('toggles mobile menu when button is clicked', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    // Initially the mobile menu should be closed (invisible)
    expect(wrapper.find('.invisible').exists()).toBe(true)
    expect(wrapper.find('.visible').exists()).toBe(false)

    // Click the mobile menu button
    await wrapper.find('button').trigger('click')

    // Now the mobile menu should be open (visible)
    expect(wrapper.find('.invisible').exists()).toBe(false)
    expect(wrapper.find('.visible').exists()).toBe(true)

    // Click again to close
    await wrapper.find('button').trigger('click')

    // Menu should be closed again
    expect(wrapper.find('.invisible').exists()).toBe(true)
    expect(wrapper.find('.visible').exists()).toBe(false)
  })

  it('updates scroll state when scrolled', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'NuxtLink': {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })

    // Initially there should be no shadow
    expect(wrapper.find('.shadow-apple').exists()).toBe(false)

    // Set window.scrollY and call the handleScroll method directly
    window.scrollY = 20
    await wrapper.vm.handleScroll()
    
    // Now it should have the shadow class
    expect(wrapper.find('.shadow-apple').exists()).toBe(true)
  })

  it('adds event listeners on mount and removes on unmount', () => {
    const wrapper = mount(Navbar)
    
    // Check that addEventListener was called for scroll
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    
    // Unmount the component
    wrapper.unmount()
    
    // Check that removeEventListener was called for scroll
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})