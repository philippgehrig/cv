import { describe, it, expect, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent } from 'vue'

// Import needs to happen first, before mocking
import WelcomeBlogPost from '../../pages/blog/posts/welcome-to-my-blog.vue'

// Create a mock component for BlogPostLayout - this is done after import
const BlogPostLayoutStub = {
  template: '<div class="blog-post-layout-mock"><slot /></div>',
  props: ['post']
}

describe('Welcome Blog Post Page', () => {
  it('renders the blog post with correct structure', () => {
    const wrapper = mount(WelcomeBlogPost, {
      global: {
        stubs: {
          BlogPostLayout: BlogPostLayoutStub
        }
      }
    })
    
    // Check that the blog post content is rendered
    expect(wrapper.html()).toContain('Welcome to My Blog')
    expect(wrapper.html()).toContain("I'm Philipp Gehrig")
  })

  it('passes correct post metadata to layout component', () => {
    const wrapper = shallowMount(WelcomeBlogPost, {
      global: {
        stubs: {
          BlogPostLayout: BlogPostLayoutStub
        }
      }
    })
    
    // Get the post prop data from the component instance
    const vm = wrapper.vm as any
    
    expect(vm.post).toBeDefined()
    expect(vm.post.title).toBe('Welcome to My Blog')
    expect(vm.post.description).toBe('An introduction to my blog, what to expect, and the topics I\'ll be covering')
    expect(vm.post.date).toBe('2025-04-17T08:00:00.000Z')
    expect(vm.post.tags).toEqual(['introduction', 'personal', 'blog', 'career'])
  })

  it('contains sections about professional journey', () => {
    const wrapper = mount(WelcomeBlogPost, {
      global: {
        stubs: {
          BlogPostLayout: BlogPostLayoutStub
        }
      }
    })
    
    const content = wrapper.html()
    
    expect(content).toContain('My Professional Journey')
    expect(content).toContain('DHBW')
    expect(content).toContain('Mercedes-Benz')
    expect(content).toContain('Computational Fluid Dynamics (CFD)')
  })

  it('contains information about blog topics', () => {
    const wrapper = mount(WelcomeBlogPost, {
      global: {
        stubs: {
          BlogPostLayout: BlogPostLayoutStub
        }
      }
    })
    
    const content = wrapper.html()
    
    expect(content).toContain('What to Expect From This Blog')
    expect(content).toContain('Engineering Insights')
    expect(content).toContain('Web Development')
    expect(content).toContain('Professional Growth')
  })
})