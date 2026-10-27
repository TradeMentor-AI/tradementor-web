"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  Compass,
  GraduationCap,
} from "lucide-react";

const navigation = [
  { label: "Overview", href: "/", icon: Compass },
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Market lab", href: "/markets", icon: ChartNoAxesCombined },
  { label: "AI mentor", href: "/mentor", icon: BrainCircuit },
];

function NavigationLinks() {
  const pathname = usePathname();

  return navigation.map(({ label, href, icon: Icon }) => {
    const active = pathname === href;

    return (
      <Link
        aria-current={active ? "page" : undefined}
        className={`nav-link${active ? " active" : ""}`}
        href={href}
        key={href}
      >
        <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
        <span>{label}</span>
      </Link>
    );
  });
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside aria-label="Main sidebar" className="sidebar">
        <Link aria-label="TradeMentor home" className="brand" href="/">
          <span className="brand-mark">
            <GraduationCap aria-hidden="true" size={20} strokeWidth={2} />
          </span>
          <span>
            <span className="brand-name">TradeMentor</span>
            <span className="brand-caption">Learn the market</span>
          </span>
        </Link>
        <p className="nav-section-label">Workspace</p>
        <nav aria-label="Main navigation" className="nav-list">
          <NavigationLinks />
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <div className="sidebar-note-title">Practice before you trade</div>
            <div className="sidebar-note-copy">
              Explore every lesson in a risk-free learning environment.
            </div>
          </div>
          <div className="sidebar-footer">
            <span aria-hidden="true" className="avatar">JM</span>
            <span>
              <span className="profile-name">Jordan Morgan</span>
              <span className="profile-plan">Learner account</span>
            </span>
          </div>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-market">
            <span aria-hidden="true" className="market-dot" />
            <span>Learning mode</span>
            <span aria-hidden="true">·</span>
            <span>Market data is simulated</span>
          </div>
        </header>
        <main className="page-content" id="main-content">
          {children}
        </main>
      </div>
      <nav aria-label="Mobile navigation" className="mobile-nav">
        <NavigationLinks />
      </nav>
    </div>
  );
}