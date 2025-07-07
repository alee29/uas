<template>
  <div class="cart">
    <h1>🛒 Pesanan</h1>
    
<div v-if="isLoading" class="overlay">
    <div class="modal loading">Memproses checkout...</div>
</div>

<div v-if="showSuccess" class="overlay">
  <div class="modal success">✅ Checkout berhasil!</div>
</div>

<div v-if="showError" class="overlay">
  <div class="modal error">❌ Gagal melakukan checkout.</div>
</div>

    <div v-if="cart.length === 0">
      <p>Tidak ada pesanan.</p>
    </div>

    <ul v-else>
      <li v-for="item in cart" :key="item.id">
        <img :src="item.img" alt="gambar makanan" />
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-details">Jumlah: {{ item.qty }} &nbsp; | &nbsp; Total: <strong>Rp{{ (item.price * item.qty).toLocaleString() }}</strong></div>
        </div>
        <button @click="removeFromCart(item.id)">Hapus</button>
      </li>
    </ul>

    <div class="cart-total" v-if="cart.length">
      <p><strong>Total Seluruh Pesanan: Rp {{ total.toLocaleString() }}</strong></p>
      <button @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { ref } from 'vue'

const showSuccess = ref(false)
const showError = ref(false)
const isLoading = ref(false)
const cartStore = useCartStore()

// ✅ Ini yang bikin data reaktif
const { cart } = storeToRefs(cartStore)

const removeFromCart = (id) => {
  cartStore.removeFromCart(id)
}

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
})
async function checkout() {
  isLoading.value = true
  try {
    const res = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart.value)
    })

    if (res.ok) {
      cartStore.clearCart()
      showSuccess.value = true
    } else {
      showError.value = true
    }
  } catch (err) {
    showError.value = true
    console.error(err)
  } finally {
    isLoading.value = false
    setTimeout(() => {
      showSuccess.value = false
      showError.value = false
    }, 3000)
  }
}
</script>

<style scoped>
.cart {
  padding: 24px;
  max-width: 700px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

h1 {
  font-size: 26px;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 6px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 16px;
  margin-bottom: 14px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  gap: 16px;
}

li img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.item-details {
  font-size: 14px;
  color: #555;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c0392b;
}

.cart-total {
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
  text-align: right;
}

.cart-total button {
  margin-top: 12px;
  background-color: #3498db;
  padding: 8px 16px;
}

.cart-total button:hover {
  background-color: #2980b9;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px 30px;
  border-radius: 10px;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.4s ease;
}

.modal.success {
  border-left: 6px solid #2ecc71;
}

.modal.error {
  border-left: 6px solid #e74c3c;
}

.modal.loading {
  border-left: 6px solid #3498db;
}

@keyframes fadeIn {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>