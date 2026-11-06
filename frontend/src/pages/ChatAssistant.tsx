import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { Bot, Send, Sparkles, User } from "lucide-react";

type Message = { role: "assistant" | "user"; text: string };

const suggestions = ["What are the best places to visit in Ella?", "Plan a low-budget weekend trip.", "What should I pack for the hill country?"];

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("tripplanner_chat_history");

    if (savedMessages) {
      try {
        return JSON.parse(savedMessages) as Message[];
      } catch {
        localStorage.removeItem("tripplanner_chat_history");
      }
    }

    return [
      {
        role: "assistant",
        text: "Hello! I'm your TripPlanner assistant. Ask me about destinations, travel ideas or planning your next journey."
      }
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

async function sendMessage(event?: FormEvent, text?: string) {
  event?.preventDefault();

  const value = (text ?? input).trim();

  if (!value || loading) return;

  // Keep previous messages before adding the latest question
  const previousHistory = messages.map(message => ({
    role: message.role,
    content: message.text
  }));

  // Display the user's message
  setMessages(current => [
    ...current,
    { role: "user", text: value }
  ]);

  setInput("");
  setLoading(true);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value,
          history: previousHistory
        })
      }
    );

    if (!response.ok) {
      throw new Error("AI service request failed.");
    }

    const data = await response.json();

    setMessages(current => [
      ...current,
      {
        role: "assistant",
        text: data.response
      }
    ]);

  } catch (error) {
    console.error("Chat error:", error);

    setMessages(current => [
      ...current,
      {
        role: "assistant",
        text: "Sorry! I couldn't connect to the AI assistant. Please try again."
      }
    ]);

  } finally {
    setLoading(false);
  }
}


  return <div className="page-shell chat-shell"><div className="container chat-container"><div className="chat-heading"><span className="eyebrow"><Sparkles size={14} /> TRAVEL, WITH A LITTLE HELP</span><h1>Ask your travel <em>assistant.</em></h1><p>Get ideas, discover places and organise your travel thoughts.</p></div>
    <section className="chat-card"><div className="chat-top"><span className="bot-avatar"><Bot /></span><div><b>TripPlanner Assistant</b><small><span className="online-dot" /> Ready to help</small></div></div>
      <div className="chat-messages">{messages.map((m, i) => <div className={`chat-message ${m.role}`} key={i}><span className="message-avatar">{m.role === "assistant" ? <Bot size={17} /> : <User size={17} />}</span><div className="chat-markdown">
  <ReactMarkdown>{m.text}</ReactMarkdown>
</div></div>)}{loading && <div className="typing">Assistant is thinking…</div>}</div>
      {messages.length === 1 && <div className="suggestions"><span>TRY ASKING</span>{suggestions.map(s => <button key={s} onClick={() => sendMessage(undefined, s)}>{s}</button>)}</div>}
      <form className="chat-input" onSubmit={e => sendMessage(e)}><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything about your trip..." /><button aria-label="Send message" type="submit" disabled={loading || !input.trim()}><Send size={18} /></button></form>
    </section></div></div>;
}