const Header = ({ model1Name = 'GPT-4o', model2Name = 'Claude-3' }) => (
  <header className="header-glass sticky top-0 z-50">
    <div
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 32px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      {/* ── Logo ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg,#22d3ee22,#6366f122)',
            border: '1px solid rgba(99,102,241,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          ⚔️
        </div>
        <div>
          <div
            className="text-gradient-cyan"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            AI Battle Arena
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 2,
            }}
          >
            Real-time AI Competition
          </div>
        </div>
      </div>

      {/* ── Center badge ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div className="dot-live" />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: '#4ade80',
            letterSpacing: '0.08em',
          }}
        >
          LIVE BATTLE
        </span>
      </div>

      {/* ── Model status ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Model 1 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 99,
            background: 'rgba(34,211,238,0.06)',
            border: '1px solid rgba(34,211,238,0.15)',
          }}
        >
          <div className="dot-live" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#22d3ee',
            }}
          >
            {model1Name}
          </span>
        </div>

        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.06em',
            padding: '0 4px',
          }}
        >
          VS
        </span>

        {/* Model 2 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 99,
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.15)',
          }}
        >
          <div className="dot-live" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#a78bfa',
            }}
          >
            {model2Name}
          </span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
