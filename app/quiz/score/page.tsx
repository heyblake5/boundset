'use client';
import { useState } from 'react';

const sections = [
  {
    id: 'clarity', name: 'Message Clarity',
    desc: 'How consistently and concisely your team communicates what you do.',
    questions: [
      { id:'c1', text:'If you asked three people on your team to describe your product in one sentence right now, how similar would their answers be?',
        opts:[{t:'Basically identical',s:4},{t:'Similar themes, different words',s:2},{t:'Noticeably different',s:1},{t:'Very different',s:0}] },
      { id:'c2', text:"How long does your homepage hero take to communicate what you do and who it's for?",
        opts:[{t:'Under 5 seconds',s:4},{t:'5–10 seconds',s:2},{t:'10–20 seconds',s:1},{t:'They need to scroll to get it',s:0}] },
      { id:'c3', text:'How often does your team rewrite or update core messaging?',
        opts:[{t:'Rarely, it holds up well',s:4},{t:'Once or twice a year',s:2},{t:'Every few months',s:1},{t:'Constantly',s:0}] },
      { id:'c4', text:'How consistent is your messaging across website, sales decks, and outreach?',
        opts:[{t:'Very consistent everywhere',s:4},{t:'Mostly consistent, some variation',s:2},{t:'Noticeably inconsistent',s:1},{t:'Each channel says something different',s:0}] },
    ]
  },
  {
    id: 'market', name: 'Market Positioning',
    desc: 'Whether prospects understand where you fit relative to alternatives.',
    questions: [
      { id:'m1', text:'When prospects evaluate you against competitors, are they comparing you to the right alternatives?',
        opts:[{t:'Yes, they compare us correctly',s:4},{t:'Sometimes, we often redirect',s:2},{t:'Frequently compared to wrong alternatives',s:1},{t:'Comparison is almost always wrong',s:0}] },
      { id:'m2', text:'How clearly does your homepage communicate what makes you different from the obvious alternatives?',
        opts:[{t:'Very clearly, front and center',s:4},{t:'Somewhat, you need to dig for it',s:2},{t:'Vaguely implied, never stated',s:1},{t:'We look like our competitors',s:0}] },
      { id:'m3', text:'Do your salespeople have a confident, consistent answer when prospects bring up a competitor?',
        opts:[{t:'Yes, everyone knows the answer',s:4},{t:'Most do, a few improvise',s:2},{t:'Varies a lot by rep',s:1},{t:'We wing it every time',s:0}] },
      { id:'m4', text:'How well does your marketing speak to a specific type of buyer rather than everyone?',
        opts:[{t:'Tightly targeted, resonates with one profile',s:4},{t:'Fairly targeted with some generalization',s:2},{t:'Tries to appeal to multiple audiences',s:1},{t:'Written for everyone, lands with few',s:0}] },
    ]
  },
  {
    id: 'value', name: 'Value Communication',
    desc: 'Whether your messaging leads with outcomes buyers actually care about.',
    questions: [
      { id:'v1', text:'What dominates your homepage and sales materials?',
        opts:[{t:'Outcomes and results buyers achieve',s:4},{t:'Mix of outcomes and features',s:2},{t:'Mostly features with some outcomes',s:1},{t:'Features, integrations, and specs',s:0}] },
      { id:'v2', text:'How well does your messaging communicate the cost of NOT using your product?',
        opts:[{t:'Strongly and specifically',s:4},{t:'Somewhat, with some vagueness',s:2},{t:'Barely, mostly implied',s:1},{t:'We focus on what we do, not the alternative',s:0}] },
      { id:'v3', text:'Can you describe your value proposition in one sentence without using "platform," "solution," or "empower"?',
        opts:[{t:'Yes, easily',s:4},{t:'Yes, but it takes effort',s:2},{t:'Struggle to avoid those words',s:1},{t:'Those words are definitely in there',s:0}] },
      { id:'v4', text:"When a prospect asks 'why should I choose you?', how is your team's answer?",
        opts:[{t:'Crisp, consistent, confident',s:4},{t:'Good but varies by person',s:2},{t:'Solid on features, weak on value',s:1},{t:'Long, rambling, or inconsistent',s:0}] },
    ]
  },
  {
    id: 'sales', name: 'Sales Efficiency',
    desc: 'How much friction your positioning creates before and during deals.',
    questions: [
      { id:'s1', text:'How much of a typical first sales call is spent explaining what you do before pitching value?',
        opts:[{t:'Under 5 minutes',s:4},{t:'5–15 minutes',s:2},{t:'15–30 minutes',s:1},{t:'Most of the call',s:0}] },
      { id:'s2', text:'How do prospects typically describe you when sharing your product internally?',
        opts:[{t:'Using language close to ours',s:4},{t:'Roughly right with some drift',s:2},{t:'Simplified version that misses key points',s:1},{t:'No idea how they describe us',s:0}] },
      { id:'s3', text:'How long do new sales hires take to confidently describe your product and its value?',
        opts:[{t:'A few days with good docs',s:4},{t:'1–2 weeks',s:2},{t:'2–4 weeks',s:1},{t:'Over a month',s:0}] },
      { id:'s4', text:"How often do deals stall because prospects can't build internal consensus on what you do?",
        opts:[{t:'Rarely or never',s:4},{t:'Occasionally',s:2},{t:"More often than we'd like",s:1},{t:'Frequently',s:0}] },
    ]
  },
  {
    id: 'alignment', name: 'Internal Alignment',
    desc: 'Whether your whole team pulls from a single source of truth on messaging.',
    questions: [
      { id:'a1', text:'Does a single messaging document exist that your whole team actually uses?',
        opts:[{t:'Yes, actively used',s:4},{t:'Yes, but outdated or ignored',s:2},{t:"Something exists but it's informal",s:1},{t:'Nothing exists',s:0}] },
      { id:'a2', text:"How aligned are your marketing and sales teams on the core message you're taking to market?",
        opts:[{t:'Very aligned, same story everywhere',s:4},{t:'Generally aligned with some divergence',s:2},{t:'Noticeably different approaches',s:1},{t:'They operate in silos',s:0}] },
      { id:'a3', text:'How clear is your team on who your ideal customer is and what they care most about?',
        opts:[{t:'Very clear, documented and shared',s:4},{t:'Mostly clear with some disagreement',s:2},{t:'Informal understanding, nothing written',s:1},{t:'Actively debated or unclear',s:0}] },
      { id:'a4', text:'When founders speak publicly, how consistent is their message with your marketing?',
        opts:[{t:'Consistent and reinforcing',s:4},{t:'Similar but with personal variation',s:2},{t:'Often different from marketing',s:1},{t:'Founder and brand tell different stories',s:0}] },
    ]
  },
];

