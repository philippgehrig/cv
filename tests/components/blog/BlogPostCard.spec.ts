import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BlogPostCard from '../../../components/blog/BlogPostCard.vue'

// Sample blog post data for testing
const mockPost = {
  title: 'Test Blog Post',
  description: 'This is a test blog post description',
  date: '2025-04-17T08:00:00.000Z',
  tags: ['test', 'vue', 'nuxt'],
  path: '/blog/posts/test-post',
  slug: 'test-post'
}

describe('BlogPostCard', () => {
  it('renders the post title correctly', () => {
    const wrapper = mount(BlogPostCard, {
      props: {
        post: mockPost
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe(mockPost.title)
  })
  
  it('renders the post description correctly', () => {
    const wrapper = mount(BlogPostCard, {
      props: {
        post: mockPost
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const description = wrapper.find('p')
    expect(description.exists()).toBe(true)
    expect(description.text()).toBe(mockPost.description)
  })
  
  it('renders the formatted date correctly', () => {
    const wrapper = mount(BlogPostCard, {
      props: {
        post: mockPost
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Date should be formatted as "April 17, 2025"
    const dateElement = wrapper.find('.text-sm.text-apple-gray-500')
    expect(dateElement.exists()).toBe(true)
    expect(dateElement.text()).toBe('April 17, 2025')
  })
  
  it('renders all tags correctly', () => {
    const wrapper = mount(BlogPostCard, {
      props: {
        post: mockPost
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Find all tag links
    const tagLinks = wrapper.findAll('.rounded-full')
    
    // Check number of tags
    expect(tagLinks.length).toBe(mockPost.tags.length)
    
    // Check tag content
    mockPost.tags.forEach((tag, index) => {
      expect(tagLinks[index].text()).toBe(`#${tag}`)
    })
  })
  
  it('does not render tags section when post has no tags', () => {
    const postWithoutTags = { ...mockPost, tags: [] }
    const wrapper = mount(BlogPostCard, {
      props: {
        post: postWithoutTags
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Tags container should not exist
    const tagsContainer = wrapper.find('.mt-6.flex.flex-wrap')
    expect(tagsContainer.exists()).toBe(false)
  })
  
  it('links to the correct post path', () => {
    const wrapper = mount(BlogPostCard, {
      props: {
        post: mockPost
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Main link should have the correct href
    const mainLink = wrapper.find('a').attributes('href')
    expect(mainLink).toBe(mockPost.path)
  })
  
  it('has a working read more link', () => {
    const wrapper = mount(BlogPostCard, {
      props: {
        post: mockPost
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Read more text should be present
    const readMoreSection = wrapper.find('.flex.items-center.text-apple-blue')
    expect(readMoreSection.exists()).toBe(true)
    expect(readMoreSection.text()).toContain('Read more')
    
    // The link should have the correct href
    const readMoreLink = readMoreSection.find('a')
    expect(readMoreLink.attributes('href')).toBe(mockPost.path)
  })
  
  it('handles missing date gracefully', () => {
    const postWithoutDate = { ...mockPost, date: undefined }
    const wrapper = mount(BlogPostCard, {
      props: {
        post: postWithoutDate
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const dateElement = wrapper.find('.text-sm.text-apple-gray-500')
    expect(dateElement.text()).toBe('')
  })
})