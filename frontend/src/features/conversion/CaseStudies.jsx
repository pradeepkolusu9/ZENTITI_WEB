import React from "react";
import { motion } from "framer-motion";

export const CaseStudies = () => {
  return (
    <section
      id="conversion-case-studies"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "var(--bg-page)" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <iframe
          srcDoc={`
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Case Studies — Zentiti</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
            <style>
            *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

            :root {
              --bg:       #F0F1F5;
              --card:     #FFFFFF;
              --border:   #D0D1DA;
              --text-1:   #0E0F11;
              --text-2:   #5C5E6A;
              --text-3:   #6E7080;
              --accent:   #E84E1B;
              --darkbar:  #111218;
              --icon-bg:  #ECECF0;
              --ff:       'Inter', system-ui, sans-serif;
            }

            /* ── DARK ── */
            body.dark {
              --bg:       #0E0F11;
              --card:     #16171C;
              --border:   #242530;
              --text-1:   #F0F1F5;
              --text-2:   #80828F;
              --text-3:   #4A4C58;
              --darkbar:  #08090C;
              --icon-bg:  #1E1F26;
            }

            html { color-scheme: light dark; }
            body {
              background: var(--bg);
              font-family: var(--ff);
              color: var(--text-1);
              padding: 80px 32px 0;
              transition: background 0.25s, color 0.25s;
            }

            /* ── TOGGLE ── */
            .toggle-wrap {
              max-width: 1200px;
              margin: 0 auto 48px;
              display: flex;
              justify-content: flex-end;
            }
            .toggle {
              display: flex;
              background: var(--card);
              border: 1px solid var(--border);
              border-radius: 100px;
              padding: 3px;
            }
            .tbtn {
              padding: 5px 18px;
              border-radius: 100px;
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.04em;
              color: var(--text-3);
              background: transparent;
              border: none;
              cursor: pointer;
              font-family: var(--ff);
              transition: all 0.18s;
            }
            .tbtn.active { background: var(--text-1); color: var(--bg); }

            /* ── SECTION ── */
            .section { max-width: 1200px; margin: 0 auto; }

            /* ── HEADER ── */
            .header { margin-bottom: 48px; }

            .pill {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              border: 1px solid var(--border);
              border-radius: 100px;
              padding: 5px 14px 5px 10px;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: var(--text-2);
              margin-bottom: 22px;
              background: var(--card);
            }
            .pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

            .heading {
              font-size: clamp(34px, 4vw, 52px);
              font-weight: 800;
              line-height: 1.06;
              letter-spacing: -0.03em;
              color: var(--text-1);
              margin-bottom: 16px;
            }
            .heading span { color: var(--accent); }

            .subtext {
              font-size: 15px;
              font-weight: 400;
              color: var(--text-2);
              line-height: 1.7;
              max-width: 540px;
            }

            /* ── GRID ── */
            .grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
              margin-bottom: 12px;
            }
            @media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }

            /* ── CARD ── */
            .card {
              background: var(--card);
              border: 1px solid var(--border);
              border-radius: 16px;
              padding: 0;
              overflow: hidden;
              transition: border-color 0.2s, box-shadow 0.2s;
              display: flex;
              flex-direction: column;
            }
            .card:hover {
              border-color: #A0A2B0;
              box-shadow: 0 4px 24px rgba(0,0,0,0.06);
            }
            body.dark .card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.3); }

            /* card top — icon + industry stacked */
            .card-top {
              padding: 22px 22px 0;
              display: flex;
              align-items: flex-start;
              gap: 10px;
              margin-bottom: 20px;
            }

            .icon-box {
              width: 38px; height: 38px;
              background: var(--icon-bg);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            .icon-box svg {
              width: 17px; height: 17px;
              stroke: var(--text-2);
              fill: none;
              stroke-width: 1.7;
              stroke-linecap: round;
              stroke-linejoin: round;
              transition: stroke 0.2s;
            }
            .card:hover .icon-box svg { stroke: var(--accent); }

            .card-meta { display: flex; flex-direction: column; gap: 3px; padding-top: 2px; }

            .industry-tag {
              font-size: 10px;
              font-weight: 600;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              color: var(--text-2);
              line-height: 1.4;
            }

            /* stat area */
            .card-stat {
              padding: 0 22px 18px;
              border-bottom: 1px solid var(--border);
            }
            .stat-num {
              font-size: 38px;
              font-weight: 900;
              line-height: 1;
              letter-spacing: -0.04em;
              color: #6E7080;
              display: block;
              margin-bottom: 4px;
              transition: color 0.2s;
            }
            body.dark .stat-num { color: var(--text-1); }
            .card:hover .stat-num { color: var(--accent); }
            .stat-label {
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: var(--text-3);
            }

            /* case title */
            .card-body { padding: 18px 22px 0; }
            .card-title {
              font-size: 15px;
              font-weight: 700;
              color: var(--text-1);
              letter-spacing: -0.02em;
              margin-bottom: 10px;
              line-height: 1.3;
            }

            /* inner blocks */
            .blocks { padding: 0 22px 22px; display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }

            .block {
              border-radius: 8px;
              padding: 13px 14px;
              border: 1px solid transparent;
            }

            .block-label {
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              margin-bottom: 7px;
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .block-label-dot {
              width: 5px; height: 5px;
              border-radius: 50%;
              flex-shrink: 0;
            }

            /* CHALLENGE — very soft orange, dark label in light mode */
            .block-c { background: rgba(232,113,74,0.06); border-color: rgba(232,113,74,0.14); }
            .block-c .block-label { color: #9A4220; }
            .block-c .block-label-dot { background: #C86040; }
            body.dark .block-c { background: rgba(232,113,74,0.10); border-color: rgba(232,113,74,0.22); }
            body.dark .block-c .block-label { color: #F0956A; }
            body.dark .block-c .block-label-dot { background: #E8714A; }

            /* SOLUTION — use theme variables */
            .block-s { background: var(--pill-bg); border-color: var(--pill-border); }
            .block-s .block-label { color: var(--accent-ember); }
            .block-s .block-label-dot { background: var(--ember); }
            body.dark .block-s { background: var(--pill-bg); border-color: var(--pill-border); }
            body.dark .block-s .block-label { color: var(--pill-text); }
            body.dark .block-s .block-label-dot { background: var(--ember-glow); }

            /* OUTCOME — medium grey, clearly visible in light mode */
            .block-o { background: rgba(100,105,120,0.07); border-color: rgba(80,85,100,0.20); }
            .block-o .block-label { color: #3A3D4A; }
            .block-o .block-label-dot { background: #6A6E80; }
            body.dark .block-o { background: rgba(148,155,168,0.10); border-color: rgba(148,155,168,0.22); }
            body.dark .block-o .block-label { color: #A0AABB; }
            body.dark .block-o .block-label-dot { background: #8892A4; }

            .block-text {
              font-size: 12.5px;
              font-weight: 400;
              color: var(--text-2);
              line-height: 1.62;
            }

            /* ── CTA BAR ── */
            .cta-bar {
              background: var(--darkbar);
              border-radius: 0 0 0 0;
              margin-top: 0;
              padding: 26px 32px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 20px;
              flex-wrap: wrap;
            }
            .cta-text {
              font-size: 15px;
              font-weight: 500;
              color: rgba(255,255,255,0.8);
              line-height: 1.5;
            }
            .cta-text span { color: var(--accent); font-weight: 600; }

            .cta-btn {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: var(--accent);
              color: #fff;
              font-size: 13px;
              font-weight: 700;
              font-family: var(--ff);
              border: none;
              border-radius: 100px;
              padding: 11px 22px;
              cursor: pointer;
              white-space: nowrap;
              text-decoration: none;
              transition: opacity 0.18s;
            }
            .cta-btn:hover { opacity: 0.85; }
            .cta-btn svg {
              width: 13px; height: 13px;
              stroke: #fff; fill: none;
              stroke-width: 2.5; stroke-linecap: round;
              transition: transform 0.18s;
            }
            .cta-btn:hover svg { transform: translateX(3px); }

            /* spacer */
            .spacer { height: 80px; }

            /* ── ANIMATIONS ── */
            @keyframes up {
              from { opacity:0; transform:translateY(18px); }
              to   { opacity:1; transform:translateY(0); }
            }
            .header  { animation: up 0.45s ease both; }
            .grid    { animation: up 0.45s 0.07s ease both; }
            .cta-bar { animation: up 0.45s 0.14s ease both; }
            </style>
            </head>
            <body>

            <!-- TOGGLE -->
            <div class="toggle-wrap">
              <div class="toggle">
                <button class="tbtn active" id="btn-light" onclick="setTheme('light')">Light</button>
                <button class="tbtn"        id="btn-dark"  onclick="setTheme('dark')">Dark</button>
              </div>
            </div>

            <section class="section">

              <!-- HEADER -->
              <div class="header">
                <div class="pill"><span class="pill-dot"></span>Zentiti in action</div>
                <h2 class="heading">Case <span>studies.</span></h2>
                <p class="subtext whitespace-nowrap">Real-world solutions delivering measurable business outcomes across industries.</p>
              </div>

              <!-- GRID -->
              <div class="grid">

                <!-- CARD 1 -->
                <div class="card">
                  <div class="card-top">
                    <div class="icon-box">
                      <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    </div>
                    <div class="card-meta">
                      <span class="industry-tag">Marketing · Print · Supply Chain</span>
                    </div>
                  </div>
                  <div class="card-stat">
                    <span class="stat-num">40%</span>
                    <span class="stat-label">reduction in maintenance</span>
                  </div>
                  <div class="card-body">
                    <p class="card-title">Integration Migration @ Scale</p>
                  </div>
                  <div class="blocks">
                    <div class="block block-c">
                      <div class="block-label"><span class="block-label-dot"></span>Challenge</div>
                      <p class="block-text">300+ point-to-point integrations on legacy IBM middleware with no skill or software support.</p>
                    </div>
                    <div class="block block-s">
                      <div class="block-label"><span class="block-label-dot"></span>Solution</div>
                      <p class="block-text">Migrated to MuleSoft — converted 300+ legacy connections to API-led architecture.</p>
                    </div>
                    <div class="block block-o">
                      <div class="block-label"><span class="block-label-dot"></span>Outcome</div>
                      <p class="block-text">Future-ready data tech stack with 40% reduction in integration maintenance costs.</p>
                    </div>
                  </div>
                </div>

                <!-- CARD 2 -->
                <div class="card">
                  <div class="card-top">
                    <div class="icon-box">
                      <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <div class="card-meta">
                      <span class="industry-tag">Financial Services</span>
                    </div>
                  </div>
                  <div class="card-stat">
                    <span class="stat-num">2K+</span>
                    <span class="stat-label">requests per second sustained</span>
                  </div>
                  <div class="card-body">
                    <p class="card-title">API Modernization @ Scale</p>
                  </div>
                  <div class="blocks">
                    <div class="block block-c">
                      <div class="block-label"><span class="block-label-dot"></span>Challenge</div>
                      <p class="block-text">Legacy APIs with throttling, weak security, and substantial downtime under high transaction volumes.</p>
                    </div>
                    <div class="block block-s">
                      <div class="block-label"><span class="block-label-dot"></span>Solution</div>
                      <p class="block-text">MuleSoft API facade with identity auth, rate-limiting, and enterprise CI/CD for zero-downtime deploys.</p>
                    </div>
                    <div class="block block-o">
                      <div class="block-label"><span class="block-label-dot"></span>Outcome</div>
                      <p class="block-text">Sustained 2,000+ request/seconds peak loads. Future-ready open banking architecture established.</p>
                    </div>
                  </div>
                </div>

                <!-- CARD 3 -->
                <div class="card">
                  <div class="card-top">
                    <div class="icon-box">
                      <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    </div>
                    <div class="card-meta">
                      <span class="industry-tag">Higher Education · Texas</span>
                    </div>
                  </div>
                  <div class="card-stat">
                    <span class="stat-num">1.3M</span>
                    <span class="stat-label">records orchestrated weekly</span>
                  </div>
                  <div class="card-body">
                    <p class="card-title">360 View of Student Record</p>
                  </div>
                  <div class="blocks">
                    <div class="block block-c">
                      <div class="block-label"><span class="block-label-dot"></span>Challenge</div>
                      <p class="block-text">Data trapped in disconnected systems causing low visibility into student success and frequent errors.</p>
                    </div>
                    <div class="block block-s">
                      <div class="block-label"><span class="block-label-dot"></span>Solution</div>
                      <p class="block-text">MuleSoft based integrations unified siloed data into Salesforce Student Success Hub with automated daily delta sync.</p>
                    </div>
                    <div class="block block-o">
                      <div class="block-label"><span class="block-label-dot"></span>Outcome</div>
                      <p class="block-text">Holistic 360° student view for leadership via actionable dashboards driving institutional growth.</p>
                    </div>
                  </div>
                </div>

              </div>

              <!-- CTA BAR -->
              <div class="cta-bar">
                <p class="cta-text">Every engagement is <span>outcome-driven</span> — scoped, delivered and measured.</p>
                <a class="cta-btn" href="#">
                  View all case studies
                  <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>

            </section>
            <div class="spacer"></div>

            <script>
              function setTheme(t) {
                document.body.className = t;
                document.getElementById('btn-light').className = 'tbtn' + (t==='light' ? ' active' : '');
                document.getElementById('btn-dark').className  = 'tbtn' + (t==='dark'  ? ' active' : '');
              }
              setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            </script>
            </body>
            </html>
          `}
          style={{
            width: '100%',
            height: '800px',
            border: 'none',
            borderRadius: '16px',
            backgroundColor: 'transparent'
          }}
          title="Case Studies"
        />
      </div>
    </section>
  );
};
