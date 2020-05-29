<script>
import truncate from '@/mixins/truncate';
export default {
    name:'latestNews',
    data() {
        return {
            isLoading: false,
            error: false,
            newsList: [],
            limit: 4,
        }
    },
    mixins: [truncate],
    methods: {
        async getNews() { 
            const url = '/news';
            try {
                this.isLoading = true;
                let res = await this.$http.get(url);
                this.newsList = res.data;
                // console.log(res);
                this.error = false;
                this.isLoading = false;
            } catch (err) {
                this.isLoading = false;
                this.error = true;
                console.log(err);
            }
        },   
    },
    mounted() {
        this.getNews();
    }
}
</script>

<style lang="css" scoped>
.news {
    height: 400px;
}
</style>

<template>
    <section class="card bg-light">
        <div class="card-title py-1 bg-dark font-weight-bold text-white">Latest News</div>
        <div v-if="error" class="text-danger">Data fetching failed!</div>
        <div v-if="isLoading" class="d-flex justify-content-center py-4">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div v-else class="card-body row">
            
            <div  v-for="news in newsList.slice(0, limit)" :key="news.id" class="col-md-6 my-2 text-left">
                <div class="card news">
                    <!-- <img class="card-img-top" src="" alt="Card image cap"> -->
                    <div class="card-body">
                        <h5 class="card-title">{{ news.title }}</h5>
                        <p class="">By <span class="text-info">{{ news.user.name }}</span></p>
                        <p class="">Published at {{ $moment(news.created_at).format('MMMM Do YYYY') }}</p>
                        <p class="card-text text-justify">{{ truncate(news.description, 150) }}</p>
                        <router-link :to="'/news/' + news.id" class="btn btn-primary">Read More</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>