import axios from "axios";

const BASE_URL = "http://192.168.1.9:5000/api"
// const BASE_URL = "http://192.168.1.3:5000/api"
//192.168.1.3

export const zingMp3Api = axios.create({
    baseURL: BASE_URL
})