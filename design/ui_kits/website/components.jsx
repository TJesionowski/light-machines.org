// ui_kits/website/components.jsx
const { useState, useEffect, useRef } = React;

// ---------- Header ----------
function Header({ route, onNavigate, theme, onToggleTheme }) {
  return (
    <header className="lm-header">
      <a className="wordmark" onClick={(e) => { e.preventDefault(); onNavigate('index'); }} href="#" aria-label="light-machines">
        <svg viewBox="0 0 280 36" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMinYMid meet">
          <defs>
            <mask id="hide-tittle">
              <rect width="280" height="36" fill="white"/>
              {/* hide the natural tittle of the 'i' so our LED replaces it cleanly */}
              <rect x="9" y="2" width="12" height="11" fill="black"/>
            </mask>
          </defs>
          <text className="wm-text" x="0" y="28"
                mask="url(#hide-tittle)"
                style={{ fontFamily: 'EB Garamond, Georgia, serif', fontSize: '28px', letterSpacing: '-0.025em', fontWeight: 500, fill: 'currentColor' }}>
            light-machines
          </text>
          {/* LED dot replacing the i's tittle */}
          <circle cx="14.5" cy="9" r="4" fill="var(--led)" />
        </svg>
      </a>
      <nav className="lm-nav">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('index'); }} className={route === 'index' ? 'active' : ''}>Essays</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className={route === 'about' ? 'active' : ''}>About</a>
        <button className="lm-theme-toggle" onClick={onToggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☾' : '☀'}&nbsp;{theme === 'dark' ? 'dark' : 'light'}
        </button>
      </nav>
    </header>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="lm-footer">
      <div className="lm-footer-inner">
        <div style={{ flex: '1 1 200px' }}>
          <h4>The publication</h4>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            light-machines is a long-form, evergreen publication. Essays are kept and revised over time.
          </p>
        </div>
        <div>
          <h4>Subscribe</h4>
          <p style={{ margin: 0 }}><a href="#">RSS feed</a></p>
          <p style={{ margin: 0 }}><a href="#">Email dispatch</a></p>
        </div>
        <div>
          <h4>Source</h4>
          <p style={{ margin: 0 }}><a href="#">Repository</a></p>
          <p style={{ margin: 0 }}><a href="#">Colophon</a></p>
        </div>
        <div>
          <h4>Last build</h4>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)' }}>2026-03-14 · 7e3a91c</p>
        </div>
      </div>
    </footer>
  );
}

// ---------- Essay row ----------
function EssayRow({ essay, onOpen }) {
  const status = essay.status; // finished | progress | draft
  const label = status === 'finished' ? '● done' : status === 'progress' ? '● wip' : '● draft';
  return (
    <div className="lm-row" onClick={() => onOpen(essay.id)}>
      <div className="year">{essay.year}</div>
      <div className="title">{essay.title}</div>
      <div className={`dot ${status}`}>{label}</div>
      <div className="min">{essay.min} min</div>
    </div>
  );
}

// ---------- Index page ----------
function IndexPage({ essays, onOpen }) {
  const finished = essays.filter(e => e.status === 'finished');
  const progress = essays.filter(e => e.status === 'progress');
  const drafts = essays.filter(e => e.status === 'draft');
  return (
    <div className="lm-page">
      <section className="lm-hero">
        <div className="eyebrow">A publication · est. 2024</div>
        <h1>Artifacts whose substance is illumination.</h1>
        <p className="dek">
          light-machines is an evergreen publication of essays, code, equations, and small interactive things — kept and revised over time, in the spirit of a notebook one returns to rather than a feed one scrolls.
        </p>
      </section>

      <section className="lm-list-section">
        <div className="lm-list-head">Finished <span className="count">· {finished.length}</span></div>
        {finished.map(e => <EssayRow key={e.id} essay={e} onOpen={onOpen} />)}
      </section>

      <section className="lm-list-section">
        <div className="lm-list-head">In progress <span className="count">· {progress.length}</span></div>
        {progress.map(e => <EssayRow key={e.id} essay={e} onOpen={onOpen} />)}
      </section>

      <section className="lm-list-section">
        <div className="lm-list-head">Drafts <span className="count">· {drafts.length}</span></div>
        {drafts.map(e => <EssayRow key={e.id} essay={e} onOpen={onOpen} />)}
      </section>
    </div>
  );
}

// ---------- Sidenote ----------
function Sidenote({ num, children }) {
  return (
    <aside className="lm-sidenote">
      <span className="num">{num}</span>{children}
    </aside>
  );
}

