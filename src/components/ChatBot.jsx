import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Typewriter } from "react-simple-typewriter";
import { FiSend } from "react-icons/fi";
import { FaStop } from "react-icons/fa";
import DarkVeil from "../ReactBits/DarkVeil";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_OPEN_API_KEY);

const hardcodedQA = [
  {
    keywords: ["hi", "yo", "what's up"],
    responses: [
      "Hello dude!",
      "Hey there!",
      "Hi! How can I help?",
      "Yo! What's good?",
    ],
  },
  {
    keywords: ["skills", "what are your skills"],
    responses: [
      "I'm skilled in React, Node.js, and AI stuff!",
      "My skills include React, Python, and FastAPI.",
    ],
  },
  {
    keywords: ["projects"],
    response:
      "I've built an Emergency Sound Detection system, AI chatbots, and full-stack apps.",
  },
  {
    keywords: ["contact", "email"],
    response:
      "Reach me at prabhatbhasme@gmail.com or on LinkedIn @Prabhat8055.",
  },
];

const fallbackReplies = [
  "I'm learning new things every day—just like Prabhat!",
  "Try asking about skills or projects.",
  "Beep boop! You just triggered my curiosity module 🤖",
];

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingContent, setTypingContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(false);
  // Scroll to bottom on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const findHardcodedResponse = (text) => {
    const lower = text.toLowerCase();
    for (const qa of hardcodedQA) {
      if (qa.keywords.some((kw) => lower.includes(kw))) {
        const responses = qa.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    const hardcodedResponse = findHardcodedResponse(input);
    if (hardcodedResponse) {
      // Show typing effect for hardcoded
      setIsTyping(true);
      setTypingContent(hardcodedResponse);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: hardcodedResponse },
        ]);
        setIsTyping(false);
        setLoading(false);
      }, hardcodedResponse.length * 30); // typing speed approx 30ms per char

      return;
    }

    // Call Gemini AI
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chat = model.startChat({
        history: newMessages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chat.sendMessage(input);
      if (abortRef.current) {
        // If aborted, don't update UI
        setLoading(false);
        setIsTyping(false);
        return;
      }
      const response = await result.response;

      setIsTyping(true);
      setTypingContent(response.text());

      setTimeout(() => {
        if (!abortRef.current) {
          setMessages((prev) => [
            ...prev,
            { role: "model", content: response.text() },
          ]);
          setIsTyping(false);
          setLoading(false);
        }
      }, response.text().length * 30);
    } catch (err) {
      if (!abortRef.current) {
        console.error(err);
        alert("Something went wrong.");
        setLoading(false);
        setIsTyping(false);
      }
      // fallback message
      const fallback =
        fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      setIsTyping(true);
      setTypingContent(fallback);

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "model", content: fallback }]);
        setIsTyping(false);
        setLoading(false);
      }, fallback.length * 30);
    }
  };
  const clearChat = () => {
    setMessages([]);
  };
  const stopGenerating = () => {
    abortRef.current = true;
    setLoading(false);
    setIsTyping(false);
    setTypingContent("");
  };

  //   return (
  //     <div className="flex justify-center items-center h-[100vh]">
  //       <div className="sm:w-[95%] md:w-[75%] lg:w-[60%] xl:w-[50%] mx-auto p-4 md:p-6 bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col h-[calc(100vh-2rem)] md:h-[600px] lg:h-[500px]">
  //         <div className="flex flex-col gap-5 items-center mb-4 pb-2 border-b border-gray-700 ">
  //           <h2 className="text-xl md:text-2xl font-extrabold text-blue-400">
  //             Welcome to AI Chatbot
  //           </h2>
  //           <button
  //             onClick={clearChat}
  //             className="cursor-pointer"
  //             aria-label="Clear chat"
  //             title="Clear chat"
  //           >
  //             Clear Chat
  //           </button>
  //         </div>

  //         <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-800 rounded-lg space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
  //           {messages.map((msg, idx) => (
  //             <div
  //               key={idx}
  //               className={`max-w-[85%] p-3 rounded-xl break-words ${
  //                 msg.role === "user"
  //                   ? "bg-blue-600 text-white self-end ml-auto"
  //                   : "bg-gray-700 text-gray-200 self-start mr-auto"
  //               } ${
  //                 messages.length > 1 &&
  //                 idx > 0 &&
  //                 messages[idx - 1].role === msg.role
  //                   ? "mt-1"
  //                   : "mt-4"
  //               } `}
  //               style={{ maxWidth: "fit-content" }}
  //             >
  //               <span className="font-bold text-sm">
  //                 {msg.role === "user" ? "You" : "AI"}:
  //               </span>{" "}
  //               <span className="text-base leading-relaxed">{msg.content}</span>{" "}
  //             </div>
  //           ))}

  //           {isTyping && (
  //             <div className="max-w-[85%] p-3 rounded-xl bg-gray-700 self-start text-gray-200 mr-auto">
  //               <span className="font-bold text-sm">AI:</span>{" "}
  //               <Typewriter
  //                 words={[typingContent]}
  //                 cursor
  //                 cursorStyle="|"
  //                 typeSpeed={40}
  //                 deleteSpeed={0}
  //                 delaySpeed={1000}
  //                 loop={false}
  //                 key={typingContent}
  //               />
  //             </div>
  //           )}

  //           <div ref={messagesEndRef} />
  //         </div>
  //         <form
  //           onSubmit={(e) => {
  //             e.preventDefault();
  //             if (!loading) sendMessage();
  //           }}
  //           className="flex items-center gap-2 mt-4"
  //         >
  //           <input
  //             type="text"
  //             value={input}
  //             disabled={loading}
  //             onChange={(e) => setInput(e.target.value)}
  //             placeholder={
  //               loading
  //                 ? "Generating response..."
  //                 : "Ask about my skills, projects..."
  //             }
  //             className="flex-grow p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out"
  //           />
  //           <button
  //             type="submit"
  //             disabled={loading || !input.trim()}
  //             className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  //             aria-label="Send message"
  //           >
  //             <FiSend className="text-white w-5 h-5" />
  //           </button>
  //           {loading && (
  //             <button
  //               onClick={stopGenerating}
  //               className="ml-2 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-md text-sm font-semibold flex items-center"
  //               title="Stop Generating"
  //             >
  //               <FaStop />
  //             </button>
  //           )}
  //         </form>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="relative w-full flex justify-center items-center h-[100vh] bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <DarkVeil />
      </div>
      <div className="sm:w-[95%] md:w-[75%] lg:w-[60%] xl:w-[50%] mx-auto p-4 md:p-6 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl flex flex-col h-[calc(90vh-2rem)] md:h-[500px] lg:h-[500px] border border-white/20 z-20">
        <div className="flex flex-col gap-5 items-center mb-4 pb-2 border-b border-white/20">
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            Welcome to AI Chatbot
          </h2>
          <button
            onClick={clearChat}
            className="cursor-pointer hover:underline text-sm text-red-300"
            aria-label="Clear chat"
            title="Clear chat"
          >
            Clear Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-white/5 rounded-lg space-y-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] p-3 rounded-xl break-words ${
                msg.role === "user"
                  ? "bg-blue-600 text-white self-end ml-auto"
                  : "bg-white/20 text-white self-start mr-auto"
              } ${
                messages.length > 1 &&
                idx > 0 &&
                messages[idx - 1].role === msg.role
                  ? "mt-1"
                  : "mt-4"
              } `}
              style={{ maxWidth: "fit-content" }}
            >
              <span className="font-bold text-sm">
                {msg.role === "user" ? "You" : "AI"}:
              </span>{" "}
              <span className="text-base leading-relaxed">{msg.content}</span>{" "}
            </div>
          ))}

          {isTyping && (
            <div className="max-w-[85%] p-3 rounded-xl bg-white/20 self-start text-white mr-auto">
              <span className="font-bold text-sm">AI:</span>{" "}
              <Typewriter
                words={[typingContent]}
                cursor
                cursorStyle="|"
                typeSpeed={40}
                deleteSpeed={0}
                delaySpeed={1000}
                loop={false}
                key={typingContent}
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) sendMessage();
          }}
          className="flex items-center gap-2 mt-4"
        >
          <input
            type="text"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              loading
                ? "Generating response..."
                : "Ask about my skills, projects..."
            }
            className="flex-grow p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-white/10 disabled:text-white/40 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white/10"
            aria-label="Send message"
          >
            <FiSend className="text-white w-5 h-5" />
          </button>
          {loading && (
            <button
              onClick={stopGenerating}
              className="ml-2 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-md text-sm font-semibold flex items-center"
              title="Stop Generating"
            >
              <FaStop />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
