
// "use client";

// import { useState } from "react";
// import { messages } from "../../../data/clientPortal";

// export default function MessagesPage() {
//   const [activeChat, setActiveChat] = useState<any>(messages[0]);
//   const [chatMessages, setChatMessages] = useState(activeChat.messages || []);
//   const [input, setInput] = useState("");

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const newMsg = {
//       id: Date.now(),
//       sender: "client",
//       text: input,
//       time: new Date().toLocaleTimeString(),
//     };

//     setChatMessages([...chatMessages, newMsg]);
//     setInput("");
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="rounded-3xl bg-white p-8 shadow-sm">
//         <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
//           Messages
//         </p>
//         <h1 className="mt-3 text-3xl font-semibold text-slate-900">
//           Client chat center
//         </h1>
//         <p className="mt-2 text-slate-600">
//           Real-time communication between client and production team
//         </p>
//       </div>

//       {/* Layout */}
//       <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        
//         {/* LEFT - Threads */}
//         <div className="rounded-3xl bg-white p-6 shadow-sm">
//           <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
//             Conversations
//           </p>

//           <div className="mt-6 space-y-4">
//             {messages.map((thread) => (
//               <div
//                 key={thread.id}
//                 onClick={() => {
//                   setActiveChat(thread);
//                   setChatMessages(thread.messages || []);
//                 }}
//                 className="cursor-pointer rounded-3xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100"
//               >
//                 <p className="font-semibold text-slate-900">
//                   {thread.title}
//                 </p>
//                 <p className="mt-1 text-sm text-slate-600 line-clamp-1">
//                   {thread.lastMessage}
//                 </p>
//                 <span className="mt-2 inline-block text-xs text-slate-500">
//                   {thread.date}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT - Chat Window */}
//         <div className="rounded-3xl bg-white p-6 shadow-sm flex flex-col h-[600px]">
          
//           {/* Chat header */}
//           <div className="border-b border-slate-200 pb-4">
//             <p className="text-sm font-semibold text-slate-900">
//               {activeChat.title}
//             </p>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto space-y-3 mt-4">
//             {chatMessages.map((msg: any) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${
//                   msg.sender === "client"
//                     ? "justify-end"
//                     : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
//                     msg.sender === "client"
//                       ? "bg-sky-600 text-white"
//                       : "bg-slate-100 text-slate-900"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div className="mt-4 flex gap-2 border-t border-slate-200 pt-4">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-sky-500"
//             />
//             <button
//               onClick={sendMessage}
//               className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: "admin",
      type: "text",
      text: "Hi! How can we help you today?",
      time: "10:00 AM",
    },
  ]);

  const [input, setInput] = useState("");

  const [image, setImage] = useState<File | null>(null);

  // Send message
  const sendMessage = () => {
    if (!input.trim() && !image) return;

    const newMsg = {
      id: Date.now(),
      sender: "client",
      type: image ? "image" : "text",
      text: input,
      image: image ? URL.createObjectURL(image) : null,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setImage(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
          Messages
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Client Chat Center
        </h1>
        <p className="mt-2 text-slate-600">
          Talk directly with production team — send text & images
        </p>
      </div>

      {/* Chat Box */}
      <div className="rounded-3xl bg-white p-6 shadow-sm flex flex-col h-[650px]">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "client" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                  msg.sender === "client"
                    ? "bg-sky-600 text-white"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                {/* TEXT MESSAGE */}
                {msg.type === "text" && <p>{msg.text}</p>}

                {/* IMAGE MESSAGE */}
                {msg.type === "image" && msg.image && (
                  <img
                    src={msg.image}
                    alt="upload"
                    className="rounded-xl max-h-60 w-full object-cover"
                  />
                )}

                <p className="mt-1 text-[10px] opacity-70">
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4">
          
          {/* TEXT INPUT */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-sky-500"
          />

          {/* IMAGE INPUT */}
          <label className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100">
            📎
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </label>

          {/* SEND BUTTON */}
          <button
            onClick={sendMessage}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Send
          </button>
        </div>

        {/* Preview selected image */}
        {image && (
          <div className="mt-3 text-xs text-slate-500">
            Selected: {image.name}
          </div>
        )}
      </div>
    </div>
  );
}