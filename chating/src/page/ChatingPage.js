import { getChat, testApi } from "../api/GET"
import { addChat } from "../api/POST"
import "./ChatingPage.css"
import {useRef,useEffect, useState} from "react"
import userImg from "../asset/image/irumae.jpeg"
import { ReactComponent as Exit } from '../asset/image/취소표시.svg'
import { ReactComponent as Learning } from '../asset/image/학습.svg'

function ChatingPage() {

    const [messageList,setMessageList] = useState([])
    const [user,setUser] = useState("철수")
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
                <div>
                    <Exit className="icon"></Exit>
                    <h2 className="title">이루매 GPT</h2>
                </div>
                <div> 
                    <Learning className="icon"></Learning>
                </div>
            </div>
        )
    }

    function ChatingMain() {
        function MessageBox(props) {
            const content=[]
            if(props.sender===user){
                content.push(
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end", marginTop:"40px"}}>
                        <div className="sendermessage">
                            <h2 className="sendercontent"> {props.content} </h2>
                        </div>  
                    </div>)
            }
            else{
                content.push(
                <div style={{display:"flex",alignItems:"end", marginTop:"40px",marginLeft:"17px"}}>
                   
                    <div className="receiverimg" style={{width:"40px"}}></div>
                    
                    <div className="receivermessage">
                        <h2 className="receivercontent"> {props.content} </h2>
                    </div>
                </div>)
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
                "userId" : user,
                "query" : message,
                "isTest" : false
            }
            setMessage("")
            const waitMessage=[
                {"sender_name":data.userId,"receive_name":"이루매GPT","content":message},
                {"sender_name":"이루매GPT","receive_name":data.userId,"content":"....."}
            ]
            setMessageList([...messageList, ...waitMessage])

            addChat(data).then((response)=>{
                console.log(response)
                getChat(data.userId).then((response2)=>{
                    setMessageList(response2)
                })
            })
        }
    
        function handleKeyDown(event) {
            if(event.key==="Enter") {
                sendMessage(event);
            }
        }

        return (
            <div className="messagebarcomponent">
                <div className="messagebar">
                    <textarea placeholder="메시지 입력" onKeyDown={(event)=>{handleKeyDown(event)}} type="text" onChange={(event)=>{changeHandler(event)}}></textarea>
                </div>
                <div className="messagebaricon">
                    <Learning className="icon" style={{fill:"#004094",marginLeft:"24px"}}></Learning>

                    <button className="sendbutton"><h2>전송</h2></button>

                </div>
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