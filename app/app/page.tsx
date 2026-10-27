import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock3,
  Flame,
  Sparkles,
} from "lucide-react";

const marketExamples = [
  { symbol: "S&P 500", name: "Large-cap US stocks", price: "5,218.40", change: "+0.42%", up: true },
  { symbol: "NASDAQ", name: "Technology-heavy index", price: "16,384.20", change: "+0.18%", up: true },
  { symbol: "10Y yield", name: "US Treasury reference", price: "4.31%", change: "−0.03", up: false },
];

export default function Home() {
  return (
    <div className="dashboard-page">
      <div className="page-heading dashboard-heading">
        <div>
          <p className="eyebrow">TUESDAY, OCTOBER 27</p>
          <h1>Good morning, Jordan</h1>
          <p className="page-subtitle">
            A little market knowledge goes a long way. Pick up where you left off.
          </p>
        </div>
        <Link className="text-link" href="/learn">
          Browse learning paths <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>

      <section aria-label="Your learning progress" className="dashboard-grid">
        <article className="continue-card">
          <div className="continue-topline">
            <span className="lesson-kicker"><BookOpen aria-hidden="true" size={14} /> YOUR NEXT LESSON</span>
            <span className="lesson-duration"><Clock3 aria-hidden="true" size={13} /> 12 min</span>
          </div>
          <div className="continue-copy">
            <p className="lesson-path">FOUNDATIONS <span>·</span> MODULE 02</p>
            <h2>How markets<br />actually move</h2>
            <p>Meet buyers, sellers, and the forces that bring them together.</p>
          </div>
          <div className="lesson-progress-row">
            <div aria-label="2 of 6 lessons completed" className="progress-track">
              <span />
            </div>
            <span>2 of 6</span>
          </div>
          <Link className="button button-lime" href="/learn">
            Continue learning <ArrowRight aria-hidden="true" size={16} />
          </Link>
          <div aria-hidden="true" className="continue-orbit orbit-one" />
          <div aria-hidden="true" className="continue-orbit orbit-two" />
        </article>

        <article className="rhythm-card">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">YOUR RHYTHM</p>
              <h2>Small steps, steady progress</h2>
            </div>
            <span className="streak-icon"><Flame aria-hidden="true" size={17} /></span>
          </div>
          <div className="streak-count"><strong>4</strong><span>day learning streak</span></div>
          <div aria-label="Learning activity this week" className="week-bars">
            {[
              ["M", "done"], ["T", "done"], ["W", "done"], ["T", "today"],
              ["F", "future"], ["S", "future"], ["S", "future"],
            ].map(([day, status], index) => (
              <div className="week-day" key={`${day}-${index}`}>
                <span className={`week-bar ${status}`} />
                <span>{day}</span>
              </div>
            ))}
          </div>
          <p className="rhythm-footnote">You&apos;re building a habit that compounds.</p>
        </article>
      </section>

      <section className="dashboard-lower-grid">
        <article className="market-card">
          <div className="section-title-row market-card-heading">
            <div>
              <p className="eyebrow">A MOMENT IN THE MARKET</p>
              <h2>Today&apos;s market context</h2>
            </div>
            <Link aria-label="Explore market lab" className="icon-link" href="/markets">
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="market-list">
            {marketExamples.map(({ symbol, name, price, change, up }) => {
              const ChangeIcon = up ? ArrowUpRight : ArrowDownRight;
              return (
                <div className="market-row" key={symbol}>
                  <div className="market-symbol">
                    <strong>{symbol}</strong>
                    <span>{name}</span>
                  </div>
                  <strong className="market-price">{price}</strong>
                  <span className={`market-change ${up ? "positive" : "negative"}`}>
                    <ChangeIcon aria-hidden="true" size={13} /> {change}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="data-disclaimer">Illustrative figures for learning only. Not live data or investment advice.</p>
        </article>

        <article className="concept-card">
          <div className="concept-spark"><Sparkles aria-hidden="true" size={17} /></div>
          <p className="eyebrow">A CONCEPT TO KEEP</p>
          <h2>Price is a conversation.</h2>
          <p>
            Every quoted price reflects the latest point where a buyer and seller agreed. The order book shows the conversation still in progress.
          </p>
          <Link className="text-link" href="/mentor">
            Explore with your AI mentor <ArrowRight aria-hidden="true" size={15} />
          </Link>
          <span className="concept-index">01 / 12</span>
        </article>
      </section>

      <p className="dashboard-footnote">
        TradeMentor is an educational project. Examples are simulated and are not recommendations to buy or sell.
      </p>
    </div>
  );
}
