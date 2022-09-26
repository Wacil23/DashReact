import Axios from 'axios';

const API_URL = "https://localhost:8000/api/login_check";

function auth(credentials) {
    return Axios.post(API_URL, credentials, {withCredentials: true}).then(
        response => console.log(response));
}

export default auth;