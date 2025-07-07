<template>
  <div class="home">
    <h1>Selamat Datang di Warung Online 👋</h1>
    <p>Aplikasi sederhana untuk memesan makanan dan minuman secara online.</p>
    <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="menu" class="hero-img" />
    <router-link to="/menu">
      <button>Mulai Pesan Sekarang</button>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f2f9ff, #ffffff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #2c3e50;
  text-align: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 16px;
}

p {
  font-size: 18px;
  margin-bottom: 24px;
  max-width: 500px;
}

.hero-img {
  width: 150px;
  margin-bottom: 30px;
  animation: float 2.5s ease-in-out infinite;
  background-color: transparent;
  border-radius: 20px;
  object-fit: contain; 
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

button {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}
</style>