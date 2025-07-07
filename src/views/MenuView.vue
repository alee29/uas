<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useCartStore } from '../stores/cart'

const foods = ref([])
const cartStore = useCartStore()

const fetchFoods = async () => {
  const res = await fetch('https://mock-api-production-3615.up.railway.app/foods')
  const data = await res.json()
  foods.value = data
}

const addToCart = async (item) => {
  cartStore.addToCart(item)

  await nextTick()

  const el = document.getElementById(`food-${item.id}`)
  if (el) {
    el.classList.add('flash')
    setTimeout(() => {
      el.classList.remove('flash')
    }, 500)
  }
}

onMounted(fetchFoods)
</script>

<template>
  <div class="menu">
    <h1>🍽 Makanan</h1>
    <ul>
      <li
        v-for="item in foods.filter(f => f.category === 'makanan')"
        :key="item.id"
        :id="'food-' + item.id"
      >
        <img :src="item.img" alt="gambar makanan" style="width: 50px; height: 50px; margin-right: 10px;" />
        <div>
          {{ item.name }} - Rp{{ item.price.toLocaleString() }}
          <button @click="addToCart(item)">Tambahkan ke keranjang</button>
        </div>
      </li>
    </ul>

    <h1>🥤 Minuman</h1>
    <ul>
      <li
        v-for="item in foods.filter(f => f.category === 'minuman')"
        :key="item.id"
        :id="'food-' + item.id"
      >
        <img :src="item.img" alt="gambar minuman" style="width: 50px; height: 50px; margin-right: 10px;" />
        <div>
          {{ item.name }} - Rp{{ item.price.toLocaleString() }}
          <button @click="addToCart(item)">Tambahkan ke keranjang</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu {
  padding: 20px;
  max-width: 700px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

h1 {
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 16px;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 4px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 16px;
  background: #ffffff;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

li:hover {
  transform: scale(1.01);
}

img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

div {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 6px;
  align-self: start;
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

button:hover {
  background-color: #27ae60;
}

.flash {
  animation: flash-bg 0.5s ease;
}

@keyframes flash-bg {
  0% {
    background-color: #e3ffe9;
  }
  100% {
    background-color: inherit;
  }
}

.sl {
  max-height: 300px;       /* Batas tinggi list */
  overflow-y: auto;        /* Scroll hanya muncul di dalam */
  padding-right: 10px;     /* Biar isi tidak mentok kanan */
  margin-bottom: 20px;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}
</style>