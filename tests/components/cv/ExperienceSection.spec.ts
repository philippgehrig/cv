import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ExperienceSection from '../../../components/cv/ExperienceSection.vue'

const useExperiencesMock = vi.fn()

useExperiencesMock.mockReturnValue({
  experiences: [
    {
      id: 1,
      company: 'Acme Corp',
      period: '2022 - Present',
      position: 'Senior Engineer',
      description: 'Leading backend development.',
      roles: [
        {
          title: 'Senior Engineer',
          period: '2023 - Present',
          description: 'Architected the new platform.',
          technologies: ['TypeScript', 'Node.js'],
        },
        {
          title: 'Engineer',
          period: '2022 - 2023',
          description: 'Built core APIs.',
          technologies: ['Python'],
        },
      ],
    },
    {
      id: 2,
      company: 'Startup Inc',
      period: '2020 - 2022',
      position: 'Junior Developer',
      description: 'Worked on the frontend.',
      roles: [],
    },
  ],
  isLoading: false,
  error: null,
})

vi.mock('../../../composables/useExperiences', () => ({
  useExperiences: () => useExperiencesMock(),
}))

describe('ExperienceSection', () => {
  it('renders the section heading', () => {
    const wrapper = mount(ExperienceSection)
    expect(wrapper.find('h2').text()).toBe('Work Experience')
  })

  it('renders one card per experience entry', () => {
    const wrapper = mount(ExperienceSection)
    // Each experience is wrapped in a div with rounded-xl
    const cards = wrapper.findAll('.rounded-xl')
    expect(cards.length).toBeGreaterThanOrEqual(2)
  })

  it('shows company name for the first experience', () => {
    const wrapper = mount(ExperienceSection)
    expect(wrapper.text()).toContain('Acme Corp')
  })

  it('shows the overall period badge', () => {
    const wrapper = mount(ExperienceSection)
    expect(wrapper.text()).toContain('2022 - Present')
  })

  it('shows loading skeletons when isLoading is true', () => {
    useExperiencesMock.mockReturnValueOnce({
      experiences: [],
      isLoading: true,
      error: null,
    })

    const wrapper = mount(ExperienceSection)
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(false)
  })

  it('shows error message when error is set', () => {
    useExperiencesMock.mockReturnValueOnce({
      experiences: [],
      isLoading: false,
      error: new Error('fetch failed'),
    })

    const wrapper = mount(ExperienceSection)
    expect(wrapper.find('.text-red-400').exists()).toBe(true)
    expect(wrapper.text()).toContain('Error loading experience data')
  })

  it('toggles a role row open and closed on click', async () => {
    const wrapper = mount(ExperienceSection)

    // Role detail should not be visible initially
    expect(wrapper.text()).not.toContain('Architected the new platform.')

    // Click the first role row to expand it
    const roleRow = wrapper.find('.border-l')
    await roleRow.trigger('click')

    expect(wrapper.text()).toContain('Architected the new platform.')

    // Click again to collapse
    await roleRow.trigger('click')
    expect(wrapper.text()).not.toContain('Architected the new platform.')
  })

  it('renders technology tags inside an expanded role', async () => {
    const wrapper = mount(ExperienceSection)

    const roleRow = wrapper.find('.border-l')
    await roleRow.trigger('click')

    expect(wrapper.text()).toContain('TypeScript')
    expect(wrapper.text()).toContain('Node.js')
  })

  it('renders logo for Mercedes Benz', () => {
    useExperiencesMock.mockReturnValueOnce({
      experiences: [
        {
          id: 1,
          company: 'Mercedes Benz',
          period: '2022 - Present',
          position: 'Engineer',
          description: 'desc',
          roles: [],
        },
      ],
      isLoading: false,
      error: null,
    })

    const wrapper = mount(ExperienceSection)
    const logo = wrapper.find('img')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toContain('mercedes-benz')
  })
})
