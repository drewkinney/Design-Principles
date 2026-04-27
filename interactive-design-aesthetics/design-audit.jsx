import { useState, useEffect } from "react";

// ─── MODELS ───────────────────────────────────────────────────────────────────

const MODELS = [
  { id: "claude",     label: "Claude SVG",      note: "auto-generated", url: null },
  { id: "nanoBanana", label: "Nano Banana Pro",  note: "AI Studio",      url: "https://aistudio.google.com/prompts/new_chat" },
  { id: "gpt4o",      label: "GPT-4o",           note: "ChatGPT",        url: "https://chat.openai.com" },
  { id: "dalle",      label: "DALL·E 3",         note: "OpenAI Labs",    url: "https://labs.openai.com" },
  { id: "midjourney", label: "Midjourney",       note: "midjourney.com", url: "https://www.midjourney.com" },
  { id: "ideogram",   label: "Ideogram",         note: "ideogram.ai",    url: "https://ideogram.ai" },
  { id: "sdxl",       label: "Stable Diffusion", note: "Replicate",      url: "https://replicate.com/stability-ai/sdxl" },
];

function buildPrompt(audit, modelId) {
  const t = audit?.target || "interface";
  const v = (audit?.violations || []).slice(0, 2).map(x => x.fix).join("; ");
  const s = (audit?.strengths || []).slice(0, 2).join(", ");
  switch (modelId) {
    case "nanoBanana":  return `High-fidelity ${t} UI redesign. ${v}. Dark background #0D0D0D, accent #FF3D00, surface #161616. Desktop layout: sidebar nav, main content area, key components. Accurate text rendering. 4K output.`;
    case "gpt4o":       return `Design a high-fidelity UI mockup for a redesigned ${t}. Apply: ${v}. Dark theme (#0D0D0D background, #FF3D00 accent). Realistic desktop view with nav, content, and components. Professional product design quality.`;
    case "dalle":       return `Photorealistic UI design mockup of ${t} redesigned interface. ${v}. Dark mode, red accent. Clean modern interface design. Desktop screen view. High resolution product mockup.`;
    case "midjourney":  return `${t} app interface redesign, ${v}, dark UI #0D0D0D, red accent #FF3D00, clean minimal product design, desktop mockup, high fidelity --ar 16:9 --style raw --v 6.1 --q 2`;
    case "ideogram":    return `${t} interface redesign. ${v}. Dark theme with red accent. Clean modern UI. Sharp typography. Desktop view. Professional product mockup.`;
    case "sdxl":        return `${t} interface redesign, dark UI, red accent, modern minimal design, desktop screenshot, ${v}, photorealistic, 8k`;
    default:            return `${t} redesign. Fix: ${v}. Retain: ${s}.`;
  }
}

function buildMarkdown(audit, target, svgMarkup, model) {
  if (!audit) return "";
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const selectedModel = MODELS.find(m => m.id === model) || MODELS[0];
  const prompt = buildPrompt(audit, model);

  const scoreRow = (d) => `| ${d.charAt(0).toUpperCase() + d.slice(1)} | ${audit[d]?.score ?? "—"}/10 | ${audit[d]?.verdict || ""} |`;
  const sevLabel = { high: "🔴 HIGH", medium: "🟡 MEDIUM", low: "🟢 LOW" };

  return `# Interactive Design Audit: ${audit.target || target}
*Kinney Aesthetic-First Framework · MFA Thesis, Miami International University of Art & Design, 2009*
*Generated: ${date}*

---

## Affect Domain Scores

| Domain | Score | Verdict |
|--------|-------|---------|
${scoreRow("visceral")}
${scoreRow("behavioral")}
${scoreRow("reflective")}
| **Overall** | **${audit.overall ?? "—"}/10** | |

---

## Violations

${(audit.violations || []).map(v => `### ${v.principle} — ${(sevLabel[v.severity] || v.severity || "").toUpperCase()}

**Finding:** ${v.finding}

**Fix:** → ${v.fix}
`).join("\n")}
---

## Strengths

${(audit.strengths || []).map(s => `- ${s}`).join("\n")}

---

## Validate Before Building

> ${audit.validationQuestion || ""}

---

## Image Prompt — ${selectedModel.label}

\`\`\`
${prompt}
\`\`\`

${selectedModel.url ? `Run at: ${selectedModel.url}` : "Claude SVG generated automatically — see artifact."}

---

## SVG Mockup (Claude-Generated)

\`\`\`svg
${svgMarkup || "(not generated)"}
\`\`\`

---

*KINNEY / INTERACTIVE DESIGN AUDIT*
*15 Principles · 3 Affect Domains · Aesthetic-First*
`;
}

