import { getChat, testApi } from "../api/GET"
import { addChat } from "../api/POST"
import "./ChatingPage.css"
import {useRef,useEffect, useState} from "react"
import userImg from "../asset/image/user.jpg"

function ChatingPage() {

    const [messageList,setMessageList] = useState([])
    const [user,setUser] = useState("맹구")
    const chatBoxRef = useRef(null)

    useEffect(() => {
        getChat(user).then((response)=>{
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
    
    function ChatingHeader() {
        return(
            <div className="chatingheader">
                <h2 className="title">이루매 GPT</h2>
            </div>
        )
    }

    function ChatingMain() {

        function MessageBox(props) {
            const content=[]
            if(props.sender===user){
                content.push(
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                    <div className="sendermessage">
                    <h2 className="sendercontent" style={{textAlign:"right"}}> {props.content} </h2>
                    </div>  
                    <div className="senderprofile" style={{display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
                        <img src={userImg} width="30px" height="30px" alt="없음"></img>
                    </div>
                    </div>)
            }
            else{
                content.push(<div className="receivermessage"><h2 className="receivercontent"> {props.content} </h2></div>)
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
                "sender_name" : user,
                "receiver_name" : "이루매GPT",
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
            <div className="messagecomponent">
                <input className="messagebar" type="text" onChange={(event)=>{changeHandler(event)}}></input>
                <button className="sendbutton" onClick={(event)=>{sendMessage(event)}}></button>
            </div>
        )
    }

    return(
        <div className="chatingpage"> 
            <ChatingHeader></ChatingHeader>
            <ChatingMain></ChatingMain>
            <MessageBar></MessageBar>
       </div>
    )
}

export default ChatingPage