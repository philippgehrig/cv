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
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
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
    // We need to mock the scroll event handler directly
    vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
      if (event === 'scroll' as string) {
        // Immediately invoke the handler to simulate scrolling
        (handler as EventListener)(new Event('scroll'))
      }
    })
    
    // Reset scrollY for this test
    Object.defineProperty(window, 'scrollY', { value: 20, configurable: true })
    
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
    
    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick() // Double nextTick for stability
    
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