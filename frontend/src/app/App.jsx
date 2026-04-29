import { useState, useRef, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import ChatInput from '../components/ChatInput';
import WelcomeScreen from '../components/WelcomeScreen';
import SolutionCard from '../components/SolutionCard';
import JudgePanel from '../components/JudgePanel';
import { UserMessage, ArenaThinking, ArenaResult } from '../components/ChatMessages';

/* ─────────────────────────────────────────────────────
   Simulated AI battle engine
   In production, replace with real API calls.
───────────────────────────────────────────────────── */
const MODEL_1 = 'GPT-4o';
const MODEL_2 = 'Claude-3';

function simulateBattle(question) {
  /* Returns a Promise that resolves with battle data after a delay */
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        problem: question,
        solution_1: `As ${MODEL_1}, here is my response to "${question}":\n\nThis is a simulated answer from ${MODEL_1}. In a real implementation, this would be the actual GPT-4o response to your question. The model would analyze your prompt carefully, draw from its training data, and provide a comprehensive, accurate, and well-structured answer tailored to your specific query.`,
        solution_2: `As ${MODEL_2}, here is my response to "${question}":\n\nThis is a simulated answer from ${MODEL_2}. In a real implementation, this would be the actual Claude-3 response to your question. The model would approach the problem thoughtfully, providing nuanced analysis and a clear, detailed response with proper reasoning and supporting context.`,
        judge: {
          solution_1_score: Math.floor(Math.random() * 3) + 8,
          solution_2_score: Math.floor(Math.random() * 3) + 8,
          solution_1_reasoning: `${MODEL_1}'s response demonstrates strong command of the subject matter with clear, well-organized information. The answer is factually accurate and covers the key points expected for this type of question. The writing is concise yet comprehensive, making it easy for the reader to understand.`,
          solution_2_reasoning: `${MODEL_2}'s response provides excellent depth and nuanced analysis. The reasoning is structured logically and the answer addresses all aspects of the question. The response shows sophisticated understanding and communicates complex ideas clearly and effectively.`,
        },
      });
    }, 2800);
  });
}

/* ─────────────────────────────────────────────────────
   Format timestamp
───────────────────────────────────────────────────── */
function fmtTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ─────────────────────────────────────────────────────
   Single battle result component (inline)
───────────────────────────────────────────────────── */
function BattleResult({ data }) {
  const { problem, solution_1, solution_2, judge } = data;
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;

  const isDraw   = solution_1_score === solution_2_score;
  const sol1Wins = !isDraw && solution_1_score > solution_2_score;
  const sol2Wins = !isDraw && solution_2_score > solution_1_score;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Solutions grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
        }}
      >
        <SolutionCard
          modelLabel="Model Alpha"
          modelName={MODEL_1}
          solution={solution_1}
          score={solution_1_score}
          maxScore={10}
          isWinner={sol1Wins}
          variant="cyan"
          delay=""
        />
        <SolutionCard
          modelLabel="Model Beta"
          modelName={MODEL_2}
          solution={solution_2}
          score={solution_2_score}
          maxScore={10}
          isWinner={sol2Wins}
          variant="purple"
          delay=""
        />
      </div>

      {/* Judge panel */}
      <JudgePanel
        solution1Score={solution_1_score}
        solution2Score={solution_2_score}
        solution1Reasoning={solution_1_reasoning}
        solution2Reasoning={solution_2_reasoning}
        model1Name={MODEL_1}
        model2Name={MODEL_2}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Main App
───────────────────────────────────────────────────── */
export default function App() {
  const [messages, setMessages]     = useState([]); // { id, type, text, data, timestamp }
  const [input, setInput]           = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const bottomRef                   = useRef(null);
  const chatRef                     = useRef(null);

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async (text) => {
    const question = (text || input).trim();
    if (!question || isLoading) return;

    setInput('');
    setIsLoading(true);

    const timestamp = fmtTime(new Date());
    const userMsg = { id: Date.now(), type: 'user', text: question, timestamp };

    /* Append user message + loading state */
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: Date.now() + 1, type: 'loading' },
    ]);

    try {
      const result = await simulateBattle(question);
      /* Replace loading with result */
      setMessages((prev) => [
        ...prev.filter((m) => m.type !== 'loading'),
        {
          id: Date.now() + 2,
          type: 'result',
          data: result,
          timestamp: fmtTime(new Date()),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.type !== 'loading'),
        {
          id: Date.now() + 2,
          type: 'error',
          text: 'Something went wrong. Please try again.',
          timestamp: fmtTime(new Date()),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleSuggestion = (text) => {
    setInput(text);
    sendMessage(text);
  };

  const isEmpty = messages.length === 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.1) 0%, transparent 60%), #080b14',
      }}
    >
      {/* ── Header ── */}
      <Header model1Name={MODEL_1} model2Name={MODEL_2} />

      {/* ── Chat area ── */}
      <div
        ref={chatRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          /* Provide space for sticky input at bottom */
        }}
      >
        {isEmpty ? (
          /* Welcome / empty state */
          <WelcomeScreen onSuggestion={handleSuggestion} />
        ) : (
          /* Message list */
          <div
            style={{
              maxWidth: 900,
              width: '100%',
              margin: '0 auto',
              padding: '36px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
            }}
          >
            {messages.map((msg) => {
              if (msg.type === 'user') {
                return <UserMessage key={msg.id} text={msg.text} timestamp={msg.timestamp} />;
              }

              if (msg.type === 'loading') {
                return <ArenaThinking key={msg.id} />;
              }

              if (msg.type === 'result') {
                return (
                  <ArenaResult key={msg.id}>
                    <BattleResult data={msg.data} />
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: 'rgba(255,255,255,0.2)',
                        marginTop: 10,
                        textAlign: 'right',
                      }}
                    >
                      {msg.timestamp}
                    </p>
                  </ArenaResult>
                );
              }

              if (msg.type === 'error') {
                return (
                  <div
                    key={msg.id}
                    style={{
                      padding: '12px 18px',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: 12,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: '#fca5a5',
                    }}
                  >
                    ⚠️ {msg.text}
                  </div>
                );
              }

              return null;
            })}
            <div ref={bottomRef} style={{ height: 1 }} />
          </div>
        )}

        {/* ── Sticky chat input ── */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => sendMessage()}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
