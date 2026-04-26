---
name: interactive-design-aesthetics/dashboard
description: >
  Builds a self-running React artifact dashboard that conducts its own audit
  via parallel Anthropic API calls. The artifact shell renders immediately.
  Audit runs inside the artifact. Claude does not run the audit.
---

# Dashboard — Self-Running Audit Artifact

## Architecture

The artifact is an AI-powered app. It runs the full audit itself.
Claude's only job: inject the TARGET url and render the artifact.

Execution inside the artifact:
  Mount → screenshot capture fires immediately (parallel, non-blocking)
  Mount → PRE-AUDIT API call fires
  PRE-AUDIT resolves → VISCERAL + BEHAVIORAL + REFLECTIVE + POST-DESKTOP fire in parallel
  Each domain resolves → its findings populate immediately, no waiting for others
  FAILS and MIXED auto-checked as each domain populates
  Action panel is interactive from first render

## Embedded Audit Prompts

All audit logic lives as prompt constants in the artifact. Not in skill files.
Each is a function that takes (url, preAudit) and returns a prompt string.

### PRE_AUDIT_PROMPT(url)
```
Analyze the interface at ${url}.
Return ONLY a JSON object. No markdown. No prose. No explanation.
{
  "emotion": "single word or short phrase — the one emotion Visceral should produce",
  "mentalModel": "one sentence — the mental model users arrive with",
  "conversionGoal": "one action — the single primary conversion goal",
  "actualUser": "one to two sentences — who is actually using this right now"
}
```

### VISCERAL_PROMPT(url, preAudit)
```
Apply Drew Kinney's aesthetic-first UX framework (MFA Thesis, Miami IUA&D, 2009).
Audit the interface at ${url} for these 5 Visceral principles.
Pre-audit context: ${JSON.stringify(preAudit)}

Return ONLY a JSON array of exactly 5 findings. No markdown. No prose.

PRINCIPLE 1 — Aesthetic Effect
Does first contact produce trust? Is the aesthetic intentional or assembled?
Does it match the lead emotion: ${preAudit.emotion}?
PASSES: trust + emotion match. MIXED: trust present but cautious/mismatched. FAILS: neutral or wrong emotion.

PRINCIPLE 2 — Affordance
Can a new user identify interactive elements without instruction?
Any scroll-jacking, hover-only signals, or visually indistinct interactive elements?
PASSES: all elements self-identify. MIXED: most correct, specific patterns fail. FAILS: trial and error required.

PRINCIPLE 3 — Proximity / Chunking
Do related elements cluster? Scannable in under 5 seconds?
CTAs separated from the content that motivates them?
PASSES: groupings clear, scannable. MIXED: most correct, specific sections break. FAILS: must read everything.

PRINCIPLE 4 — Color & Psychology
Does color produce ${preAudit.emotion}? Is color functional (hierarchy, action, status)?
Do premium and budget products share identical color systems inappropriately?
PASSES: palette produces target emotion consistently. MIXED: direction correct, applications contradict. FAILS: wrong emotion.

PRINCIPLE 5 — Common Fate
Do elements introduced together move together? Does animation confirm grouping?
Inconsistent easing or direction across similar components?
PASSES: coherent motion system. MIXED: mostly correct, specific sequences contradict. FAILS: inconsistent or confusing. UNSCORED: no animation.

Each finding must be exactly this structure:
{"id":N,"principle":"Name","verdict":"PASSES|FAILS|MIXED|UNSCORED","domain":"visceral","summary":"one direct sentence","detail":"2-4 sentences of specific observation about this interface","recommendation":"one specific implementable action or null"}
```

### BEHAVIORAL_PROMPT(url, preAudit)
```
Apply Drew Kinney's aesthetic-first UX framework (MFA Thesis, Miami IUA&D, 2009).
Audit the interface at ${url} for these 6 Behavioral principles.
Pre-audit context: ${JSON.stringify(preAudit)}

Return ONLY a JSON array of exactly 6 findings. No markdown. No prose.

PRINCIPLE 6 — Consistency / Similarity (id:6)
Same component same appearance everywhere? Every inconsistency intentional?
Type scale, CTA patterns, section transitions — locked or variable?
PASSES: system-wide. MIXED: core correct, sections break. FAILS: frequent unintentional inconsistency.

PRINCIPLE 7 — Efficiency of Use (id:7)
Count steps from landing to ${preAudit.conversionGoal}. Any unnecessary?
Decisions introduced at checkout that belong earlier? Defaults set to most common choice?
PASSES: minimum steps. MIXED: mostly efficient, specific steps add friction. FAILS: materially longer than needed.

PRINCIPLE 8 — Experience / Emotion (id:8)
Emotional arc sustained from landing through conversion?
Service/utility sections maintain emotional consistency with product sections?
PASSES: arc sustained. MIXED: strong entry, flat mid-flow. FAILS: transactional past the hero.

PRINCIPLE 9 — Figure / Ground (id:9)
Navigation recedes in reading mode? Content recedes when nav is active?
Mobile menu close re-establishes content ground cleanly?
PASSES: shifts cleanly all states. MIXED: desktop correct, mobile slips. FAILS: consistent competition.

PRINCIPLE 10 — Fitt's Law (id:10)
All touch targets minimum 44x44px? Competing CTAs sufficiently separated?
Primary action larger than secondary? Hand resting position considered?
PASSES: all high-frequency targets correct. MIXED: desktop correct, mobile issues. FAILS: multiple violations.

PRINCIPLE 11 — Hierarchy / Sequence (id:11)
One unambiguous dominant element per screen? Sequence leads to ${preAudit.conversionGoal}?
Primary CTA visually dominant over secondary actions?
PASSES: clear per screen, leads to goal. MIXED: top-level clear, interior loses sequence. FAILS: elements compete.

Same finding structure as above with correct ids 6-11.
```

