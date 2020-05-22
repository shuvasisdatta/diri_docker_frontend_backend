<template>
  <div class="wrapper">
    <adminHeader />
    <admintNavigation />
    <!-- <adminSidebar /> -->
    <slot />
    <adminFooter />
  </div>
</template>

<script>
import adminHeader from "@/components/admin_header";
import admintNavigation from "@/components/admin_navigation";
// import adminSidebar from "@/components/admin_sidebar";
import adminFooter from "@/components/admin_footer";

export default {
  name: "admin_layout",
  components: {
    adminHeader,
    admintNavigation,
    // adminSidebar,
    adminFooter
  }
};
</script>