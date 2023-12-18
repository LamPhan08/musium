import axios from "axios";

// const BASE_URL = "https://api-zingmp3-vercel.vercel.app/api"
// const BASE_URL = " https://9fd2-2405-4800-5b0e-115a-9db-127e-14f3-dfd5.ngrok-free.app/api"

const BASE_URL = "http://192.168.1.5:5000/api"

//192.168.1.3

const MONGO_BASE_URL = 'http://192.168.1.5:5000/api/v1' //changable
export const mongoAPI = axios.create({
    baseURL: MONGO_BASE_URL
})

export const zingMp3Api = axios.create({
    baseURL: BASE_URL
})