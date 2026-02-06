'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// Icons for deliverables
const icons = {
  workshop: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  strategy: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>,
  messaging: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  usecase: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  mvm: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  valueprop: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  copy: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  wireframe: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  voice: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>,
  competitive: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
  asset: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  access: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
}

// Quiz Component
function DiagnosticQuiz() {
  const [answers, setAnswers] = useState({})
  
  const questions = [
    "We can't explain what we do in one sentence",
    "Sales cycles take longer than they should",
    "We lead with features instead of outcomes",
    "Prospects compare us to the wrong competitors",
    "We change our messaging every few months",
    "Investors ask us to 'simplify' our pitch",
    "New hires take weeks to learn how to describe us",
    "We sound like everyone else in our space",
  ]
  
  const score = Object.values(answers).filter(Boolean).length
  const toggleAnswer = (id) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }))
  
  const getResultMessage = () => {
    if (score === 0) return null
    if (score <= 2) return { title: "A few cracks showing", subtitle: "Small fixes now prevent big problems later." }
    if (score <= 4) return { title: "This is costing you deals", subtitle: "Every week you wait, pipeline leaks." }
    if (score <= 6) return { title: "Your messaging needs serious attention", subtitle: "The product works. The words are holding you back." }
    return { title: "Red alert: messaging is broken", subtitle: "This is fixable. Let's talk." }
  }
  
  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 border border-stone-200">
      <p className="text-stone-500 mb-8">Select all that apply.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {questions.map((q, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggleAnswer(i)}
            className={`text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
              answers[i] 
                ? 'border-red-500 bg-red-50' 
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              answers[i] ? 'border-red-500 bg-red-500' : 'border-stone-300'
            }`}>
              {answers[i] && (
                <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
              )}
            </div>
            <span className={`text-sm ${answers[i] ? 'text-red-700' : 'text-stone-700'}`}>{q}</span>
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {score > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-6 border-t border-stone-200"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="flex gap-1">
                {[1,2,3,4,5,6,7,8].map(n => (
                  <div key={n} className={`w-2 h-2 rounded-full transition-all duration-300 ${n <= score ? 'bg-red-500' : 'bg-stone-200'}`} />
                ))}
              </div>
              <span className="text-sm text-stone-500">{score} of 8</span>
            </div>
            <p className="text-xl font-serif text-stone-900">{getResultMessage()?.title}</p>
            <p className="text-stone-500">{getResultMessage()?.subtitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Asset Picker Component
function AssetPicker({ maxSelections = 1 }) {
  const [selected, setSelected] = useState([])
  const assets = [
    { id: 'cold-email', name: 'Cold email sequence', desc: '5-7 emails ready to send' },
    { id: 'nurture', name: 'Welcome sequence', desc: 'Onboarding flow for signups' },
    { id: 'landing', name: 'Landing page copy', desc: 'Full page with variants' },
    { id: 'objections', name: 'Objection scripts', desc: 'For sales calls' },
    { id: 'social', name: '30 days of hooks', desc: 'Content angles and prompts' },
    { id: 'ads', name: 'Ad copy kit', desc: 'Headlines and variations' },
    { id: 'investor', name: 'Investor messaging', desc: 'Pitch deck language' },
    { id: 'case-study', name: 'Case study framework', desc: 'Template for stories' },
  ]
  
  const toggle = (id) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length < maxSelections) return [...prev, id]
      return prev
    })
  }
  
  return (
    <div className="grid grid-cols-2 gap-3">
      {assets.map(asset => (
        <button key={asset.id} onClick={() => toggle(asset.id)} disabled={!selected.includes(asset.id) && selected.length >= maxSelections} className={`p-4 rounded-xl text-left transition-all duration-300 ${selected.includes(asset.id) ? 'bg-brand text-white' : selected.length >= maxSelections ? 'bg-stone-100 text-stone-300 cursor-not-allowed' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'}`}>
          <p className={`font-medium text-sm ${selected.includes(asset.id) ? 'text-white' : 'text-stone-900'}`}>{asset.name}</p>
          <p className={`text-xs mt-1 ${selected.includes(asset.id) ? 'text-white/70' : 'text-stone-500'}`}>{asset.desc}</p>
        </button>
      ))}
    </div>
  )
}

