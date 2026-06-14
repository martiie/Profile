const { useState, useEffect } = React;

/* ══════════════════ DATA ══════════════════ */

const SOLUTION_WORDS = ['Defect Detection', 'OCR & Label Verify', 'Dimension & Measurement', 'Surface & Anomaly AI', 'SPC Monitoring'];

const STATS = [
  { v: '~35',  l: 'Vision Node Types' },
  { v: '10',   l: 'Node Categories' },
  { v: '8',    l: 'Demo Recipes' },
  { v: '100%', l: 'In-Browser Engine' },
];

const PLATFORM = [
  { icon: '🧩', title: 'Node-based recipe editor', desc: 'Compose an inspection as a graph of nodes + wires on a canvas — no code. ~35 node types across 10 categories.' },
  { icon: '⚡', title: 'In-browser vision engine',  desc: 'Pixel ops run client-side in a Web Worker with on-device ONNX inference — zero server round-trip per image.' },
  { icon: '✅', title: 'PASS / FAIL verdicts',      desc: 'Every run returns a verdict plus per-node image and measurement outputs you can inspect step by step.' },
  { icon: '🚀', title: 'Deploy & monitor',          desc: 'A .NET API persists recipes, runs them headless, and routes results — with SPC trend monitoring over batches.' },
];

const SOLUTIONS = [
  { icon: '🔍', title: 'Defect Detection',         desc: 'Real-time surface and component defect detection for fast-moving manufacturing QC lines.' },
  { icon: '📄', title: 'OCR & Label Verify',       desc: 'Thai/English OCR and 1D/2D barcode decoding to verify printed labels against the expected value.' },
  { icon: '📐', title: 'Dimension & Measurement',  desc: 'Caliper, distance, and geometry nodes for precise dimensional inspection and tolerance checks.' },
  { icon: '🧠', title: 'Surface & Anomaly AI',     desc: 'Golden-mask comparison and MobileSAM segmentation for defects that fixed rules can’t enumerate.' },
  { icon: '📈', title: 'SPC & Monitoring',         desc: 'Turn per-part verdicts into batch defect-rate trends with control-chart style monitoring.' },
  { icon: '🛠', title: 'Custom Vision Apps',       desc: 'End-to-end design and delivery of bespoke inspection systems — from data collection to deployment.' },
];

const PROCESS = [
  { n: '01', title: 'Discover',  desc: 'Understand the part, the defects that matter, and the constraints of the line.' },
  { n: '02', title: 'Prototype', desc: 'Build a recipe in the MARTIIEZ editor and validate it on real sample images.' },
  { n: '03', title: 'Validate',  desc: 'Tune thresholds, measure accuracy, and confirm PASS/FAIL against ground truth.' },
  { n: '04', title: 'Deploy',    desc: 'Ship the recipe to run on the line — in-browser or through the headless API.' },
  { n: '05', title: 'Monitor',   desc: 'Track defect-rate trends with SPC and iterate as the process drifts over time.' },
];

const SKILLS = [
  { cat: 'AI & Machine Learning',  col: 'var(--blue)',   items: ['Python','PyTorch','ONNX Runtime','MobileSAM','Scikit-learn','Pandas','NumPy','Time Series / SPC'] },
  { cat: 'Computer Vision',        col: 'var(--purple)', items: ['OpenCV','YOLO','Tesseract.js','ZXing','Golden-Mask','Anomaly Detection','Image Processing','Canvas / Web Workers'] },
  { cat: 'Backend Development',    col: 'var(--blue)',   items: ['C# / .NET 9','ASP.NET Core','EF Core 9','FastAPI','PostgreSQL','REST APIs','LLM Integration'] },
  { cat: 'Frontend Development',   col: 'var(--purple)', items: ['React 19','TypeScript','Vite','Tailwind CSS v4','React Router','JavaScript','HTML / CSS'] },
  { cat: 'DevOps & Deployment',    col: 'var(--blue)',   items: ['Docker','docker-compose','Git','Linux','Nginx','CI/CD'] },
];

