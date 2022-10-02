import axios from "axios";
const API_CUSTOMERS = 'https://localhost:8000/api/customers';
const API_CUSTOMER = 'https://localhost:8000/api/customers/';

function findAll() {
    return axios
        .get(API_CUSTOMERS)
        .then(response => response.data['hydra:member'])
}

function deleteCustomer(id) {
    return axios
        .delete(API_CUSTOMER + id)
}

function updateCustomer(id, customer){
    return axios.put(API_CUSTOMER + id, customer);
}

function find(id){
   return axios.get(API_CUSTOMER + id).then(response => response.data);
}

function create(customer){
    return axios.post(API_CUSTOMERS, customer);
}

export default {
    findAll,
    delete: deleteCustomer,
    find,
    update: updateCustomer,
    create
}