import axios from "axios";

const BASE_URL = "https://e879-2001-ee0-169-d332-2919-9479-7a2-ae10.ngrok-free.app/api"

const MONGO_BASE_URL = 'https://e879-2001-ee0-169-d332-2919-9479-7a2-ae10.ngrok-free.app/api/v1' //changable


export const mongoAPI = axios.create({
    baseURL: MONGO_BASE_URL
})

export const zingMp3Api = axios.create({
    baseURL: BASE_URL
})