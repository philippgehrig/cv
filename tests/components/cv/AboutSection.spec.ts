import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutSection from '../../../components/cv/AboutSection.vue'

// Create a mock for the useProfile composable
const useProfileMock = vi.fn()

// Setup the default mock implementation
useProfileMock.mockReturnValue({
  profile: {
    name: 'Philipp Gehrig',
    title: 'Engineer & Web Developer',
    bio: 'A passionate engineer and web developer with expertise in Computational Fluid Dynamics and modern web development.',
    profile_image: '/images/Philipp-Gehrig_2025.png',
    linkedin: 'https://linkedin.com/in/philippgehrig',
    github: 'https://github.com/philippgehrig',
    twitter: 'https://twitter.com/thisphilipp' 
  },
  isLoading: false,
  error: null
})

// Mock the composable
vi.mock('../../../composables/directus/useProfile', () => ({
  useProfile: () => useProfileMock()
}))

describe('AboutSection', () => {
  it('renders profile information correctly', () => {
    const wrapper = mount(AboutSection)

    expect(wrapper.find('h2').text()).toBe('About Me')
    expect(wrapper.find('h3').text()).toBe('Philipp Gehrig')
    expect(wrapper.find('h4').text()).toBe('Engineer & Web Developer')
    expect(wrapper.text()).toContain('A passionate engineer and web developer')
  })

  it('displays profile image when available', () => {
    const wrapper = mount(AboutSection)
    
    const imageElement = wrapper.find('img')
    expect(imageElement.exists()).toBe(true)
    expect(imageElement.attributes('src')).toBe('/images/Philipp-Gehrig_2025.png')
    expect(imageElement.attributes('alt')).toBe('Profile Photo')
  })

  it('renders social media links correctly', () => {
    const wrapper = mount(AboutSection)
    
    const socialLinks = wrapper.findAll('a')
    expect(socialLinks).toHaveLength(3)
    
    // LinkedIn link
    expect(socialLinks[0].attributes('href')).toBe('https://linkedin.com/in/philippgehrig')
    expect(socialLinks[0].text()).toContain('LinkedIn')
    
    // GitHub link
    expect(socialLinks[1].attributes('href')).toBe('https://github.com/philippgehrig')
    expect(socialLinks[1].text()).toContain('GitHub')
    
    // Twitter link
    expect(socialLinks[2].attributes('href')).toBe('https://twitter.com/thisphilipp')  // Updated expectation
    expect(socialLinks[2].text()).toContain('Twitter')
  })

  it('shows loading state', async () => {
    // Override mock for this test
    useProfileMock.mockReturnValueOnce({
      profile: null,
      isLoading: true,
      error: null
    })

    const wrapper = mount(AboutSection)
    
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(false)
  })

  it('shows error state', async () => {
    // Override mock for this test
    useProfileMock.mockReturnValueOnce({
      profile: null,
      isLoading: false,
      error: 'Failed to load profile'
    })

    const wrapper = mount(AboutSection)
    
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
    expect(wrapper.text()).toContain('Error loading profile data')
  })

  it('shows placeholder when no profile image', async () => {
    // Override mock for this test
    useProfileMock.mockReturnValueOnce({
      profile: {
        name: 'Philipp Gehrig',
        title: 'Engineer & Web Developer',
        bio: 'A passionate engineer and web developer.',
        profile_image: null,
        linkedin: 'https://linkedin.com/in/philippgehrig',
        github: 'https://github.com/philippgehrig',
        twitter: 'https://twitter.com/thisphilipp'
      },
      isLoading: false,
      error: null
    })

    const wrapper = mount(AboutSection)
    
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('handles content overflow correctly', async () => {
    // Override mock with very long bio to test overflow handling
    useProfileMock.mockReturnValueOnce({
      profile: {
        name: 'Philipp Gehrig',
        title: 'Engineer & Web Developer',
        bio: 'A passionate engineer and web developer with expertise in Computational Fluid Dynamics and modern web development.'.repeat(10),
        profile_image: '/images/Philipp-Gehrig_2025.png',
        linkedin: 'https://linkedin.com/in/philippgehrig',
        github: 'https://github.com/philippgehrig',
        twitter: 'https://twitter.com/thisphilipp'
      },
      isLoading: false,
      error: null
    })

    const wrapper = mount(AboutSection)
    
    // Verify the bio paragraph exists and contains the content
    const bioElement = wrapper.find('p')
    expect(bioElement.exists()).toBe(true)
    expect(bioElement.classes()).toContain('text-lg')
    
    // Check that the container has appropriate max-width class to prevent horizontal overflow
    expect(wrapper.find('.max-w-3xl').exists()).toBe(true)
  })

  it('handles long content with proper scrollbar behavior', async () => {
    // Override mock with extremely long bio to force scrolling
    useProfileMock.mockReturnValueOnce({
      profile: {
        name: 'Philipp Gehrig',
        title: 'Engineer & Web Developer',
        bio: 'A passionate engineer and web developer with expertise in Computational Fluid Dynamics and modern web development.'.repeat(20),
        profile_image: '/images/Philipp-Gehrig_2025.png',
        linkedin: 'https://linkedin.com/in/philippgehrig',
        github: 'https://github.com/philippgehrig',
        twitter: 'https://twitter.com/thisphilipp'
      },
      isLoading: false,
      error: null
    })

    const wrapper = mount(AboutSection)
    
    // Check that the bio content exists
    const bioElement = wrapper.find('p')
    expect(bioElement.exists()).toBe(true)
    
    // Check that the container has proper classes for handling overflow
    expect(wrapper.find('.max-w-3xl').exists()).toBe(true)
    
    // Check that long text is contained within a paragraph with proper styling
    expect(bioElement.classes()).toContain('text-lg')
    expect(bioElement.classes()).toContain('leading-relaxed')
    
    // Verify container hierarchy for proper scroll handling
    const container = wrapper.find('.container')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('mx-auto')
    expect(container.classes()).toContain('px-6')
  })
})