import moment from 'moment';

export default {
    methods: {
        /* eslint-disable no-unused-vars */
        dateTimeFormat(datetime, format = 'MMMM Do YYYY') {
            return moment(datetime).format(format);
        }
    }
}