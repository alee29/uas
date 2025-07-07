import { vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// Jika kamu perlu mocking global, bisa dilakukan di sini
beforeEach(() => {
  setActivePinia(createPinia())
})
