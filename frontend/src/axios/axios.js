import axios from "axios";

const BASE_URL = "http://192.168.115.137:5000/api"

const MONGO_BASE_URL = 'http://192.168.115.137:5000/api/v1' //changable


export const mongoAPI = axios.create({
    baseURL: MONGO_BASE_URL
})

export const zingMp3Api = axios.create({
    baseURL: BASE_URL
})