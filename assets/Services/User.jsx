import axios from 'axios';

function me() {
    return axios.get('https://localhost:8000/api/me', { withCredentials: true }).then(response => console.log(response))
}

export default {
    me
};