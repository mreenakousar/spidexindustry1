"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Paperclip, Search, Send, ShieldCheck, X } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "Admin" | "Client";
  text: string;
  time: string;
  attachment?: string;
}

interface Conversation {
  id: string;
  client: string;
  company: string;
  status: "Open" | "Closed" | "Pending";
  lastMessage: string;
  updatedAt: string;
  messages: ChatMessage[];
}

const conversationsData: Conversation[] = [
  {
    id: "CH-301",
    client: "Arcadia Apparel",
    company: "Arcadia Apparel Co.",
    status: "Open",
    lastMessage: "Can we finalize the embroidery placement today?",
    updatedAt: "2m ago",
    messages: [
      {
        id: "m1",
        sender: "Client",
        text: "Please confirm the embroidery placement on the left chest.",
        time: "10:12 AM",
      },
      {
        id: "m2",
        sender: "Admin",
        text: "Yes, the current tech pack has the left chest position approved.",
        time: "10:18 AM",
      },
      {
        id: "m3",
        sender: "Client",
        text: "Great, then proceed with the batch.",
        time: "10:21 AM",
        attachment: "embroidery-specs.pdf",
      },
    ],
  },
  {
    id: "CH-302",
    client: "Summit Sportswear",
    company: "Summit Sportswear Ltd.",
    status: "Pending",
    lastMessage: "Awaiting approval for the color match sample.",
    updatedAt: "1h ago",
    messages: [
      {
        id: "m4",
        sender: "Client",
        text: "The sample looks good but can we darken the navy slightly?",
        time: "9:08 AM",
      },
      {
        id: "m5",
        sender: "Admin",
        text: "We can update the dye lot to Pantone 289C and send a new swatch.",
        time: "9:22 AM",
      },
    ],
  },
  {
    id: "CH-303",
    client: "Velocity Streetwear",
    company: "Velocity Streetwear GmbH",
    status: "Closed",
    lastMessage: "Order completed and invoice sent.",
    updatedAt: "Yesterday",
    messages: [
      {
        id: "m6",
        sender: "Admin",
        text: "Your final shipment has left the factory and is on schedule.",
        time: "4:30 PM",
      },
      {
        id: "m7",
        sender: "Client",
        text: "Thanks, we appreciate the quick turnaround.",
        time: "4:45 PM",
      },
    ],
  },
];

function badgeClass(status: Conversation["status"]) {
  switch (status) {
    case "Open":
      return "bg-emerald-100 text-emerald-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function MessagesPage() {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setConversationList(conversationsData);
      setSelectedConversation(conversationsData[0]);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation, messageText]);

  const handleSend = () => {
    if (!selectedConversation || messageText.trim() === "") return;
    const updated: Conversation = {
      ...selectedConversation,
      lastMessage: messageText,
      updatedAt: "Now",
      messages: [
        ...selectedConversation.messages,
        {
          id: `m-${Date.now()}`,
          sender: "Admin",
          text: messageText.trim(),
          time: "Now",
        },
      ],
    };
    setConversationList((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );
    setSelectedConversation(updated);
    setMessageText("");
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.4fr,0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Messages
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Team conversations with clients, factory managers, and suppliers in
            one messaging hub.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Open Conversations
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
                2
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Pending Replies
              </p>
              <p className="mt-3 text-3xl font-semibold text-amber-600">1</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Resolved
              </p>
              <p className="mt-3 text-3xl font-semibold text-emerald-600">1</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Latest Inquiry
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                Embroidery approval request
              </p>
            </div>
            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
              2 min ago
            </span>
          </div>
          <div className="mt-6 rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="text-sm text-slate-500 dark:text-slate-400">Client</p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              Arcadia Apparel Co.
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <Mail className="h-4 w-4" /> maya.patel@arcadiaapparel.com
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Conversations
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Active messages with clients and suppliers.
              </p>
            </div>
            <div className="relative max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Search conversations"
              />
            </div>
          </div>
          <div className="space-y-3 px-4 pb-4">
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-20 rounded-3xl bg-slate-100 dark:bg-slate-800"
                  ></div>
                ))
              : conversationList.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {conversation.company}
                        </p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(conversation.status)}`}
                      >
                        {conversation.status}
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      {conversation.updatedAt}
                    </p>
                  </button>
                ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {selectedConversation ? (
            <div className="flex h-[560px] flex-col">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Conversation with
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {selectedConversation.company}
                  </h2>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(selectedConversation.status)}`}
                >
                  {selectedConversation.status}
                </span>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto border-t border-b border-slate-200 py-4 dark:border-slate-700">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-3xl p-4 ${message.sender === "Admin" ? "bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100" : "bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100"}`}
                  >
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>{message.sender}</span>
                      <span>{message.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6">{message.text}</p>
                    {message.attachment && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                        <Paperclip className="h-3.5 w-3.5" />{" "}
                        {message.attachment}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Write a message..."
                    className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <button
                    onClick={handleSend}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    <Send className="h-4 w-4" /> Send
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <Paperclip className="h-4 w-4" /> Attach a file
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[560px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
              <Mail className="mb-3 h-10 w-10" />
              <p className="font-semibold">
                Select a conversation to view details
              </p>
              <p className="mt-2 text-sm">
                Use the panel on the left to manage client messages and follow
                ups.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
