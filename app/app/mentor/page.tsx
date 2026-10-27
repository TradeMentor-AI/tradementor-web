"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleHelp,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Message = {
  role: "learner" | "mentor";
  text: string;
};

const suggestions = [
  { icon: BookOpen, label: "Explain a market order", prompt: "How does a market order work?" },
  { icon: ChartNoAxesCombined, label: "Help me read a chart", prompt: "What should I look for when reading a price chart?" },
  { icon: ShieldCheck, label: "Talk about risk", prompt: "How do traders think about risk?" },
];

function createDemoReply(question: string) {
  const normalized = question.toLowerCase();

  if (/\b(buy|sell|recommend|should i|target price)\b/.test(normalized)) {
    return "I can help you understand concepts, but I can’t tell you what to buy or sell. A useful learning exercise is to write down your time horizon, what could prove your idea wrong, and how much uncertainty you can accept. Consider discussing personal financial decisions with a qualified professional.";
  }

  if (/market order|limit order|order type/.test(normalized)) {
    return "A market order prioritizes getting filled quickly, while a limit order sets the price you are willing to accept and may not fill. Neither guarantees a better outcome: execution depends on liquidity, spread, and how prices move. Try comparing both against the same sample order in a paper-trading environment.";
  }

  if (/risk|position size|diversif/.test(normalized)) {
    return "Risk is the range of outcomes you might experience, including losses. Learners often start by asking: what could go wrong, how large is the exposure, and are several positions tied to the same underlying factor? Diversification can spread some risks, but it does not remove them.";
  }

  if (/chart|candle|trend|price/.test(normalized)) {
    return "Start with context before naming a pattern: check the chart’s timeframe, the instrument, and what the axes measure. Then describe what changed without assuming why it changed. A chart shows recorded prices, not what will happen next.";
  }

  return "Let’s break that down carefully. First, identify the key term and the time horizon you mean. Then separate what is observable from what you are inferring. I can explain market mechanics and learning concepts, but this demo cannot assess personal circumstances or predict prices.";
}

export default function MentorPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = prompt.trim();
    if (!question) return;

    setMessages((current) => [
      ...current,
      { role: "learner", text: question },
      { role: "mentor", text: createDemoReply(question) },
    ]);
    setPrompt("");
  }

  return (
    <div className="mentor-page">
      <div className="page-heading mentor-heading">
        <div>
          <p className="eyebrow">AI STUDY PARTNER</p>
          <h1>Curiosity is a good place to start.</h1>
          <p className="page-subtitle">
            Ask about market concepts, charts, and the language you&apos;re learning.
          </p>
        </div>
        <span className="mentor-prototype-label"><span /> Local prototype</span>
      </div>

      <div className="mentor-layout">
        <section aria-label="AI mentor conversation" className="conversation-panel">
          <div className="conversation-header">
            <span className="mentor-avatar"><BrainCircuit aria-hidden="true" size={17} /></span>
            <div>
              <strong>TradeMentor</strong>
              <span>Learning mode <span aria-hidden="true">·</span> Demo responses</span>
            </div>
            <span className="conversation-spark"><Sparkles aria-hidden="true" size={16} /></span>
          </div>

          {messages.length === 0 ? (
            <div className="conversation-empty">
              <div className="empty-illustration"><CircleHelp aria-hidden="true" size={23} strokeWidth={1.6} /></div>
              <h2>What would you like to understand?</h2>
              <p>Start with a concept you&apos;ve come across, or choose a prompt below.</p>
              <div className="suggestion-list">
                {suggestions.map(({ icon: Icon, label, prompt: suggestedPrompt }) => (
                  <button className="suggestion-button" key={label} onClick={() => setPrompt(suggestedPrompt)} type="button">
                    <Icon aria-hidden="true" size={15} />
                    <span>{label}</span>
                    <ArrowUpRight aria-hidden="true" className="suggestion-arrow" size={14} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div aria-live="polite" className="message-list">
              {messages.map((message, index) => (
                <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                  {message.role === "mentor" && <span className="message-avatar"><BrainCircuit aria-hidden="true" size={14} /></span>}
                  <p>{message.text}</p>
                </article>
              ))}
            </div>
          )}

          <form className="mentor-composer" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="mentor-prompt">Ask a market learning question</label>
            <textarea
              id="mentor-prompt"
              maxLength={500}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Ask a question about what you’re learning..."
              rows={2}
              value={prompt}
            />
            <div className="composer-footer">
              <span>Keep it educational. No personal trade recommendations.</span>
              <button aria-label="Send question" className="send-button" disabled={!prompt.trim()} type="submit">
                <Send aria-hidden="true" size={15} />
              </button>
            </div>
          </form>
          <p className="prototype-note">Prototype replies are generated locally from simple rules. No AI model or market feed is connected.</p>
        </section>

        <aside aria-label="Mentor guidance" className="mentor-sidebar">
          <section className="mentor-guidance">
            <p className="eyebrow">A GOOD QUESTION HAS...</p>
            <div className="guidance-item"><span>01</span><p><strong>A clear concept</strong>What word or idea are you exploring?</p></div>
            <div className="guidance-item"><span>02</span><p><strong>A little context</strong>Where did you encounter it?</p></div>
            <div className="guidance-item"><span>03</span><p><strong>Room for nuance</strong>Markets rarely have one simple answer.</p></div>
          </section>
          <section className="mentor-boundary">
            <ShieldCheck aria-hidden="true" size={17} />
            <h2>Education, not advice</h2>
            <p>The mentor helps explain concepts. It does not predict markets or recommend trades.</p>
          </section>
          <a className="mentor-resource" href="/learn">
            <span className="resource-icon"><BookOpen aria-hidden="true" size={16} /></span>
            <span><strong>Explore the lesson library</strong><small>Build context at your own pace</small></span>
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </aside>
      </div>
    </div>
  );
}