// ─── PROMPTS ──────────────────────────────────────────────────────────────────

const AUDIT_SYSTEM = `Expert interactive design auditor. Drew Kinney Aesthetic-First Framework. Norman's 3 affect domains: Visceral (first contact), Behavioral (usability), Reflective (loyalty).

15 principles: Aesthetic Effect, Affordance, Proximity/Chunking, Color & Psychology, Common Fate, Consistency/Similarity, Efficiency of Use, Experience/Emotion, Figure/Ground, Fitt's Law, Hierarchy/Sequence, Learnable/Memorable, Mental Models, Process Funnel, You Are Not the User.

Return ONLY compact JSON. No markdown. No extra text. ALL strings SHORT.
Max 3 violations. Max 4 strengths. severity: high/medium/low only.

{"target":"Name","visceral":{"score":8,"verdict":"6 words max"},"behavioral":{"score":6,"verdict":"6 words max"},"reflective":{"score":9,"verdict":"6 words max"},"overall":8,"violations":[{"principle":"Name","severity":"high","finding":"12 words max","fix":"12 words max"}],"strengths":["Name"],"validationQuestion":"10 words max"}`;

const SVG_SYSTEM = `Generate a compact SVG UI mockup (viewBox="0 0 800 480"). Show a redesigned interface applying the fixes given. Rules: use only rect, text, line, circle — no path, no gradient, no clipPath. Colors: bg #0D0D0D, surface #161616, border #242424, text #F0EBE0, muted #666, accent #FF3D00, green #00E5A0. Include: top bar, left sidebar (160px), main content with 2-3 realistic components. Max 48 elements. Realistic labels (no lorem ipsum). Return ONLY the raw SVG element starting with <svg. No XML declaration. No explanation.`;

const PROTOTYPE_SYSTEM = `Generate a minimal self-contained HTML redesign concept. Inline CSS only, no JS. Show one key screen. Realistic content. Dark theme #0D0D0D bg, #FF3D00 accent. Professional. HARD LIMIT: under 60 lines. Return ONLY raw HTML, no fences.`;

// ─── API ──────────────────────────────────────────────────────────────────────

async function callClaude(messages, system) {
  let raw = "";
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system, messages }),
    });
    raw = await res.text();
    const data = JSON.parse(raw);
    if (data.error) throw new Error(typeof data.error === "string" ? data.error : (data.error.message || JSON.stringify(data.error)));
    if (!data.content) throw new Error("No content: " + raw.slice(0, 150));
    return data.content.filter(b => b.type === "text").map(b => b.text).join("");
  } catch (e) {
    throw new Error(e.message + (raw && !e.message.includes("No content") ? " | raw: " + raw.slice(0, 100) : ""));
  }
}

// ─── UTILS ────────────────────────────────────────────────────────────────────

