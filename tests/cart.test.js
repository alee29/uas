// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../src/stores/cart' 

describe('Cart Store', () => {
  let cartStore

  beforeEach(() => {
    setActivePinia(createPinia())
    cartStore = useCartStore()
  })

  it('menambahkan item baru ke cart', () => {
    cartStore.addToCart({ id: 1, name: 'Sate', price: 20000 })

    expect(cartStore.cart.length).toBe(1)
    expect(cartStore.cart[0].qty).toBe(1)
    expect(cartStore.cart[0].name).toBe('Sate')
  })

  it('menambahkan item yang sudah ada akan menambah jumlah', () => {
    cartStore.addToCart({ id: 1, name: 'Sate', price: 20000 })
    cartStore.addToCart({ id: 1, name: 'Sate', price: 20000 })

    expect(cartStore.cart.length).toBe(1)
    expect(cartStore.cart[0].qty).toBe(2)
  })

  it('menghapus item satuan dari cart (qty > 1)', () => {
    cartStore.addToCart({ id: 1, name: 'Sate', price: 20000 })
    cartStore.addToCart({ id: 1, name: 'Sate', price: 20000 }) // qty = 2

    cartStore.removeFromCart(1)

    expect(cartStore.cart.length).toBe(1)
    expect(cartStore.cart[0].qty).toBe(1)
  })

  it('menghapus item dari cart (qty = 1)', () => {
    cartStore.addToCart({ id: 1, name: 'Sate', price: 20000 }) // qty = 1

    cartStore.removeFromCart(1)

    expect(cartStore.cart.length).toBe(0)
  })

  it('clearCart mengosongkan semua item', () => {
    cartStore.addToCart({ id: 1, name: 'Sate', price: 20000 })
    cartStore.addToCart({ id: 2, name: 'Nasi Goreng', price: 18000 })

    cartStore.clearCart()

    expect(cartStore.cart.length).toBe(0)
  })
})
