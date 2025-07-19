// src/components/Chatbot.jsx

import React, { useState, useRef } from "react"
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput
} from "@chatscope/chat-ui-kit-react"
import { FaRobot } from "react-icons/fa"  // Robot icon

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const historyRef = useRef([])

  const handleSend = (text) => {
    setMessages(ms => [...ms, { sender: "user", message: text }])
    const reply = {
      sender: "bot",
      message: "Thanks for your message! I'll get back to you soon."
    }
    setMessages(ms => [...ms, reply])
    historyRef.current.push(text, reply.message)
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-indigo-600 p-4 rounded-full text-white shadow-lg hover:bg-indigo-700 transition"
          aria-label="Open chat"
        >
          <FaRobot size={24} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="flex items-center justify-between bg-indigo-600 p-2 text-white">
            <span>Chat with me</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <FaRobot size={20} />
            </button>
          </div>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((m, i) => (
                  <Message key={i} model={{ message: m.message, sender: m.sender }} />
                ))}
              </MessageList>
              <MessageInput placeholder="Type your question…" onSend={handleSend} />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </>
  )
}
