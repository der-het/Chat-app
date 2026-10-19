import { useEffect, useState } from "react";
import socket from "./socket/socket";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleNewMessage(newMessage) {
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    }

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, []);

  function sendMessage(event) {
    event.preventDefault();

    if (!message.trim()) return;

    socket.emit("message:send", message);
    setMessage("");
  }

  return (
    <div>
      <h1>Realtime Lab</h1>

      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type a message..."
        />

        <button type="submit">Send</button>
      </form>

      <h2>Messages</h2>

      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}

export default App;