const PROJECTS = [
  {
    id: 1, cat: 'Computer Vision',
    title: 'MARTIIEZ — Visual Vision-Pipeline Editor',
    desc:  'A low-code, node-based editor for machine-vision QC. Users build a "recipe" — a graph of nodes + wires on a canvas — run it, and get a PASS/FAIL verdict with per-node image & measurement outputs.',
    prob:  'Vision QC programs were hard-coded per use case, so every new inspection (bottle caps, label verify, solder QA, dimension checks) meant a fresh engineering cycle.',
    sol:   'Built a drag-and-drop graph editor with ~35 reusable node types across 10 categories (Input, Preprocessing, Position, Measurement, Geometry, Detection, Color, OCR, Logic, Output) — non-developers compose inspections without writing code.',
    tech:  ['React 19','TypeScript','Vite','Tailwind v4','ASP.NET Core','PostgreSQL'],
    res:   ['~35 node types · 10 categories','Recipe graph → PASS/FAIL verdict','8 production demo recipes seeded'],
    bg: 'linear-gradient(135deg,#0c1e3c 0%,#091528 100%)', accent: '#60a5fa', icon: '🧩',
  },
  {
    id: 2, cat: 'Computer Vision',
    title: 'In-Browser Vision Runtime',
    desc:  'The real vision engine runs entirely in the browser — a runtime walks the node run-order and executes each node, with heavy pixel operations offloaded to a Web Worker so the UI never blocks.',
    prob:  'Round-tripping every image to a server for processing added latency and infrastructure cost, and made the editor feel sluggish on large frames.',
    sol:   'Implemented a TypeScript runtime (runOrder → execute() per node) plus an imageOps Web Worker for blur/threshold/resize/crop, and on-device ONNX inference via onnxruntime-web.',
    tech:  ['TypeScript','Web Workers','onnxruntime-web','Canvas API','ImageData','MobileSAM'],
    res:   ['Pixel ops off the main thread','On-device ONNX inference','Zero server round-trip for image processing'],
    bg: 'linear-gradient(135deg,#160e38 0%,#0e0a28 100%)', accent: '#a78bfa', icon: '⚡',
  },
  {
    id: 3, cat: 'OCR & Document AI',
    title: 'OCR & Barcode Verification Nodes',
    desc:  'OCR and 1D/2D barcode nodes that read label text and codes in-browser, then verify them against an expected value to drive the inspection verdict.',
    prob:  'Label / print verification on the line needed Thai + English OCR and barcode decoding without a heavy native toolchain.',
    sol:   'Integrated Tesseract.js for Thai/English OCR and ZXing + jsbarcode/bwip-js/qrcode for QR and 1D/2D codes, wired into the recipe graph as verify nodes.',
    tech:  ['Tesseract.js','ZXing','jsbarcode','bwip-js','qrcode','React'],
    res:   ['Thai + English OCR in-browser','QR / 1D / 2D barcode decode','Label verify against expected value'],
    bg: 'linear-gradient(135deg,#0b2828 0%,#071818 100%)', accent: '#34d399', icon: '📄',
  },
  {
    id: 4, cat: 'Computer Vision',
    title: 'Surface-Defect & Anomaly Detection',
    desc:  'Golden-mask reference comparison and AI surface inspection nodes for detecting scratches, dents, and anomalies against a known-good template.',
    prob:  'Surface defects vary too much to enumerate with fixed rules, so inspections needed a reference-based / learned approach.',
    sol:   'Added golden-mask comparison plus MobileSAM segmentation (exported to ONNX) as detection nodes that output per-region measurements and feed the PASS/FAIL logic.',
    tech:  ['MobileSAM','ONNX','OpenCV ops','Golden-Mask','PyTorch','TypeScript'],
    res:   ['Golden-mask reference comparison','MobileSAM segmentation (ONNX export)','Per-node measurement → verdict'],
    bg: 'linear-gradient(135deg,#280f30 0%,#18091e 100%)', accent: '#f59e0b', icon: '🔍',
  },
  {
    id: 5, cat: 'Data Science',
    title: 'SPC Time-Series Monitor',
    desc:  'Statistical-process-control recipes that track defect-rate and measurement trends over batches — turning per-run verdicts into a monitored quality signal.',
    prob:  'A single PASS/FAIL per part hides drift; the line needed to see quality trending out of control before it produced scrap.',
    sol:   'Built SPC / time-series monitor recipes (control-chart logic + batch statistics) on top of the run history, surfacing defect-rate trends across batches.',
    tech:  ['Time Series','SPC','PostgreSQL','Logic Nodes','React','TypeScript'],
    res:   ['SPC control-chart monitoring','Batch defect-rate trend tracking','batch-stats & vision-spc recipes'],
    bg: 'linear-gradient(135deg,#0b2818 0%,#071810 100%)', accent: '#60a5fa', icon: '📈',
  },
  {
    id: 6, cat: 'Full Stack',
    title: 'Recipe Backend & LLM Deploy Mode',
    desc:  'An ASP.NET Core API that persists recipes, runs them server-side in deploy mode, and routes results through an LLM node — auto-migrating and seeding demo data on startup.',
    prob:  'Recipes built in the editor needed durable storage, headless execution, and a way to post-process or route outputs in production.',
    sol:   'Built a .NET 9 Web API with EF Core 9 + PostgreSQL, a per-type node-processor pipeline, REST run endpoints (POST /api/recipes/{id}/runs), and an LLM node (ThaiLLM) for sentiment routing / text post-processing.',
    tech:  ['C# / .NET 9','ASP.NET Core','EF Core 9','PostgreSQL','Docker','LLM API'],
    res:   ['Auto-migrate + seed on startup','REST run API with per-node logs','LLM node for routing / post-processing'],
    bg: 'linear-gradient(135deg,#0e1a2e 0%,#0a1320 100%)', accent: '#a78bfa', icon: '🖥',
  },
  {
    id: 7, cat: 'NLP & LLM',
    title: 'HIV Risk-Guidance Chatbot (RAG)',
    desc:  'A GPT-powered chatbot using Retrieval-Augmented Generation to give personalized HIV risk assessments grounded in trusted medical sources. Built at Beyond Coding.',
    prob:  'General LLMs hallucinate on sensitive medical questions and can’t cite trusted sources — unsafe for real health guidance.',
    sol:   'Built an ETL pipeline that cleans and embeds vetted medical content into a vector knowledge base, then retrieves relevant context at query time for accurate, context-aware answers.',
    tech:  ['GPT','RAG','Vector DB','ETL','Python','FastAPI'],
    res:   ['Retrieval-grounded medical answers','ETL into a vector knowledge base','Personalized risk assessment'],
    bg: 'linear-gradient(135deg,#101e36 0%,#0a1424 100%)', accent: '#34d399', icon: '💬',
  },
  {
    id: 8, cat: 'Data Science',
    title: 'rHCC Patient Survival Prediction',
    desc:  'A predictive model estimating survival time for ruptured hepatocellular carcinoma (rHCC) patients with hemorrhage, using clinical and lab data to support treatment planning.',
    prob:  'Clinicians lacked a data-driven way to compare treatment outcomes for rHCC — a major public-health issue in Thailand.',
    sol:   'Built a survival model with thorough preprocessing (missing-value handling, feature selection) and K-Fold cross-validation to compare treatment outcomes.',
    tech:  ['Python','Scikit-learn','Survival Analysis','K-Fold CV','Pandas','EDA'],
    res:   ['Clinical + lab feature modeling','K-Fold cross-validation','Treatment-outcome comparison'],
    bg: 'linear-gradient(135deg,#2a1410 0%,#1a0c08 100%)', accent: '#f59e0b', icon: '🩺',
  },
  {
    id: 9, cat: 'Computer Vision',
    title: 'Tomato Quality Inspection (YOLOv11)',
    desc:  'A real-time computer-vision system that classifies tomatoes as fresh or rotten for agricultural quality control, served via REST API.',
    prob:  'Manual sorting of produce for freshness is slow, subjective, and hard to scale on a farm line.',
    sol:   'Trained a YOLOv11 detector for high-speed classification directly from camera images and exposed results through a REST API for automated quality-inspection workflows.',
    tech:  ['YOLOv11','PyTorch','OpenCV','FastAPI','Python','REST API'],
    res:   ['92%+ classification accuracy','Real-time camera detection','REST API for automation'],
    bg: 'linear-gradient(135deg,#0b2818 0%,#071810 100%)', accent: '#60a5fa', icon: '🍅',
  },
];

