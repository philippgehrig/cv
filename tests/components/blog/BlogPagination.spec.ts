import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, reactive } from 'vue'
import BlogPagination from '../../../components/blog/BlogPagination.vue'

describe('BlogPagination', () => {
  it('renders pagination with correct number of pages', () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 2,
        totalPages: 5
      }
    })
    
    // Should render buttons for pages 1, 2, 3, and 5 (with page 4 as ...)
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('5')
    
    // Should render Previous and Next buttons
    expect(wrapper.text()).toContain('Previous')
    expect(wrapper.text()).toContain('Next')
  })
  
  it('highlights the current page', () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 3,
        totalPages: 5
      }
    })
    
    // Find all page buttons
    const pageButtons = wrapper.findAll('button')
    
    // Find the button for page 3 (current page)
    const currentPageButton = pageButtons.find(btn => btn.text().includes('3'))
    
    // Check that it has the active class
    expect(currentPageButton?.classes()).toContain('bg-apple-blue')
    expect(currentPageButton?.classes()).toContain('text-white')
  })
  
  it('emits change event when a page is clicked', async () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 2,
        totalPages: 5
      }
    })
    
    // Find the button for page 3
    const pageButton = wrapper.findAll('button').find(btn => btn.text().trim() === '3')
    
    // Click the button
    await pageButton?.trigger('click')
    
    // Check that change event was emitted with correct page number
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([3])
  })
  
  it('emits change event when Previous button is clicked', async () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 2,
        totalPages: 5
      }
    })
    
    // Find the Previous button
    const prevButton = wrapper.findAll('button').find(btn => btn.text().includes('Previous'))
    
    // Click the button
    await prevButton?.trigger('click')
    
    // Check that change event was emitted with correct page number
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([1])
  })
  
  it('emits change event when Next button is clicked', async () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 2,
        totalPages: 5
      }
    })
    
    // Find the Next button
    const nextButton = wrapper.findAll('button').find(btn => btn.text().includes('Next'))
    
    // Click the button
    await nextButton?.trigger('click')
    
    // Check that change event was emitted with correct page number
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([3])
  })
  
  it('does not show Previous button on first page', () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 1,
        totalPages: 5
      }
    })
    
    // Find all buttons with text "Previous"
    const prevButton = wrapper.findAll('button').find(btn => btn.text().includes('Previous'))
    
    // Should not exist
    expect(prevButton).toBeUndefined()
  })
  
  it('does not show Next button on last page', () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 5,
        totalPages: 5
      }
    })
    
    // Find all buttons with text "Next"
    const nextButton = wrapper.findAll('button').find(btn => btn.text().includes('Next'))
    
    // Should not exist
    expect(nextButton).toBeUndefined()
  })
  
  it('shows correct pagination with ellipses for many pages', () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 5,
        totalPages: 10
      }
    })
    
    // Should contain ellipses
    expect(wrapper.text()).toContain('...')
    
    // Should show page 1, ellipsis, 4, 5, 6, ellipsis, and 10
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('4')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('6')
    expect(wrapper.text()).toContain('10')
  })
  
  it('does not render if totalPages is 1', () => {
    const wrapper = mount(BlogPagination, {
      props: {
        currentPage: 1,
        totalPages: 1
      }
    })
    
    // The component should be empty
    expect(wrapper.find('div').exists()).toBe(false)
  })
})