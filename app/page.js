"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("sophia_messages");

    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        setMessages([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sophia_messages",
      JSON.stringify(messages)
    );

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();

    if (!text || loading) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <h1>SØPHIA</h1>
          <p>Personal AI Companion</p>
        </div>

        <span className="status">
          ● ONLINE
        </span>
      </header>

      <section className="chat">
        {messages.length === 0 && (
          <div className="welcome">
            <h2>SØPHIA</h2>
            <p>
              I'm here. Say something to me.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role}`}
          >
            <span>
              {message.role === "user"
                ? "YOU"
                : "SØPHIA"}
            </span>

            <p>{message.content}</p>
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <span>SØPHIA</span>
            <p>Thinking...</p>
          </div>
        )}

        <div ref={bottomRef} />
      </section>

      <div className="composer">
        <textarea
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Talk to SØPHIA..."
          rows={1}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          SEND
        </button>
      </div>
    </main>
  );
}
