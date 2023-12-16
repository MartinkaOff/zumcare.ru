import React, { useState } from 'react';
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import OpenAI from 'openai';
import { useTranslation } from 'react-i18next';


import './AI.css'
import { Button } from 'react-bootstrap';
import ChatBoxComponent from './ChatBoxComponent';

export function AI() {

  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [buttonState, setButtonState] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [messages, setMessages] = useState([{ message: t("helloChatAi"), icon: "logo.svg" }])
  const onChange = (event) => setValue(event.target.value);
  const OPENAI_API_KEY = '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'


  // const handleSubmit = async(type) => {
  //     if(!prompt) return alert("Please enter a prompt");

  //     try{
  //       const response = await fetch('http://localhost:8080/api/v1/dalle', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           prompt,
  //         })
  //       }) 
  //       const data = await response.json();
  //       console.log(data);
  //       // handleDecals(type, `data:image/png;base64,${data.photo}`)
  //     } catch(error){
  //       alert(error);
  //     }
  // }

  const APIBody = {
    "model": "gpt-3.5-turbo",
    "messages": [{
      "role": "user", "content": `
    
    Используя техники психологии ведя притваряясь моим доктором помоги мне с этой проблемой(предлагай мне какие нибудь техники, методики, которые я могу сделать сам чтобы мне стало лучше. Но не зацикливайся только на них, ты должен выразить мне поддержку как человек, психолог. Не делай вступлений по типу "Да, конечно я вам помогу" а сразу начинай диалог. Все это должно быть в 1 сообщении ответ на том же языке что и я тебе написал. Не спрашивай меня о дополнительных данных): ` + value
    }],
    "temperature": 0,
    "max_tokens": 1000,
    "top_p": 1.0,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.0,
  }



  async function runConversation() {
    setButtonState(true);
    setDisableButton(true);
    setMessages(prevState => [...prevState, { message: value, icon: "person-icon.png" }])
    console.log(APIBody);
    //  const messages = ,;
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      body: JSON.stringify(APIBody),
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setButtonState(false);
      setMessages(prevState => [...prevState, { message: `${data.choices[0].message.content}`, icon: "logo.svg" }]);

    })

  }
  return (
    <Container className="wrapper">
      <Row>
        <Col><h2>AI Chat</h2></Col>
      </Row>
      <Row>
        <Col className='chat-box'>

          {messages.map((messageObject: { message: string, icon: string }, index: number) => (
            <ChatBoxComponent message={messageObject.message} icon={messageObject.icon} />
          ))

          }
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className='ai-form'>
            <Form.Group className='form-controll'>
              <Form.Control className='textarea' value={value} onChange={onChange} placeholder='Введите свой запрос сюда' as="textarea" rows={3} cols={50} />
            </Form.Group>
            <Button className='buttonContainer' disabled={disableButton ? true : false} onClick={runConversation}>
              <Spinner className={buttonState ? "show" : "hide"} animation="border" role="status">
              </Spinner>
              <span>{buttonState ? "Загрузка..." : "Отправить"}</span>
            </Button>
          </Form>

        </Col>
      </Row>
    </Container>
  )

}