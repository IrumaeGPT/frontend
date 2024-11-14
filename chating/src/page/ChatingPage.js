import { getChat, testApi } from "../api/GET"
import { addChat } from "../api/POST"
import "./ChatingPage.css"
import {useRef,useEffect, useState} from "react"


function ChatingPage() {

    const [messageList,setMessageList] = useState([])
    const chatBoxRef = useRef(null)

    useEffect(() => {
        getChat("A").then((response)=>{
            setMessageList(response)
            console.log(response)
        })
      },[]);

      useEffect(() => {
        const chatBox = chatBoxRef.current;
        
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messageList]); // messageList가 업데이트될 때마다 실행
    
    function ChatingMain() {

        function MessageBox(props) {
            const content=[]
            if(props.sender==="A"){
                content.push(<h2 style={{textAlign:"right"}}> {props.content} : {props.sender} </h2>)
            }
            else{
                content.push(<h2> {props.sender} : {props.content} </h2>)
            }
            return(
                <div>
                    {content}
                </div>
            )
        }

        const all_messages=[]
        for(let i=0;i<messageList.length;i++){
            all_messages.push(<MessageBox sender={messageList[i].sender_name} content={messageList[i].content}></MessageBox>)
        }
        return(
            <div ref={chatBoxRef} className="chatingbox">
                {all_messages}
            </div>
        )
    }

    function MessageBar() {
        const [message,setMessage] = useState("")
        function changeHandler(event) {
            setMessage(event.target.value)
        }

        function sendMessage(event){
            const data = {
                "sender_name" : "A",
                "receiver_name" : "B",
                "content" : message
            }
            addChat(data).then((response)=>{
                console.log(response)
                getChat(data.sender_name).then((response2)=>{
                    setMessageList(response2)
                })
            })
        }
    
        return (
            <div>
                <input className="messagebar" type="text" onChange={(event)=>{changeHandler(event)}}></input>
                <button className="sendbutton" onClick={(event)=>{sendMessage(event)}}>전송</button>
            </div>
        )
    }

    return(
        <div>
            <ChatingMain></ChatingMain>
            <MessageBar></MessageBar>
       </div>
    )
}

export default ChatingPage