import axios from 'axios';

const baseURL = "https://backend-cafe-rn.herokuapp.com/api"

const casfeApi = axios.create({baseURL});

export default casfeApi;