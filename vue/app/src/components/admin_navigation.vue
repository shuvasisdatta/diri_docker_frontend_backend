<template>
  <nav class="navbar  navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="#">{{ $APP_TITLE }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li
            v-for="menu in menus"
            :key="menu.url"
            class="nav-item"
          >
            <router-link
              :to="menu.url"
              class="nav-link"
            >{{menu.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      menus: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Dashboard",
          url: "/admin"
        },
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
nav.navbar {
  background-color: #021a55;
}
nav >>> a {
  color: white;
}

nav >>> a:hover {
  background-color: black;
}

nav >>> a.dropdown-item {
  color: black;
}
</style>>
