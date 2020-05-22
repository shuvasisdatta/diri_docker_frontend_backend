<template>
  <!-- Sidebar Menu -->
  <nav class="mt-2">
    <ul
      class="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library -->

      <li class="nav-item">
        <router-link to="/categories" class="nav-link">
          <i class="nav-icon fas fa-th purple"></i>
          <p>Categories</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/lockers" class="nav-link">
          <i class="nav-icon fas fa-th green"></i>
          <p>Lockers</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/documents" class="nav-link">
          <i class="nav-icon fas fa-th teal"></i>
          <p>Documents</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">
          <i class="nav-icon fas fa-tools orange"></i>
          <p>Login</p>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <i class="nav-icon fas fa-sign-out-alt red"></i>
          <p>Logout</p>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.sidebar-menu -->
</template>

<script>
export default {
  name: "AdminSidebarMenu"
};
</script>