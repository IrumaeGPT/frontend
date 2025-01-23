import { getChat, testApi } from "../api/GET"
import { addChat } from "../api/POST"
import "./ChatingPage.css"
import {useRef,useEffect, useState} from "react"
import userImg from "../asset/image/irumae.jpeg"
import { ReactComponent as Exit } from '../asset/image/취소표시.svg'
import { ReactComponent as Learning } from '../asset/image/학습.svg'
import Modal from "react-modal"
import { use } from "react"

function ChatingPage() {

    const [messageList,setMessageList] = useState([])
    const [user,setUser] = useState("관리자1")
    const [isOpen, setIsOpen] = useState(false)
    const chatBoxRef = useRef(null)

    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false)
    }

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
    
    function sendMessage(message,setMessage,isLearning){
        const data = {
            "userId" : user,
            "query" : message,
            "isTest" : isLearning
        }
        setMessage("")
        const waitMessage=[
            {"sender_name":data.userId,"receive_name":"이루매GPT","content":message},
            {"sender_name":"이루매GPT","receive_name":data.userId,"content":"....."}
        ]
        if(!isLearning){
            setMessageList([...messageList, ...waitMessage])
        }

        addChat(data).then((response)=>{
            if(!isLearning){
                console.log(response)
                getChat(data.userId).then((response2)=>{
                    setMessageList(response2)
                })
            }
            else{
                alert("학습 되었습니다.")
                closeModal()
            }
        })
    }

    function handleKeyDown(event,message,setMessage,isLearning) {
        if(event.key==="Enter") {
            sendMessage(message,setMessage,isLearning);
        }
    }

    function ChatingHeader() {
        return(
            <div className="chatingheader">
                <div>
                    <Exit className="icon"></Exit>
                    <h2 className="title">이루매 GPT</h2>
                </div>
                <div onClick={()=>{openModal()}}> 
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

        return (
            <div className="messagebarcomponent">
                <div className="messagebar">
                    <textarea placeholder="메시지 입력" onKeyDown={(event)=>{handleKeyDown(event,message,setMessage,false)}} type="text" onChange={(event)=>{changeHandler(event)}}></textarea>
                </div>
                <div className="messagebaricon">
                    <div onClick={()=>{openModal()}}>
                        <Learning className="icon" style={{fill:"#004094",marginLeft:"24px"}}></Learning>
                    </div>
                    <button className="sendbutton"><h2>전송</h2></button>
                </div>
            </div>
        )
    }

    function ModalContent(){
        const [learningContent,setLearningContent] = useState("")
        const [isWait,setIsWait] = useState(false)

        function changeHandler(event) {
            setLearningContent(event.target.value)
            console.log(learningContent)
        }


        if(isWait){
            return(
                <div className="isWait">
                    <h2>학습 중입니다.</h2>
                    <h2>잠시 기다려주세요.</h2>
                </div>
            )
        }
        
        return(
            <div className="modalcontent">
                <h2>학습할 내용을 입력해주세요.</h2>
                <textarea placeholder="입력" onChange={(event)=>{changeHandler(event)}}></textarea>
                <button onClick={()=>{
                    sendMessage(learningContent,setLearningContent,true)
                    setIsWait(true)
                    }}><h4>입력</h4></button>
            </div>
        )
    }

    const customModalStyles={
        overlay: {
            backgroundColor : "rgba(0,0,0,0.5)",
        },
        content : {
            width : "300px",
            height : "400px",
            margin : "auto",
            borderRadius : "4px",
            boxShadow : "0 2px 4px rgba(0,0,0,0.2)",
            padding: "20px"
        }
    }

    return(
        <div className="chatingpage"> 
            <ChatingHeader></ChatingHeader>
            <ChatingMain></ChatingMain>
            <MessageBar></MessageBar>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customModalStyles}>
                <ModalContent></ModalContent>
            </Modal>
       </div>
    )
}

export default ChatingPage