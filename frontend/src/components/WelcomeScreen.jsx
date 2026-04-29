const SUGGESTIONS = [
  'What is the capital of France?',
  'Explain quantum computing in simple terms',
  'Write a Python function to reverse a string',
  'What causes climate change?',
  'How does the internet work?',
  'Best practices for React performance',
];

const WelcomeScreen = ({ onSuggestion }) => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      animation: 'fadeUp 0.6s cubic-bezier(.22,1,.36,1) both',
    }}
  >
    {/* Logo mark */}
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(99,102,241,0.15))',
        border: '1px solid rgba(99,102,241,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 34,
        marginBottom: 24,
        boxShadow: '0 0 40px rgba(99,102,241,0.15)',
      }}
    >
      ⚔️
    </div>

    <h2
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 28,
        fontWeight: 700,
        color: '#f1f5f9',
        letterSpacing: '-0.02em',
        marginBottom: 10,
        textAlign: 'center',
      }}
    >
      Welcome to{' '}
      <span
        style={{
          background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        AI Battle Arena
      </span>
    </h2>

    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 15,
        color: 'rgba(255,255,255,0.35)',
        textAlign: 'center',
        maxWidth: 480,
        lineHeight: 1.6,
        marginBottom: 40,
      }}
    >
      Ask any question. Two AI models will compete to give you the best answer,
      and a third AI will judge them both — live.
    </p>

    {/* How it works */}
    <div
      style={{
        display: 'flex',
        gap: 16,
        marginBottom: 48,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {[
        { icon: '💬', label: 'You ask', desc: 'Type any question' },
        { icon: '🤖', label: 'AIs compete', desc: 'GPT-4o vs Claude-3' },
        { icon: '⚖️', label: 'Judge rules', desc: 'Scored & analysed' },
      ].map((step) => (
        <div
          key={step.label}
          style={{
            background: '#0f1623',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14,
            padding: '16px 20px',
            textAlign: 'center',
            minWidth: 120,
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 6 }}>{step.icon}</div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#e2e8f0',
              marginBottom: 3,
            }}
          >
            {step.label}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            {step.desc}
          </div>
        </div>
      ))}
    </div>

    {/* Suggestion chips */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 10,
        width: '100%',
        maxWidth: 680,
      }}
    >
      {SUGGESTIONS.map((s) => (
        <button
          key={s}
          onClick={() => onSuggestion(s)}
          style={{
            background: '#0f1623',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '11px 16px',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: 'rgba(226,232,240,0.7)',
            lineHeight: 1.4,
            transition: 'all 0.18s ease',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
            e.currentTarget.style.background = 'rgba(99,102,241,0.06)';
            e.currentTarget.style.color = '#e2e8f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.background = '#0f1623';
            e.currentTarget.style.color = 'rgba(226,232,240,0.7)';
          }}
        >
          <span style={{ opacity: 0.5, fontSize: 13 }}>↗</span>
          {s}
        </button>
      ))}
    </div>
  </div>
);

export default WelcomeScreen;