// Before/After Table Component
function BeforeAfterTable() {
  const [hoveredRow, setHoveredRow] = useState(null)
  
  const rows = [
    { before: "You rewrite your homepage every few months", after: "Homepage copy that lasts because it's built on real positioning" },
    { before: "Every team member explains the product differently", after: "One messaging matrix everyone pulls from" },
    { before: "Sales calls start with long explanations", after: "Prospects already get it before the demo" },
    { before: "Investors ask you to 'simplify' your pitch", after: "Pitch language that lands in one sentence" },
    { before: "New hires take weeks to learn how to describe you", after: "Onboarding doc that gets them fluent in days" },
    { before: "You sound like your competitors", after: "Competitive positioning that carves out your space" },
    { before: "Features dominate your site, outcomes are buried", after: "Value prop leads, features support" },
    { before: "Cold emails get ignored", after: "Outbound that earns replies" },
    { before: "You second-guess every tagline", after: "Variants tested, best one chosen, decision made" },
    { before: "Marketing and sales say different things", after: "Aligned messaging across every channel" },
    { before: "You keep tweaking without a system", after: "Messaging matrix you can build on for years" },
    { before: "Prospects compare you to the wrong competitors", after: "Positioning that puts you in the right conversation" },
    { before: "Your founder voice and brand voice blur together", after: "Documented guide for when to use each" },
    { before: "You avoid content because you don't know what to say", after: "Angles and hooks ready to post" },
    { before: "You're not sure what to say on your features page", after: "Use case messaging ready to deploy" },
  ]
  
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-stone-200">
        <div className="bg-stone-100 p-4 md:p-6 border-b border-r border-stone-200">
          <p className="font-medium text-stone-500 text-sm uppercase tracking-wide">Without Boundset</p>
        </div>
        <div className="bg-brand/10 p-4 md:p-6 border-b border-stone-200">
          <p className="font-medium text-brand text-sm uppercase tracking-wide">With Boundset</p>
        </div>
        
        {rows.map((row, i) => (
          <div key={i} className="contents">
            {i === 8 && (
              <div className="col-span-2 bg-brand p-6 flex items-center justify-between">
                <p className="text-white font-medium">Seen enough?</p>
                <button data-cal-link="heyblake/positioning" data-cal-namespace="positioning" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="px-6 py-2 bg-white text-brand rounded-full font-medium hover:bg-white/90 transition-colors text-sm cursor-pointer">
                  Book a call
                </button>
              </div>
            )}
            <motion.div
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`p-4 md:p-5 border-b border-r border-stone-200 transition-colors duration-200 ${hoveredRow === i ? 'bg-red-50' : 'bg-white'}`}
            >
              <div className="flex items-start gap-3">
                <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${hoveredRow === i ? 'text-red-400' : 'text-stone-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <p className={`text-sm transition-colors ${hoveredRow === i ? 'text-red-700' : 'text-stone-600'}`}>{row.before}</p>
              </div>
            </motion.div>
            <motion.div
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`p-4 md:p-5 border-b border-stone-200 transition-colors duration-200 ${hoveredRow === i ? 'bg-green-50' : 'bg-white'}`}
            >
              <div className="flex items-start gap-3">
                <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${hoveredRow === i ? 'text-green-500' : 'text-brand/50'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className={`text-sm transition-colors ${hoveredRow === i ? 'text-green-700' : 'text-stone-700'}`}>{row.after}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

// FAQ Component
function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('Process')
  const [expandedItems, setExpandedItems] = useState({})
  const [showAll, setShowAll] = useState(false)
  
  const categories = ['Process', 'Deliverables', 'Pricing', 'Timing', 'Fit', 'After']
  
  const faqs = {
    Process: [
      { q: "How much of my time does this take?", a: "Around 4-5 hours across two weeks. One 90-minute positioning workshop, a few review sessions, and async feedback on deliverables." },
      { q: "Who from my team needs to be involved?", a: "You and one or two people who know the product and customers well. Keep it small. Too many voices slows everything down." },
      { q: "What do I need to prepare before we start?", a: "A product demo, a recorded sales call, your current website, and a list of competitors. Takes around 30 minutes to gather." },
      { q: "How do the workshops work?", a: "Video call. I come with questions and hypotheses. We work through positioning options together. You leave with clarity." },
      { q: "What happens if I need to reschedule a session?", a: "Life happens. We'll find another time. The two-week timeline has flexibility built in." },
      { q: "Is this done over video call or in person?", a: "Video call. I work with founders globally. Time zones are rarely an issue." },
      { q: "How do you learn my product without talking to customers?", a: "You know your customers better than I ever will from a few calls. You bring the insight, I bring the messaging skill. That's the split." },
      { q: "What if my co-founder disagrees on positioning?", a: "Common. The workshop is designed to surface disagreements and resolve them. By the end of week one, you'll be aligned." },
    ],
    Deliverables: [
      { q: "What format are the deliverables in?", a: "Google Docs and Slides. Easy to share, comment on, and use." },
      { q: "Do you design the homepage or write the copy?", a: "I write the copy and deliver a wireframe with sections laid out. Your designer handles the visual design." },
      { q: "Can I request changes to the copy?", a: "Yes. One round of revisions is built into the sprint. Most founders use it to tighten, rather than overhaul." },
      { q: "How many rounds of revisions are included?", a: "One formal round. But I'm in your Slack, so small tweaks happen naturally." },
      { q: "What's the difference between the messaging matrix and the positioning grid?", a: "The positioning grid is your strategic foundation: statement, value prop, problem framing. The messaging matrix is how that translates into actual copy across channels." },
      { q: "What counts as an activation asset?", a: "Cold email sequence, landing page, ad copy kit, objection scripts, investor messaging, case study framework, or 30 days of content hooks." },
      { q: "Do you write landing pages for paid ads?", a: "Yes. That's one of the activation asset options." },
      { q: "Can I get email sequences as an activation asset?", a: "Yes. Cold outbound or welcome sequences both work." },
      { q: "What if I need more than one activation asset?", a: "Stake includes one. Stronghold includes three. If you need more, we can add them." },
      { q: "Do you provide brand guidelines?", a: "Messaging, yes. The brand vs. founder guide covers voice. Visual identity is outside scope." },
    ],
    Pricing: [
      { q: "Why is this priced as a flat fee?", a: "Because scope creep kills projects. You know exactly what you're paying, I know exactly what I'm delivering." },
      { q: "What's the difference between Stake and Stronghold?", a: "Stake covers your core messaging and homepage. Stronghold adds three more pages, three activation assets, and a full year of async coaching." },
      { q: "Is there a payment plan?", a: "50% to start, 50% on delivery. Simple." },
      { q: "What if I want to upgrade to Stronghold later?", a: "You can. We'll credit what you paid for Stake toward Stronghold if you upgrade within 30 days." },
      { q: "Are there any hidden fees?", a: "None. The price is the price." },
      { q: "What's included in the async coaching for Stronghold?", a: "A full year in my Slack channel. Questions on messaging, positioning, copy—you ask, I answer." },
    ],
    Timing: [
      { q: "How quickly can we start?", a: "Usually within a week. Depends on my current workload." },
      { q: "What if I need this done faster than two weeks?", a: "Sometimes possible. Let's talk on your timeline on the call." },
      { q: "What if I'm launching soon and need to prioritize certain deliverables?", a: "We'll front-load what matters most. Homepage copy can come before the full messaging matrix if that's what you need." },
      { q: "How long does the Slack access last?", a: "Stake: ongoing, for quick questions. Stronghold: one full year of dedicated async coaching." },
      { q: "When do I get the final deliverables?", a: "End of week two. Everything packaged and ready to use." },
    ],
    Fit: [
      { q: "Is this right for pre-seed companies?", a: "Sometimes. If you have a product and customers, yes. If you're still figuring out what to build, it's too early." },
      { q: "What if I already have positioning but it's not working?", a: "That's most of my clients. We'll audit what you have, find where it breaks, and rebuild." },
      { q: "Do you work with B2C companies?", a: "Occasionally. My sweet spot is B2B SaaS, but the process works for B2C too." },
      { q: "What if my product is highly technical?", a: "Good. Technical products need simple messaging more than anyone. I'll ask a lot of questions." },
      { q: "Do you work with agencies?", a: "Mostly founders. Occasionally agencies who need positioning help for their own brand." },
      { q: "What industries do you have experience with?", a: "Dev tools, fintech, martech, HR tech, healthcare tech. But the process is industry-agnostic." },
      { q: "What if I'm not sure if messaging is actually my problem?", a: "Let's figure that out on the call. Sometimes it's messaging. Sometimes it's product-market fit. I'll tell you which." },
      { q: "How do I know if I'm a good fit?", a: "You have a product that works. You have customers who love it. But you can't explain it well. That's the fit." },
    ],
    After: [
      { q: "What happens after the two weeks?", a: "You have everything you need to execute. I'm in your Slack for questions. You go build." },
      { q: "Can I hire you for ongoing work?", a: "Stronghold includes a year of async coaching. Beyond that, we can discuss." },
      { q: "What if my messaging stops working after a few months?", a: "Messaging built on real positioning lasts. But markets change. Ping me in Slack and we'll figure it out." },
      { q: "Can I come back for a refresh later?", a: "Yes. Past clients get priority and a reduced rate for refresh projects." },
      { q: "Do you help with implementation?", a: "I deliver copy ready to implement. Your team handles the build. I'm available for questions." },
      { q: "Will you work with my designer or developer?", a: "Happy to answer their questions or clarify intent. I want this to ship correctly." },
      { q: "What if I have questions six months from now?", a: "Slack me. That's what it's there for." },
      { q: "Do past clients get priority for future work?", a: "Yes. Always." },
    ],
  }
  
  const currentFaqs = faqs[activeCategory] || []
  const displayedFaqs = showAll ? currentFaqs : currentFaqs.slice(0, 8)
  
  const toggleItem = (index) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }))
  }
  
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setShowAll(false); setExpandedItems({}) }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-brand text-white' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {displayedFaqs.map((faq, i) => (
            <motion.div
              key={`${activeCategory}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.03 }}
              className="border border-stone-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
              >
                <span className="font-medium text-stone-900">{faq.q}</span>
                <motion.svg
                  animate={{ rotate: expandedItems[i] ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-5 h-5 text-stone-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {expandedItems[i] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-5 pb-5 text-stone-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {currentFaqs.length > 8 && !showAll && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAll(true)}
          className="mt-6 text-brand font-medium hover:underline"
        >
          Show {currentFaqs.length - 8} more questions
        </motion.button>
      )}
    </div>
  )
}

// Section wrapper
function Section({ children, className = '', id = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.section ref={ref} id={id} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.section>
  )
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl text-brand font-semibold tracking-tight">boundset</a>
        <button data-cal-link="heyblake/positioning" data-cal-namespace="positioning" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${scrolled ? 'bg-brand text-white hover:bg-brand/90' : 'bg-stone-900 text-white hover:bg-stone-800'}`}>Book a call</button>
      </div>
    </motion.nav>
  )
}

