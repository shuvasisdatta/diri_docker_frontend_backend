<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" class="brand-link">
      <img alt="App Logo" class="brand-image img-circle elevation-3" style="opacity: .8" />
      <span class="brand-text font-weight-light">{{ $APP_TITLE }}</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src class="img-circle elevation-2" alt="User Image" />
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ 'User' }}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <adminSidebarMenu />
      <!-- /.sidebar-menu -->
    </div>
  </aside>
</template>

<script>
import adminSidebarMenu from "@/components/admin_sidebar_menu";

export default {
  name: "adminSidebar",
  components: {
    adminSidebarMenu
  }
};
</script>