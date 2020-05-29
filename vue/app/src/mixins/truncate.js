export default {
    methods: {
        /* eslint-disable no-unused-vars */
        truncate(text, length = 200) {
            if(text.length > length) {
                return text.substring(0, length) + '...';
            }
            else return text;
        }
    }
}