<script>
export default {
    name:'latestEvents',
    props: {
        eventsList: {
            type: Array,
            required: true,
        },
        limit: {
            type: Number,
            default: 2,
        }
    },
    methods: {
        truncate(text, length = 200) {
            if(text.length > length) {
                return text.substring(0, length) + '...';
            }
            else return text;
        },
    }
}
</script>

<style lang="sass" scoped>

</style>

<template>
    <section>
        <div class="card-title py-1 bg-dark text-white">Latest Events</div>
        <div class="row" v-for="events in eventsList.slice(0, limit)" :key="events.id">
                <div class="col ">
                    <div class="card my-2">
                    <!-- <img class="card-img-top" src="" alt="Card image cap"> -->
                    <div class="card-body">
                        <h5 class="card-title">{{ events.title }}</h5>
                        <p>Scheduled at {{ events.time }}</p>
                        <p class="card-text">{{ truncate(events.description, 30) }}</p>
                        <p class="card-text">{{ events.location }}</p>
                        <a href="#" class="btn btn-primary">Read More</a>
                    </div>
                </div>
                </div>
        </div>
    </section>
</template>