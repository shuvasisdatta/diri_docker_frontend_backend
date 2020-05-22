<template>
  <section class="footer bg-dark text-light">
    <footer class="container p-2">{{ $APP_TITLE }}&copy;{{ new Date().getFullYear() }}</footer>
  </section>
</template>

<script>
export default {
  name: "defaultFooter"
};
</script>

<style scoped>
</style>