// Social Proof Logos
function SocialProofLogos() {
  return (
    <>
      {/* Desktop - static */}
      <div className="hidden md:flex items-center justify-start gap-12">
        <img src="/logo-provable.svg" alt="Provable" className="h-[30px]" />
        <img src="/logo-athena.svg" alt="Athena" className="h-[30px]" />
        <img src="/logo-gamma.svg" alt="Gamma" className="h-[30px]" />
        <img src="/logo-originalvoices.svg" alt="OriginalVoices" className="h-[30px]" />
      </div>
      
      {/* Mobile - scrolling ticker */}
      <div className="md:hidden overflow-hidden relative">
        <motion.div 
          className="flex items-center gap-10"
          animate={{ x: [0, -400] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <img src="/logo-provable.svg" alt="Provable" className="h-5 flex-shrink-0" />
          <img src="/logo-athena.svg" alt="Athena" className="h-5 flex-shrink-0" />
          <img src="/logo-gamma.svg" alt="Gamma" className="h-5 flex-shrink-0" />
          <img src="/logo-originalvoices.svg" alt="OriginalVoices" className="h-5 flex-shrink-0" />
          <img src="/logo-provable.svg" alt="Provable" className="h-5 flex-shrink-0" />
          <img src="/logo-athena.svg" alt="Athena" className="h-5 flex-shrink-0" />
          <img src="/logo-gamma.svg" alt="Gamma" className="h-5 flex-shrink-0" />
          <img src="/logo-originalvoices.svg" alt="OriginalVoices" className="h-5 flex-shrink-0" />
        </motion.div>
      </div>
    </>
  )
}

export default function Home() {
  const [activeTier, setActiveTier] = useState('stake')
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start end", "end start"] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  
  // Cal.com embed
  useEffect(() => {
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    window.Cal("init", "positioning", {origin:"https://app.cal.com"});
    window.Cal.ns.positioning("ui", {"cssVarsPerTheme":{"light":{"cal-brand":"#1B4332"},"dark":{"cal-brand":"#1B4332"}},"hideEventTypeDetails":false,"layout":"month_view"});
  }, [])
  
  const milestones = [
    { phase: "BEFORE", title: "You send materials", desc: "Demo, sales call recording, current site, competitor list. 30 minutes." },
    { phase: "BEFORE", title: "I do my homework", desc: "I review everything and come to our first session with questions and hypotheses." },
    { phase: "WEEK 1", title: "Positioning workshop", desc: "90-minute working session. We map audience, product, features, benefits, outcomes." },
    { phase: "WEEK 1", title: "Strategy grid delivered", desc: "Your positioning statement, problem framing, and value prop in writing." },
    { phase: "WEEK 1", title: "Messaging matrix delivered", desc: "Core messages locked. Who, what, where, when, why defined." },
    { phase: "WEEK 1", title: "Competitive audit delivered", desc: "Your top 3 competitors mapped. Where you win, where they win." },
    { phase: "WEEK 2", title: "Homepage copy delivered", desc: "Full page written with variants for every heading and subtext." },
    { phase: "WEEK 2", title: "Wireframe delivered", desc: "Section-by-section layout with copy in place." },
    { phase: "WEEK 2", title: "Brand vs. founder guide", desc: "Voice separation documented." },
    { phase: "WEEK 2", title: "Activation asset delivered", desc: "Your chosen asset written and ready." },
    { phase: "AFTER", title: "You're in my Slack", desc: "Questions come up. You ask. I answer. Ongoing." },
  ]
  
  const deliverables = [
    { icon: icons.workshop, title: "Positioning workshop", desc: "We'll talk through past efforts, current thinking on audience, product, features, benefits, and outcomes, and strategize on your position in the market." },
    { icon: icons.strategy, title: "Positioning strategy grid", desc: "Your positioning statement, functional description, problem framing, value proposition, and supporting arguments in one doc." },
    { icon: icons.messaging, title: "Messaging matrix", desc: "Core messages to use across all marketing assets. Makes the who, what, where, when, and why unmistakable." },
    { icon: icons.usecase, title: "Use case messaging doc", desc: "Messaging tailored to each use case you sell into." },
    { icon: icons.mvm, title: "Minimum viable messaging", desc: "The shortest version of your story that still lands." },
    { icon: icons.valueprop, title: "Value proposition canvas", desc: "What messages to say that are valuable to what audience." },
    { icon: icons.copy, title: "Homepage copy with variants", desc: "Every element written out, with variants to test for H1, H2, H3, and critical subtext." },
    { icon: icons.wireframe, title: "Homepage wireframe", desc: "Section-by-section layout with placeholders for visuals and all copy implemented." },
    { icon: icons.voice, title: "Brand vs. founder guide", desc: "Where the company voice ends and your personal voice begins." },
    { icon: icons.competitive, title: "Competitive positioning audit", desc: "Where you win, where they win, and what to say when prospects bring them up." },
    { icon: icons.asset, title: "1 activation asset", desc: "Cold email, landing page, ad copy, or objection scripts. You pick." },
    { icon: icons.access, title: "Ongoing Slack access", desc: "Quick questions answered. No retainer." },
  ]
  
  return (
    <main className="min-h-screen bg-[#FAFAF9]">
      <Nav />
      
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(34,90,67,0.40) 0%, transparent 70%)',
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: ['-50%', '-45%', '-55%', '-50%'],
            y: ['-50%', '-55%', '-45%', '-50%'],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(34,90,67,0.30) 0%, transparent 60%)',
            left: '30%',
            top: '40%',
          }}
          animate={{
            scale: [1.1, 0.9, 1.1],
            x: ['0%', '10%', '-5%', '0%'],
            y: ['0%', '-10%', '5%', '0%'],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(34,90,67,0.25) 0%, transparent 60%)',
            right: '20%',
            top: '30%',
          }}
          animate={{
            scale: [0.9, 1.15, 0.9],
            x: ['0%', '-15%', '10%', '0%'],
            y: ['0%', '10%', '-5%', '0%'],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-brand font-medium mb-6 uppercase tracking-wide text-sm">POSITIONING FOR STARTUPS</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 leading-[1.1] mb-8">Nail your positioning so your product sells itself.</motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl text-stone-600 leading-relaxed mb-10 max-w-2xl">A 2-week sprint for seed-stage startups and beyond. You'll walk away with your positioning locked, messaging documented, and copy ready to use across your site, sales calls, and outreach.</motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mb-20">
              <button data-cal-link="heyblake/positioning" data-cal-namespace="positioning" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="inline-flex items-center justify-center px-8 py-4 bg-brand text-white font-medium rounded-full hover:bg-brand/90 transition-all duration-300 text-lg cursor-pointer">Book a free 1:1 consultation</button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <SocialProofLogos />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <Section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-brand font-medium mb-4 uppercase tracking-wide text-sm">POSITIONING QUIZ</p>
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-6">Red flags in your current strategy</h2>
              <p className="text-lg text-stone-600 leading-relaxed">Your product is gaining traction. Customers love it once they understand it. But getting them to that point takes too long. The homepage needs constant tweaking. Sales calls start with "let me explain what we do." If any of this sounds familiar, your positioning might be the bottleneck.</p>
            </div>
            <DiagnosticQuiz />
          </div>
        </div>
      </Section>
      
      {/* Deliverables */}
      <Section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-brand font-medium mb-4 uppercase tracking-wide text-sm">DELIVERABLES</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight">What's included in the 2-week sprint</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-stone-200 hover:border-stone-300 transition-colors duration-300 bg-white">
                <div className="text-brand mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* Timeline */}
      <Section id="how" className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-brand font-medium mb-4 uppercase tracking-wide text-sm">PROCESS</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight">Your sprint will follow this timeline</h2>
          </div>
          
          <div ref={timelineRef} className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 md:-translate-x-1/2">
              <motion.div style={{ height: lineHeight }} className="w-full bg-brand origin-top" />
            </div>
            
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-brand rounded-full md:-translate-x-1/2 mt-6 z-10">
                    <div className="absolute inset-0 bg-brand rounded-full animate-ping opacity-20" />
                  </div>
                  
                  <div className={`flex-1 ml-12 md:ml-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`bg-white p-6 rounded-xl border border-stone-200 inline-block ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">{m.phase}</p>
                      <h3 className="text-xl font-semibold text-stone-900 mb-2">{m.title}</h3>
                      <p className="text-stone-600 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      
      {/* Before/After */}
      <Section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-brand font-medium mb-4 uppercase tracking-wide text-sm">BEFORE/AFTER</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight">Here's what changes when you have a strong position and message</h2>
          </div>
          <BeforeAfterTable />
        </div>
      </Section>
      
      {/* Pricing */}
      <Section id="pricing" className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-brand font-medium mb-4 uppercase tracking-wide text-sm">PRICING</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight">Two ways you can invest in your product</h2>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-stone-100 p-1 rounded-full">
              <button onClick={() => setActiveTier('stake')} className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${activeTier === 'stake' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}>Stake · $7,500</button>
              <button onClick={() => setActiveTier('stronghold')} className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${activeTier === 'stronghold' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}>Stronghold · $12,000</button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div key={activeTier} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="max-w-4xl mx-auto">
              {activeTier === 'stake' ? (
                <div className="bg-stone-100 rounded-3xl p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-3xl font-serif text-stone-900 mb-2">Stake</h3>
                      <p className="text-5xl font-serif text-brand mb-6">$7,500</p>
                      <p className="text-stone-600 mb-8">The full sprint. Everything you need to fix your messaging and start using it immediately.</p>
                      <ul className="space-y-3 mb-8">
                        {["Positioning workshop", "Positioning strategy grid", "Messaging matrix", "Use case messaging doc", "Minimum viable messaging doc", "Value proposition canvas", "Homepage copy with variants", "Homepage wireframe", "Brand vs. founder guide", "Competitive positioning audit", "1 activation asset", "Ongoing Slack access"].map((item, i) => (
                          <li key={i} className="flex items-start gap-3"><svg className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg><span className="text-stone-700 text-sm">{item}</span></li>
                        ))}
                      </ul>
                      <button data-cal-link="heyblake/positioning" data-cal-namespace="positioning" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="inline-flex items-center justify-center w-full px-8 py-4 bg-brand text-white font-medium rounded-full hover:bg-brand/90 transition-all duration-300 cursor-pointer">Book Stake</button>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-500 mb-4 uppercase tracking-wide">PICK YOUR ACTIVATION ASSET</p>
                      <AssetPicker maxSelections={1} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-brand rounded-3xl p-8 md:p-12 text-white">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-3xl font-serif mb-2">Stronghold</h3>
                      <p className="text-5xl font-serif text-white/90 mb-6">$12,000</p>
                      <p className="text-white/70 mb-8">Everything in Stake, plus extended coverage for teams ready to roll messaging out everywhere.</p>
                      <ul className="space-y-3 mb-8">
                        {["Everything in Stake", "3 additional pages written", "Product, features, or use case pages", "3 activation assets", "1 year of async coaching in Slack"].map((item, i) => (
                          <li key={i} className="flex items-start gap-3"><svg className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg><span className="text-white/90 text-sm">{item}</span></li>
                        ))}
                      </ul>
                      <button data-cal-link="heyblake/positioning" data-cal-namespace="positioning" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="inline-flex items-center justify-center w-full px-8 py-4 bg-white text-brand font-medium rounded-full hover:bg-white/90 transition-all duration-300 cursor-pointer">Book Stronghold</button>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wide">PICK 3 ACTIVATION ASSETS</p>
                      <AssetPicker maxSelections={3} />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>
      
      {/* Testimonial - Just the quote, green background, no label or headline */}
      <Section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-brand rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="max-w-4xl mx-auto">
              <svg className="w-16 h-16 text-white/20 mb-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-10">
                <span className="text-white font-semibold">We loved working with Blake.</span> As an early stage AI company building something new, it's surprisingly difficult to succinctly explain what you do, the problem you're solving, and the solution you've built.
                <br /><br />
                <span className="text-white font-semibold">Blake really took the time to understand our product</span>, what we wanted to say and who we wanted to say it to. The sessions we did were productive - and in no time at all Blake sent us the copy and positioning we've been looking for.
                <br /><br />
                He was on hand to make tweaks and refinements based on our feedback, right up until we went live. <span className="text-white font-semibold">I've already had lots of positive comments</span> and we already feel more confident sharing our product, website and story.
                <br /><br />
                <span className="text-white/90 font-medium italic">If you're debating whether to work with Blake, I'd say just go for it. I'm glad we did.</span>
              </blockquote>
              <div className="flex items-center gap-4">
                <img src="/david-dobrin.jpeg" alt="David Dobrin" className="w-16 h-16 rounded-full object-cover border-2 border-white/20" />
                <div>
                  <p className="font-semibold text-white text-lg">David Dobrin</p>
                  <p className="text-white/60">CEO, OriginalVoices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* FAQ */}
      <Section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-brand font-medium mb-4 uppercase tracking-wide text-sm">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-tight mb-6">Everything you're wondering</h2>
          </div>
          <FAQSection />
        </div>
      </Section>
      
      {/* Final CTA */}
      <Section id="book" className="py-20 md:py-32 px-6 bg-brand">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm mb-8 uppercase tracking-wide">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Currently accepting new clients
            </div>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">In 2 weeks, you'll have what most companies spend 2 years trying to build</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Book a call with Blake. Fifteen minutes to find out if Boundset is a fit. No pitch or pressure.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button data-cal-link="heyblake/positioning" data-cal-namespace="positioning" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="inline-flex items-center justify-center px-10 py-5 bg-white text-brand font-medium rounded-full hover:bg-white/90 transition-all duration-300 text-lg group cursor-pointer">
              Book your call
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
          
          <p className="text-white/40 text-sm mt-8">Takes 15 minutes · Free · No commitment</p>
        </div>
      </Section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3"><span className="font-serif text-xl font-semibold">boundset</span><span className="text-white/30">·</span><span className="text-white/50 text-sm">Positioning for Startups</span></div>
          <div className="flex items-center gap-6">
            <a href="mailto:blake@boundset.com" className="text-white/50 hover:text-white transition-colors text-sm">blake@boundset.com</a>
            <a href="https://twitter.com/heyblake" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="https://linkedin.com/in/blakeemal" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
        </div>
      </footer>
    </main>
  )
}
