// @vitest-environment jsdom

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CartView from '../src/views/CartView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../src/stores/cart'

describe('CartView.vue', () => {
  let cartStore

  beforeEach(() => {
    setActivePinia(createPinia())
    cartStore = useCartStore()

    // Set nilai awal cart store
    cartStore.cart = [
      { id: 1, name: 'Nasi Goreng', price: 20000, qty: 2, img: 'nasgor.jpg' },
      { id: 2, name: 'Mie Ayam', price: 15000, qty: 1, img: 'mie.jpg' }
    ]
  })

  it('menampilkan daftar item di cart', () => {
    const wrapper = mount(CartView)
    expect(wrapper.text()).toContain('Nasi Goreng')
    expect(wrapper.text()).toContain('Mie Ayam')
    expect(wrapper.findAll('li').length).toBe(2)
  })

  it('menghapus item dari cart saat tombol "Hapus" diklik', async () => {
    const wrapper = mount(CartView)
    await wrapper.find('button').trigger('click')
    await wrapper.findAll('button')
  .find(btn => btn.text() === 'Hapus')
  .trigger('click')

  })

  it('menampilkan total harga seluruh pesanan', () => {
    const wrapper = mount(CartView)
    expect(wrapper.text()).toContain('Total Seluruh Pesanan: Rp 55.000')
  })
})
