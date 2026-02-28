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

    // Check navigation items exist - the component has anchor links: About, Experience, Education, Contact
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('Experience')
    expect(wrapper.text()).toContain('Education')
    expect(wrapper.text()).toContain('Contact')
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

    // Initially the mobile menu should be closed (v-if="mobileOpen" is false, so the dropdown is not rendered)
    expect(wrapper.find('.md\\:hidden.bg-dark-800\\/95').exists()).toBe(false)

    // Click the mobile menu button
    await wrapper.find('button').trigger('click')

    // Now the mobile menu should be open (v-if="mobileOpen" is true)
    expect(wrapper.find('.md\\:hidden.bg-dark-800\\/95').exists()).toBe(true)

    // Click again to close
    await wrapper.find('button').trigger('click')

    // Menu should be closed again
    expect(wrapper.find('.md\\:hidden.bg-dark-800\\/95').exists()).toBe(false)
  })

  it('updates scroll state when scrolled', async () => {
    // We need to mock the scroll event handler directly
    let scrollHandler: Function | null = null
    vi.spyOn(window, 'addEventListener').mockImplementation((event: string, handler: any) => {
      if (event === 'scroll') {
        scrollHandler = handler
      }
    })
    
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
    
    // Simulate scrolling past the threshold (scrolled = scrollY > 16)
    Object.defineProperty(window, 'scrollY', { value: 20, configurable: true })
    if (scrollHandler) {
      scrollHandler()
    }
    
    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick()
    
    // When scrolled, the header gets these classes: bg-dark-900/90, backdrop-blur-xl, border-b, border-white/5
    const header = wrapper.find('header')
    expect(header.classes()).toContain('bg-dark-900/90')
    expect(header.classes()).toContain('backdrop-blur-xl')
  })

  it('adds event listeners on mount and removes on unmount', () => {
    const wrapper = mount(Navbar)
    
    // Check that addEventListener was called for scroll with passive option
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    
    // Unmount the component
    wrapper.unmount()
    
    // Check that removeEventListener was called for scroll
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
