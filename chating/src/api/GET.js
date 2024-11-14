import axios from "axios";

export async function testApi() {
    const response = await axios.get("/api/hello")
    console.log(response)
    return response
}