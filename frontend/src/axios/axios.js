import axios from "axios";

// const BASE_URL = "https://api-zingmp3-vercel.vercel.app/api"
const BASE_URL = "http://192.168.1.13:5000/api"

//192.168.1.3

const MONGO_BASE_URL = 'http://192.168.1.13:5000/api/v1' //changable
export const mongoAPI = axios.create({
    baseURL: MONGO_BASE_URL
})

export const zingMp3Api = axios.create({
    baseURL: BASE_URL
})