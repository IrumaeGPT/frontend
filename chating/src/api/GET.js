import axios from "axios";

export async function testApi() {
    const response = await axios.get("/api/hello")
    console.log(response)
    return response.data
}

export async function getChat(name) {
    const response = await axios.get("/get/chating/"+name)
    console.log(response.data)
    return response.data
}