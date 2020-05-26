<template>
  <div id="app">
    <!-- dynamic layout component -->
    <component :is="layout">
      <router-view class="container-fluid main-content" />
    </component>
  </div>
</template>

<script>
import default_layout from "@/layouts/default";
import blank_layout from "@/layouts/blank";
import admin_layout from "@/layouts/admin";

const default_lay = "default";

export default {
  name: "App",
  components: {
    default_layout,
    blank_layout,
    admin_layout
  },
  computed: {
    layout() {
      console.log(`layout : ${this.$route.meta.layout}`)
      return (this.$route.meta.layout || default_lay) + "_layout";
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-content {
  /* min-height: calc(100% - 50px); */
  min-height: calc(100vh - 96px); /* will cover the 100% of viewport */
  overflow: hidden;
  position: relative;
  padding-bottom: 100px; /* height of your footer */
}

.footer {
  position: absolute;
  /* bottom: 0; */
  width: 100%;
}
</style>