const fixes = {
  clarity: {
    high: "Your messaging is well-calibrated. The next move is stress-testing it with a cold audience who has never heard of you. Run your hero copy by five strangers in your ICP and see if they can repeat it back.",
    mid: "Your messaging works internally but loses precision externally. Write a single north star sentence that every team member memorizes and every channel opens with. Lock it down before anything else.",
    low: "Your team is writing from instinct, not from a documented source. Build a messaging matrix first. One doc, shared everywhere, reviewed quarterly. Every other asset flows from it.",
  },
  market: {
    high: "You own your position well. Consider making your differentiation even more aggressive in your homepage hero rather than burying it lower on the page.",
    mid: "Your competitive positioning exists but lives in your head, not your materials. Write a 'we win when' and 'they win when' sentence for each of your top three competitors and put it in your sales deck.",
    low: "Prospects are deciding who you are because you have not told them. Your homepage needs to name the comparison and own the outcome within the first two sections, before the prospect scrolls.",
  },
  value: {
    high: "Outcome-led messaging is working. Make sure your cold outreach matches the same standard as your homepage. Most companies nail one and neglect the other.",
    mid: "You are close but features keep creeping in. Audit every headline on your site. If it describes a capability instead of a result, rewrite it from the buyer's perspective.",
    low: "Feature-first messaging is costing you conversions and lengthening your sales cycle. Start every major copy block with the outcome, then back it up with the feature that delivers it.",
  },
  sales: {
    high: "Sales friction is low. Your positioning is doing pre-sell work before prospects ever talk to your team. Protect this as you scale.",
    mid: "Deals are moving but with unnecessary friction. Create a one-page 'how to explain us' doc for internal champions. Framed like an FAQ a skeptical colleague would ask, not a feature list.",
    low: "Positioning is actively blocking revenue. Prospects can't build internal consensus because they can't summarize what you do. Fix your minimum viable messaging first: the shortest version of your story that still lands.",
  },
  alignment: {
    high: "Your team is pulling in one direction. Protect this by running a quarterly messaging audit as you scale and add headcount.",
    mid: "Alignment exists informally but has not been codified. One shared messaging doc cuts ramp time, sales drift, and founder-brand inconsistency immediately.",
    low: "Your company is telling multiple stories to the market simultaneously. This fractures trust faster than any competitor can. A messaging matrix is not optional at this stage. It is infrastructure.",
  },
};

