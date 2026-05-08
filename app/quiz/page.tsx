export default function QuizPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        html{scroll-behavior:smooth}
        .ql{font-family:'DM Sans',sans-serif;background:#f5f4f0;color:#1a1a1a;line-height:1.6;overflow-x:hidden}
        .ql nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 48px;display:flex;align-items:center;justify-content:space-between;background:rgba(245,244,240,0.92);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:border-color 0.3s}
        .ql nav.sc{border-bottom-color:rgba(0,0,0,0.09)}
        .ql-logo{font-weight:500;font-size:17px;color:#1a3d2e;letter-spacing:-0.3px;text-decoration:none;font-family:'DM Sans',sans-serif}
        .ql-ncta{background:#1e4d35;color:#fff;border:none;border-radius:100px;padding:10px 22px;font-family:'DM Sans',sans-serif;font-size:14px;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.2s}
        .ql-ncta:hover{background:#1a3d2e;transform:translateY(-1px)}
        .ql-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;position:relative}
        .ql-hbg{position:absolute;top:50%;left:50%;transform:translate(-50%,-55%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(45,106,74,0.07) 0%,transparent 70%);pointer-events:none}
        .ql-eye{display:inline-flex;align-items:center;font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:#2d6a4a;background:#e8f0eb;padding:6px 14px;border-radius:100px;margin-bottom:28px;animation:fu 0.6s ease both}
        .ql h1{font-family:'Playfair Display',serif;font-size:clamp(42px,7vw,76px);font-weight:400;line-height:1.1;letter-spacing:-1px;max-width:800px;margin-bottom:24px;animation:fu 0.6s 0.1s ease both}
        .ql h1 i{font-style:italic;color:#2d6a4a}
        .ql-sub{font-size:clamp(16px,2vw,19px);color:#4a4a4a;max-width:520px;line-height:1.65;margin-bottom:36px;animation:fu 0.6s 0.2s ease both;font-weight:300}
        .ql-btn{background:#1e4d35;color:#fff;border:none;border-radius:100px;padding:16px 32px;font-family:'DM Sans',sans-serif;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none;animation:fu 0.6s 0.3s ease both;transition:all 0.2s}
        .ql-btn:hover{background:#1a3d2e;transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,61,46,0.2)}
        .ql-btn2{background:#1e4d35;color:#fff;border:none;border-radius:100px;padding:16px 32px;font-family:'DM Sans',sans-serif;font-size:15px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none;transition:all 0.2s}
        .ql-btn2:hover{background:#1a3d2e;transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,61,46,0.2)}
        .ql-meta{font-size:12px;color:#888;margin-top:14px;animation:fu 0.6s 0.4s ease both}
        .ql-lr{margin-top:64px;animation:fu 0.6s 0.5s ease both;text-align:center}
        .ql-ll{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#888;margin-bottom:20px}
        .ql-logos{display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}
        .ql-li{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:#b0ada6}
        .ql-div{width:1px;height:80px;background:linear-gradient(to bottom,transparent,rgba(0,0,0,0.14),transparent);margin:0 auto}
        .ql-sec{padding:96px 24px;max-width:960px;margin:0 auto}
        .ql-sube{font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:#888;margin-bottom:14px}
        .ql h2{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,44px);font-weight:400;line-height:1.15;letter-spacing:-0.5px;margin-bottom:14px}
        .ql-ssub{font-size:17px;color:#4a4a4a;line-height:1.6;max-width:560px;margin-bottom:48px;font-weight:300}
        .ql-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:48px}
        .ql-ci{display:flex;align-items:flex-start;gap:14px;background:#fff;border:1px solid rgba(0,0,0,0.09);border-radius:12px;padding:18px 20px;transition:border-color 0.2s,transform 0.2s}
        .ql-ci:hover{border-color:#2d6a4a;transform:translateY(-2px)}
        .ql-ck{width:22px;height:22px;border-radius:50%;background:#e8f0eb;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
        .ql-ct{font-size:14px;color:#4a4a4a;line-height:1.55}
        .ql-ct strong{color:#1a1a1a;font-weight:500;display:block;margin-bottom:2px}
        .ql-pain{background:#1a3d2e;padding:96px 24px}
        .ql-pi{max-width:960px;margin:0 auto}
        .ql-pain .ql-sube{color:rgba(255,255,255,0.4)}
        .ql-pain h2{color:#fff;margin-bottom:14px}
        .ql-pain .ql-ssub{color:rgba(255,255,255,0.6);margin-bottom:48px}
        .ql-cmp{display:grid;grid-template-columns:1fr 1fr;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1)}
        .ql-chdr{padding:18px 24px;font-size:12px;font-weight:500;letter-spacing:1px;text-transform:uppercase;display:flex;align-items:center;gap:8px}
        .ql-chdr.b{background:rgba(0,0,0,0.2);color:rgba(255,255,255,0.5);border-right:1px solid rgba(255,255,255,0.08)}
        .ql-chdr.a{background:rgba(45,106,74,0.4);color:rgba(255,255,255,0.8)}
        .ql-dot{width:8px;height:8px;border-radius:50%}
        .ql-db{background:rgba(255,255,255,0.25)}
        .ql-da{background:#5dcaa5}
        .ql-cell{padding:14px 24px;font-size:14px;line-height:1.5;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:flex-start;gap:10px}
        .ql-cell.b{background:rgba(0,0,0,0.15);color:rgba(255,255,255,0.5);border-right:1px solid rgba(255,255,255,0.06)}
        .ql-cell.a{background:rgba(45,106,74,0.2);color:rgba(255,255,255,0.85)}
        .ql-ci2{flex-shrink:0;margin-top:2px;font-size:13px;line-height:1}
        .ql-fin{padding:120px 24px;text-align:center;max-width:640px;margin:0 auto}
        .ql-fin h2{margin-bottom:18px}
        .ql-fin p{font-size:17px;color:#4a4a4a;margin-bottom:36px;line-height:1.65;font-weight:300}
        .ql-cs{font-size:13px;color:#888;margin-top:14px}
        .ql-foot{border-top:1px solid rgba(0,0,0,0.09);padding:28px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
        .ql-flo{font-weight:500;font-size:15px;color:#1a3d2e}
        .ql-fls{display:flex;gap:24px}
        .ql-fls a{font-size:13px;color:#888;text-decoration:none}
        .rv{opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease}
        .rv.vi{opacity:1;transform:translateY(0)}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}
        @keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:640px){.ql nav{padding:16px 20px}.ql-grid{grid-template-columns:1fr}.ql-cmp{grid-template-columns:1fr}.ql-foot{padding:20px 24px}}
      `}</style>
      <div className="ql">
        <nav id="qnav">
          <a href="https://boundset.com" className="ql-logo">boundset</a>
          <a href="/quiz/score" className="ql-ncta">Get your positioning score</a>
        </nav>
        <section className="ql-hero">
          <div className="ql-hbg" />
          <div className="ql-eye">Positioning Quiz</div>
          <h1>Know exactly <i>where</i><br />your positioning breaks</h1>
          <p className="ql-sub">Answer 20 questions and walk away with a score out of 100, a breakdown across five dimensions, and a specific fix for every weak area.</p>
          <a href="/quiz/score" className="ql-btn">Get your positioning score →</a>
          <p className="ql-meta">Takes 4–6 minutes · Free · No pitch</p>
          <div className="ql-lr">
            <p className="ql-ll">Trusted by founders at</p>
            <div className="ql-logos">
              <span className="ql-li">▪ Provable</span>
              <span className="ql-li" style={{fontFamily:'Playfair Display,serif',letterSpacing:'1px',textTransform:'uppercase',fontSize:'11px'}}>Athena</span>
              <span className="ql-li" style={{fontWeight:700,letterSpacing:'1px',fontSize:'13px'}}>GAMMA</span>
              <span className="ql-li">◉ OriginalVoices</span>
            </div>
          </div>
        </section>
        <div className="ql-div" />
        <div className="ql-sec">
          <p className="ql-sube rv">How it works</p>
          <h2 className="rv d1">Five dimensions, one score,<br />and a real plan to fix it</h2>
          <p className="ql-ssub rv d2">The quiz covers message clarity, market positioning, value communication, sales efficiency, and internal alignment — the five places where positioning breaks down most for B2B SaaS companies, and most founders finish in under 5 minutes.</p>
          <div className="ql-grid">
            {([
              ['A score out of 100','Granular enough to tell you exactly where you stand, not just whether you pass or fail.'],
              ['Five dimension breakdowns','Each scored separately so you know which problem to fix first and which to ignore for now.'],
              ['Specific fixes, not vague advice','Every weak dimension gets a concrete action written at the level of a real task, not a strategy suggestion.'],
              ['Download and share your results','Export your full report as a PDF and share it with your co-founder, head of sales, or board.'],
              ['Built for B2B SaaS founders','Every question maps to a real problem that shows up in sales cycles, homepages, and team alignment.'],
              ['Free, with no strings attached',"Your results are yours. There's no pressure at the end, just options if your score says you need one."],
            ] as [string,string][]).map(([title,desc],i) => (
              <div key={i} className={`ql-ci rv${i%2===1?' d1':''}`}>
                <div className="ql-ck"><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#2d6a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div className="ql-ct"><strong>{title}</strong>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center'}}><a href="/quiz/score" className="ql-btn2 rv">Get your positioning score →</a></div>
        </div>
        <div className="ql-div" />
        <div className="ql-pain">
          <div className="ql-pi">
            <p className="ql-sube rv">What changes</p>
            <h2 className="rv d1">What positioning can change<br />for your company</h2>
            <p className="ql-ssub rv d2">The gap between a company with strong positioning and one without shows up in every part of the business, from how fast deals close to how confidently your team talks about the product.</p>
            <div className="ql-cmp rv">
              <div>
                <div className="ql-chdr b"><span className="ql-dot ql-db"/>Before strong positioning</div>
                {(['Sales calls start with 20 minutes of explaining what you do','Every team member describes the product differently','Prospects compare you to the wrong competitors','Homepage gets rewritten every few months','Deals stall because champions can\'t sell internally','Investors keep asking you to "simplify the pitch"','Features dominate the site, outcomes are buried','New hires take weeks to learn how to talk about the product','Cold emails get ignored because the hook is unclear','Marketing and sales tell different stories','You avoid content because you don\'t know what angle to take','No one on the team agrees on who the ideal customer is'] as string[]).map((t,i)=>(
                  <div key={i} className="ql-cell b"><span className="ql-ci2">—</span>{t}</div>
                ))}
              </div>
              <div>
                <div className="ql-chdr a"><span className="ql-dot ql-da"/>After strong positioning</div>
                {(['Prospects already understand the value before the demo','One messaging matrix the whole company pulls from','Competitive positioning that puts you in the right conversation','Homepage copy that holds because it\'s built on real positioning','Champions have the language to sell you internally without you in the room','Pitch language that lands in one sentence','Outcome-led copy that makes features feel inevitable','An onboarding doc that makes new hires fluent in days','Outbound that earns replies because the value is immediate','Aligned messaging across every channel and every team','Content angles and hooks ready to deploy at any time','A documented ICP that the whole team agrees on and uses'] as string[]).map((t,i)=>(
                  <div key={i} className="ql-cell a"><span className="ql-ci2" style={{color:'#5dcaa5'}}>✓</span>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ql-fin">
          <h2 className="rv">Find out where you stand <i style={{fontFamily:'Playfair Display,serif',color:'#2d6a4a'}}>right now</i></h2>
          <p className="rv d1">Free, done in under 6 minutes, and specific enough that you will know exactly what to fix before the week is out.</p>
          <a href="/quiz/score" className="ql-btn2 rv d2" style={{margin:'0 auto'}}>Get your positioning score →</a>
          <p className="ql-cs rv d3">No pitch · No pressure · Your results are yours to keep</p>
        </div>
        <footer className="ql-foot">
          <span className="ql-flo">boundset</span>
          <div className="ql-fls">
            <a href="https://boundset.com">Home</a>
            <a href="mailto:blake@boundset.com">blake@boundset.com</a>
            <a href="https://twitter.com/heyblake">@heyblake</a>
          </div>
        </footer>
      </div>
      <script dangerouslySetInnerHTML={{__html:`
        window.addEventListener('scroll',function(){var n=document.getElementById('qnav');if(n){if(window.scrollY>20)n.classList.add('sc');else n.classList.remove('sc');}});
        var obs=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)x.target.classList.add('vi');});},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
        document.querySelectorAll('.rv').forEach(function(el){obs.observe(el);});
      `}}/>
    </>
  );
}
