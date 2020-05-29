<script>
import dateTimeFormat from '@/mixins/dateTimeFormat';
export default {
    name: 'eventDetail',
    data() {
        return {
            event: {},
            isLoading: false,
        }
    },
    mixins: [dateTimeFormat],
    methods: {
        // dateTimeFormat,
        async getEvent () {
            let eventId = this.$route.params.id;
            let url = '/event/' + eventId;
            this.isLoading = true;
            try {
                let res = await this.$http.get(url);
                // console.log(res);
                this.event = res.data;
                this.isLoading = false;
            } catch (err) {
                console.log(err);
            }
        }
    },
    mounted() {
        this.getEvent();
    }
}
</script>


<style lang="css" scoped>

</style>

<template>
    <section>
        <div v-if="isLoading" class="d-flex justify-content-center py-4">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else class="container">
            <h3 class="text-left">{{ event.title }}</h3>
            <p class="text-left">Updated at {{ dateTimeFormat(event.updated_at) }} </p> 
            <p class="text-left">Published by <span class="text-info">{{ event.user? event.user.name: null }}</span></p>
            <p class="text-left">Location - {{ event.location }} </p> 
            <p class="text-left">Schedule time - <span class="text-info">{{ dateTimeFormat(event.time) }}</span></p> 
            <article class="text-justify">Description - {{ event.description }}</article>
        </div>
    </section>
</template>
