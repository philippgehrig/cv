import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BlogSearch from '../../../components/blog/BlogSearch.vue'

// Type declaration for the component
interface BlogSearchInstance {
  searchQuery: string;
  search: () => void;
}

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('BlogSearch', () => {
  it('renders search input field', () => {
    const wrapper = mount(BlogSearch)
    
    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search blog posts...')
  })

  it('renders search button with icon', () => {
    const wrapper = mount(BlogSearch)
    
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.find('svg').exists()).toBe(true)
  })

  it('updates searchQuery when input changes', async () => {
    const wrapper = mount(BlogSearch)
    
    const input = wrapper.find('input[type="text"]')
    await input.setValue('vue components')
    
    const vm = wrapper.vm as unknown as BlogSearchInstance
    expect(vm.searchQuery).toBe('vue components')
  })

  it('emits search event when search button is clicked', async () => {
    const wrapper = mount(BlogSearch)
    
    // Set search query
    const input = wrapper.find('input[type="text"]')
    await input.setValue('nuxt testing')
    
    // Click the search button
    await wrapper.find('button').trigger('click')
    
    // Check that event was emitted with correct value
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')![0]).toEqual(['nuxt testing'])
  })

  it('emits search event when enter key is pressed', async () => {
    const wrapper = mount(BlogSearch)
    
    // Set search query
    const input = wrapper.find('input[type="text"]')
    await input.setValue('vue composables')
    
    // Trigger enter key
    await input.trigger('keyup.enter')
    
    // Check that event was emitted with correct value
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')![0]).toEqual(['vue composables'])
  })

  it('does not emit event for empty search', async () => {
    const wrapper = mount(BlogSearch)
    
    // Set empty query
    const input = wrapper.find('input[type="text"]')
    await input.setValue('   ')
    
    // Click search button
    await wrapper.find('button').trigger('click')
    
    // Should not emit search event
    expect(wrapper.emitted('search')).toBeFalsy()
  })
})