import axios from "axios";

// const BASE_URL = "https://api-zingmp3-vercel.vercel.app/api"
const BASE_URL = " https://9fd2-2405-4800-5b0e-115a-9db-127e-14f3-dfd5.ngrok-free.app/api"

//192.168.1.3

export const zingMp3Api = axios.create({
    baseURL: BASE_URL
})