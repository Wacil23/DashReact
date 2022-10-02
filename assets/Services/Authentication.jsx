import Axios from 'axios';
import jwtDecode from 'jwt-decode';
const API_LOG = "https://localhost:8000/login_check";


function logout() {
    window.localStorage.removeItem('AuthToken');
    delete Axios.defaults.headers['Authorization'];
}

function auth(credentials) {
    return Axios.post(API_LOG, credentials, { withCredentials: true })
    .then((response) => response.data.token)
    .then(token => {
        window.localStorage.setItem('AuthToken', token);
        setAxiosToken(token)
        isAuth()
    })
}

function setup() {
    const token = window.localStorage.getItem("AuthToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
        }
    }
}

function setAxiosToken(token) {
    Axios.defaults.headers['Authorization'] = "Bearer " + token;
}

function isAuth() {
    const token = window.localStorage.getItem("AuthToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        console.log(new Date().getTime())
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}


export default {
    auth,
    logout,
    setup,
    isAuth,
};