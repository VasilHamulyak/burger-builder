import axios from 'axios';

axios.create({
    baseURL: 'https://burger-builder-a58f4.firebaseio.com/'
})

export default axios;