### REFLECTIVE_PROMPT(url, preAudit)
```
Apply Drew Kinney's aesthetic-first UX framework (MFA Thesis, Miami IUA&D, 2009).
Audit the interface at ${url} for these 4 Reflective principles.
Pre-audit context: ${JSON.stringify(preAudit)}

Return ONLY a JSON array of exactly 4 findings. No markdown. No prose.

PRINCIPLE 12 — Learnable / Memorable (id:12)
User returning after 30 days navigates immediately? System distinctive enough to remember?
Consistent enough that each visit requires less effort?
PASSES: learnable one session, memorable. MIXED: functional but generic. FAILS: relearning required.

PRINCIPLE 13 — Mental Models (id:13)
Interface matches: ${preAudit.mentalModel}?
Where does it conflict? Are conflicts deliberate and supported?
Handoffs (shopping→support→account) maintain the model?
PASSES: model matched, conflicts intentional. MIXED: core matched, specific sections conflict. FAILS: frequent unexplained conflict.

PRINCIPLE 14 — Process Funnel (id:14)
Funnel narrows consistently to ${preAudit.conversionGoal}?
Decisions at conversion point that belong earlier? Supplementary content disrupts flow?
PASSES: consistent narrowing. MIXED: top-funnel correct, mid-funnel disruption. FAILS: widens at conversion.

PRINCIPLE 15 — You Are Not the User (id:15)
Evidence of user research? Patterns suggesting designer preference over user data?
What would 5 real users hesitate on?
PASSES: research-informed, no obvious overrides. MIXED: mostly research, one or two aesthetic wins. FAILS: designer preference dominant. UNSCORED: insufficient evidence.

Same finding structure with ids 12-15.
```

### POST_DESKTOP_PROMPT(url, preAudit)
```
Audit the interface at ${url} for post-desktop surface requirements.
Return ONLY a JSON array. No markdown. No prose.

Check each: tap target size (44x44px min hit area), tap target proximity (8px min gap),
hover state replacement (touch alternatives for all hover behaviors),
one-handed use (primary controls in lower 60% on mobile),
viewport shift (layout survives landscape/portrait rotation),
ambient light (contrast in direct sunlight).

Skip checks that genuinely don't apply. Mark them NOT APPLICABLE and exclude from output.

Each check: {"check":"name","surface":"mobile web|desktop|etc","verdict":"PASSES|FAILS|MIXED|NOT APPLICABLE","evidence":"specific observation","fix":"specific action or null"}
```

## React Artifact Structure

### Constants (top of file)
```javascript
const URL = "%%TARGET%%"  // Claude replaces %%TARGET%% with the actual url
const MODELS = [
  {id:"claude-sonnet-4-6", label:"Claude Sonnet 4.6", type:"anthropic"},
  {id:"claude-opus-4-6", label:"Claude Opus 4.6", type:"anthropic"},
  {id:"claude-haiku-4-5-20251001", label:"Claude Haiku 4.5", type:"anthropic"},
  {id:"gpt-4o", label:"GPT-4o", type:"external", url:"https://chat.openai.com"},
  {id:"gemini-2.5-pro", label:"Gemini 2.5 Pro", type:"external", url:"https://aistudio.google.com"},
  {id:"mistral-large", label:"Mistral Large", type:"external", url:"https://console.mistral.ai"}
]
```

### State
```javascript
const [preAudit, setPreAudit] = useState(null)
const [preAuditStatus, setPreAuditStatus] = useState('loading')
const [domains, setDomains] = useState({
  visceral:   {status:'idle', findings:[]},
  behavioral: {status:'idle', findings:[]},
  reflective: {status:'idle', findings:[]},
  postDesktop:{status:'idle', checks:[]}
})
const [screenshot, setScreenshot] = useState(null)
const [checked, setChecked] = useState(new Set())
const [activeTab, setActiveTab] = useState('findings')
const [model, setModel] = useState('claude-sonnet-4-6')
const [prompt, setPrompt] = useState('')
const [sending, setSending] = useState(false)
const [modelResponse, setModelResponse] = useState('')
```

### API Call Helper
```javascript
async function callClaude(systemPrompt, userMessage) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{role:'user', content: userMessage}]
    })
  })
  const data = await res.json()
  const text = data.content?.filter(b=>b.type==='text').map(b=>b.text).join('') || ''
  return text.replace(/```json|```/g,'').trim()
}
```

