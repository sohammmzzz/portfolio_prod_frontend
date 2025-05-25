"use client"

import type React from "react" // Base React types
import { useState, useRef, useEffect, HTMLAttributes } from "react" // Added HTMLAttributes
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Mic, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// If you want to be very precise with the 'node' type, you might import from 'hast'
// import type { Element } from 'hast';

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

interface ChatPayload {
  history: Array<{ sender: "user" | "ai"; text: string }>;
  query: string;
}

// Define a type for the props passed to the custom 'code' renderer
interface CustomCodeRendererProps extends HTMLAttributes<HTMLElement> {
  node?: any; // The AST node from 'hast' (using 'any' for simplicity here)
  inline?: boolean; // This is the key prop react-markdown adds for code
  // className is already part of HTMLAttributes<HTMLElement>
  // children is already part of HTMLAttributes<HTMLElement>
}


export default function ChatAssistant() {
  const prod ="https://portfolio-prod-backend.onrender.com/api/chat/"
  const non_prod ="http://127.0.0.1:8000/api/chat/"
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Sam - Soham's AI assistant turned digital snitch. His secrets are safe with me... just kidding! Fire away! 🤖",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showVoiceModal, setShowVoiceModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = async (userInput: string, currentMessages: Message[]): Promise<string> => {
    const historyPayload = currentMessages.map(msg => ({
      sender: msg.sender,
      text: msg.text,
    }));

    const payload: ChatPayload = {
      history: historyPayload,
      query: userInput,
    };

    try {
      const apiResponse = await fetch(prod, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!apiResponse.ok) {
        let errorData;
        try {
            errorData = await apiResponse.json();
        } catch (e) {
            errorData = { error: `API request failed with status ${apiResponse.status}` };
        }
        console.error("API Error:", apiResponse.status, errorData);
        throw new Error(errorData.error || `API request failed with status ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      return data.response || "Received an empty response from the API.";

    } catch (error) {
      console.error("Error calling chat API:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to get response: ${error.message}`);
      }
      throw new Error("An unknown error occurred while fetching the response.");
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    const messagesForHistory = [...messages];

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue;
    setInputValue("")
    setIsTyping(true);

    try {
      const responseText = await generateResponse(currentInput, messagesForHistory)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessageText = error instanceof Error ? error.message : "Sorry, I encountered an error trying to respond.";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessageText,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleVoiceClick = () => {
    setShowVoiceModal(true)
  }

  return (
    <>
      {/* Chat Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 relative overflow-hidden"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <MessageCircle size={24} className="text-white" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-950"
                />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] h-[600px] sm:w-[400px] sm:h-[650px] md:w-[480px] md:h-[70vh] lg:w-[500px] lg:h-[75vh]"
          >
            <Card className="h-full flex flex-col bg-slate-950/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 overflow-hidden">
              <CardHeader className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Chat with Sam</h3>
                      <p className="text-xs text-gray-400">AI Assistant</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col flex-grow overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            message.sender === "user" ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-slate-700"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <User size={12} className="text-white" />
                          ) : (
                            <Bot size={12} className="text-cyan-400" />
                          )}
                        </div>
                        <div
                          className={`px-3 py-2 rounded-lg text-sm ${ 
                            message.sender === "user"
                              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                              : "bg-slate-800 text-gray-300 border border-slate-700"
                          }`}
                        >
                          {message.sender === 'ai' ? (
                            <div className="prose prose-sm prose-invert max-w-none">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  a: ({node, ...props}) => <a {...props} className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                  pre: ({node, ...props}) => <pre {...props} className="bg-slate-900/70 p-2 my-2 rounded-md overflow-x-auto text-xs" />,
                                  // Correctly typed 'code' component renderer
                                  code: (props: CustomCodeRendererProps) => {
                                    const { node, inline, className, children, ...rest } = props;
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline ? ( // For block code
                                      <code className={`${className || ''} text-xs`} {...rest}>
                                        {children}
                                      </code>
                                    ) : ( // For inline code
                                      <code {...rest} className={`bg-slate-700/50 px-1 py-0.5 rounded text-xs font-mono ${className || ''}`}>
                                        {children}
                                      </code>
                                    );
                                  },
                                  ul: ({node, ...props}) => <ul {...props} className="list-disc list-outside pl-5 my-2" />,
                                  ol: ({node, ...props}) => <ol {...props} className="list-decimal list-outside pl-5 my-2" />,
                                  p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                                  blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-slate-700 pl-3 italic my-2 text-slate-400" />,
                                  h1: ({node, ...props}) => <h1 {...props} className="text-xl font-semibold my-3" />,
                                  h2: ({node, ...props}) => <h2 {...props} className="text-lg font-semibold my-2" />,
                                  h3: ({node, ...props}) => <h3 {...props} className="text-base font-semibold my-2" />,
                                }}
                              >
                                {message.text}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="break-words whitespace-pre-wrap">{message.text}</p>
                          )}
                          <p className="text-xs opacity-70 mt-1 text-right">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2 max-w-[85%]">
                        <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center shrink-0">
                          <Bot size={12} className="text-cyan-400" />
                        </div>
                        <div className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              className="w-2 h-2 bg-cyan-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              className="w-2 h-2 bg-cyan-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                              className="w-2 h-2 bg-cyan-400 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-slate-700 mt-auto">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleVoiceClick}
                      className="border-slate-600 text-gray-400 hover:text-cyan-400 hover:border-cyan-400"
                    >
                      <Mic size={16} />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Feature Modal */}
      <AnimatePresence>
        {showVoiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowVoiceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6 max-w-md w-full"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Mic size={32} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Voice Feature Coming Soon!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  🎤 I'm working on integrating advanced speech recognition for a more natural conversation experience.
                  This feature will allow you to speak directly with my AI assistant!
                </p>
                <Button
                  onClick={() => setShowVoiceModal(false)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                  Got it!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}