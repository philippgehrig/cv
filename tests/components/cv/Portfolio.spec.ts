import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import HomePage from '../../../pages/index.vue'
import HeroScene from '../../../components/cv/HeroScene.vue'
import WorkSection from '../../../components/cv/WorkSection.vue'
import ContactScene from '../../../components/cv/ContactScene.vue'
import Footer from '../../../components/layout/Footer.vue'
import { profileData } from '../../../composables/data/profileData'
import { educationData, mastersEducation } from '../../../composables/data/educationData'
import { experiencesData } from '../../../composables/data/experiencesData'
import { timelineData } from '../../../composables/data/timelineData'
import { portfolioData } from '../../../composables/data/portfolioData'

afterEach(() => vi.unstubAllGlobals())

describe('Approved portfolio design', () => {
  it('renders the full introduction and study status on the server', async () => {
    const html = await renderToString(createSSRApp(HeroScene))

    expect(html).toContain(profileData.title)
    expect(html).toContain(profileData.bio)
    expect(html).toContain(mastersEducation.subject)
    expect(html).toContain('In progress')
    expect(html).toContain('datetime="2026-10"')
    expect(html).not.toContain('opacity-0')
  })

  it('uses the original portrait with intrinsic square dimensions', () => {
    const wrapper = mount(HeroScene)
    const portrait = wrapper.get('.intro-portrait img')

    expect(portrait.attributes('src')).toBe('/images/Philipp-Gehrig_2025.png')
    expect(portrait.attributes('alt')).toBe(profileData.name)
    expect(portrait.attributes('width')).toBe('640')
    expect(portrait.attributes('height')).toBe('640')
    expect(portrait.attributes('fetchpriority')).toBe('high')
  })

  it('shows all three work areas in plain language without a technical appendix', () => {
    const wrapper = mount(WorkSection)
    const cards = wrapper.findAll('.project')

    expect(cards).toHaveLength(3)
    portfolioData.workAreas.forEach((area, index) => {
      expect(cards[index].text()).toContain(area.title)
      expect(cards[index].text()).toContain(area.description)
      expect(cards[index].get('.art').attributes('aria-hidden')).toBe('true')
    })
    expect(wrapper.text()).toContain('Cortex')
    expect(wrapper.text()).not.toMatch(/The technical side|Ontology|GraphQL|BTV|VDA2/)
  })

  it('retains earlier work in a native, initially collapsed disclosure', () => {
    const wrapper = mount(WorkSection)

    expect(wrapper.findAll('details')).toHaveLength(1)
    expect(wrapper.get('details').attributes('open')).toBeUndefined()
    expect(wrapper.get('summary').text()).toContain('Earlier work')
    expect(wrapper.findAll('.earlier-grid article')).toHaveLength(3)
  })

  it('preserves contact destinations and safe external link attributes', () => {
    const wrapper = mount(ContactScene)

    expect(wrapper.find(`a[href="mailto:${profileData.email}"]`).exists()).toBe(true)
    const linkedin = wrapper.get(`a[href="${profileData.linkedin}"]`)
    expect(linkedin.text()).toContain('on LinkedIn')
    expect(linkedin.attributes('target')).toBe('_blank')
    expect(linkedin.attributes('rel')).toBe('noopener noreferrer')
  })

  it('keeps the legal routes and both social profiles available in the footer', () => {
    const wrapper = mount(Footer, {
      global: {
        stubs: {
          NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] }
        }
      }
    })

    for (const policy of ['legal-notice', 'privacy-policy', 'terms-of-use', 'sitemap']) {
      expect(wrapper.find(`a[href="/policies/${policy}"]`).exists()).toBe(true)
    }
    expect(wrapper.get(`a[href="${profileData.github}"]`).attributes('rel')).toBe('noopener noreferrer')
    expect(wrapper.find(`a[href="${profileData.linkedin}"]`).exists()).toBe(true)
    expect(wrapper.text()).toContain(profileData.title)
  })

  it('wires the full page with one main heading and unique legacy anchor targets', () => {
    vi.stubGlobal('useSeoMeta', vi.fn())
    const wrapper = mount(HomePage)

    expect(wrapper.findAll('h1')).toHaveLength(1)
    expect(wrapper.get('h1').text()).toBe(portfolioData.headline)
    for (const id of ['about', 'experience', 'education', 'work', 'contact', 'background']) {
      expect(wrapper.findAll(`[id="${id}"]`)).toHaveLength(1)
    }
    const ids = wrapper.findAll('[id]').map(node => node.attributes('id'))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('publishes the updated role in page metadata', () => {
    const useSeoMeta = vi.fn()
    vi.stubGlobal('useSeoMeta', useSeoMeta)
    mount(HomePage)

    expect(useSeoMeta).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Philipp Gehrig - Tech Lead and Engineer',
      description: profileData.bio,
      ogTitle: 'Philipp Gehrig - Tech Lead and Engineer'
    }))
  })

  it('keeps current role and studies consistent in the retained CV data', () => {
    expect(experiencesData[0].position).toBe('Tech Lead and Engineer')
    expect(experiencesData[0].roles?.[0].title).toBe(profileData.title)
    expect(educationData[0]).toBe(mastersEducation)

    const currentRole = timelineData.find(item => item.id === 'mb-tpo')
    const master = timelineData.find(item => item.id === 'master-cs')
    expect(currentRole).toMatchObject({ title: profileData.title })
    expect(master).toMatchObject({
      title: mastersEducation.degree,
      period: 'Oct 2026 - present',
      startDate: '2026-10'
    })
    expect(JSON.stringify([profileData, educationData, experiencesData, timelineData])).not.toMatch(
      /Technical Product Owner|Master of Science in Computer Science|upcoming/
    )
  })
})
