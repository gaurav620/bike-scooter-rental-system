import React, { useState, useRef, useEffect } from 'react';
import API from '../services/api';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: `👋 **Hi! I'm RideFleet Assistant!**\n\nI can help you with:\n🛵 Scooter availability\n💰 Pricing info\n📋 Booking help\n📍 Service areas\n\nType your question below! 😊`,
            time: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const formatMessage = (text) => {
        // Convert markdown bold to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
    };

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        // Add user message
        const userMsg = { type: 'user', text: trimmed, time: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Small delay for natural feel
            await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));

            const { data } = await API.post('/chatbot', { message: trimmed });

            setIsTyping(false);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: data.reply,
                time: new Date(),
            }]);
        } catch (err) {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: '😅 Oops! I had trouble connecting. Please try again in a moment.',
                time: new Date(),
            }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickActions = [
        { label: '💰 Pricing', value: 'What are your prices?' },
        { label: '🛵 Available', value: 'Show available scooters' },
        { label: '📋 How to Book', value: 'How do I book a scooter?' },
        { label: '📍 Service Area', value: 'What is your service area?' },
    ];

    return (
        <>
            {/* Floating Chat Button */}
            <button
                className={`chatbot-fab ${isOpen ? 'chatbot-fab-hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Open chat"
            >
                <span className="fab-icon">💬</span>
                <span className="fab-pulse"></span>
            </button>

            {/* Chat Window */}
            <div className={`chatbot-window ${isOpen ? 'chatbot-open' : ''}`}>
                {/* Header */}
                <div className="chatbot-header">
                    <div className="chatbot-header-left">
                        <div className="chatbot-avatar">🤖</div>
                        <div>
                            <h4 className="chatbot-name">RideFleet Assistant</h4>
                            <span className="chatbot-status">
                                <span className="online-dot"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <button
                        className="chatbot-close"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="chatbot-messages">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`chatbot-msg ${msg.type === 'user' ? 'msg-user' : 'msg-bot'}`}
                        >
                            {msg.type === 'bot' && <span className="msg-avatar">🤖</span>}
                            <div className="msg-bubble">
                                <div
                                    className="msg-text"
                                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                                />
                                <span className="msg-time">
                                    {msg.time.toLocaleTimeString('en-IN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="chatbot-msg msg-bot">
                            <span className="msg-avatar">🤖</span>
                            <div className="msg-bubble typing-bubble">
                                <div className="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length <= 1 && (
                    <div className="chatbot-quick-actions">
                        {quickActions.map((action, i) => (
                            <button
                                key={i}
                                className="quick-action-btn"
                                onClick={() => {
                                    setInput(action.value);
                                    setTimeout(() => {
                                        setInput(action.value);
                                        handleSend();
                                    }, 100);
                                }}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="chatbot-input-area">
                    <input
                        ref={inputRef}
                        type="text"
                        className="chatbot-input"
                        placeholder="Type your question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isTyping}
                    />
                    <button
                        className="chatbot-send"
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                    >
                        🚀
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
