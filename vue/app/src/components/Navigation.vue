<template>
  <section>
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
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
              :class="menu == currentMenu? 'active': null"
            >
              <router-link
                :to="menu.url"
                class="nav-link"
                :class="menu == currentMenu? 'text-danger': null"
                @click.native="currentMenu = menu"
              >{{menu.title}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      currentMenu: null,
      menus: [
        {
          title: "Home",
          url: "/"
        },
        {
          title: "Menu 1",
          url: "/menu1"
        },
        {
          title: "Menu 2",
          url: "/menu2"
        },
        {
          title: "Menu 3",
          url: "/menu3"
        },
        {
          title: "Contact",
          url: "/contact"
        }
      ]
    };
  },
  mounted() {
    // initial menu
    this.currentMenu = this.menus[0];
  }
};
</script>

<style scoped>
</style>>
