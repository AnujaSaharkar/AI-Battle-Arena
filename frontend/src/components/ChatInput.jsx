import { useRef, useEffect } from 'react';

const ChatInput = ({ value, onChange, onSend, isLoading, disabled }) => {
  const textareaRef = useRef(null);

  /* Auto-resize textarea */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend();
    }
  };

  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 40,
        background: 'linear-gradient(to top, #080b14 70%, transparent)',
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Input box */}
        <div
          style={{
            position: 'relative',
            background: '#0f1623',
            border: `1px solid ${isLoading ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 16,
            boxShadow: isLoading
              ? '0 0 0 3px rgba(99,102,241,0.15), 0 20px 48px rgba(0,0,0,0.5)'
              : '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 12,
            padding: '12px 14px 12px 18px',
          }}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask anything… two AIs will battle it out for you"
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#e2e8f0',
              lineHeight: 1.6,
              minHeight: 26,
              maxHeight: 160,
              overflowY: 'auto',
              scrollbarWidth: 'none',
              padding: 0,
              caretColor: '#6366f1',
            }}
          />

          {/* Send button */}
          <button
            onClick={onSend}
            disabled={disabled || !value.trim() || isLoading}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: 'none',
              cursor: disabled || !value.trim() || isLoading ? 'not-allowed' : 'pointer',
              background:
                disabled || !value.trim() || isLoading
                  ? 'rgba(255,255,255,0.06)'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              boxShadow:
                !disabled && value.trim() && !isLoading
                  ? '0 4px 16px rgba(99,102,241,0.4)'
                  : 'none',
              transform:
                !disabled && value.trim() && !isLoading ? 'scale(1)' : 'scale(0.95)',
            }}
            aria-label="Send message"
          >
            {isLoading ? (
              /* Spinner */
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderTopColor: '#fff',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
            ) : (
              /* Arrow up icon */
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Hint */}
        <p
          style={{
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: 'rgba(255,255,255,0.2)',
            marginTop: 10,
            letterSpacing: '0.02em',
          }}
        >
          Press <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4, fontSize: 10, border: '1px solid rgba(255,255,255,0.1)' }}>Enter</kbd> to send · <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4, fontSize: 10, border: '1px solid rgba(255,255,255,0.1)' }}>Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
