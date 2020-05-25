<script>
export default {
    name:'latestNews',
    props: {
        newsList: {
            type: Array,
            required: true,
        },
        limit: {
            type: Number,
            default: 4,
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
        <div class="card-title py-1 bg-dark text-white">Latest News</div>
        <div class="row">
            <div v-for="news in newsList.slice(0, limit)" :key="news.id" class="col-md-6 my-2">
                <div class="card">
                    <!-- <img class="card-img-top" src="" alt="Card image cap"> -->
                    <div class="card-body">
                        <h5 class="card-title">{{ news.title }}</h5>
                        <p class="">By {{ news.user.name }} </p>
                        <p class="">Published {{ news.created_at }}</p>
                        <p class="card-text">{{ truncate(news.description, 100) }}</p>
                        <a href="#" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>