const VIDEOS = [
  { title: 'MARTIIEZ Editor Walkthrough', desc: 'Building an inspection recipe from nodes + wires',  dur: '3:20', bg: 'linear-gradient(135deg,#0c1e3c,#091528)' },
  { title: 'Bottle-Cap Inspection Run',   desc: 'Recipe execution → PASS/FAIL verdict live',        dur: '1:48', bg: 'linear-gradient(135deg,#160e38,#0e0a28)' },
  { title: 'OCR & Barcode Verify Nodes',  desc: 'Thai/English OCR + QR decode in the browser',      dur: '2:36', bg: 'linear-gradient(135deg,#0b2828,#071818)' },
  { title: 'SPC Time-Series Monitor',     desc: 'Tracking batch defect-rate trends over runs',      dur: '2:54', bg: 'linear-gradient(135deg,#280f30,#18091e)' },
];

const TIMELINE = [
  {
    date: '2025 — Present',
    role: 'AI / Vision Engineer · Founder of MARTIIEZ',
    org:  'Semiconductor Defect Detection',
    desc: 'Building computer-vision defect-detection systems for semiconductor inspection — from data pipelines to deployed models — and developing MARTIIEZ, a low-code node-based platform for machine-vision QC.',
  },
  {
    date: '2024 — 2025',
    role: 'Data Science Projects',
    org:  'Academic & Freelance',
    desc: 'GPT + RAG chatbot for HIV risk guidance (Beyond Coding) with an ETL pipeline into a vector knowledge base; a survival-prediction model for rHCC patients using clinical data and K-Fold CV; and a real-time tomato quality-inspection system with YOLOv11 (92%+ accuracy) served via REST API.',
  },
  {
    date: '2021 — 2025',
    role: 'B.Sc. Data Science',
    org:  'Chiang Mai University · GPA 3.53',
    desc: 'Bachelor’s degree in Data Science — machine learning, computer vision, time-series forecasting, NLP, and data engineering (ETL/ELT), with hands-on model deployment.',
  },
];

