import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EducationSection from '../../../components/cv/EducationSection.vue'

const useEducationMock = vi.fn()

useEducationMock.mockReturnValue({
  education: [
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Test University',
      period: '2020 - 2023',
      description: 'A rigorous CS programme covering algorithms and software engineering.',
    },
  ],
  isLoading: false,
  error: null,
})

vi.mock('../../../composables/useEducation', () => ({
  useEducation: () => useEducationMock(),
}))

describe('EducationSection', () => {
  it('renders the section heading', () => {
    const wrapper = mount(EducationSection)
    expect(wrapper.find('h2').text()).toBe('Education')
  })

  it('renders the degree name', () => {
    const wrapper = mount(EducationSection)
    expect(wrapper.text()).toContain('Bachelor of Science in Computer Science')
  })

  it('renders the institution name', () => {
    const wrapper = mount(EducationSection)
    expect(wrapper.text()).toContain('Test University')
  })

  it('renders the study period', () => {
    const wrapper = mount(EducationSection)
    expect(wrapper.text()).toContain('2020 - 2023')
  })

  it('renders the description', () => {
    const wrapper = mount(EducationSection)
    expect(wrapper.text()).toContain('A rigorous CS programme')
  })

  it('shows loading skeletons when isLoading is true', () => {
    useEducationMock.mockReturnValueOnce({
      education: [],
      isLoading: true,
      error: null,
    })

    const wrapper = mount(EducationSection)
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(false)
  })

  it('shows error message when error is set', () => {
    useEducationMock.mockReturnValueOnce({
      education: [],
      isLoading: false,
      error: new Error('fetch failed'),
    })

    const wrapper = mount(EducationSection)
    expect(wrapper.find('.text-red-400').exists()).toBe(true)
    expect(wrapper.text()).toContain('Error loading education data')
  })

  it('renders multiple education entries', () => {
    useEducationMock.mockReturnValueOnce({
      education: [
        {
          id: 1,
          degree: 'Bachelor of Science',
          institution: 'Uni A',
          period: '2018 - 2021',
          description: 'First degree.',
        },
        {
          id: 2,
          degree: 'Master of Science',
          institution: 'Uni B',
          period: '2021 - 2023',
          description: 'Second degree.',
        },
      ],
      isLoading: false,
      error: null,
    })

    const wrapper = mount(EducationSection)
    expect(wrapper.text()).toContain('Bachelor of Science')
    expect(wrapper.text()).toContain('Master of Science')
    expect(wrapper.text()).toContain('Uni A')
    expect(wrapper.text()).toContain('Uni B')
  })
})
