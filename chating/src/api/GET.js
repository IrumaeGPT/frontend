import axios from "axios";

export async function testApi() {
    const response = await axios.get("/api/hello")
    return response.data
}

export async function getChat(name) {
    const response = await axios.get("/get/chating/"+name)
    return response.data
}