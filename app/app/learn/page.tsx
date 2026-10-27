import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const learningPaths = [
  {
    number: "02",
    category: "CHART READING",
    title: "Read the story in a chart",
    description: "Understand candles, timeframes, and the difference between a pattern and a prediction.",
    lessons: "5 lessons",
    duration: "48 min",
    icon: BarChart3,
    color: "sage",
    href: "#charts",
  },
  {
    number: "03",
    category: "RISK & DECISIONS",
    title: "Build a risk-first mindset",
    description: "Learn about position sizing, diversification, and why protecting capital comes first.",
    lessons: "7 lessons",
    duration: "1 hr 10 min",
    icon: ShieldCheck,
    color: "ochre",
    href: "#risk",
  },
];

const foundations = [
  { title: "What is a market?", duration: "8 min", complete: true },
  { title: "Who participates and why?", duration: "10 min", complete: true },
  { title: "How markets actually move", duration: "12 min", complete: false },
  { title: "Orders, liquidity & spreads", duration: "14 min", complete: false },
  { title: "Putting the pieces together", duration: "9 min", complete: false },
];

export default function LearnPage() {
  return (
    <div className="learn-page">
      <div className="page-heading learn-heading">
        <div>
          <p className="eyebrow">LEARNING LIBRARY</p>
          <h1>Build knowledge that lasts.</h1>
          <p className="page-subtitle">
            Clear, practical lessons for understanding markets on your own terms.
          </p>
        </div>
        <span className="library-count"><BookOpen aria-hidden="true" size={14} /> 3 learning paths</span>
      </div>

      <section aria-labelledby="continue-foundations" className="foundations-panel" id="foundations">
        <div className="foundations-summary">
          <div className="path-meta"><span className="path-number">01</span> FOUNDATIONS</div>
          <h2 id="continue-foundations">Start with the building blocks.</h2>
          <p>Get comfortable with the language, participants, and mechanics before exploring strategies.</p>
          <div className="foundations-stats">
            <span><BookOpen aria-hidden="true" size={13} /> 5 lessons</span>
            <span><Clock3 aria-hidden="true" size={13} /> 53 min</span>
          </div>
          <Link className="button button-lime path-button" href="#foundations-lessons">
            Continue path <ArrowRight aria-hidden="true" size={15} />
          </Link>
          <div aria-hidden="true" className="path-decoration">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="foundations-progress">
          <div className="progress-header">
            <span>YOUR PROGRESS</span>
            <strong>2 / 5</strong>
          </div>
          <div aria-label="2 of 5 lessons completed" className="path-progress-track"><span /></div>
          <div className="lesson-list" id="foundations-lessons">
            {foundations.map(({ title, duration, complete }, index) => (
              <div className="lesson-list-item" key={title}>
                <span className={`lesson-step${complete ? " complete" : ""}`}>
                  {complete ? <Check aria-hidden="true" size={12} /> : String(index + 1).padStart(2, "0")}
                </span>
                <span className="lesson-list-title">{title}</span>
                <span className="lesson-list-duration">{duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="library-section-heading">
        <div>
          <p className="eyebrow">CHOOSE YOUR NEXT STEP</p>
          <h2>More paths to explore</h2>
        </div>
        <span className="library-note">Learn at your own pace</span>
      </div>

      <section aria-label="More learning paths" className="learning-path-grid">
        {learningPaths.map(({ number, category, title, description, lessons, duration, icon: Icon, color, href }) => (
          <article className="learning-path-card" key={number}>
            <div className="learning-card-top">
              <span className={`learning-icon ${color}`}><Icon aria-hidden="true" size={18} strokeWidth={1.8} /></span>
              <span className="path-number-small">PATH {number}</span>
            </div>
            <p className="eyebrow">{category}</p>
            <h3>{title}</h3>
            <p className="learning-description">{description}</p>
            <div className="learning-card-bottom">
              <span>{lessons} <span aria-hidden="true">·</span> {duration}</span>
              <Link aria-label={`Preview ${title}`} className="icon-link" href={href}>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section aria-label="Course previews" className="course-previews">
        <div className="course-preview" id="charts">
          <span className="preview-index">02</span>
          <div><p className="eyebrow">CHART READING</p><h3>Read the story in a chart</h3></div>
          <p>Five short lessons on candlesticks, timeframes, volume, and chart context.</p>
          <span className="preview-status">Coming up next</span>
        </div>
        <div className="course-preview" id="risk">
          <span className="preview-index">03</span>
          <div><p className="eyebrow">RISK & DECISIONS</p><h3>Build a risk-first mindset</h3></div>
          <p>Seven lessons to make uncertainty, diversification, and risk easier to reason about.</p>
          <span className="preview-status">Coming up next</span>
        </div>
      </section>

      <div className="learn-footer-note">
        <ShieldCheck aria-hidden="true" size={15} />
        Education first. Every example is for learning and not a recommendation to trade.
        <Link className="text-link" href="/mentor">Ask a question <ArrowRight aria-hidden="true" size={14} /></Link>
      </div>
    </div>
  );
}