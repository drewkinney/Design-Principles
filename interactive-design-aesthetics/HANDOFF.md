---
name: interactive-design-aesthetics/handoff
description: >
  Sub-skill of /interactive-design-aesthetics.
  Handles prompt assembly from checked findings, screenshot capture,
  and dispatch to Claude API or external model URLs.
  Called by DASHBOARD.md when building the action panel.
---

# Handoff Sub-Skill

## Purpose

Three jobs:
1. Assemble a correction prompt from selected audit findings
2. Capture a screenshot of the audited URL
3. Dispatch to the selected model

---

## 1. Prompt Assembly

When the user clicks "Generate Prompt", build this structure from checked findings:

```
You are a senior UI/UX designer. Below is an interactive design audit for [URL].
Review the flagged issues and provide specific, implementable corrections for each.

AUDITED URL: [url]
SCREENSHOT: [screenshotUrl or "See URL above"]

PRE-AUDIT CONTEXT:
- Lead emotion: [preAudit.emotion]
- User mental model: [preAudit.mentalModel]  
- Conversion goal: [preAudit.conversionGoal]
- Actual user: [preAudit.actualUser]

FLAGGED ISSUES ([N] selected):

[For each checked finding:]
---
PRINCIPLE: [principle] ([domain] domain)
VERDICT: [verdict]
FINDING: [detail]
RECOMMENDATION: [recommendation]
---

SPECIFIC DECISIONS ALREADY IDENTIFIED:
[specificDecisions as numbered list]

VALIDATION QUESTION: [validationQuestion]

For each flagged issue above, provide:
1. Root cause (one sentence)
2. Specific fix with implementation detail (CSS, copy, layout — whatever applies)
3. Success metric — how to verify the fix worked

Format your response as structured sections matching the flagged issues.
Do not re-audit the whole site. Focus only on the flagged items.
```

---

## 2. Screenshot Capture

Use Microlink API (free, no key required):

```javascript
async function captureScreenshot(url) {
  const endpoint = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
  try {
    const res = await fetch(endpoint)
    const data = await res.json()
    return data.data?.screenshot?.url || null
  } catch {
    return null
  }
}
```

Call this on component mount with the audit URL.
Populate the screenshot field in the right panel.
If it fails, show "Screenshot unavailable — URL will be passed to model" and continue.
The screenshot URL is embedded in the prompt text when available.

When sending to an Anthropic model: pass the screenshot as a base64 image block
in the API call's messages array (fetch the image, convert to base64, add as image content).
This gives the model direct visual context.

```javascript
// Fetch screenshot and convert for API
async function getScreenshotBase64(screenshotUrl) {
  const res = await fetch(screenshotUrl)
  const blob = await res.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result.split(',')[1])
    reader.readAsDataURL(blob)
  })
}
```

---

## 3. Model Dispatch

### Anthropic Models (direct API call)

```javascript
async function sendToAnthropic(modelId, prompt, screenshotBase64) {
  const messages = []

  // Build content array — include screenshot if available
  const userContent = []
  if (screenshotBase64) {
    userContent.push({
      type: 'image',
      source: { type: 'base64', media_type: 'image/png', data: screenshotBase64 }
    })
  }
  userContent.push({ type: 'text', text: prompt })

  messages.push({ role: 'user', content: userContent })

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: modelId,
      max_tokens: 1000,
      messages
    })
  })

  const data = await response.json()
  return data.content?.filter(b => b.type === 'text').map(b => b.text).join('\n') || ''
}
```

Display the response in an expandable results pane below the findings list.
Stream if possible. If streaming is unavailable, show a loading spinner and render on complete.

### External Models (clipboard + navigate)

```javascript
async function sendToExternal(modelUrl, prompt) {
  await navigator.clipboard.writeText(prompt)
  window.open(modelUrl, '_blank')
  // Show toast: "Prompt copied to clipboard. Paste it into the model."
}
```

---

## 4. Error Handling

API errors: show inline in right panel with error message + "Retry" button.
Screenshot errors: silent fallback — continue without screenshot, log to console.
Clipboard errors: fall back to showing prompt in a selectable textarea with "Copy" button.

---

## 5. Claude Code Handoff (optional future path)

If the user selects "Claude Code" as target (add this as a future option):
- Generate the prompt as a markdown file
- Present it as a downloadable .md
- Show instructions: "Run claude in your project directory and paste this prompt."

This path is for when the audit targets a codebase rather than a live URL.