/* ══════════════════ SECTIONS ══════════════════ */

function Hero() {
  const solution = window.useTypewriter(SOLUTION_WORDS, 80);
  return (
    <section className="hero" id="hero" data-screen-label="Hero">
      <div className="hero-in">

        <window.Reveal delay={0}>
          <div className="hero-pill">
            <span className="pdot"></span>
            Machine-vision &amp; industrial-AI studio
          </div>
        </window.Reveal>

        <window.Reveal delay={120}>
          <h1 className="hero-name gt">MARTIIEZ</h1>
        </window.Reveal>

        <window.Reveal delay={200}>
          <p className="hero-role">{solution}<span className="cursor"></span></p>
        </window.Reveal>

        <window.Reveal delay={260}>
          <p className="hero-bio">
            I build machine-vision inspection systems that <strong style={{ color: 'var(--tx)' }}>see, decide, and deploy</strong> —
            a node-based pipeline platform plus end-to-end defect detection for the factory line.
          </p>
        </window.Reveal>

        <window.Reveal delay={320}>
          <div className="hero-ctas">
            <a href="#platform" className="btn bp">Explore the Platform</a>
            <a href="#work" className="btn bo">View Our Work</a>
            <a href="Resume_Phithak_Wangto.pdf" className="btn bo" download="Phithak_Wangto_Resume.pdf">↓ Download Resume</a>
            <a href="#contact" className="btn bg">Get in Touch</a>
          </div>
        </window.Reveal>

        <window.Reveal delay={400}>
          <div className="trust">
            {STATS.map(function(s, i) {
              return (
                <div key={i} className="trust-c">
                  <div className="trust-v gt">{s.v}</div>
                  <div className="trust-l">{s.l}</div>
                </div>
              );
            })}
          </div>
        </window.Reveal>

      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="alt" data-screen-label="About">
      <div className="wrap">
        <div className="ab-grid">
          <window.Reveal>
            <div className="eye"><span className="eyeline"></span>About MARTIIEZ</div>
            <h2 className="stitle">Machine vision,<br /><span className="gt">made composable</span></h2>
            <p style={{ color: 'var(--tx2)', lineHeight: 1.82, marginBottom: 14, fontSize: 15 }}>
              MARTIIEZ is my studio for <strong style={{ color: 'var(--tx)' }}>machine vision and industrial AI</strong>.
              At its core is a low-code, node-based editor where an inspection is built as a graph of nodes and wires —
              then run to produce a clear PASS/FAIL verdict with per-node evidence.
            </p>
            <p style={{ color: 'var(--tx2)', lineHeight: 1.82, marginBottom: 22, fontSize: 15 }}>
              I care about the gap between AI research and production reality — building systems that stay reliable under
              the messiness of real-world data, lighting, and operating environments on the factory floor.
            </p>
            <div className="chips">
              <span className="bdg bb">Computer Vision</span>
              <span className="bdg bp2">Defect Detection</span>
              <span className="bdg bb">OCR &amp; Verify</span>
              <span className="bdg bp2">SPC Monitoring</span>
              <span className="bdg bb">Industrial AI</span>
            </div>
          </window.Reveal>

          <window.Reveal delay={160}>
            <div className="pf-grid" style={{ gridTemplateColumns: '1fr' }}>
              {PLATFORM.slice(0, 3).map(function(p, i) {
                return (
                  <div key={i} className="pf-card">
                    <div className="pf-ico">{p.icon}</div>
                    <div>
                      <div className="pf-title">{p.title}</div>
                      <div className="pf-desc">{p.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </window.Reveal>
        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" data-screen-label="Platform">
      <div className="wrap">
        <window.Reveal>
          <div className="sh">
            <div className="eye"><span className="eyeline"></span>The Platform</div>
            <h2 className="stitle">One editor,<br /><span className="gt">every inspection</span></h2>
            <p className="ssub">A node-based vision pipeline that runs in the browser and deploys to the line.</p>
          </div>
        </window.Reveal>
        <div className="pf-grid">
          {PLATFORM.map(function(p, i) {
            return (
              <window.Reveal key={i} delay={i * 70}>
                <div className="pf-card">
                  <div className="pf-ico">{p.icon}</div>
                  <div>
                    <div className="pf-title">{p.title}</div>
                    <div className="pf-desc">{p.desc}</div>
                  </div>
                </div>
              </window.Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="alt" data-screen-label="Solutions">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <window.Reveal>
          <div className="sh">
            <div className="eye c"><span className="eyeline"></span>Solutions</div>
            <h2 className="stitle">What MARTIIEZ<br /><span className="gt">inspects</span></h2>
            <p className="ssub c">Production-grade vision QC across the most common inspection problems.</p>
          </div>
        </window.Reveal>
        <div className="sv-grid" style={{ textAlign: 'left' }}>
          {SOLUTIONS.map(function(s, i) {
            return (
              <window.Reveal key={i} delay={i * 65}>
                <div className="sv-card">
                  <div className="sv-ico">{s.icon}</div>
                  <div className="sv-title">{s.title}</div>
                  <div className="sv-desc">{s.desc}</div>
                </div>
              </window.Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState('All');
  const [modal,  setModal]  = useState(null);
  const cats   = ['All'].concat([...new Set(PROJECTS.map(function(p) { return p.cat; }))]);
  const shown  = filter === 'All' ? PROJECTS : PROJECTS.filter(function(p) { return p.cat === filter; });

  useEffect(function() {
    document.body.style.overflow = modal ? 'hidden' : '';
    return function() { document.body.style.overflow = ''; };
  }, [modal]);

  useEffect(function() {
    function fn(e) { if (e.key === 'Escape') setModal(null); }
    window.addEventListener('keydown', fn);
    return function() { window.removeEventListener('keydown', fn); };
  }, []);

  return (
    <section id="work" data-screen-label="Work">
      <div className="wrap">
        <window.Reveal>
          <div className="sh">
            <div className="eye"><span className="eyeline"></span>Work &amp; Case Studies</div>
            <h2 className="stitle">Systems shipped<br /><span className="gt">end to end</span></h2>
            <p className="ssub">From the MARTIIEZ platform itself to the inspection and data systems built around it.</p>
          </div>

          <div className="ftabs">
            {cats.map(function(c) {
              return (
                <button key={c} className={'ft' + (filter === c ? ' on' : '')} onClick={() => setFilter(c)}>{c}</button>
              );
            })}
          </div>
        </window.Reveal>

        <div className="p-grid">
          {shown.map(function(p, i) {
            return (
              <window.Reveal key={p.id} delay={i * 80}>
                <window.TiltCard className="p-card" onClick={() => setModal(p)}>
                  <div className="p-thumb" style={{ background: p.bg }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: p.accent + '18', border: '1px solid ' + p.accent + '30', fontSize: 24 }}>
                        {p.icon}
                      </div>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: p.accent, opacity: .72 }}>{p.cat}</span>
                    </div>
                  </div>
                  <div className="p-body">
                    <h3 className="p-title">{p.title}</h3>
                    <p className="p-desc">{p.desc}</p>
                    <div className="p-tags">
                      {p.tech.slice(0, 4).map(function(t) { return <span key={t} className="bdg bn">{t}</span>; })}
                      {p.tech.length > 4 && <span className="bdg bn">+{p.tech.length - 4}</span>}
                    </div>
                    <div className="p-links">
                      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" onClick={function(e) { e.stopPropagation(); }} className="btn bg sm">GitHub</a>}
                      {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" onClick={function(e) { e.stopPropagation(); }} className="btn bo sm">Demo</a>}
                      <button onClick={() => setModal(p)} className="btn bg sm" style={{ marginLeft: 'auto' }}>Details →</button>
                    </div>
                  </div>
                </window.TiltCard>
              </window.Reveal>
            );
          })}
        </div>
      </div>

      {modal && (
        <div className="modal-ov" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={function(e) { e.stopPropagation(); }}>
            <div style={{ padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--tx3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.08em' }}>{modal.cat}</div>
                  <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.022em' }}>{modal.title}</h2>
                </div>
                <button onClick={() => setModal(null)} className="btn bg sm">✕ Close</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                {[{ label: 'Problem', text: modal.prob }, { label: 'Solution', text: modal.sol }].map(function(item) {
                  return (
                    <div key={item.label} style={{ background: 'var(--s2)', borderRadius: 'var(--r)', padding: 18 }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--tx3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.09em' }}>{item.label}</div>
                      <p style={{ fontSize: 13.5, color: 'var(--tx2)', lineHeight: 1.72 }}>{item.text}</p>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--tx3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.09em' }}>Key Results</div>
                {modal.res.map(function(r, i) {
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--tx2)', marginBottom: 7 }}>
                      <span style={{ color: modal.accent, fontWeight: 700 }}>✓</span>{r}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--tx3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.09em' }}>Technologies</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {modal.tech.map(function(t) { return <span key={t} className="bdg bb">{t}</span>; })}
                </div>
              </div>

              {(modal.repo || modal.demo) && (
                <div style={{ display: 'flex', gap: 10 }}>
                  {modal.repo && <a href={modal.repo} target="_blank" rel="noreferrer" className="btn bo">GitHub Repo</a>}
                  {modal.demo && <a href={modal.demo} target="_blank" rel="noreferrer" className="btn bp">Live Demo →</a>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function VideoShowcase() {
  return (
    <section id="videos" className="alt" data-screen-label="In Action">
      <div className="wrap">
        <window.Reveal>
          <div className="sh">
            <div className="eye"><span className="eyeline"></span>In Action</div>
            <h2 className="stitle">See the platform<br /><span className="gt">at work</span></h2>
            <p className="ssub">Demo recordings and feature walkthroughs of MARTIIEZ recipes.</p>
          </div>
        </window.Reveal>
        <div className="v-grid">
          {VIDEOS.map(function(v, i) {
            return (
              <window.Reveal key={i} delay={i * 80}>
                <div className="v-card">
                  <div className="v-thumb" style={{ background: v.bg }}>
                    <div className="v-play">▶</div>
                    <span className="v-dur">{v.dur}</span>
                  </div>
                  <div className="v-info">
                    <div className="v-title">{v.title}</div>
                    <div className="v-desc">{v.desc}</div>
                  </div>
                </div>
              </window.Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" data-screen-label="Process">
      <div className="wrap">
        <window.Reveal>
          <div className="sh">
            <div className="eye"><span className="eyeline"></span>How I Work</div>
            <h2 className="stitle">From sample image<br /><span className="gt">to the line</span></h2>
            <p className="ssub">A repeatable path from problem to a monitored production inspection.</p>
          </div>
        </window.Reveal>
        <div className="proc-grid">
          {PROCESS.map(function(p, i) {
            return (
              <window.Reveal key={i} delay={i * 70}>
                <div className="proc-card">
                  <div className="proc-n">{p.n}</div>
                  <div className="proc-title">{p.title}</div>
                  <div className="proc-desc">{p.desc}</div>
                </div>
              </window.Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="alt" data-screen-label="Tech Stack">
      <div className="wrap">
        <window.Reveal>
          <div className="sh">
            <div className="eye"><span className="eyeline"></span>Tech Stack</div>
            <h2 className="stitle">Built with the<br /><span className="gt">right tools</span></h2>
            <p className="ssub">Across the full vision-AI lifecycle — from research to production deployment.</p>
          </div>
        </window.Reveal>

        {SKILLS.map(function(g, gi) {
          return (
            <window.Reveal key={gi} delay={gi * 70} className="sk-g">
              <div className="sk-cat" style={{ color: g.col }}>
                {g.cat}
                <span className="sk-ln"></span>
              </div>
              <div className="sk-chips">
                {g.items.map(function(s) { return <span key={s} className="sk-c">{s}</span>; })}
              </div>
            </window.Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" data-screen-label="Founder">
      <div className="wrap">
        <div className="tl-wrap">
          <window.Reveal className="tl-sticky">
            <div className="eye"><span className="eyeline"></span>Founder &amp; Background</div>
            <h2 className="stitle">Behind<br /><span className="gt">MARTIIEZ</span></h2>
            <p className="ssub" style={{ marginTop: 0 }}>
              MARTIIEZ is built by Phithak Wangto — AI / Vision Engineer and Data Science graduate.
            </p>
            <div style={{ marginTop: 28 }}>
              <a href="https://www.linkedin.com/in/phithak-wangto/" target="_blank" rel="noreferrer"
                className="btn bo sm" style={{ display: 'inline-flex' }}>
                View LinkedIn →
              </a>
            </div>
          </window.Reveal>

          <div className="tl">
            {TIMELINE.map(function(t, i) {
              return (
                <window.Reveal key={i} delay={i * 100} className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-date">{t.date}</div>
                  <div className="tl-role">{t.role}</div>
                  <div className="tl-org">{t.org}</div>
                  <div className="tl-desc">{t.desc}</div>
                </window.Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', msg: '' });
  const [sent, setSent]   = useState(false);
  function set(k) { return function(e) { setForm(function(f) { return Object.assign({}, f, { [k]: e.target.value }); }); }; }
  function submit(e) { e.preventDefault(); setSent(true); setTimeout(function() { setSent(false); }, 5000); }

  const links = [
    { icon: 'in', label: 'LinkedIn', sub: 'phithak-wangto',          href: 'https://www.linkedin.com/in/phithak-wangto/' },
    { icon: 'gh', label: 'GitHub',   sub: 'github.com/martiie',       href: 'https://github.com/martiie' },
    { icon: '@',  label: 'Email',    sub: 'phithakwangto@gmail.com',  href: 'mailto:phithakwangto@gmail.com' },
    { icon: '☎',  label: 'Phone',    sub: '088-264-6971',            href: 'tel:+66882646971' },
    { icon: '↗',  label: 'Website',  sub: 'phithak.vercel.app',       href: 'https://phithak.vercel.app' },
  ];

  return (
    <section id="contact" className="alt" data-screen-label="Contact">
      <div className="wrap">
        <div className="ct-grid">
          <window.Reveal>
            <div className="eye"><span className="eyeline"></span>Get in Touch</div>
            <h2 className="stitle">Let's build your<br /><span className="gt">inspection system</span></h2>
            <p style={{ color: 'var(--tx2)', lineHeight: 1.82, fontSize: 15 }}>
              Have a defect-detection, OCR, measurement, or monitoring problem on your line? Tell me about it —
              I typically reply within 24 hours.
            </p>
            <div className="ct-links">
              {links.map(function(lk) {
                return (
                  <a key={lk.label} href={lk.href} target="_blank" rel="noreferrer" className="ct-a">
                    <span className="ct-ico">{lk.icon}</span>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: 'block', fontWeight: 600, color: 'var(--tx)', fontSize: 14 }}>{lk.label}</span>
                      <span style={{ fontSize: 12, color: 'var(--tx3)' }}>{lk.sub}</span>
                    </span>
                    <span style={{ color: 'var(--tx3)', fontSize: 12 }}>→</span>
                  </a>
                );
              })}
            </div>
          </window.Reveal>

          <window.Reveal delay={140}>
            <div style={{ background: 'var(--s1)', border: '1px solid var(--bd)', borderRadius: 'var(--rl)', padding: 28 }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '44px 20px' }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>✓</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Message received!</div>
                  <div style={{ color: 'var(--tx2)', fontSize: 14 }}>I'll get back to you within 24 hours.</div>
                </div>
              ) : (
                <form className="ct-form" onSubmit={submit}>
                  <div className="f-row">
                    <div className="f-g">
                      <label className="f-lbl">Name</label>
                      <input className="f-in" placeholder="Your name" value={form.name} onChange={set('name')} required />
                    </div>
                    <div className="f-g">
                      <label className="f-lbl">Email</label>
                      <input className="f-in" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} required />
                    </div>
                  </div>
                  <div className="f-g">
                    <label className="f-lbl">Subject</label>
                    <input className="f-in" placeholder="Defect detection, OCR, measurement..." value={form.subject} onChange={set('subject')} />
                  </div>
                  <div className="f-g">
                    <label className="f-lbl">Message</label>
                    <textarea className="f-in" rows={5} placeholder="Tell me about the part, the defects, and your line..." value={form.msg} onChange={set('msg')} required></textarea>
                  </div>
                  <button type="submit" className="btn bp" style={{ alignSelf: 'flex-end', padding: '12px 26px' }}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </window.Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="foot">
        <div className="foot-c">
          © 2026 <span className="gt" style={{ fontFamily: 'var(--mono)' }}>MARTIIEZ</span>
          {' '}— Machine-Vision &amp; Industrial-AI · by Phithak Wangto
        </div>
        <div className="foot-ls">
          <a href="https://www.linkedin.com/in/phithak-wangto/" className="foot-a" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/martiie" className="foot-a" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://phithak.vercel.app" className="foot-a" target="_blank" rel="noreferrer">Website</a>
          <a href="mailto:phithakwangto@gmail.com" className="foot-a">Email</a>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════ APP ══════════════════ */

function App() {
  const [theme, setTheme] = useState(function() {
    return localStorage.getItem('pw-theme') || 'dark';
  });

  useEffect(function() {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pw-theme', theme);
  }, [theme]);

  return (
    <>
      <window.Nav theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <About />
        <Platform />
        <Solutions />
        <Work />
        <VideoShowcase />
        <Process />
        <Stack />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
