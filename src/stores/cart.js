import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  // ✅ Menambahkan item ke keranjang
  function addToCart(item) {
    const existing = cart.value.find(i => i.id === item.id)
    if (existing) {
      existing.qty += 1 // Kalau sudah ada, tambah jumlah
    } else {
      cart.value.push({ ...item, qty: 1 }) // Kalau belum, tambah item baru
    }
  }

  // ✅ Menghapus satu item dari keranjang
  function removeFromCart(id) {
    const existing = cart.value.find(i => i.id === id)
    if (existing) {
      if (existing.qty > 1) {
        existing.qty -= 1 // Kurangi jumlah 1
      } else {
        cart.value = cart.value.filter(i => i.id !== id) // Kalau tinggal 1, hapus item
      }
    }
  }

  // ✅ Kosongkan semua isi keranjang
  function clearCart() {
    cart.value = []
  }

  return { cart, addToCart, removeFromCart, clearCart }
})