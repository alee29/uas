<template>
  <div id="app">
    <nav>
      <router-link to="/">Beranda</router-link> |
      <router-link to="/menu">Menu</router-link>
      <router-link to="/cart">Pesanan</router-link>
    </nav>

  </div>

  <div class="app">
    <router-view />
    <footer class="footer">
      <p>© 2025 Warung Online — Dibuat oleh Ahmad Rizki 👨‍🍳</p>
    </footer>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
nav {
  background-color: #333;
  padding: 10px;
}
nav a {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


.footer {
  background-color: #2c3e50;
  color: #fff;
  text-align: center;
  padding: 16px;
  font-size: 14px;
  margin-top: auto;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.1);
}


</style>