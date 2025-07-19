// src/components/Chatbot.jsx

import React, { useState, useRef } from "react"
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput
} from "@chatscope/chat-ui-kit-react"
import { FaRobot, FaTimes } from "react-icons/fa"
import { generateGeminiReply } from "../utils/gemini"

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const historyRef = useRef([])

  const handleSend = async (text) => {
    // User message
    setMessages((m) => [...m, { sender: "user", message: text }])
    historyRef.current.push({ parts: [{ text }] })

    // Bot reply
    try {
      const reply = await generateGeminiReply(text, historyRef.current)
      setMessages((m) => [...m, { sender: "bot", message: reply }])
      historyRef.current.push({ parts: [{ text: reply }] })
    } catch (err) {
      console.error(err)
      const errorMsg = err.message.includes("403")
        ? "Permission error – check your API key/permissions"
        : err.message
      setMessages((m) => [...m, { sender: "bot", message: `❗ ${errorMsg}` }])
    }
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
            <span>Ask Alan 🤖</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <FaTimes />
            </button>
          </div>
          <MainContainer>
            <ChatContainer>
              <MessageList>
                {messages.map((m, i) => (
                  <Message
                    key={i}
                    model={{ message: m.message, sender: m.sender }}
                  />
                ))}
              </MessageList>
              <MessageInput
                placeholder="Type your question…"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </>
  )
}
