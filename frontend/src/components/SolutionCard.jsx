import { useState } from 'react';

const VARIANTS = {
  cyan: {
    accent:       '#22d3ee',
    accentDim:    'rgba(34,211,238,0.08)',
    accentBorder: 'rgba(34,211,238,0.2)',
    accentGlow:   'rgba(34,211,238,0.14)',
    borderGrad:   'linear-gradient(180deg,#22d3ee,#6366f1)',
    ringColor:    '#22d3ee',
    labelClass:   'text-gradient-cyan',
    hoverBorder:  'rgba(34,211,238,0.35)',
  },
  purple: {
    accent:       '#a78bfa',
    accentDim:    'rgba(139,92,246,0.08)',
    accentBorder: 'rgba(139,92,246,0.2)',
    accentGlow:   'rgba(139,92,246,0.14)',
    borderGrad:   'linear-gradient(180deg,#a78bfa,#6366f1)',
    ringColor:    '#a78bfa',
    labelClass:   'text-gradient-purple',
    hoverBorder:  'rgba(139,92,246,0.35)',
  },
};

const ScoreRing = ({ score, max = 10, color }) => {
  const pct = Math.min(100, (score / max) * 100);
  const deg = pct * 3.6;
  return (
    <div
      style={{
        position: 'relative',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: `conic-gradient(from -90deg, ${color} ${deg}deg, rgba(255,255,255,0.05) 0deg)`,
        padding: 2,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: '#0f1623',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: '#10b981',
            lineHeight: 1,
          }}
        >
          {score}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            color: 'rgba(255,255,255,0.3)',
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          /{max}
        </span>
      </div>
    </div>
  );
};

const SolutionCard = ({
  modelLabel = 'Model Alpha',
  modelName  = 'GPT-4o',
  solution   = '',
  score      = 0,
  maxScore   = 10,
  isWinner   = false,
  variant    = 'cyan',
  delay      = 'delay-2',
}) => {
  const [hovered, setHovered] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.cyan;
  const pct = Math.min(100, Math.round((score / maxScore) * 100));

  return (
    <article
      className={`arena-card fade-up ${delay}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${hovered ? v.hoverBorder : v.accentBorder}`,
        boxShadow: hovered
          ? `0 0 0 1px ${v.accentBorder}, 0 24px 56px ${v.accentGlow}, 0 4px 16px rgba(0,0,0,0.5)`
          : `0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.3)`,
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all 0.25s cubic-bezier(.22,1,.36,1)',
        overflow: 'hidden',
        position: 'relative',
        minHeight: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent stripe */}
      <div
        style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: 3,
          background: v.borderGrad,
          boxShadow: `2px 0 10px ${v.accentGlow}`,
        }}
      />

      {/* Winner banner */}
      {isWinner && (
        <div
          className="winner-banner"
          style={{
            padding: '7px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span style={{ fontSize: 12 }}>⭐</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: '#34d399',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Top Answer
          </span>
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: '20px 20px 20px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            {/* Model icon */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: v.accentDim,
                border: `1px solid ${v.accentBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              🤖
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                className={v.labelClass}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {modelLabel}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}>
                <span
                  className="pill"
                  style={{
                    background: v.accentDim,
                    border: `1px solid ${v.accentBorder}`,
                    color: v.accent,
                    fontSize: 11,
                  }}
                >
                  {modelName}
                </span>
                <div className="dot-live" />
              </div>
            </div>
          </div>

          {/* Score ring */}
          <ScoreRing score={score} max={maxScore} color={v.ringColor} />
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: 14 }} />

        {/* Solution text */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: 4,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.75,
              color: 'rgba(226,232,240,0.8)',
              margin: 0,
            }}
          >
            {solution}
          </p>
        </div>

        {/* Score bar */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span
              className="section-label"
              style={{ fontSize: 10 }}
            >
              Score
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: v.accent,
              }}
            >
              {pct}%
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${v.accent}, #10b981)`,
                boxShadow: `0 0 6px ${v.accentGlow}`,
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default SolutionCard;