// ---------- Link with hover popup ----------
function PopLink({ children, popup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (open && ref.current) {
      const r = ref.current.getBoundingClientRect();
      const parent = ref.current.offsetParent;
      const pr = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 };
      setPos({
        left: r.left - pr.left,
        top: r.bottom - pr.top + 8,
      });
    }
  }, [open]);

  return (
    <span style={{ position: 'relative' }}>
      <a ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} href="#" onClick={e => e.preventDefault()}>
        {children}
      </a>
      {open && (
        <div className="lm-popup" style={{ left: pos.left, top: pos.top }}>
          <div className="src">↗ {popup.src}</div>
          {popup.text}
        </div>
      )}
    </span>
  );
}

// ---------- Interactive figure: legibility vs. weight ----------
function LegibilityFigure() {
  const [w, setW] = useState(0.5);
  const W = 480, H = 220, P = 32;
  // light score: legibility curve dependent on weight (capability) — diminishing returns
  // y = legibility(w) = 1 - exp(-3w) but penalized by 1.4*w^2 for excess weight
  const f = (x) => Math.max(0, (1 - Math.exp(-3 * x)) - 1.4 * x * x);
  const samples = Array.from({ length: 41 }, (_, i) => i / 40);
  const points = samples.map(x => [P + x * (W - 2 * P), H - P - f(x) * (H - 2 * P) * 1.6]);
  const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const cur = [P + w * (W - 2 * P), H - P - f(w) * (H - 2 * P) * 1.6];

  return (
    <figure className="lm-figure">
      <div className="frame">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%', height: 'auto' }}>
          {/* axes */}
          <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="var(--rule-strong)" strokeWidth="1" />
          <line x1={P} y1={P} x2={P} y2={H - P} stroke="var(--rule-strong)" strokeWidth="1" />
          {/* curve */}
          <path d={path} stroke="var(--led)" strokeWidth="1.5" fill="none" />
          {/* current point */}
          <line x1={cur[0]} y1={H - P} x2={cur[0]} y2={cur[1]} stroke="var(--rule-strong)" strokeDasharray="2 3" />
          <circle cx={cur[0]} cy={cur[1]} r="4" fill="var(--amber)" />
          {/* labels */}
          <text x={W - P} y={H - P + 18} textAnchor="end" style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fill: 'var(--ink-3)' }}>weight (capability) →</text>
          <text x={P - 4} y={P - 6} style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fill: 'var(--ink-3)' }}>legibility</text>
        </svg>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 700 }}>weight</span>
          <input type="range" min="0" max="1" step="0.01" value={w} onChange={e => setW(parseFloat(e.target.value))} style={{ flex: 1, accentColor: 'var(--led)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)', minWidth: 40, textAlign: 'right' }}>{w.toFixed(2)}</span>
        </div>
      </div>
      <figcaption><strong>Fig. 1.</strong> Legibility as a function of weight. Capability extension compounds, then turns. The amber point is the current chosen weight; drag to feel the tradeoff.</figcaption>
    </figure>
  );
}