### Mount Sequence
```javascript
useEffect(() => {
  // Screenshot fires immediately, non-blocking
  captureScreenshot()

  // Pre-audit fires immediately
  runPreAudit()
}, [])

async function runPreAudit() {
  setPreAuditStatus('loading')
  const raw = await callClaude(
    'Return only valid JSON. No markdown. No prose.',
    PRE_AUDIT_PROMPT(URL)
  )
  const result = JSON.parse(raw)
  setPreAudit(result)
  setPreAuditStatus('done')
  // Fire all domains in parallel immediately after pre-audit
  runAllDomains(result)
}

async function runAllDomains(pa) {
  // All four fire simultaneously
  Promise.allSettled([
    runDomain('visceral',   VISCERAL_PROMPT(URL, pa),   'findings', 5),
    runDomain('behavioral', BEHAVIORAL_PROMPT(URL, pa), 'findings', 6),
    runDomain('reflective', REFLECTIVE_PROMPT(URL, pa), 'findings', 4),
    runPostDesktop(POST_DESKTOP_PROMPT(URL, pa))
  ])
}

async function runDomain(key, prompt, field, expectedCount) {
  setDomains(prev => ({...prev, [key]: {status:'loading', findings:[]}}))
  try {
    const raw = await callClaude('Return only valid JSON array. No markdown. No prose.', prompt)
    const findings = JSON.parse(raw)
    // Auto-check FAILS and MIXED as they arrive
    setChecked(prev => {
      const next = new Set(prev)
      findings.filter(f => f.verdict==='FAILS' || f.verdict==='MIXED')
              .forEach(f => next.add(f.id))
      return next
    })
    setDomains(prev => ({...prev, [key]: {status:'done', findings}}))
  } catch(e) {
    setDomains(prev => ({...prev, [key]: {status:'error', findings:[]}}))
  }
}
```

### Screenshot
```javascript
async function captureScreenshot() {
  try {
    const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent('https://'+URL)}&screenshot=true&meta=false&embed=screenshot.url`)
    const data = await res.json()
    if(data.data?.screenshot?.url) setScreenshot(data.data.screenshot.url)
  } catch {}
}
```

## Layout

HEADER
- Site URL (left) + live status indicator (pre-audit loading → done)
- Scorecard pills update in real time as domains complete: Visceral X/5 | Behavioral X/6 | Reflective X/4 | Total X/15

LEFT (60%) — Tab strip: Findings | Post-Desktop | Decisions | Validation
- FINDINGS: Visceral → Behavioral → Reflective sections
  Each section shows skeleton cards while loading, populates as domain resolves
  Each card: checkbox + principle name + verdict badge + summary + expand toggle
  Expanded: detail paragraph + amber recommendation block
  FAILS/MIXED auto-checked on arrival

- POST-DESKTOP: grid of check cards, populates as post-desktop call resolves

- DECISIONS: numbered list from all FAILS/MIXED recommendations, each checkable

- VALIDATION: single card with validation question, "Add to prompt" button

RIGHT (40%) — Always visible, always interactive
- Selection controls (select all failing / deselect all / count)
- Model dropdown
- Screenshot thumbnail (or loading state)
- Generate Prompt button (active once any findings exist)
- Prompt preview textarea
- Send button → direct API call (Anthropic) or clipboard+navigate (external)
- Response panel

## Skeleton Loading

While a domain is loading, show 3 skeleton cards with animated pulse.
Do not block the UI. Other domains may already be populated.
Skeleton uses the domain color (visceral=purple, behavioral=blue, reflective=green).

## Score Calculation

Scores update in real time as each domain resolves.
PASSES counts as 1. FAILS/MIXED/UNSCORED count as 0.
Total = sum of all PASSES across all domains.

---

## Progress Tracking

Every loading stage gets a simulated progress bar using `useSimProgress(status)` hook.

### Hook logic
- `status === 'loading'` → start setInterval at 350ms
- Increments: fast early (3–10% per tick below 40%), slow mid (1.5–5.5% below 70%), crawl late (0.5–2% approaching 88%)
- Hard cap at 88% — never reaches 100% while loading
- `status === 'done'` → snap to 100% via transition
- Cleanup: clearInterval on status change or unmount

### Visual layers

HEADER — overall progress bar (indigo gradient, 4px)
  Fills based on completed stage count (stagesDone/5 × 100%)

HEADER — stage breakdown row (5 bars, one per stage)
  Pre-audit: indigo | Visceral: purple | Behavioral: blue | Reflective: green | Post-desktop: amber
  Each shows its own simProgress percentage to the right of its label

DOMAIN SECTIONS — per-domain bar (2px, matches domain color)
  Sits between the domain header and the first finding card
  Shows live percentage during loading, fills to 100% on completion

SCREENSHOT PANEL — progress bar (2px, indigo) with percentage label
  Fires on mount, resolves when Microlink returns

### Transition
All bars use: `transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1)`
Smooth deceleration on each increment. Snaps instantly to 100% on done.
