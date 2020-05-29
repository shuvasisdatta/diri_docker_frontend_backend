<script>
import dateTimeFormat from '@/mixins/dateTimeFormat';
export default {
    name: 'newsDetail',
    data() {
        return {
            news: {},
            isLoading: false,
        }
    },
    mixins: [dateTimeFormat],
    methods: {
        async getNews () {
            let newsId = this.$route.params.id;
            let url = '/news/' + newsId;
            this.isLoading = true;
            try {
                let res = await this.$http.get(url);
                // console.log(res);
                this.news = res.data;
                this.isLoading = false;
            } catch (err) {
                console.log(err);
            }
        }
    },
    mounted() {
        this.getNews();
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
            <h3 class="text-left">{{ news.title }}</h3>
            <p class="text-left">Updated @ {{ dateTimeFormat(news.updated_at) }} </p> 
            <p class="text-left">Published by <span class="text-info">{{ news.user? news.user.name: null }}</span></p>
            <article class="text-justify">{{ news.description }}</article>
        </div>
    </section>
</template>
