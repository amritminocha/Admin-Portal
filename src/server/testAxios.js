import axios from 'axios';

const instance=axios.create({
    baseURL: 'gs://react-example-59018.appspot.com'
});

export default instance;