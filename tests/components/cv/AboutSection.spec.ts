import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutSection from '../../../components/cv/AboutSection.vue'
import { profileData } from '../../../composables/data/profileData'
import { mastersEducation } from '../../../composables/data/educationData'

describe('AboutSection', () => {
  it('introduces the background without adding another main heading', () => {
    const wrapper = mount(AboutSection)

    expect(wrapper.find('h1').exists()).toBe(false)
    expect(wrapper.get('h2').text()).toContain('Engineering, hands-on.')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe('background-title')
  })

  it('uses the current title and ongoing study subject from shared data', () => {
    const wrapper = mount(AboutSection)

    expect(wrapper.get('dl').text()).toContain(profileData.title)
    expect(wrapper.get('dl').text()).toContain(mastersEducation.subject)
    expect(wrapper.get('dl').text()).toContain(`Since ${mastersEducation.since}`)
    expect(wrapper.text()).not.toMatch(/upcoming|Technical Product Owner/)
  })

  it('keeps the previous architecture role and bachelor in the career highlights', () => {
    const wrapper = mount(AboutSection)

    expect(wrapper.findAll('dt')).toHaveLength(4)
    expect(wrapper.text()).toContain('System Architect')
    expect(wrapper.text()).toContain('B.Sc. Computer Science')
  })
})