const allQs = [];
sections.forEach(function(sec) {
  sec.questions.forEach(function(q) { allQs.push({ q, sec }); });
});
const pairs = [];
for (let i = 0; i < allQs.length; i += 2) {
  pairs.push([allQs[i], allQs[i+1]].filter(Boolean));
}

export default function QuizScorePage() {
  const [step, setStep] = useState('intro');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [introErr, setIntroErr] = useState('');
  const [pairIdx, setPairIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizErr, setQuizErr] = useState(false);

  const startQuiz = () => {
    if (!name || !email || !company || !url) { setIntroErr('Fill in all fields to continue.'); return; }
    if (!email.includes('@')) { setIntroErr('Enter a valid email address.'); return; }
    setIntroErr('');
    setStep('quiz');
  };

  const selectAnswer = (qId, score) => {
    setAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const goNext = () => {
    const pair = pairs[pairIdx];
    if (pair.some(item => answers[item.q.id] === undefined)) { setQuizErr(true); return; }
    setQuizErr(false);
    if (pairIdx < pairs.length - 1) { setPairIdx(p => p + 1); window.scrollTo(0,0); }
    else setStep('results');
  };

  const goBack = () => { if (pairIdx > 0) { setPairIdx(p => p - 1); window.scrollTo(0,0); } };

  const dimScores = /** @type {Record<string, number>} */ ({});
  sections.forEach(function(sec) {
    const total = sec.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    dimScores[sec.id] = Math.round((total / 16) * 20);
  });
  const totalScore = Object.values(dimScores).reduce((a, b) => a + b, 0);

  let gradeLabel = '', verdict = '';
  if (totalScore >= 85) { gradeLabel = 'Strong positioning'; verdict = "Your positioning is working. You have a few areas to sharpen, but the foundation is solid. The opportunity now is to scale what's working before gaps widen at higher ARR."; }
  else if (totalScore >= 70) { gradeLabel = 'Some gaps showing'; verdict = "Your positioning has a real foundation, but specific dimensions are costing you deals and slowing your sales cycle. Targeted fixes now stop this from compounding as you scale."; }
  else if (totalScore >= 50) { gradeLabel = 'Positioning is a bottleneck'; verdict = "Weak positioning is actively creating friction across your funnel. Prospects can't self-qualify, sales calls start too early, and your team is compensating for messaging that should be doing that work."; }
  else { gradeLabel = 'Positioning needs a rebuild'; verdict = "Your messaging is working against you. Deals stall, the team improvises, and your homepage is losing buyers before they ever talk to anyone. This is fixable in weeks, not months."; }

  const pct = Math.round((pairIdx / pairs.length) * 100);
  const currentPair = pairs[pairIdx] || [];
  const secIdx = sections.indexOf(currentPair[0]?.sec);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        .qz * { box-sizing: border-box; margin: 0; padding: 0; }
        .qz { font-family: 'DM Sans', sans-serif; background: #f5f4f0; color: #1a1a1a; min-height: 100vh; line-height: 1.6; }
        .qz-wrap { max-width: 720px; margin: 0 auto; padding: 40px 24px 80px; }
        .qz-logo { font-weight: 500; font-size: 18px; color: #1a3d2e; letter-spacing: -0.3px; display: block; margin-bottom: 48px; text-decoration: none; }
        .qz-eye { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #2d6a4a; background: #e8f0eb; padding: 6px 14px; border-radius: 100px; margin-bottom: 28px; display: inline-block; }
        .qz h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px,5vw,52px); font-weight: 400; line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.5px; }
        .qz h2 { font-family: 'Playfair Display', serif; font-size: clamp(22px,3.5vw,32px); font-weight: 400; line-height: 1.2; margin-bottom: 12px; }
        .qz-sub { font-size: 16px; color: #4a4a4a; margin-bottom: 36px; line-height: 1.65; max-width: 520px; font-weight: 300; }
        .qz-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .qz-row.full { grid-template-columns: 1fr; }
        .qz-field label { display: block; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; color: #888; margin-bottom: 6px; text-transform: uppercase; }
        .qz-field input { width: 100%; padding: 13px 16px; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; font-family: 'DM Sans',sans-serif; font-size: 15px; background: #fff; color: #1a1a1a; outline: none; transition: border-color 0.2s; }
        .qz-field input:focus { border-color: #2d6a4a; }
        .qz-field input::placeholder { color: #bbb; }
        .qz-btn { background: #1e4d35; color: #fff; border: none; border-radius: 100px; padding: 14px 28px; font-family: 'DM Sans',sans-serif; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; margin-top: 8px; transition: all 0.2s; text-decoration: none; }
        .qz-btn:hover { background: #1a3d2e; transform: translateY(-1px); }
        .qz-btn-sec { background: transparent; color: #4a4a4a; border: 1px solid rgba(0,0,0,0.1); border-radius: 100px; padding: 12px 24px; font-family: 'DM Sans',sans-serif; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .qz-btn-sec:hover { border-color: #2d6a4a; color: #2d6a4a; }
        .qz-err { color: #8B2020; font-size: 13px; margin-top: 8px; }
        .qz-prog-bg { background: rgba(0,0,0,0.08); border-radius: 100px; height: 3px; margin-bottom: 36px; overflow: hidden; }
        .qz-prog-fill { background: #2d6a4a; height: 100%; border-radius: 100px; transition: width 0.5s ease; }
        .qz-badge { display: inline-flex; align-items: center; gap: 8px; background: #e8f0eb; color: #1a3d2e; font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; padding: 6px 12px; border-radius: 100px; margin-bottom: 20px; }
        .qz-badge-num { background: #1a3d2e; color: #fff; width: 18px; height: 18px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 500; flex-shrink: 0; }
        .qz-qblock { background: #fff; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 24px; margin-bottom: 14px; }
        .qz-qtxt { font-size: 15px; margin-bottom: 16px; line-height: 1.55; }
        .qz-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .qz-opt { padding: 10px 14px; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; background: #f5f4f0; color: #4a4a4a; font-family: 'DM Sans',sans-serif; font-size: 13.5px; cursor: pointer; text-align: left; line-height: 1.4; transition: all 0.15s; }
        .qz-opt:hover { border-color: #2d6a4a; color: #1a3d2e; background: #e8f0eb; }
        .qz-opt.sel { background: #e8f0eb; border-color: #2d6a4a; color: #1a3d2e; font-weight: 500; }
        .qz-nav { display: flex; align-items: center; justify-content: space-between; margin-top: 28px; }
        .qz-counter { font-size: 13px; color: #888; }
        .qz-res-hdr { background: #1a3d2e; color: #fff; border-radius: 16px; padding: 36px; margin-bottom: 28px; }
        .qz-score-big { font-family: 'Playfair Display',serif; font-size: 80px; font-weight: 400; line-height: 1; margin-bottom: 4px; }
        .qz-score-lbl { font-size: 13px; opacity: 0.6; letter-spacing: 0.5px; margin-bottom: 20px; }
        .qz-grade { display: inline-block; background: rgba(255,255,255,0.12); border-radius: 100px; padding: 4px 14px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
        .qz-verdict { font-size: 17px; opacity: 0.9; line-height: 1.5; max-width: 500px; }
        .qz-dim { background: #fff; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 22px 24px; margin-bottom: 12px; }
        .qz-dim-hdr { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
        .qz-dim-name { font-size: 14px; font-weight: 500; }
        .qz-dim-dsub { font-size: 12px; color: #888; margin-top: 2px; }
        .qz-pill { font-size: 12px; font-weight: 500; padding: 3px 10px; border-radius: 100px; white-space: nowrap; flex-shrink: 0; margin-left: 12px; }
        .pill-h { background: #e8f0eb; color: #1a3d2e; }
        .pill-m { background: #fdf3dc; color: #7a5c10; }
        .pill-l { background: #fdeaea; color: #7a1f1f; }
        .qz-bar-bg { background: rgba(0,0,0,0.07); border-radius: 100px; height: 5px; margin-bottom: 14px; overflow: hidden; }
        .qz-bar-fill { height: 100%; border-radius: 100px; }
        .qz-fix { font-size: 13.5px; color: #1a3d2e; line-height: 1.6; background: #e8f0eb; border-radius: 8px; padding: 12px 14px; }
        .qz-fix strong { display: block; font-weight: 500; margin-bottom: 4px; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.6; }
        .qz-cta { background: #1a3d2e; border-radius: 16px; padding: 36px; margin-top: 28px; text-align: center; color: #fff; }
        .qz-cta h2 { font-family: 'Playfair Display',serif; color: #fff; font-size: 26px; margin-bottom: 12px; }
        .qz-cta p { font-size: 15px; opacity: 0.75; margin-bottom: 24px; line-height: 1.6; }
        .qz-cta-btn { background: #fff; color: #1a3d2e; border: none; border-radius: 100px; padding: 14px 28px; font-family: 'DM Sans',sans-serif; font-size: 15px; font-weight: 500; cursor: pointer; display: inline-block; text-decoration: none; }
        .qz-exp-row { display: flex; gap: 10px; margin-top: 16px; justify-content: center; flex-wrap: wrap; }
        .qz-exp-btn { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 100px; padding: 10px 20px; font-family: 'DM Sans',sans-serif; font-size: 13px; cursor: pointer; }
        .qz-soft { background: #fff; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 24px; margin-top: 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .qz-soft-txt { font-size: 14px; color: #4a4a4a; line-height: 1.5; }
        .qz-soft-txt strong { color: #1a1a1a; font-weight: 500; display: block; margin-bottom: 2px; }
        @media (max-width: 520px) { .qz-row { grid-template-columns: 1fr; } .qz-opts { grid-template-columns: 1fr; } .qz-score-big { font-size: 60px; } }
        @media print { .qz-nav, .qz-exp-row, .qz-cta-btn { display: none; } }
      `}</style>

      <div className="qz">
        <div className="qz-wrap">
          <a href="https://boundset.com" className="qz-logo">boundset</a>

          {step === 'intro' && (
            <div>
              <div className="qz-eye">Positioning Pressure Test</div>
              <h1>Find out how strong your positioning really is</h1>
              <p className="qz-sub">Answer 20 questions and walk away with a score out of 100, a breakdown across five dimensions, and a specific fix for every weak area.</p>
              <div className="qz-row">
                <div className="qz-field"><label>First name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Alex" /></div>
                <div className="qz-field"><label>Company name</label><input value={company} onChange={e=>setCompany(e.target.value)} placeholder="Acme Inc." /></div>
              </div>
              <div className="qz-row full">
                <div className="qz-field"><label>Work email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="alex@acme.com" /></div>
              </div>
              <div className="qz-row full">
                <div className="qz-field"><label>Website URL</label><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="acme.com" /></div>
              </div>
              {introErr && <p className="qz-err">{introErr}</p>}
              <button className="qz-btn" onClick={startQuiz}>Start the quiz →</button>
              <p style={{fontSize:'12px',color:'#888',marginTop:'14px'}}>Takes 4–6 minutes · Free · No pitch</p>
            </div>
          )}

          {step === 'quiz' && (
            <div>
              <div className="qz-prog-bg"><div className="qz-prog-fill" style={{width: pct+'%'}} /></div>
              <div className="qz-badge"><span className="qz-badge-num">{secIdx + 1}</span>{currentPair[0]?.sec.name}</div>
              <h2 style={{marginBottom:'6px'}}>{currentPair[0]?.sec.name}</h2>
              <p style={{fontSize:'14px',color:'#888',marginBottom:'24px'}}>{currentPair[0]?.sec.desc}</p>
              {currentPair.map((item) => (
                <div key={item.q.id} className="qz-qblock">
                  <div className="qz-qtxt">{item.q.text}</div>
                  <div className="qz-opts">
                    {item.q.opts.map((o, oi) => (
                      <button key={oi} className={`qz-opt${answers[item.q.id] === o.s ? ' sel' : ''}`} onClick={() => selectAnswer(item.q.id, o.s)}>{o.t}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="qz-nav">
                <button className="qz-btn-sec" onClick={goBack} style={{visibility: pairIdx === 0 ? 'hidden' : 'visible'}}>← Back</button>
                <span className="qz-counter">{pairIdx + 1} of {pairs.length}</span>
                <button className="qz-btn" onClick={goNext}>{pairIdx === pairs.length - 1 ? 'See my results →' : 'Next →'}</button>
              </div>
              {quizErr && <p className="qz-err">Answer both questions to continue.</p>}
            </div>
          )}

          {step === 'results' && (
            <div>
              <div className="qz-res-hdr">
                <div className="qz-grade">{gradeLabel}</div>
                <div className="qz-score-big">{totalScore}</div>
                <div className="qz-score-lbl">OUT OF 100</div>
                <div className="qz-verdict">{verdict}</div>
              </div>
              {sections.map(sec => {
                const s = dimScores[sec.id];
                const barPct = s * 5;
                const pillClass = s >= 15 ? 'pill-h' : s >= 9 ? 'pill-m' : 'pill-l';
                const barColor = s >= 15 ? '#1a3d2e' : s >= 9 ? '#b07d1a' : '#8B2020';
                const fixKey = s >= 15 ? 'high' : s >= 9 ? 'mid' : 'low';
                return (
                  <div key={sec.id} className="qz-dim">
                    <div className="qz-dim-hdr">
                      <div>
                        <div className="qz-dim-name">{sec.name}</div>
                        <div className="qz-dim-dsub">{sec.desc}</div>
                      </div>
                      <span className={`qz-pill ${pillClass}`}>{s}/20</span>
                    </div>
                    <div className="qz-bar-bg"><div className="qz-bar-fill" style={{width: barPct+'%', background: barColor}} /></div>
                    <div className="qz-fix"><strong>What to do now</strong>{fixes[sec.id][fixKey]}</div>
                  </div>
                );
              })}
              {totalScore < 75 ? (
                <div className="qz-cta">
                  <h2>Your score says you're losing deals you should be winning</h2>
                  <p>A 2-week Boundset sprint fixes the exact dimensions where you scored lowest. Most clients close their next deal with the new messaging before the sprint ends.</p>
                  <a className="qz-cta-btn" href="https://boundset.com" target="_blank" rel="noreferrer">Book a free 15-minute call →</a>
                  <div className="qz-exp-row">
                    <button className="qz-exp-btn" onClick={() => window.print()}>↓ Download as PDF</button>
                    <button className="qz-exp-btn" onClick={() => { navigator.clipboard && navigator.clipboard.writeText('I just took the Boundset Positioning Pressure Test and scored ' + totalScore + '/100. If you run a B2B SaaS company, take it at boundset.com/quiz').then(() => alert('Copied to clipboard.')); }}>↗ Copy share text</button>
                  </div>
                </div>
              ) : (
                <div className="qz-soft">
                  <div className="qz-soft-txt"><strong>Your positioning is stronger than most.</strong>A sprint locks in the remaining gaps and gives you a messaging system that scales with you.</div>
                  <a className="qz-btn" href="https://boundset.com" target="_blank" rel="noreferrer" style={{marginTop:0,whiteSpace:'nowrap',textDecoration:'none'}}>Book a call →</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
