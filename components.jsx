const { useState, useEffect, useRef, useCallback } = React;

/* ── HOOKS ── */

function useScrolled(threshold = 30) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const fn = () => setOn(window.scrollY > threshold);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [threshold]);
  return on;
}

function useRevealTrigger(el, delay) {
  // Adds '.go' class so the CSS animation-play-state flips to running.
  // Tries immediately, retries at 100/400/900ms for font-reflow resilience,
  // and uses a scroll fallback for below-fold elements.
  function trigger() {
    if (!el || el.classList.contains('go')) return;
    el.classList.add('go');
  }
  function tryViewport() {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight + 20 && r.bottom > 0) { trigger(); return true; }
    return false;
  }
  function onScroll() { if (tryViewport()) window.removeEventListener('scroll', onScroll); }
  // Immediate + retries
  if (!tryViewport()) {
    const t1 = setTimeout(() => tryViewport() || window.addEventListener('scroll', onScroll, { passive: true }), 100);
    const t2 = setTimeout(tryViewport, 400);
    const t3 = setTimeout(trigger, 2500); // guaranteed fallback
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); window.removeEventListener('scroll', onScroll); };
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

function useTilt(intensity) {
  intensity = intensity || 11;
  const ref = useRef(null);
  const onMouseMove = useCallback(function(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * intensity;
    const ry = ((r.width  / 2 - (e.clientX - r.left)) / (r.width  / 2)) * intensity;
    el.style.transform  = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(1.025,1.025,1.025)';
    el.style.transition = 'transform 0.08s ease';
  }, [intensity]);
  const onMouseLeave = useCallback(function() {
    const el = ref.current;
    if (!el) return;
    el.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    el.style.transition = 'transform 0.55s ease';
  }, []);
  return { ref: ref, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave };
}

function useTypewriter(words, speed) {
  speed = speed || 80;
  const [text, setText] = useState('');
  const idx = useRef(0);
  const ch  = useRef(0);
  const del = useRef(false);
  useEffect(() => {
    let t;
    function tick() {
      const word = words[idx.current];
      if (!del.current) {
        ch.current++;
        setText(word.slice(0, ch.current));
        if (ch.current === word.length) {
          del.current = true;
          t = setTimeout(tick, 2400);
          return;
        }
      } else {
        ch.current--;
        setText(word.slice(0, ch.current));
        if (ch.current === 0) {
          del.current = false;
          idx.current = (idx.current + 1) % words.length;
        }
      }
      t = setTimeout(tick, del.current ? speed * 0.5 : speed);
    }
    t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);
  return text;
}

/* ── COMPONENTS ── */

function Reveal({ children, delay, className, style }) {
  delay     = delay     || 0;
  className = className || '';
  style     = style     || {};
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return useRevealTrigger(el, delay);
  }, []);
  return (
    <div
      ref={ref}
      className={'reveal ' + className}
      style={Object.assign({ animationDelay: delay + 'ms' }, style)}
    >
      {children}
    </div>
  );
}

function TiltCard({ children, className, style, onClick }) {
  const tilt = useTilt();
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={onClick}
      className={className || ''}
      style={Object.assign({ transformStyle: 'preserve-3d', willChange: 'transform' }, style || {})}
    >
      {children}
    </div>
  );
}

function Nav({ theme, setTheme }) {
  const on  = useScrolled();
  const [mob, setMob] = useState(false);
  const links = [
    { h: '#about',      l: 'About'      },
    { h: '#skills',     l: 'Skills'     },
    { h: '#projects',   l: 'Projects'   },
    { h: '#experience', l: 'Experience' },
    { h: '#services',   l: 'Services'   },
    { h: '#contact',    l: 'Contact'    },
  ];
  useEffect(() => {
    document.body.style.overflow = mob ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mob]);

  return (
    <>
      <nav className={'nav' + (on ? ' on' : '')}>
        <a href="#" className="nav-logo">
          <span className="gt" style={{ fontWeight: 700 }}>PW</span>
          <span style={{ color: 'var(--tx3)', fontSize: 13 }}>· phithak.dev</span>
        </a>

        <ul className="nav-links">
          {links.map(function(lk) {
            return <li key={lk.h}><a href={lk.h} className="nav-a">{lk.l}</a></li>;
          })}
        </ul>

        <div className="nav-r">
          <button
            className="ico"
            onClick={() => setTheme(function(t) { return t === 'dark' ? 'light' : 'dark'; })}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <a href="#contact" className="btn bp" style={{ padding: '9px 18px', fontSize: 13 }}>Hire Me</a>
          <button className="ico mob-btn" onClick={() => setMob(true)} aria-label="Open menu">☰</button>
        </div>
      </nav>

      {mob && (
        <div className="mob-nav">
          <button className="mob-close" onClick={() => setMob(false)}>✕</button>
          {links.map(function(lk) {
            return (
              <a key={lk.h} href={lk.h} className="mob-a" onClick={() => setMob(false)}>{lk.l}</a>
            );
          })}
          <a href="#contact" className="btn bp" style={{ marginTop: 16 }} onClick={() => setMob(false)}>
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}

Object.assign(window, { useScrolled, useRevealTrigger, useTilt, useTypewriter, Reveal, TiltCard, Nav });
