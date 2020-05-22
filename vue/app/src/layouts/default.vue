<template>
  <section>
    <defaultHeader />
    <defaultNavigation />
    <slot />
    <defaultFooter />
  </section>
</template>

<script>
import defaultHeader from "@/components/header";
import defaultNavigation from "@/components/navigation";
import defaultFooter from "@/components/footer";

export default {
  name: "default_layout",
  components: {
    defaultHeader,
    defaultNavigation,
    defaultFooter
  }
};
</script>