"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, Info } from "lucide-react";

const instruments = [
  { symbol: "S&P 500", name: "Large-cap US stocks", value: "5,218.40", change: "+0.42%", positive: true },
  { symbol: "NASDAQ", name: "Technology-heavy index", value: "16,384.20", change: "+0.18%", positive: true },
  { symbol: "US 10Y", name: "Treasury yield", value: "4.31%", change: "−0.03", positive: false },
];

const timeRanges = ["1D", "1W", "1M", "1Y"] as const;
type TimeRange = (typeof timeRanges)[number];

const chartData: Record<TimeRange, number[]> = {
  "1D": [43, 46, 44, 49, 47, 51, 50, 56, 53, 58, 55, 62, 59, 64, 61, 68, 66, 72, 69, 75, 73, 79, 76, 82],
  "1W": [34, 39, 36, 44, 41, 47, 45, 50, 48, 55, 52, 58, 57, 61, 59, 68, 64, 72, 69, 76, 73, 79, 77, 84],
  "1M": [28, 33, 30, 41, 37, 43, 39, 47, 44, 51, 48, 55, 52, 61, 58, 64, 60, 69, 66, 73, 70, 79, 75, 84],
  "1Y": [19, 24, 21, 28, 26, 34, 31, 39, 35, 43, 41, 49, 45, 54, 51, 59, 56, 64, 62, 71, 68, 76, 73, 84],
};

const labels: Record<TimeRange, string[]> = {
  "1D": ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"],
  "1W": ["Mon", "Mon", "Tue", "Tue", "Wed", "Wed", "Thu", "Thu", "Fri", "Fri", "Fri", "Fri"],
  "1M": ["Sep 29", "Oct 1", "Oct 3", "Oct 5", "Oct 7", "Oct 9", "Oct 11", "Oct 13", "Oct 15", "Oct 17", "Oct 19", "Oct 21"],
  "1Y": ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
};

export default function MarketsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("S&P 500");
  const [timeRange, setTimeRange] = useState<TimeRange>("1D");
  const selectedInstrument = instruments.find(({ symbol }) => symbol === selectedSymbol) ?? instruments[0];
  const series = chartData[timeRange].map((value, index) => ({
    time: labels[timeRange][Math.floor(index / 2)],
    value: Math.round(value * (selectedSymbol === "NASDAQ" ? 1.8 : selectedSymbol === "US 10Y" ? 0.06 : 1) * 100) / 100,
  }));

  return (
    <div className="markets-page">
      <div className="page-heading markets-heading">
        <div>
          <p className="eyebrow">MARKET LAB <span className="simulated-tag">SIMULATED</span></p>
          <h1>See the market in context.</h1>
          <p className="page-subtitle">
            Explore sample price movements and practice describing what you see.
          </p>
        </div>
        <span className="market-session"><span className="market-dot" /> Market session example</span>
      </div>

      <section aria-label="Sample market instruments" className="instrument-strip">
        {instruments.map(({ symbol, name, value, change, positive }) => {
          const Icon = positive ? ArrowUpRight : ArrowDownRight;
          return (
            <button
              aria-pressed={selectedSymbol === symbol}
              className={`instrument-tile${selectedSymbol === symbol ? " selected" : ""}`}
              key={symbol}
              onClick={() => setSelectedSymbol(symbol)}
              type="button"
            >
              <span className="instrument-name">{symbol}<span>{name}</span></span>
              <span className="instrument-value">{value}</span>
              <span className={`instrument-change ${positive ? "positive" : "negative"}`}><Icon aria-hidden="true" size={13} />{change}</span>
            </button>
          );
        })}
      </section>

      <section aria-label={`${selectedSymbol} sample chart`} className="chart-panel">
        <div className="chart-panel-header">
          <div>
            <p className="eyebrow">ILLUSTRATIVE PRICE SERIES</p>
            <div className="chart-title-row">
              <h2>{selectedInstrument.symbol}</h2>
              <span className="chart-live-label"><span /> Sample series</span>
            </div>
            <div className="chart-current-value">
              <strong>{selectedInstrument.value}</strong>
              <span className={selectedInstrument.positive ? "positive" : "negative"}>{selectedInstrument.change}</span>
              <span>example period</span>
            </div>
          </div>
          <div aria-label="Select chart time range" className="time-range-control">
            {timeRanges.map((range) => (
              <button
                aria-pressed={timeRange === range}
                className={timeRange === range ? "selected" : ""}
                key={range}
                onClick={() => setTimeRange(range)}
                type="button"
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={series} margin={{ top: 16, right: 12, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="#edf0eb" strokeDasharray="3 5" vertical={false} />
              <XAxis axisLine={false} dataKey="time" minTickGap={30} tick={{ fill: "#879087", fontSize: 9 }} tickLine={false} />
              <YAxis axisLine={false} domain={["dataMin - 5", "dataMax + 5"]} tick={{ fill: "#879087", fontSize: 9 }} tickLine={false} tickCount={5} />
              <Tooltip
                contentStyle={{ border: "1px solid #e4e9e1", borderRadius: 7, fontSize: 10 }}
                formatter={(value) => [`${value}`, "Illustrative value"]}
                labelStyle={{ color: "#68736a", marginBottom: 4 }}
              />
              <Line activeDot={{ r: 4, fill: "#2e6d50", stroke: "#fff", strokeWidth: 2 }} dataKey="value" dot={false} stroke="#397553" strokeWidth={2.2} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-footnote"><Info aria-hidden="true" size={13} /> Values are simulated for educational use and do not represent live or historical market data.</div>
      </section>

      <section aria-label="Market reading prompts" className="reading-prompts">
        <div className="reading-prompt-title">
          <p className="eyebrow">PRACTICE YOUR OBSERVATION</p>
          <h2>Before you interpret a chart, ask:</h2>
        </div>
        <div className="prompt-question"><span>01</span> What time period am I looking at?</div>
        <div className="prompt-question"><span>02</span> What changed, and what stayed the same?</div>
        <div className="prompt-question"><span>03</span> What information would I need before drawing a conclusion?</div>
      </section>

      <p className="markets-disclaimer">TradeMentor is for education, not financial advice. All figures on this page are invented examples. Practice account only.</p>
    </div>
  );
}