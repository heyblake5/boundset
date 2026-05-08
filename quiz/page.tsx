export default function QuizLandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        html { scroll-behavior: smooth; }
        .quiz-body { font-family: 'DM Sans', sans-serif; background: #f5f4f0; color: #1a1a1a; line-height: 1.6; overflow-x: hidden; }
        .pf-i { font-family: 'Playfair Display', serif; font-style: italic; color: #2d6a4a; }
        nav.qnav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 48px; display: flex; align-items: center; justify-content: space-between; background: rgba(245,244,240,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid transparent; transition: border-color 0.3s; }
        nav.qnav.scrolled { border-bottom-color: rgba(0,0,0,0.09); }
        .qlogo { font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 17px; color: #1a3d2e; letter-spacing: -0.3px; text-decoration: none; }
        .qnav-cta { background: #1e4d35; color: #fff; border: none; border-radius: 100px; padding: 10px 22px; font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; }
        .qnav-cta:hover { background: #1a3d2e; transform: translateY(-1px); }
        .qhero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px; position: relative; }
        .qhero-bg { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -55%); width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(45,106,74,0.07) 0%, transparent 70%); pointer-events: none; }
        .qeyebrow { display: inline-flex; align-items: center; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #2d6a4a; background: #e8f0eb; padding: 6px 14px; border-radius: 100px; margin-bottom: 28px; animation: fadeUp 0.6s ease both; }
        .qh1 { font-family: 'Playfair Display', serif; font-size: clamp(42px, 7vw, 76px); font-weight: 400; line-height: 1.1; letter-spacing: -1px; max-width: 800px; margin-bottom: 24px; animation: fadeUp 0.6s 0.1s ease both; }
        .qsub { font-size: clamp(16px, 2vw, 19px); color: #4a4a4a; max-width: 520px; line-height: 1.65; margin-bottom: 36px; animation: fadeUp 0.6s 0.2s ease both; font-weight: 300; }
        .qbtn { background: #1e4d35; color: #fff; border: none; border-radius: 100px; padding: 16px 32px; font-family: 'DM Sans', sans-serif; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; animation: fadeUp 0.6s 0.3s ease both; transition: all 0.2s; }
        .qbtn:hover { background: #1a3d2e; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,61,46,0.2); }
        .qbtn-plain { background: #1e4d35; color: #fff; border: none; border-radius: 100px; padding: 16px 32px; font-family: 'DM Sans', sans-serif; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; transition: all 0.2s; }
        .qbtn-plain:hover { background: #1a3d2e; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,61,46,0.2); }
        .qmeta { font-size: 12px; color: #888; margin-top: 14px; animation: fadeUp 0.6s 0.4s ease both; }
        .qlogos-row { margin-top: 64px; animation: fadeUp 0.6s 0.5s ease both; }
        .qlogos-label { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #888; margin-bottom: 20px; }
        .qlogos { display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap; }
        .qlogo-item { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: #b0ada6; }
        .qdivider { width: 1px; height: 80px; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.14), transparent); margin: 0 auto; }
        .qsection { padding: 96px 24px; max-width: 960px; margin: 0 auto; }
        .qsection-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #888; margin-bottom: 14px; }
        .qh2 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px); font-weight: 400; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 14px; }
        .qsection-sub { font-size: 17px; color: #4a4a4a; line-height: 1.6; max-width: 560px; margin-bottom: 48px; font-weight: 300; }
        .qhow-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 48px; }
        .qcheck-item { display: flex; align-items: flex-start; gap: 14px; background: #fff; border: 1px solid rgba(0,0,0,0.09); border-radius: 12px; padding: 18px 20px; transition: border-color 0.2s, transform 0.2s; }
        .qcheck-item:hover { border-color: #2d6a4a; transform: translateY(-2px); }
        .qcheck-icon { width: 22px; height: 22px; border-radius: 50%; background: #e8f0eb; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .qcheck-text { font-size: 14px; color: #4a4a4a; line-height: 1.55; }
        .qcheck-text strong { color: #1a1a1a; font-weight: 500; display: block; margin-bottom: 2px; }
        .qpain { background: #1a3d2e; padding: 96px 24px; position: relative; overflow: hidden; }
        .qpain-inner { max-width: 960px; margin: 0 auto; }
        .qpain .qsection-eyebrow { color: rgba(255,255,255,0.4); }
        .qpain .qh2 { color: #fff; margin-bottom: 14px; }
        .qpain .qsection-sub { color: rgba(255,255,255,0.6); margin-bottom: 48px; }
        .qcompare { display: grid; grid-template-columns: 1fr 1fr; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .qcompare-hdr { padding: 18px 24px; font-size: 12px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
        .qcompare-hdr.before { background: rgba(0,0,0,0.2); color: rgba(255,255,255,0.5); border-right: 1px solid rgba(255,255,255,0.08); }
        .qcompare-hdr.after { background: rgba(45,106,74,0.4); color: rgba(255,255,255,0.8); }
        .qdot { width: 8px; height: 8px; border-radius: 50%; }
        .qdot-b { background: rgba(255,255,255,0.25); }
        .qdot-a { background: #5dcaa5; }
        .qcell { padding: 14px 24px; font-size: 14px; line-height: 1.5; border-top: 1px solid rgba(255,255,255,0.06); display: flex; align-items: flex-start; gap: 10px; }
        .qcell.before { background: rgba(0,0,0,0.15); color: rgba(255,255,255,0.5); border-right: 1px solid rgba(255,255,255,0.06); }
        .qcell.after { background: rgba(45,106,74,0.2); color: rgba(255,255,255,0.85); }
        .qcell-icon { flex-shrink: 0; margin-top: 2px; font-size: 13px; line-height: 1; }
        .qfinal { padding: 120px 24px; text-align: center; max-width: 640px; margin: 0 auto; }
        .qfinal .qh2 { margin-bottom: 18px; }
        .qfinal p { font-size: 17px; color: #4a4a4a; margin-bottom: 36px; line-height: 1.65; font-weight: 300; }
        .qcta-sub { font-size: 13px; color: #888; margin-top: 14px; }
        .qfooter { border-top: 1px solid rgba(0,0,0,0.09); padding: 28px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .qfooter-logo { font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 15px; color: #1a3d2e; }
        .qfooter-links { display: flex; gap: 24px; }
        .qfooter-links a { font-size: 13px; color: #888; text-decoration: none; }
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-d1 { transition-delay: 0.1s; }
        .reveal-d2 { transition-delay: 0.2s; }
        .reveal-d3 { transition-delay: 0.3s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 640px) { nav.qnav { padding: 16px 20px; } .qhow-grid { grid-template-columns: 1fr; } .qcompare { grid-template-columns: 1fr; } .qfooter { padding: 20px 24px; } }
      `}</style>

      <div className="quiz-body">
        <nav className="qnav" id="qnav">
          <a href="https://boundset.com" className="qlogo">boundset</a>
          <a href="/quiz/score" className="qnav-cta">Get your positioning score</a>
        </nav>

        <section className="qhero">
          <div className="qhero-bg" />
          <div className="qeyebrow">Positioning Quiz</div>
          <h1 className="qh1">Know exactly <span className="pf-i">where</span><br />your positioning breaks</h1>
          <p className="qsub">Answer 20 questions and walk away with a score out of 100, a breakdown across five dimensions, and a specific fix for every weak area.</p>
          <a href="/quiz/score" className="qbtn">Get your positioning score →</a>
          <p className="qmeta">Takes 4–6 minutes · Free · No pitch</p>
          <div className="qlogos-row">
            <p className="qlogos-label">Trusted by founders at</p>
            <div className="qlogos">
              <span className="qlogo-item">▪ Provable</span>
              <span className="qlogo-item" style={{fontFamily:'Playfair Display,serif',letterSpacing:'1px',textTransform:'uppercase',fontSize:'11px'}}>Athena</span>
              <span className="qlogo-item" style={{fontWeight:700,letterSpacing:'1px',fontSize:'13px'}}>GAMMA</span>
              <span className="qlogo-item">◉ OriginalVoices</span>
            </div>
          </div>
        </section>

        <div className="qdivider" />

        <div className="qsection">
          <p className="qsection-eyebrow reveal">How it works</p>
          <h2 className="qh2 reveal reveal-d1">Five dimensions, one score,<br />and a real plan to fix it</h2>
          <p className="qsection-sub reveal reveal-d2">The quiz covers message clarity, market positioning, value communication, sales efficiency, and internal alignment — the five places where positioning breaks down most for B2B SaaS companies, and most founders finish in under 5 minutes.</p>
          <div className="qhow-grid">
            {[
              ['A score out of 100', 'Granular enough to tell you exactly where you stand, not just whether you pass or fail.'],
              ['Five dimension breakdowns', 'Each scored separately so you know which problem to fix first and which to ignore for now.'],
              ['Specific fixes, not vague advice', 'Every weak dimension gets a concrete action written at the level of a real task, not a strategy suggestion.'],
              ['Download and share your results', 'Export your full report as a PDF and share it with your co-founder, head of sales, or board.'],
              ['Built for B2B SaaS founders', 'Every question maps to a real problem that shows up in sales cycles, homepages, and team alignment.'],
              ['Free, with no strings attached', "Your results are yours. There's no pressure at the end, just options if your score says you need one."],
            ].map(([title, desc], i) => (
              <div key={i} className={`qcheck-item reveal${i % 2 === 1 ? ' reveal-d1' : ''}`}>
                <div className="qcheck-icon">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#2d6a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="qcheck-text"><strong>{title}</strong>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <a href="/quiz/score" className="qbtn-plain reveal">Get your positioning score →</a>
          </div>
        </div>

        <div className="qdivider" />

        <div className="qpain">
          <div className="qpain-inner">
            <p className="qsection-eyebrow reveal">What changes</p>
            <h2 className="qh2 reveal reveal-d1">What positioning can change<br />for your company</h2>
            <p className="qsection-sub reveal reveal-d2">The gap between a company with strong positioning and one without shows up in every part of the business, from how fast deals close to how confidently your team talks about the product.</p>
            <div className="qcompare reveal">
              <div>
                <div className="qcompare-hdr before"><span className="qdot qdot-b" />Before strong positioning</div>
                {['Sales calls start with 20 minutes of explaining what you do','Every team member describes the product differently','Prospects compare you to the wrong competitors','Homepage gets rewritten every few months','Deals stall because champions can\'t sell internally','Investors keep asking you to "simplify the pitch"','Features dominate the site, outcomes are buried','New hires take weeks to learn how to talk about the product','Cold emails get ignored because the hook is unclear','Marketing and sales tell different stories','You avoid content because you don\'t know what angle to take','No one on the team agrees on who the ideal customer is'].map((t,i) => (
                  <div key={i} className="qcell before"><span className="qcell-icon">—</span>{t}</div>
                ))}
              </div>
              <div>
                <div className="qcompare-hdr after"><span className="qdot qdot-a" />After strong positioning</div>
                {['Prospects already understand the value before the demo','One messaging matrix the whole company pulls from','Competitive positioning that puts you in the right conversation','Homepage copy that holds because it\'s built on real positioning','Champions have the language to sell you internally without you in the room','Pitch language that lands in one sentence','Outcome-led copy that makes features feel inevitable','An onboarding doc that makes new hires fluent in days','Outbound that earns replies because the value is immediate','Aligned messaging across every channel and every team','Content angles and hooks ready to deploy at any time','A documented ICP that the whole team agrees on and uses'].map((t,i) => (
                  <div key={i} className="qcell after"><span className="qcell-icon" style={{color:'#5dcaa5'}}>✓</span>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="qfinal">
          <h2 className="qh2 reveal">Find out where you stand <span className="pf-i">right now</span></h2>
          <p className="reveal reveal-d1">Free, done in under 6 minutes, and specific enough that you'll know exactly what to fix before the week is out.</p>
          <a href="/quiz/score" className="qbtn-plain reveal reveal-d2" style={{margin:'0 auto'}}>Get your positioning score →</a>
          <p className="qcta-sub reveal reveal-d3">No pitch · No pressure · Your results are yours to keep</p>
        </div>

        <footer className="qfooter">
          <span className="qfooter-logo">boundset</span>
          <div className="qfooter-links">
            <a href="https://boundset.com">Home</a>
            <a href="mailto:blake@boundset.com">blake@boundset.com</a>
            <a href="https://twitter.com/heyblake">@heyblake</a>
          </div>
        </footer>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        window.addEventListener('scroll', function() {
          var nav = document.getElementById('qnav');
          if (window.scrollY > 20) nav.classList.add('scrolled');
          else nav.classList.remove('scrolled');
        });
        var obs = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
      `}} />
    </>
  );
}
