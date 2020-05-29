<template>
  <section class="mt-0">
    <h2>Dashboard</h2>
    <div class="row">
      <div class="col-md-4" v-for="menu in dashboard_menus" :key="menu.url">
        <div class="jumbotron bg-dark">
          <router-link :to="menu.url" class="btn btn-lg btn-success">{{ menu.title }}</router-link>
        </div>
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
        {
          title: 'Event',
          url: '/admin/event' 
        },
      ],
    }
  }
};
</script>

<style scoped>
</style>

