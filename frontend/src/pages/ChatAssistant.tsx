import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

export default function ChatAssistant() {
const [message, setMessage] = useState("");

return ( <main className="chat-page"> <section className="chat-header"> <div className="chat-avatar"> <Bot size={28} /> </div>

    <div>
      <h1>TripPlanner AI Assistant</h1>
      <p><span className="online-dot"></span> Your personal travel companion</p>
    </div>
  </section>

  <section className="chat-container">
    <div className="chat-welcome">
      <Sparkles size={35} />

      <h2>Where would you like to explore?</h2>

      <p>
        Ask me about destinations, travel budgets,
        accommodation and personalised itineraries.
      </p>
    </div>

    <div className="suggestion-list">
      {[
        "Plan a 3-day trip to Ella",
        "Find beautiful beaches in Sri Lanka",
        "Plan a trip under LKR 30,000"
      ].map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => setMessage(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>

    <div className="chat-input-area">
      <User size={20} />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything about travelling..."
      />

      <button
        aria-label="Send message"
        onClick={() => alert("AI chatbot integration is coming next.")}
      >
        <Send size={19} />
      </button>
    </div>
  </section>
</main>

);
}