const sc   = s => (!s && s !== 0 ? "#444" : s >= 8 ? "#00E5A0" : s >= 6 ? "#FFD600" : "#FF3D00");
const SEV  = { high: "#FF3D00", medium: "#FFD600", low: "#00E5A0" };
const STEPS  = ["Auditing 15 principles...", "Generating SVG mockup...", "Building prototype..."];
const SLABS  = ["AUDIT", "SVG", "BUILD"];

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [phase, setPhase]       = useState("input");
  const [target, setTarget]     = useState("linear.app");
  const [step, setStep]         = useState(0);
  const [pct, setPct]           = useState(0);
  const [audit, setAudit]       = useState(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [proto, setProto]       = useState("");
  const [err, setErr]           = useState("");
  const [model, setModel]       = useState("claude");
  const [copied, setCopied]     = useState(false);
  const [mdCopied, setMdCopied] = useState(false);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');`;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    const ceil = [30, 65, 95][step] ?? 95;
    const id = setInterval(() => setPct(p => { if (p >= ceil) { clearInterval(id); return p; } return p + 1; }), 60);
    return () => clearInterval(id);
  }, [phase, step]);

  async function run() {
    if (!target.trim()) return;
    setErr(""); setPhase("loading"); setPct(0); setStep(0);
    setAudit(null); setSvgMarkup(""); setProto("");
    try {
      // 1. AUDIT
      setStep(0);
      const rawAudit = await callClaude(
        [{ role: "user", content: `Audit: "${target}". Critical and specific. Compact JSON only.` }],
        AUDIT_SYSTEM
      );
      let parsed;
      try { parsed = JSON.parse(rawAudit.replace(/```json|```/g, "").trim()); }
      catch { const m = rawAudit.match(/\{[\s\S]*\}/); if (m) parsed = JSON.parse(m[0]); else throw new Error("JSON parse failed: " + rawAudit.slice(0, 200)); }
      setAudit(parsed); setPct(33);

      // 2. SVG
      setStep(1);
      const vSummary = (parsed.violations || []).map(v => `${v.principle}: ${v.fix}`).join("; ");
      const svg = await callClaude(
        [{ role: "user", content: `Redesign ${parsed.target} UI. Apply: ${vSummary}. Return compact SVG only.` }],
        SVG_SYSTEM
      );
      setSvgMarkup(svg.replace(/```svg|```xml|```/g, "").trim()); setPct(66);

      // 3. PROTOTYPE
      const fix = (parsed.violations || [])[0]?.fix || "improve hierarchy and affordance";
      const html = await callClaude(
        [{ role: "user", content: `Redesigned ${parsed.target} UI. Key fix: ${fix}. Dark #0D0D0D bg, #FF3D00 accent. Realistic content.` }],
        PROTOTYPE_SYSTEM
      );
      setProto(html.replace(/```html|```/g, "").trim());
      setPct(100);
      setTimeout(() => setPhase("done"), 250);
    } catch (e) { setErr(e.message); setPhase("input"); }
  }

  function copyPrompt() {
    if (!audit) return;
    navigator.clipboard.writeText(buildPrompt(audit, model)).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  function downloadMarkdown() {
    const md = buildMarkdown(audit, target, svgMarkup, model);
    const blob = new Blob([md], { type: "text/markdown" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `audit-${(audit?.target || target).toLowerCase().replace(/[^a-z0-9]/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyMarkdown() {
    const md = buildMarkdown(audit, target, svgMarkup, model);
    navigator.clipboard.writeText(md).then(() => { setMdCopied(true); setTimeout(() => setMdCopied(false), 2000); });
  }

  const selectedModel = MODELS.find(m => m.id === model) || MODELS[0];
  const promptText    = audit ? buildPrompt(audit, model) : "";

  // INPUT
  if (phase === "input") return (
    <div style={ROOT}>
      <Bar />
      <div style={CTR}>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 50, lineHeight: 1.05, textAlign: "center", marginBottom: 8, maxWidth: 540 }}>What are we auditing?</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#444", marginBottom: 44 }}>URL · APP NAME · INTERFACE DESCRIPTION</div>
        <div style={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
          <input value={target} onChange={e => setTarget(e.target.value)} onKeyDown={e => e.key === "Enter" && run()} placeholder="linear.app · apple.com · any UI..." style={INP} />
          {err && <div style={{ fontSize: 11, color: "#FF3D00", padding: "10px 14px", background: "#FF3D0009", border: "1px solid #FF3D0022", lineHeight: 1.65, wordBreak: "break-all" }}>{err}</div>}
          <button onClick={run} style={BTN}
            onMouseEnter={e => { e.currentTarget.style.background="#FF3D00"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#F0EBE0"; e.currentTarget.style.color="#0A0A0A"; }}>
            RUN AUDIT →
          </button>
        </div>
        <div style={{ marginTop: 24, fontSize: 9, color: "#1A1A1A", letterSpacing: 2 }}>AUDIT · SVG MOCKUP · PROTOTYPE · MARKDOWN EXPORT</div>
      </div>
    </div>
  );

  // LOADING
  if (phase === "loading") return (
    <div style={ROOT}>
      <Bar />
      <div style={CTR}>
        <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, textAlign: "center", maxWidth: 400, marginBottom: 28 }}>{STEPS[step]}</div>
        <div style={{ width: 380, position: "relative", marginBottom: 18 }}>
          <div style={{ width: "100%", height: 1, background: "#1A1A1A" }} />
          <div style={{ position: "absolute", top: 0, left: 0, height: 1, background: "#FF3D00", width: `${pct}%`, transition: "width 0.4s ease" }} />
          <div style={{ position: "absolute", top: -4, left: `${pct}%`, width: 2, height: 9, background: "#FF3D00", transform: "translateX(-50%)", transition: "left 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {SLABS.map((l, i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: i < step ? "#00E5A0" : i === step ? "#FF3D00" : "#1A1A1A", transition: "background 0.3s" }} />
              <div style={{ fontSize: 8, letterSpacing: 1.5, color: i <= step ? "#555" : "#1E1E1E" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 10, color: "#2A2A2A", letterSpacing: 3 }}>{pct}%</div>
      </div>
    </div>
  );

  // DONE
  if (phase === "done" && audit) return (
    <div style={{ fontFamily: "'JetBrains Mono',monospace", background: "#0A0A0A", color: "#F0EBE0" }}>
      <Bar right={
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={copyMarkdown} style={{ ...GHOST_BTN, color: mdCopied ? "#00E5A0" : "#555" }}
            onMouseEnter={e => e.currentTarget.style.color="#F0EBE0"} onMouseLeave={e => e.currentTarget.style.color=mdCopied?"#00E5A0":"#555"}>
            {mdCopied ? "MD COPIED ✓" : "COPY MD"}
          </button>
          <button onClick={downloadMarkdown} style={{ ...GHOST_BTN }}
            onMouseEnter={e => e.currentTarget.style.color="#F0EBE0"} onMouseLeave={e => e.currentTarget.style.color="#555"}>
            ↓ REPORT.MD
          </button>
          <button onClick={() => setPhase("input")} style={{ ...GHOST_BTN }}
            onMouseEnter={e => e.currentTarget.style.color="#F0EBE0"} onMouseLeave={e => e.currentTarget.style.color="#555"}>
            NEW AUDIT
          </button>
        </div>
      } />

      {/* TWO-PANEL */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "70vh", borderBottom: "1px solid #141414" }}>

        {/* LEFT: Report */}
        <div style={{ borderRight: "1px solid #141414", padding: 28, overflowY: "auto", height: "100%", boxSizing: "border-box" }}>
          <div style={LBL}>AUDIT REPORT</div>
          <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, lineHeight: 1.1, marginBottom: 22 }}>{audit.target || target}</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
            {["visceral","behavioral","reflective"].map(d => (
              <div key={d} style={{ background: "#0D0D0D", padding: "13px 11px", borderTop: `2px solid ${sc(audit[d]?.score)}` }}>
                <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 8, letterSpacing: 3, color: "#444", marginBottom: 4 }}>{d.toUpperCase()}</div>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 34, color: sc(audit[d]?.score), lineHeight: 1 }}>{audit[d]?.score ?? "—"}</div>
                <div style={{ fontSize: 9, color: "#666", marginTop: 4, lineHeight: 1.4 }}>{audit[d]?.verdict}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 8, paddingBottom: 16, borderBottom: "1px solid #141414", marginBottom: 18 }}>
            <div style={LBL}>OVERALL</div>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: 50, color: sc(audit.overall), lineHeight: 1 }}>{audit.overall}</div>
            <div style={{ fontSize: 10, color: "#444" }}>/10</div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={LBL}>VIOLATIONS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
              {(audit.violations||[]).map((v, i) => (
                <div key={i} style={{ borderLeft: `2px solid ${SEV[v.severity]||"#555"}`, paddingLeft: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 11, letterSpacing: 2 }}>{v.principle}</div>
                    <div style={{ fontSize: 8, letterSpacing: 1.5, color: SEV[v.severity]||"#555", padding: "2px 6px", border: `1px solid ${SEV[v.severity]||"#555"}30`, background: `${SEV[v.severity]||"#555"}0D` }}>{(v.severity||"").toUpperCase()}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#999", lineHeight: 1.6, marginBottom: 4 }}>{v.finding}</div>
                  <div style={{ fontSize: 10, color: "#00E5A0", fontStyle: "italic" }}>→ {v.fix}</div>
                </div>
              ))}
            </div>
          </div>

          {(audit.strengths||[]).length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={LBL}>STRENGTHS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                {audit.strengths.map((s, i) => <div key={i} style={{ fontSize: 9, letterSpacing: 1.5, color: "#00E5A0", padding: "3px 9px", border: "1px solid #00E5A018", background: "#00E5A008" }}>{s.toUpperCase()}</div>)}
              </div>
            </div>
          )}

          {audit.validationQuestion && (
            <div style={{ borderTop: "1px solid #141414", paddingTop: 14 }}>
              <div style={LBL}>VALIDATE FIRST</div>
              <div style={{ fontSize: 11, color: "#777", lineHeight: 1.7, marginTop: 6, fontStyle: "italic" }}>"{audit.validationQuestion}"</div>
            </div>
          )}
        </div>

        {/* RIGHT: Model selector + SVG + Prompt */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

          {/* Model selector */}
          <div style={{ padding: "14px 20px 12px", borderBottom: "1px solid #141414", background: "#080808", flexShrink: 0 }}>
            <div style={LBL}>IMAGE MODEL</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {MODELS.map(m => (
                <button key={m.id} onClick={() => setModel(m.id)} style={{
                  fontFamily: "'Bebas Neue',cursive", fontSize: 10, letterSpacing: 2,
                  padding: "4px 10px", border: "1px solid",
                  borderColor: model === m.id ? "#FF3D00" : "#1E1E1E",
                  background: model === m.id ? "#FF3D0018" : "transparent",
                  color: model === m.id ? "#FF3D00" : "#555",
                  cursor: "pointer", transition: "all 0.12s",
                }}>
                  {m.label}
                  {m.id === "claude" && <span style={{ fontSize: 7, marginLeft: 4, color: "#00E5A0" }}>AUTO</span>}
                </button>
              ))}
            </div>
          </div>

          {/* SVG mockup */}
          <div style={{ padding: "14px 20px 0", background: "#0A0A0A", flexShrink: 0 }}>
            <div style={LBL}>CLAUDE SVG MOCKUP</div>
            {svgMarkup
              ? <div style={{ border: "1px solid #141414", background: "#0D0D0D", overflow: "hidden", lineHeight: 0 }}
                  dangerouslySetInnerHTML={{ __html: svgMarkup.includes("<svg") ? svgMarkup.replace(/<svg/, '<svg style="width:100%;height:auto;display:block"') : `<div style="padding:12px;color:#555;font-size:10px">SVG render error</div>` }}
                />
              : <div style={{ height: 100, background: "#0D0D0D", border: "1px solid #141414", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 9, color: "#2A2A2A", letterSpacing: 2 }}>NOT GENERATED</div>
                </div>
            }
          </div>

          {/* Prompt + copy */}
          <div style={{ flex: 1, padding: "12px 20px 14px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={LBL}>{selectedModel.label.toUpperCase()} PROMPT</div>
              {selectedModel.id === "claude"
                ? <div style={{ fontSize: 8, color: "#00E5A0", letterSpacing: 2 }}>SVG IS LIVE OUTPUT</div>
                : selectedModel.url && <a href={selectedModel.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 8, letterSpacing: 2, color: "#FFD600", textDecoration: "none" }}>OPEN {selectedModel.note.toUpperCase()} ↗</a>
              }
            </div>
            <div style={{ background: "#0D0D0D", border: "1px solid #141414", padding: "10px 12px", flex: 1, overflowY: "auto" }}>
              <div style={{ fontSize: 10, color: "#999", lineHeight: 1.8, fontStyle: "italic" }}>{promptText}</div>
            </div>
            <button onClick={copyPrompt} style={{
              background: copied ? "#00E5A0" : "#141414", color: copied ? "#0A0A0A" : "#666",
              border: "1px solid #1E1E1E", padding: "8px 20px",
              fontFamily: "'Bebas Neue',cursive", fontSize: 11, letterSpacing: 3,
              cursor: "pointer", transition: "all 0.15s", width: "100%"
            }}>{copied ? "COPIED ✓" : `COPY ${selectedModel.label.toUpperCase()} PROMPT`}</button>
            {selectedModel.id !== "claude" && (
              <div style={{ fontSize: 8, color: "#2A2A2A", letterSpacing: 1, textAlign: "center" }}>artifact CSP blocks direct API calls — paste prompt externally</div>
            )}
          </div>
        </div>
      </div>

      {/* PROTOTYPE */}
      <div style={{ borderTop: "1px solid #141414" }}>
        <div style={{ padding: "11px 28px", borderBottom: "1px solid #0D0D0D", display: "flex", alignItems: "center", gap: 14, background: "#080808" }}>
          <div style={LBL}>LIVE PROTOTYPE</div>
          <div style={{ flex: 1, height: 1, background: "#141414" }} />
          <div style={{ fontSize: 9, color: "#1E1E1E", letterSpacing: 1.5 }}>SANDBOXED · CLAUDE-GENERATED</div>
        </div>
        <iframe srcDoc={proto} style={{ width: "100%", height: "68vh", border: "none", display: "block" }} title="Prototype" sandbox="allow-scripts" />
      </div>
    </div>
  );

  return null;
}

function Bar({ right }) {
  return (
    <div style={{ borderBottom: "1px solid #141414", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#080808" }}>
      <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 16, letterSpacing: 5 }}>KINNEY / INTERACTIVE DESIGN AUDIT</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 9, color: "#2A2A2A", letterSpacing: 2 }}>15 PRINCIPLES · 3 AFFECT DOMAINS</div>
        {right}
      </div>
    </div>
  );
}

const ROOT      = { fontFamily: "'JetBrains Mono',monospace", background: "#0A0A0A", minHeight: "100vh", color: "#F0EBE0" };
const CTR       = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 49px)", padding: 40 };
const INP       = { background: "#111", border: "1px solid #1E1E1E", color: "#F0EBE0", padding: "14px 18px", fontSize: 13, fontFamily: "'JetBrains Mono',monospace", outline: "none", width: "100%", boxSizing: "border-box" };
const BTN       = { background: "#F0EBE0", color: "#0A0A0A", border: "none", padding: "15px 32px", fontFamily: "'Bebas Neue',cursive", fontSize: 18, letterSpacing: 5, cursor: "pointer", transition: "background 0.12s,color 0.12s", width: "100%" };
const LBL       = { fontFamily: "'Bebas Neue',cursive", fontSize: 10, letterSpacing: 4, color: "#444", marginBottom: 6 };
const GHOST_BTN = { fontSize: 9, letterSpacing: 2, color: "#555", background: "none", border: "1px solid #1A1A1A", padding: "6px 14px", cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", transition: "color 0.12s" };
