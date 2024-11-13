import React,{useRef} from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap"
import { Send } from "react-feather"
import senderImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import receiverImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import reactDom from "react-dom"
import { useTranslation } from "utility/language"
import AddImageModal from "./AddImageModal"
import ImageModal from "./ImageModal"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { baseURL } from "api/config"

export default function ChatWidget({vendorName,send,conversation,vendor,mutation}) {
  const [addModal,setAddModal]=React.useState(false);
  const [imageModal,setImageModal]=React.useState(false);
  const [image,setImage]=React.useState("");
  
  const ref=useRef(null);
  const t=useTranslation();
  


  const messages =React.useMemo(()=>[
      ...conversation
  ],[conversation]) 
  const [message,setMessage]=React.useState("");

  React.useEffect(() => {
    if(ref.current){

      const chatContainer = reactDom.findDOMNode(ref.current)
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  },[conversation] );




  let renderChatList = messages.map((chat, i) => {
    return (
      <div
        key={i}
        className={`chat ${chat.sender_id!==vendor ? "chat-right" : "chat-left"}`}
      >
        
        <div className="chat-avatar">
          <div className="avatar m-0">
            <img
              src={chat.sender_id!==vendor ? senderImg : receiverImg}
              alt="chat avatar"
              height="40"
              width="40"
            />
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-content">
            {chat.image&&<img onClick={()=>{
              
              setImage(`${baseURL}${chat.image}`);
              setImageModal(true)
              
              }} style={{width:"100%",height:"100%",objectFit:"contain",cursor:"pointer",marginBottom:"5px"}} src={`${baseURL}${chat.image}`} alt="message_image"/>}
            {chat.content&&<p>{chat.content}</p>}
          </div>
            <p className="chat-content-footer">{chat.created_at}</p>
        </div>
         
       
      </div>
    )
  })

  return (
    <>
    <Card className="chat-application chat-widget">
      <CardHeader>
        <CardTitle>{vendorName}</CardTitle>
      </CardHeader>
      <div className="chat-app-window">
        <PerfectScrollbar
          className="user-chats widget-user-chat"
          options={{
            wheelPropagation: false
          }}
          ref={ref}
         
        >
          <div   className="chats">{renderChatList}</div>
          
        </PerfectScrollbar>
        <div    className="chat-footer">
          <CardBody className="d-flex justify-content-around">
            <Input
              className="mr-50"
              placeholder={t("type_your_message")}
              value={message}
              onChange={e =>
                  setMessage(e.target.value)
              }
            />
            <Button
               color="primary"
               onClick={()=>setAddModal(true)}
               style={{margin:"0 10px",padding:"10px"}}
              >
              <AddPhotoAlternateIcon size={20}/>

            </Button>
            <Button
              className="btn-icon"
              color="primary"
              onClick={()=>{send({content:message,vendor_id:vendor});setMessage("")}}
              disabled={message.length===0}
            >
              <Send size={15} />
            </Button>
          </CardBody>
        </div>
      </div>
    </Card>
    <AddImageModal mutation={mutation} vendor={vendor} isOpen={addModal} setIsOpen={setAddModal} message={message} setMessage={setMessage} send={send}/>
    <ImageModal isOpen={imageModal} setIsOpen={setImageModal} image={image}/>
    </>
  )
}
