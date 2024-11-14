import { testApi } from "../api/GET"
import "./ChatingPage.css"
import {useState} from "react"

function ChatingMain() {
    return(
        <div className="chatingbox">
            메인 채팅 창
        </div>
    )
}

function MessageBar() {
    const [message,setMessage] = useState("")
    function changeHandler(event) {
        setMessage(event.target.value)
        console.log(message)
    }

    function sendMessage(event){
        console.log(message)
    }

    return (
        <div>
            <input className="messagebar" type="text" onChange={(event)=>{changeHandler(event)}}></input>
            <button className="sendbutton" onClick={(event)=>{sendMessage(event)}}>전송</button>
        </div>
    )
}

function ChatingPage() {
    return(
        <div>
            <ChatingMain></ChatingMain>
            <MessageBar></MessageBar>
       </div>
    )
}

export default ChatingPage