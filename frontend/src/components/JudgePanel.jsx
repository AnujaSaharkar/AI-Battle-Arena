const ScoreChip = ({ score, max = 10, color, label }) => {
  const deg = Math.min(100, (score / max) * 100) * 3.6;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 48,
          height: 48,
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
            background: '#111827',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
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
              fontSize: 8,
              color: 'rgba(255,255,255,0.3)',
              lineHeight: 1,
            }}
          >
            /{max}
          </span>
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color,
            lineHeight: 1,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: 'rgba(255,255,255,0.3)',
            marginTop: 2,
          }}
        >
          Score: {score}/{max}
        </div>
      </div>
    </div>
  );
};

const JudgePanel = ({
  solution1Score    = 0,
  solution2Score    = 0,
  solution1Reasoning = '',
  solution2Reasoning = '',
  model1Name = 'GPT-4o',
  model2Name = 'Claude-3',
}) => {
  const isDraw   = solution1Score === solution2Score;
  const s1Wins   = solution1Score > solution2Score;
  const winnerName = s1Wins ? model1Name : model2Name;

  const verdictLabel = isDraw
    ? '🤝 Perfect Draw — Both models are equally matched'
    : `🏆 ${winnerName} wins this round`;
  const verdictColor = isDraw ? '#fbbf24' : '#34d399';
  const verdictBg    = isDraw ? 'rgba(251,191,36,0.08)' : 'rgba(52,211,153,0.08)';
  const verdictBorder = isDraw ? 'rgba(251,191,36,0.2)' : 'rgba(52,211,153,0.2)';

  return (
    <div
      className="arena-card glow-gold fade-up delay-5"
      style={{
        borderTop: '2px solid rgba(251,191,36,0.3)',
        overflow: 'hidden',
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: '24px 32px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              flexShrink: 0,
              boxShadow: '0 0 16px rgba(251,191,36,0.15)',
            }}
          >
            ⚖️
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: '#f1f5f9',
                lineHeight: 1,
              }}
            >
              Judge's Verdict
            </div>
            <div
              className="section-label"
              style={{ marginTop: 4 }}
            >
              AI-Powered Analysis & Scoring
            </div>
          </div>
        </div>

        {/* Verdict badge */}
        <div
          style={{
            padding: '8px 16px',
            borderRadius: 10,
            background: verdictBg,
            border: `1px solid ${verdictBorder}`,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: verdictColor,
            }}
          >
            {verdictLabel}
          </span>
        </div>
      </div>

      {/* Two-column reasoning */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
        }}
      >
        {/* Model Alpha */}
        <div style={{ padding: '24px 32px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ marginBottom: 16 }}>
            <ScoreChip score={solution1Score} color="#22d3ee" label="Model Alpha" />
          </div>
          <div className="divider" style={{ marginBottom: 14 }} />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.72,
              color: 'rgba(226,232,240,0.65)',
              margin: 0,
            }}
          >
            {solution1Reasoning}
          </p>
        </div>

        {/* Model Beta */}
        <div style={{ padding: '24px 32px' }}>
          <div style={{ marginBottom: 16 }}>
            <ScoreChip score={solution2Score} color="#a78bfa" label="Model Beta" />
          </div>
          <div className="divider" style={{ marginBottom: 14 }} />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              lineHeight: 1.72,
              color: 'rgba(226,232,240,0.65)',
              margin: 0,
            }}
          >
            {solution2Reasoning}
          </p>
        </div>
      </div>

      {/* Footer score bar */}
      <div
        style={{
          padding: '14px 32px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        <span className="section-label">Score comparison</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: '#22d3ee' }}>
            {model1Name} {solution1Score}/10
          </span>
          <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${(solution1Score / 10) * 50}%`, background: 'linear-gradient(90deg,#22d3ee,#6366f1)' }} />
            <div style={{ width: `${(solution2Score / 10) * 50}%`, background: 'linear-gradient(90deg,#6366f1,#a78bfa)', marginLeft: 'auto' }} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: '#a78bfa' }}>
            {solution2Score}/10 {model2Name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JudgePanel;
