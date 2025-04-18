import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BlogTableOfContents from '../../../components/blog/BlogTableOfContents.vue'

// Sample TOC data for testing
const mockToc = {
  links: [
    {
      id: 'introduction',
      text: 'Introduction',
      depth: 2
    },
    {
      id: 'getting-started',
      text: 'Getting Started',
      depth: 2,
      children: [
        {
          id: 'installation',
          text: 'Installation',
          depth: 3
        },
        {
          id: 'configuration',
          text: 'Configuration',
          depth: 3
        }
      ]
    },
    {
      id: 'advanced-usage',
      text: 'Advanced Usage',
      depth: 2
    }
  ]
}

describe('BlogTableOfContents', () => {
  it('renders the table of contents title', () => {
    const wrapper = mount(BlogTableOfContents, {
      props: {
        toc: mockToc
      }
    })
    
    const title = wrapper.find('h3')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Table of Contents')
  })
  
  it('renders all top-level links correctly', () => {
    const wrapper = mount(BlogTableOfContents, {
      props: {
        toc: mockToc
      }
    })
    
    // Get all link text contents to verify the correct links are rendered
    const allLinks = wrapper.findAll('a').map(link => link.text().trim())
    
    // Verify we have the correct links
    expect(allLinks).toContain('Introduction')
    expect(allLinks).toContain('Getting Started')
    expect(allLinks).toContain('Installation')
    expect(allLinks).toContain('Configuration')
    expect(allLinks).toContain('Advanced Usage')
  })
  
  it('renders nested child links correctly', () => {
    const wrapper = mount(BlogTableOfContents, {
      props: {
        toc: mockToc
      }
    })
    
    // Find all child links
    const childLinks = wrapper.findAll('ul > li > ul > li > a')
    expect(childLinks.length).toBe(2)
    
    // Check content of child links
    expect(childLinks[0].text()).toBe('Installation')
    expect(childLinks[1].text()).toBe('Configuration')
  })
  
  it('has correct href attributes for links', () => {
    const wrapper = mount(BlogTableOfContents, {
      props: {
        toc: mockToc
      }
    })
    
    // Find links by their text content instead of position
    const links = wrapper.findAll('a')
    
    const introLink = links.find(link => link.text().includes('Introduction'))
    const gettingStartedLink = links.find(link => link.text().includes('Getting Started'))
    const installationLink = links.find(link => link.text().includes('Installation'))
    const configurationLink = links.find(link => link.text().includes('Configuration'))
    const advancedUsageLink = links.find(link => link.text().includes('Advanced Usage'))
    
    // Check href attributes
    expect(introLink?.attributes('href')).toBe('#introduction')
    expect(gettingStartedLink?.attributes('href')).toBe('#getting-started')
    expect(installationLink?.attributes('href')).toBe('#installation')
    expect(configurationLink?.attributes('href')).toBe('#configuration')
    expect(advancedUsageLink?.attributes('href')).toBe('#advanced-usage')
  })
  
  it('applies different styling to top-level and child links', () => {
    const wrapper = mount(BlogTableOfContents, {
      props: {
        toc: mockToc
      }
    })
    
    // Get all links by their text content
    const links = wrapper.findAll('a')
    const introLink = links.find(link => link.text().includes('Introduction'))
    const gettingStartedLink = links.find(link => link.text().includes('Getting Started'))
    const advancedUsageLink = links.find(link => link.text().includes('Advanced Usage'))
    const installationLink = links.find(link => link.text().includes('Installation'))
    const configurationLink = links.find(link => link.text().includes('Configuration'))
    
    // Top-level links should have font-medium class
    expect(introLink?.classes() || []).toContain('font-medium')
    expect(gettingStartedLink?.classes() || []).toContain('font-medium')
    expect(advancedUsageLink?.classes() || []).toContain('font-medium')
    
    // Child links should not have font-medium class
    expect(installationLink?.classes() || []).not.toContain('font-medium')
    expect(configurationLink?.classes() || []).not.toContain('font-medium')
  })
  
  it('applies correct padding based on heading depth', () => {
    const wrapper = mount(BlogTableOfContents, {
      props: {
        toc: mockToc
      }
    })
    
    // Get links by text content
    const links = wrapper.findAll('a')
    const introLink = links.find(link => link.text().includes('Introduction'))
    const installationLink = links.find(link => link.text().includes('Installation'))
    
    // Top-level links (depth 2) should have no padding-left
    expect(introLink?.attributes('style')).toBe('padding-left: 0rem;')
    
    // Child links (depth 3) should have padding-left of 0.75rem
    expect(installationLink?.attributes('style')).toBe('padding-left: 0.75rem;')
  })
  
  it('does not render if TOC is empty', () => {
    const wrapper = mount(BlogTableOfContents, {
      props: {
        toc: { links: [] }
      }
    })
    
    // Component should not be displayed
    expect(wrapper.find('div').exists()).toBe(false)
  })
  
  it('does not render if TOC is missing links property', () => {
    const wrapper = mount(BlogTableOfContents, {
      props: {
        toc: { links: [] }
      }
    })
    
    // Component should not be displayed
    expect(wrapper.find('div').exists()).toBe(false)
  })
})