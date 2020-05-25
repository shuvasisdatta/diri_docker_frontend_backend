<template>
  <section>
    <nav class="navbar navbar-expand-lg">
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
              v-for="menu in filteredMenus"
              :key="menu.url"
              class="nav-item"
              :class="[menu == currentMenu? 'active': null, menu.childrens.length > 0? 'dropdown': null]"
            >
              <router-link
                :to="menu.childrens.length > 0? '': menu.url"
                class="nav-link"
                :class="[menu == currentMenu? 'text-danger': null, menu.childrens.length > 0? 'dropdown-toggle': null]"
                :id="menu.title + 'navbarDropdown'"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click.native="currentMenu = menu"
              >{{menu.title}}</router-link>

              <div
                v-if="menu.childrens.length > 0"
                class="dropdown-menu"
                :aria-labelledby="menu.title + 'navbarDropdown'"
              >
                <router-link :to="menu.url" class="dropdown-item">{{menu.title}}</router-link>
                <router-link
                  v-for="subMenu in menu.childrens"
                  :key="subMenu.id"
                  :to="subMenu.url"
                  class="dropdown-item"
                >{{subMenu.title}}</router-link>
              </div>
            </li>
            <li class="nav-item">
              <router-link v-if="!$root.access_token" to="/login" class="nav-link">Login</router-link>
              <a v-else class="nav-link logout" @click="logout()">Logout</a>
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
      menus: []
    };
  },
  computed: {
    filteredMenus() {
      let _menus = this.menus.filter(x => x.parent_id === null); 
      if(this.$root.access_token) {
        _menus = _menus.filter(x => x.url !== '/login');
      }
      return _menus;
      // return this.menus.filter(x => x.parent_id === null);
    }
  },
  methods: {
    logout() {
      console.log('logout called');
      // console.log(localStorage.getItem('access-token'));
      
      localStorage.removeItem('access-token');
      this.$root.access_token = null;
      this.$router.push('/');
    },

    async getMenus() {
      const url = "/nav";
      try {
        const res = await this.$http.get(url);
        this.menus = res.data;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    // getMenus
    this.getMenus();

    // initial menu
    this.currentMenu = this.menus[0];
  }
};
</script>

<style scoped>
nav.navbar {
  background-color: #021a55;
}
nav >>> a {
  color: white;
}

nav >>> a.dropdown-item {
  color: black;
}

.logout:hover {
  text-decoration: none;
  color:white;
  cursor: pointer;
}
</style>>
