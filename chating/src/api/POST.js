import axios from "axios"

export async function addChat(data) {
    const response = await axios.post("/api/add/chat",data)
    return response.data
}