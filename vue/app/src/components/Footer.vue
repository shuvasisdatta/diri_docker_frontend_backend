<template>
  <section class="footer bg-success text-dark">
    <footer class="container">{{APP_TITLE}}&copy;{{ new Date().getFullYear() }}</footer>
  </section>
</template>

<script>
// App title at browser tab is like "YOUR_APP_TITLE | CURRENT_PAGE_TITLE"
import { name as APP_TITLE } from "@/../package.json";
export default {
  name: "Footer",
  data() {
    return {
      APP_TITLE
    };
  }
};
</script>

<style scoped>
</style>