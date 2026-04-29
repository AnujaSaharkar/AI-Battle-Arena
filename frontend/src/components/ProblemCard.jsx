const ProblemCard = ({ problem = '' }) => (
  <div
    className="fade-up delay-1"
    style={{
      background: 'linear-gradient(135deg, #0d1626 0%, #0f1220 100%)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: 20,
      padding: '36px 40px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 32px 64px rgba(0,0,0,0.4)',
    }}
  >
    {/* Decorative top-left gradient blob */}
    <div
      style={{
        position: 'absolute',
        top: -60,
        left: -60,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}
    />
    {/* Left accent bar */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 24,
        bottom: 24,
        width: 3,
        borderRadius: '0 3px 3px 0',
        background: 'linear-gradient(180deg, #22d3ee, #6366f1, #a78bfa)',
        boxShadow: '2px 0 12px rgba(99,102,241,0.4)',
      }}
    />

    <div style={{ paddingLeft: 24 }}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 14 }}>🎯</span>
        <span
          className="section-label"
          style={{ color: 'rgba(99,102,241,0.8)' }}
        >
          The Challenge
        </span>
      </div>

      {/* Question */}
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 26,
          fontWeight: 600,
          color: '#f1f5f9',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
        }}
      >
        {problem}
      </p>

      {/* Footer meta */}
      <div className="divider" style={{ margin: '20px 0 16px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="dot-live" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            2 models responding
          </span>
        </div>
        <div
          className="pill"
          style={{
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.2)',
            color: '#fbbf24',
            marginLeft: 'auto',
          }}
        >
          ⚡ Active
        </div>
      </div>
    </div>
  </div>
);

export default ProblemCard;
