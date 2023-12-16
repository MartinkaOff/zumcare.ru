import React from 'react';

interface ChatBoxProps {
    message: string;
    icon: string
}



const ChatBoxComponent: React.FC<ChatBoxProps> = ({ message, icon }) => {
    return (
        <p className="message-container"><img className="ai-img" src={`/${icon}`} max-width={100} height={30} alt="" />{message}</p>
    );
  };
  
export default ChatBoxComponent;