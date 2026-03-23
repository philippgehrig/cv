import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactSection from '../../../components/cv/ContactSection.vue'

describe('ContactSection', () => {
  it('renders the section heading', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.find('h2').text()).toBe('Contact')
  })

  it('renders an email contact link', () => {
    const wrapper = mount(ContactSection)
    const emailLink = wrapper.find('a[href^="mailto:"]')
    expect(emailLink.exists()).toBe(true)
    expect(emailLink.attributes('href')).toBe('mailto:philipp@gehrig.info')
  })

  it('renders the LinkedIn contact link', () => {
    const wrapper = mount(ContactSection)
    const linkedinLink = wrapper.find('a[href*="linkedin.com"]')
    expect(linkedinLink.exists()).toBe(true)
    expect(linkedinLink.attributes('target')).toBe('_blank')
    expect(linkedinLink.attributes('rel')).toContain('noopener')
  })

  it('renders the GitHub contact link', () => {
    const wrapper = mount(ContactSection)
    const githubLink = wrapper.find('a[href*="github.com"]')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('target')).toBe('_blank')
    expect(githubLink.attributes('rel')).toContain('noopener')
  })

  it('renders all three contact cards', () => {
    const wrapper = mount(ContactSection)
    // Each card is an <a> element at the top level of the contact list
    const contactLinks = wrapper.findAll('a')
    expect(contactLinks.length).toBe(3)
  })

  it('displays contact method labels', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('LinkedIn')
    expect(wrapper.text()).toContain('GitHub')
  })

  it('displays the introductory paragraph', () => {
    const wrapper = mount(ContactSection)
    expect(wrapper.text()).toContain('Feel free to reach out')
  })

  it('has section id "contact" for anchor navigation', () => {
    const wrapper = mount(ContactSection)
    const section = wrapper.find('section#contact')
    expect(section.exists()).toBe(true)
  })
})
