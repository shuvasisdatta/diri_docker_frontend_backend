<script>
import truncate from '@/mixins/truncate';
export default {
    name:'latestEvents',
    data() {
        return {
            isLoading: false,
            error: false,
            events: [],
            limit: 2,
        }
    },
    mixins: [truncate],
    methods: {
      async getEvents() { 
        const url = '/event';
        try {
            this.isLoading = true;
            let res = await this.$http.get(url);
            this.events = res.data;
            console.log(res);
            this.isLoading = false;
        } catch (err) {
            console.log(err);
        }
      },
    },
    mounted() {
      this.getEvents();
    }
}
</script>

<style lang="css" scoped>
.event {
    height: 400px;
}
</style>

<template>
    <section class="card bg-light">
        <div class="card-title py-1 bg-dark font-weight-bold text-white">Latest Events</div>
        <div v-if="isLoading" class="d-flex justify-content-center py-4">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else class="card-body row">
                <div class="col-12 my-2 text-left" v-for="event in events.slice(0, limit)" :key="event.id">
                    <div class="card event">
                        <!-- <img class="card-img-top" src="" alt="Card image cap"> -->
                        <div class="card-body">
                            <h5 class="card-title">{{ event.title }}</h5>
                            <p class="">By <span class="text-info">{{ event.user.name }}</span></p>
                            <p class="card-text">Scheduled at {{ $moment(event.time).format('MMMM Do YYYY') }}</p>
                            <p class="card-text">Location - {{ event.location }}</p>
                            <p class="card-text text-justify">{{ truncate(event.description, 50) }}</p>
                            <router-link :to="'/event/' + event.id" class="btn btn-primary">Read More</router-link>
                        </div>
                    </div>
                </div>
        </div>
    </section>
</template>