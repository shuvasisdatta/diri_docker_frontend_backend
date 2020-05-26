<template>
  <section>
    <slot />
    <defaultFooter />
  </section>
</template>

<script>
import defaultFooter from "@/components/footer";

export default {
  name: "blank_layout",
  components: {
    defaultFooter
  }
};
</script>