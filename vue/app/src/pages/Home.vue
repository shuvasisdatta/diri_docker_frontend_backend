<template>
  <section class="bg-white text-dark">
      <slider /> 

      <div class="container">
        <div class="row pt-4">
          <div class="col-md-8">
            <latestNews  />
          </div>
          
          <div class="col-md-4">
            <latestEvents  />
          </div>  
        </div>
      </div>
  </section>
</template>

<script>
import slider from '@/components/slider';
import latestNews from '@/components/latest_news';
import latestEvents from '@/components/latest_events';
export default {
  name: "Home",
  components: {
    slider,
    latestNews,
    latestEvents,
  },
};
</script>

<style scoped>
.main-content {
  margin-top: auto;
  padding-left: 0px;
  padding-right: 0px;
}
</style>