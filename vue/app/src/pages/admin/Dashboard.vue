<template>
  <section class="mt-4">
    <h2>Admin Dashboard</h2>
    <div class="row">
      <div class="jumbotron col-md-4 bg-info mx-4" v-for="menu in dashboard_menus" :key="menu.url">
        <router-link :to="menu.url" class="btn btn-lg btn-danger">{{ menu.title }}</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      dashboard_menus: [
        {
          title: 'Menu',
          url: '/admin/menu' 
        },
        {
          title: 'News',
          url: '/admin/news' 
        },
      ],
    }
  }
};
</script>

<style scoped>
</style>

