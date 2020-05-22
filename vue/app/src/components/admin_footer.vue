<template>
  <section class="footer bg-dark text-light">
    <footer class="container p-2">
      <div class="d-flex flex-row justify-content-between bd-highlight">
        <div class="bd-highlight">Admin Panel</div>
        <div class="bd-highlight">{{ $APP_TITLE }}&copy;{{ new Date().getFullYear() }}</div>
        <div class="bd-highlight">v {{ $APP_VERSION }}</div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: "adminFooter"
};
</script>

<style scoped>
.footer {
  /* margin-top: calc(50% - 50px); */
}
</style>