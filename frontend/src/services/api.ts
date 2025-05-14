import axios from "axios";
import { API_URL } from "@/config/config";

export const apiRequest = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})