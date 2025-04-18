// filepath: /Users/philippgehrig/Desktop/privat/dev/Web Development/cv/tests/components/blog/ContentListDemo.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed } from 'vue'
import ContentListDemo from '../../../components/blog/ContentListDemo.vue'

// Mock the ContentList component and NuxtLink
describe('ContentListDemo', () => {
  it('renders empty state message when no articles are present', () => {
    const wrapper = mount(ContentListDemo, {
      global: {
        stubs: {
          ContentList: {
            template: '<div><slot :list="[]"></slot></div>',
            props: ['path', 'query']
          },
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Should show empty state message
    expect(wrapper.text()).toContain('No blog posts available yet. Check back soon!')
  })
  
  it('renders articles correctly when provided', async () => {
    // Create a wrapper with the mock ContentList passing articles
    const wrapper = mount(ContentListDemo, {
      global: {
        stubs: {
          ContentList: {
            template: '<div><slot :list="articles"></slot></div>',
            setup() {
              const articles = [
                {
                  _path: '/blog/test-article',
                  title: 'Test Article',
                  date: '2025-04-17T08:00:00.000Z',
                  description: 'This is a test article description'
                },
                {
                  _path: '/blog/another-article',
                  title: 'Another Article',
                  date: '2025-04-16T08:00:00.000Z',
                  description: 'This is another test article'
                }
              ]
              return { articles }
            }
          },
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Check that empty state message is not shown
    expect(wrapper.text()).not.toContain('No blog posts available yet.')
    
    // Check that article titles are rendered
    expect(wrapper.text()).toContain('Test Article')
    expect(wrapper.text()).toContain('Another Article')
    
    // Check descriptions
    expect(wrapper.text()).toContain('This is a test article description')
    expect(wrapper.text()).toContain('This is another test article')
    
    // Check formatted dates
    expect(wrapper.text()).toContain('April 17, 2025')
    expect(wrapper.text()).toContain('April 16, 2025')
    
    // Check "Read more" links
    const readMoreLinks = wrapper.findAll('a.text-apple-blue.hover\\:underline')
    expect(readMoreLinks.length).toBe(2)
    expect(readMoreLinks[0].text()).toBe('Read more')
    expect(readMoreLinks[1].text()).toBe('Read more')
  })
  
  it('formats date correctly', () => {
    const wrapper = mount(ContentListDemo, {
      global: {
        stubs: {
          ContentList: {
            template: '<div><slot :list="articles"></slot></div>',
            setup() {
              const articles = [
                {
                  _path: '/blog/test-article',
                  title: 'Test Article',
                  date: '2025-04-17T08:00:00.000Z',
                  description: 'This is a test article description'
                }
              ]
              return { articles }
            }
          },
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const dateText = wrapper.find('.text-sm.text-apple-gray-500').text()
    expect(dateText).toBe('April 17, 2025')
  })
  
  it('handles missing date gracefully', () => {
    const wrapper = mount(ContentListDemo, {
      global: {
        stubs: {
          ContentList: {
            template: '<div><slot :list="articles"></slot></div>',
            setup() {
              const articles = [
                {
                  _path: '/blog/test-article',
                  title: 'Test Article',
                  date: null,
                  description: 'This is a test article description'
                }
              ]
              return { articles }
            }
          },
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    const dateText = wrapper.find('.text-sm.text-apple-gray-500').text()
    expect(dateText).toBe('')
  })
  
  it('links to the correct article path', () => {
    const wrapper = mount(ContentListDemo, {
      global: {
        stubs: {
          ContentList: {
            template: '<div><slot :list="articles"></slot></div>',
            setup() {
              const articles = [
                {
                  _path: '/blog/test-article',
                  title: 'Test Article',
                  date: '2025-04-17T08:00:00.000Z',
                  description: 'This is a test article description'
                }
              ]
              return { articles }
            }
          },
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to']
          }
        }
      }
    })
    
    // Check both the title link and the read more link
    const links = wrapper.findAll('a')
    // Find the links that point to the article
    const articleLinks = links.filter(link => link.attributes('href') === '/blog/test-article')
    
    // Should have at least one link pointing to the article
    expect(articleLinks.length).toBeGreaterThan(0)
  })
})