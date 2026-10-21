import { useNavigate } from "react-router-dom";
import "../styles/Chat.css";

function Chat() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  function handleLogout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <main className="chat-page">
      <aside className="chat-sidebar">
        <div className="chat-brand">
          <div className="auth-logo">C</div>
          <span>ChatFlow</span>
        </div>

        <div className="chat-section-heading">
          <span>MESSAGES</span>
          <button
            type="button"
            className="icon-button"
            aria-label="New conversation"
          >
            +
          </button>
        </div>

        <div className="conversation-empty">
          <div className="empty-icon">✉</div>
          <p>No conversations yet</p>
          <span>Your conversations will appear here.</span>
        </div>

        <div className="chat-profile">
          <div className="profile-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="profile-details">
            <strong>{user?.name || "User"}</strong>
            <span>{user?.email || ""}</span>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
          >
            ↪
          </button>
        </div>
      </aside>

      <section className="chat-main">
        <header className="chat-header">
          <div className="chat-header-avatar">C</div>
          <div>
            <h1>General Chat</h1>
            <p>Real-time conversations</p>
          </div>
          <span className="connection-status">
            <span className="status-dot" />
            Chat workspace
          </span>
        </header>

        <div className="chat-welcome">
          <div className="welcome-icon">✦</div>
          <h2>Welcome to ChatFlow</h2>
          <p>Your conversations will appear here.</p>
          <span>We're setting up your messaging experience.</span>
        </div>

        <form
          className="chat-composer"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="text"
            placeholder="Messaging will be connected next..."
            aria-label="Message"
            disabled
          />
          <button type="submit" disabled>
            Send
          </button>
        </form>
      </section>
    </main>
  );
}

export default Chat;