// ---------- Essay page ----------
function EssayPage({ onBack }) {
  return (
    <div className="lm-page">
      <div style={{ maxWidth: 'var(--measure)', margin: '0 auto' }}>
        <button className="lm-back" onClick={onBack}>← All essays</button>
      </div>
      <header className="lm-essay-header">
        <div className="lm-meta-strip">
          <span>Essay</span>
          <span className="sep">|</span>
          <span>Started Jan 2024</span>
          <span className="sep">|</span>
          <span>Last revised Mar 2026</span>
          <span className="sep">|</span>
          <span style={{ color: 'var(--success)' }}>● Finished</span>
          <span className="right">21 min read</span>
        </div>
        <h1>On Light Machines</h1>
        <p className="dek">A conceptual frame for design.</p>
      </header>

      <div className="lm-prose">
        <div className="lm-prose-inner">
          <p className="dropcap">
            A <em>light machine</em> is an artifact whose substance is illumination. Not illumination in the photonic sense alone — though that register is never wholly absent — but illumination in the older sense: the descent of meaning into matter, the moment when the dark enigma of stuff resolves into pattern and becomes intelligible.
            <a className="marker" href="#">1</a>
          </p>
          <Sidenote num="1">
            The first thing said into the formless deep was <em>let there be light</em>, and what was created was not photons but the condition under which anything could be known at all.
          </Sidenote>

          <p>
            Hold the phrase against its sibling-traditions and let them stay in tension. The <PopLink popup={{ src: 'engelbart-1962.pdf', text: 'Augmenting Human Intellect: a conceptual framework. Engelbart\'s thesis that the dignity of the individual mind warrants instruments adequate to it.' }}>tool for thought</PopLink> is a light machine in the lineage of personal capability extension. The <PopLink popup={{ src: 'pageau-language-of-creation', text: 'Pageau: matter rightly ordered expresses spirit by making it visible. The lampstand bears, focuses, and offers light it has received.' }}>lampstand</PopLink> is a light machine of liturgy. They disagree productively.
          </p>

          <h2>The corollaries</h2>

          <p>
            <em>Legibility is the load-bearing virtue.</em> If the artifact's behavior, state, and reasoning are not legible to its user, no amount of capability redeems it. The user must be able to see what the machine is doing on their behalf.<a className="marker" href="#">2</a>
          </p>
          <Sidenote num="2">
            Opaque cleverness is heavy; transparent competence is light.
          </Sidenote>

          <p>
            <em>Restraint is generative.</em> Light is what passes through; darkness is what accumulates. An artifact that adds chrome, modes, options, and notifications without proportional gain is becoming heavy.
          </p>

          <blockquote>
            The discipline is to ask, of every addition, whether it carries light or simply mass.
          </blockquote>

          <h2>An instrument made tangible</h2>

          <p>
            The <em>instrument</em> register insists on calibration. It rewards training. It has the modesty of a tool that knows its own scope. Below: a small instrument, in the literal sense — a plot of legibility against capability-weight. Drag the weight up and watch the curve turn.
          </p>

          <LegibilityFigure />

          <p>
            The shape is not the point. The point is that the shape exists, that one can <em>see</em> it, that it can be handled. A figure is not a decoration; it is a sentence one reads with the eyes.
          </p>

          <h2>The test</h2>

          <p>
            After using this artifact, does the person know more, see more clearly, act more freely? Or have they been managed?
          </p>

          <pre>{`def carries_light(artifact, user, institution):
    seen   = artifact.discloses_state_to(user)
    earned = artifact.compounds_capability_over(months=12)
    honest = not artifact.silently_restructures(institution)
    return seen and earned and honest`}</pre>

          <hr className="ornament" />

          <p>
            The frame is not a checklist. It is a question to ask of any design decision: <em>does this carry light?</em> Sometimes that question resolves immediately. Often it sits with a decision for a while and reveals which way the trade-off actually runs.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------- About page ----------
function AboutPage() {
  return (
    <div className="lm-page">
      <div className="lm-col">
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 700, marginBottom: 16 }}>About · Colophon</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 500, margin: '0 0 24px' }}>The publication.</h1>
        <p className="lm-lead" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: 'var(--ink-2)', textWrap: 'pretty' }}>
          A long-form, evergreen publication of essays, code, equations, plots, and small interactive things, kept and revised over time.
        </p>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.55, marginTop: 28 }}>
          The publication takes its name and posture from the founding essay, <em>On Light Machines</em>. Pieces are not "published once and forgotten" — they accrete, get revised, sometimes get retracted. The format is closer to a notebook than a feed.
        </p>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, margin: '48px 0 12px' }}>Colophon</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)', fontSize: 14 }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--rule)' }}><td style={{ padding: '10px 0', color: 'var(--ink-3)', width: 160 }}>Body type</td><td>EB Garamond · Georg Duffner</td></tr>
            <tr style={{ borderBottom: '1px solid var(--rule)' }}><td style={{ padding: '10px 0', color: 'var(--ink-3)' }}>UI type</td><td>Inria Sans · ANSSI</td></tr>
            <tr style={{ borderBottom: '1px solid var(--rule)' }}><td style={{ padding: '10px 0', color: 'var(--ink-3)' }}>Mono type</td><td>JetBrains Mono</td></tr>
            <tr style={{ borderBottom: '1px solid var(--rule)' }}><td style={{ padding: '10px 0', color: 'var(--ink-3)' }}>Body measure</td><td>~ 65 characters</td></tr>
            <tr style={{ borderBottom: '1px solid var(--rule)' }}><td style={{ padding: '10px 0', color: 'var(--ink-3)' }}>Source</td><td>Pandoc + custom static generator</td></tr>
            <tr><td style={{ padding: '10px 0', color: 'var(--ink-3)' }}>License</td><td>Essays CC-BY-SA · code MIT</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, {
  Header, Footer, EssayRow, IndexPage, EssayPage, AboutPage,
  Sidenote, PopLink, LegibilityFigure
});
