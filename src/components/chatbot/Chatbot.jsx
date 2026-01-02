import { useState, useRef, useEffect } from 'react';
import { getBotResponse } from './chatbotData';
import styles from './Chatbot.module.css';

/**
 * Static rule-based chatbot component
 * Helps visitors learn about Kyle's background, skills, and contact info
 */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Kyle's assistant. Ask me about his background, tech stack, or how to contact him!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Get bot response after short delay (feels more natural)
    setTimeout(() => {
      const botReply = getBotResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  // Quick action buttons
  const quickActions = [
    { label: 'About Kyle', query: 'Tell me about Kyle' },
    { label: 'Tech Stack', query: 'What tech stack does Kyle use?' },
    { label: 'Contact', query: 'How can I contact Kyle?' }
  ];

  const handleQuickAction = (query) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: query,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Get bot response after short delay
    setTimeout(() => {
      const botReply = getBotResponse(query);
      const botMessage = {
        id: Date.now() + 1,
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        className={`${styles.chatButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          // Close icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Chat icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>K</div>
              <div>
                <h3 className={styles.headerTitle}>Kyle's Assistant</h3>
                <p className={styles.headerSubtitle}>Ask me anything!</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${styles[message.sender]}`}
              >
                <div className={styles.messageBubble}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length <= 2 && (
            <div className={styles.quickActions}>
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className={styles.quickButton}
                  onClick={() => handleQuickAction(action.query)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input form */}
          <form className={styles.chatInput} onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me something..."
              className={styles.input}
            />
            <button
              type="submit"
              className={styles.sendButton}
              aria-label="Send message"
              disabled={!inputValue.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
