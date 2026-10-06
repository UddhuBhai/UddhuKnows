import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const messagesEndRef = useRef(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* =========================
     AUTO SCROLL
  ========================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* =========================
     SEND MESSAGE
  ========================= */

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userText = message.trim();

    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
    };

    const aiMessageId = Date.now() + 1;

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages([
      ...updatedMessages,
      {
        id: aiMessageId,
        text: "",
        sender: "ai",
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      /* =========================
         CONVERT CHAT TO API FORMAT
      ========================= */

      const conversation = updatedMessages.map(
        (msg) => ({
          role:
            msg.sender === "user"
              ? "user"
              : "assistant",

          content: msg.text,
        })
      );

      /* =========================
         API REQUEST
      ========================= */

      const response = await fetch(
        `${API_URL}/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            messages: conversation,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status}`
        );
      }

      if (!response.body) {
        throw new Error("No response stream received.");
      }

      /* =========================
         READ STREAM
      ========================= */

      const reader =
        response.body.getReader();

      const decoder = new TextDecoder();

      let aiText = "";

      while (true) {
        const { done, value } =
          await reader.read();

        if (done) break;

        const chunk = decoder.decode(
          value,
          {
            stream: true,
          }
        );

        aiText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  text: aiText,
                }
              : msg
          )
        );
      }

      /* Flush decoder */

      const finalChunk = decoder.decode();

      if (finalChunk) {
        aiText += finalChunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  text: aiText,
                }
              : msg
          )
        );
      }

    } catch (error) {
      console.error("Error:", error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                text:
                  "Bro, my brain server is taking a nap. 💀\n\nTry again in a moment.",
              }
            : msg
        )
      );
    }

    setLoading(false);
  };

  /* =========================
     KEYBOARD
  ========================= */

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* =========================
     COPY CODE
  ========================= */

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(
        code
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch (error) {
      console.error(
        "Could not copy code:",
        error
      );
    }
  };

  /* =========================
     NEW CHAT
  ========================= */

  const startNewChat = () => {
    if (loading) return;

    setMessages([]);
    setMessage("");
  };

  return (
    <div className="app">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <div className="brand">

          <span className="brand-name">
            UddhuKnows.
          </span>

          <span className="brand-dot">
            ●
          </span>

        </div>

        <button
          className="new-chat"
          onClick={startNewChat}
          disabled={loading}
        >
          new chat +
        </button>

      </nav>

      {/* =========================
          MAIN
      ========================= */}

      <main className="main">

        {messages.length === 0 ? (

          /* =========================
             HERO
          ========================= */

          <div className="hero">

            <div className="scribble">
              ✦
            </div>

            <h1>
              hey, what's up?
            </h1>

            <p>
              ask me literally anything.
              <br />
              i'll figure it out.
            </p>

            <div className="suggestions">

              <button
                onClick={() =>
                  setMessage(
                    "Explain something to me"
                  )
                }
              >
                explain something
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Help me with code"
                  )
                }
              >
                help with code
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Give me an idea"
                  )
                }
              >
                give me an idea
              </button>

            </div>

          </div>

        ) : (

          /* =========================
             MESSAGES
          ========================= */

          <div className="messages">

            {messages.map((msg) => {

              const isLatest =
                msg.id ===
                messages[
                  messages.length - 1
                ].id;

              return (
                <div
                  key={msg.id}
                  className={`message ${msg.sender}`}
                >

                  <span className="message-name">
                    {msg.sender === "user"
                      ? "You"
                      : "UddhuKnows"}
                  </span>

                  <div className="message-content">

                    {msg.sender === "ai" ? (

                      <ReactMarkdown
                        remarkPlugins={[
                          remarkGfm,
                        ]}
                        components={{

                          code({
                            inline,
                            className,
                            children,
                            ...props
                          }) {

                            const match =
                              /language-(\w+)/.exec(
                                className || ""
                              );

                            const code =
                              String(
                                children
                              ).replace(
                                /\n$/,
                                ""
                              );

                            if (inline) {
                              return (
                                <code
                                  className="inline-code"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            }

                            return (
                              <div className="code-block">

                                <div className="code-header">

                                  <span>
                                    {match
                                      ? match[1]
                                      : "code"}
                                  </span>

                                  <button
                                    className="copy-button"
                                    onClick={() =>
                                      copyCode(
                                        code
                                      )
                                    }
                                  >
                                    {copied
                                      ? "copied ✓"
                                      : "copy"}
                                  </button>

                                </div>

                                <pre>

                                  <code {...props}>
                                    {children}
                                  </code>

                                </pre>

                              </div>
                            );
                          },

                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>

                    ) : (

                      <p>
                        {msg.text}
                      </p>

                    )}

                    {loading &&
                      msg.sender === "ai" &&
                      isLatest && (
                        <span className="typing-cursor">
                          ▋
                        </span>
                      )}

                  </div>

                </div>
              );
            })}

            <div ref={messagesEndRef} />

          </div>
        )}

        {/* =========================
            CHAT INPUT
        ========================= */}

        <div className="chat-input">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder={
              loading
                ? "UddhuKnows is thinking..."
                : "what are we overthinking today?"
            }
            disabled={loading}
          />

          <button
            className="send"
            onClick={sendMessage}
            disabled={
              loading ||
              !message.trim()
            }
          >
            {loading ? "..." : "↗"}
          </button>

        </div>

        {/* DISCLAIMER */}

        <p className="disclaimer">
          UddhuKnows can make mistakes.
          unfortunately, so can you.
        </p>

      </main>

      {/* FOOTER */}

      <footer>
        made by Uddhu :)
      </footer>

    </div>
  );
}

export default App;