import Axios from 'axios';

const API_URL = "https://localhost:8000/login_check";

function auth(credentials) {
    return Axios.post(API_URL, credentials).then(
        response => console.log(response));
}


Axios.interceptors.request.use(request => {
    console.log(request);
    return request;
  })

export default auth;