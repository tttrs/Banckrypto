<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 auth-container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Auth"
}
</script>

<style scoped>
.auth-container {
  background: url('~@/assets/img/bg.jpg') no-repeat;
  background-size: 100% 100%;
}
</style>