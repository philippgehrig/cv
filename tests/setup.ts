import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock Nuxt's composables
vi.mock('#imports', () => ({
  definePageMeta: vi.fn(),
  useHead: vi.fn(),
  useRoute: () => ({
    params: {},
    path: '/',
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock Nuxt's components
config.global.stubs = {
  NuxtLink: {
    template: '<a :href="to"><slot /></a>',
    props: ['to'],
  },
  ClientOnly: {
    template: '<slot />',
  },
}

// Mock window properties
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})