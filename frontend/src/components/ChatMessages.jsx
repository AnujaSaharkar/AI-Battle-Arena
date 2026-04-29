/* Typing dots animation  */
const TypingDots = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 0' }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: 'rgba(99,102,241,0.7)',
          animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
    <style>{`
      @keyframes dotBounce {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40%            { transform: scale(1);   opacity: 1;   }
      }
    `}</style>
  </div>
);

/* ── User message bubble ──────────────────────────── */
export const UserMessage = ({ text, timestamp }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      animation: 'fadeUp 0.4s cubic-bezier(.22,1,.36,1) both',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
      <div
        style={{
          maxWidth: 580,
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          borderRadius: '18px 18px 4px 18px',
          padding: '12px 18px',
          boxShadow: '0 4px 20px rgba(79,70,229,0.3)',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: '#fff',
            lineHeight: 1.6,
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {text}
        </p>
      </div>
      {/* Avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          flexShrink: 0,
          border: '2px solid rgba(99,102,241,0.3)',
        }}
      >
        👤
      </div>
    </div>
    {timestamp && (
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: 'rgba(255,255,255,0.2)',
          marginTop: 5,
          marginRight: 42,
        }}
      >
        {timestamp}
      </span>
    )}
  </div>
);

/* ── Arena loading state ──────────────────────────── */
export const ArenaThinking = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 10,
      animation: 'fadeUp 0.4s cubic-bezier(.22,1,.36,1) both',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Arena avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(99,102,241,0.2))',
          border: '1px solid rgba(99,102,241,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        ⚔️
      </div>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        AI Battle Arena
      </span>
    </div>
    <div
      style={{
        marginLeft: 42,
        background: '#0f1623',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '4px 18px 18px 18px',
        padding: '14px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13 }}>🤖</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#22d3ee' }}>
          GPT-4o is composing…
        </span>
        <TypingDots />
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13 }}>🤖</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#a78bfa' }}>
          Claude-3 is composing…
        </span>
        <TypingDots />
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 13 }}>⚖️</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#fbbf24' }}>
          Judge is evaluating…
        </span>
        <TypingDots />
      </div>
    </div>
  </div>
);

/* ── Arena result wrapper ──────────────────────────── */
export const ArenaResult = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 10,
      animation: 'fadeUp 0.5s cubic-bezier(.22,1,.36,1) both',
    }}
  >
    {/* Arena label */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(99,102,241,0.2))',
          border: '1px solid rgba(99,102,241,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        ⚔️
      </div>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        AI Battle Arena
      </span>
    </div>
    {/* Result cards */}
    <div style={{ width: '100%', marginLeft: 0, paddingLeft: 42 }}>
      {children}
    </div>
  </div>
);
