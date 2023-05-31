import React, { useState } from "react";
import avatar1 from "../assets/avatar1.jpeg";
import avatar2 from "../assets/tar2.jpg";

const Sidebar = () => {
  const conversation = [
    {
      name: "Akash",
      gender: "male",
      convo: [
        { akash: "Hello how are you" },
        { user: "im good hpw are you" },
        { akash: "how have you been" },
      ],
      image: avatar1,
    },
    {
      name: "Aditya",
      gender: "male",
      convo: [
        { Aditya: "Hello how are you" },
        { user: "im good hpw are you" },
        { Aditya: "how have you been" },
      ],
      image: avatar2,
    }
  ];//initialy using an array to immetiate data receive from an API of a conversation taking place, can be replaced by an API from which conversatin can be fetched
  const colors = [
    { color: "blue" },
    { color: "green" },
    { color: "red" },
    { color: "black" },
  ];//an array that contains the color of theme you want to apply 

  const [message, setMessage] = useState(conversation);
  const [themeColor, setthemeColor] = useState("default");
  const [showMessageScreen, setShowMessageScreen] = useState(false);
  const [selectedChat, setSelectedChat] = useState("");
  const [selectedChatImg, setSelectedChatImg] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false)


  const handleClick = (value, img) => {
    setSelectedChatImg(img);
    setSelectedChat(value);
    setShowMessageScreen(true);
  };

  const changeShowMsgScreen = () => {
    setShowMessageScreen(false);
  };

  const changeTheme = (value) => {
    setthemeColor(value);
  };

  const handleToggle = () => {
    setToggleBtn(value => !value)
  }

  return (
    <div className={`sidebar ${toggleBtn}`} id={themeColor}>
      <div className='togglebtn' onClick={() => { handleToggle() }}>{toggleBtn ? 'Close' : 'Chat'}</div>
      <header>Chat Box</header>
      <div className="theme">
        {colors.map((value,index) => (
          <div key={index}
            id={value.color}
            onClick={() => {
              changeTheme(value.color);
            }}
            style={{ background: value.color }}
            className="colorCircle"
          ></div>
        ))}
      </div>{/* theme circles that will change the theme of the chat when it is clicked */}
      <main className="mainContent">
        {showMessageScreen ? (
          <MessageScreen
          
            value={selectedChat}
            userImg={selectedChatImg}
            MsgScreen={changeShowMsgScreen}
          />
        ) : (
          message.map((value, key) => (
            <div
              key={key}
              className="userButton"
              onClick={() => {
                handleClick(value, value.image);
              }}
            >
              <div className="imgContainer">
                <img src={value.image} alt="avatar1" />
              </div>
              <h3>{value.name}</h3>
            </div>
          ))
        )}
      </main>{/* here the main will show MessageScreen component when the user clicks on one of the chats, otherwise it will just show the number of users */}
    </div>
  );
};
        /*------MessageScreen starts--------*/
const MessageScreen = ({ value, MsgScreen, userImg }) => {

  const [userConversation, setUserConversation] = useState(localStorage.getItem('conversation')?JSON.parse(localStorage.getItem('conversation')):value.convo);
  const [message, setMessage] = useState({});

React.useEffect(()=>{
   userConversation&&localStorage.setItem('conversation',JSON.stringify(userConversation))
    
},[userConversation])

React.useEffect(()=>{
  const arrayMessages = JSON.parse(localStorage.getItem('conversation'));
    arrayMessages&&setUserConversation(arrayMessages)
},[])
 
  const handleSubmit = () => {
setUserConversation((pre)=>[...pre,message])
    setMessage({})
  }

  return (
    <div className="messageScreen">
      <header className="chatHeader">
        <div
          className="button"
          onClick={() => {
            MsgScreen();
          }}
        >
          Back
        </div>
        <div className="userImage"><img src={userImg} alt="userimage" /></div>
        <div className="userName">

          {value.name}
        </div>
      </header>
      <section className="mainChat">
        {userConversation.map((value,index) => (
          <div key={index} className="message"  >

            <div className={Object.keys(value)[0] === 'user' ? 'userMessage' : 'senderMessage'}>{Object.values(value)[0]}</div>
          </div>
        ))}
      </section>
      <div className="textarea">
        <input
          onChange={(e) => { setMessage({ 'user': `${e.target.value}` }) }}
          type="textarea"
          placeholder="Write Something"
        />
        <button className="submit" onClick={() => { handleSubmit() }}>Send</button>
      </div>
    </div>
  );
};

export default Sidebar;

/*------MessageScreen starts--------*/