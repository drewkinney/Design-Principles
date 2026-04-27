# Design Principles

The desktop metaphor died. Design kept decorating its corpse. Touch, spatial, ambient, worn — each new surface arrived without a design logic. Engineers filled the gap. They still do. Aesthetic judgment isn't window dressing. It's the only lever designers own. Use it or lose the seat.

---

## /interactive-design-aesthetics

A Claude skill that audits any website, app, or interface against Drew Kinney's aesthetic-first interactive design framework — derived from his 2009 MFA thesis at Miami International University of Art & Design — and delivers findings as a self-running interactive dashboard. The dashboard conducts its own audit via parallel API calls. Claude renders the shell immediately. No waiting for a text report.

### What it does

Point it at a URL. The dashboard renders instantly and fires its own structured audit — pre-audit context first, then five parallel API calls covering all 15 design principles across Norman's three affect domains (Visceral, Behavioral, Reflective) plus post-desktop surface checks. Each domain populates in real time as its call resolves. FAILS and MIXED findings auto-check on arrival. Simulated progress bars across all stages give live visual feedback throughout.

When the audit completes: select the issues you want corrected, choose a target model, and generate a redesign prompt. The prompt instructs the model to use the live screenshot of the audited site and produce specific visual redesigns — not a list of problems, but implementation-ready corrections with CSS, layout, copy, and component detail. Anthropic models receive the screenshot as an image block. External models get the prompt copied to the clipboard and the model URL opened in a new tab.

Download the full audit as Markdown or a Word-compatible document from the header. Export at any point during or after the audit.

### What's included

```
interactive-design-aesthetics/
├── SKILL.md          Orchestrator — extracts URL, renders artifact immediately.
│                     All audit logic runs inside the artifact, not here.
├── PRE-AUDIT.md      Four framing questions: lead emotion, mental model,
│                     conversion goal, actual user. Runs first, sequential.
├── VISCERAL.md       Principles 1–5 audit spec and scoring rubric.
├── BEHAVIORAL.md     Principles 6–11 audit spec and scoring rubric.
├── REFLECTIVE.md     Principles 12–15 audit spec and scoring rubric.
├── POST-DESKTOP.md   Touch/spatial checks: tap targets, hover replacement,
│                     one-handed use, viewport shift, ambient light.
├── DASHBOARD.md      Self-running React artifact spec. Embeds all audit prompts.
│                     Parallel API calls, progress bars, popup modals,
│                     download engine, redesign prompt builder.
└── HANDOFF.md        Prompt assembly, Microlink screenshot capture,
                      Anthropic API dispatch with image block,
                      external model clipboard + navigate fallback.
```

**SKILL.md** is a two-step orchestrator: extract the target URL, render the artifact. That is all. The artifact runs the audit itself.

**PRE-AUDIT.md, VISCERAL.md, BEHAVIORAL.md, REFLECTIVE.md, POST-DESKTOP.md** define the audit logic and scoring rubric for each domain. Their prompt content is embedded directly in the artifact as constants so the dashboard can fire its own API calls without Claude's involvement.

**DASHBOARD.md** specifies the full self-running React artifact: parallel API calls via Promise.allSettled, domain-by-domain state population, simulated progress bars using a useSimProgress hook (fast early, crawls near 88%, snaps to 100% on resolution), auto-checked findings, a Generate Prompt popup with per-model format switching, and a Download modal with Markdown and Word export.

**HANDOFF.md** defines prompt assembly, screenshot capture via Microlink (free, no key), and model dispatch logic.

### Execution flow

```
Trigger → SKILL.md extracts URL → artifact renders immediately
  ↓
Screenshot capture fires (Microlink, parallel, non-blocking)
  ↓
PRE-AUDIT API call fires (sequential — results frame everything else)
  ↓
VISCERAL + BEHAVIORAL + REFLECTIVE + POST-DESKTOP fire simultaneously
  ↓
Each domain populates as its call resolves — no waiting for others
FAILS and MIXED auto-checked on arrival
Progress bars update live across all five stages
  ↓
Audit complete — Download Report button activates in header
  ↓
Select issues → Generate Prompt → popup opens
  ↓
Choose model format (Claude / GPT-4o / Gemini / Mistral)
Copy prompt or send directly to Anthropic models with screenshot attached
```

### Model options

| Model | Type | Prompt format | Default |
|---|---|---|---|
| Claude Sonnet 4.6 | Anthropic direct API | Structured markdown + image block | Yes |
| Claude Opus 4.6 | Anthropic direct API | Structured markdown + image block | |
| Claude Haiku 4.5 | Anthropic direct API | Structured markdown + image block | |
| GPT-4o | Clipboard + openai.com | Explicit image reference | |
| Gemini 2.5 Pro | Clipboard + aistudio.google.com | Visual analysis framing | |
| Mistral Large | Clipboard + console.mistral.ai | Text only (no vision) | |

### The 15 principles

Grouped by Norman affect domain:

**Visceral** — Aesthetic Effect, Affordance, Proximity/Chunking, Color & Psychology, Common Fate

**Behavioral** — Consistency/Similarity, Efficiency of Use, Experience/Emotion, Figure/Ground, Fitt's Law, Hierarchy/Sequence

**Reflective** — Learnable/Memorable, Mental Models, Process Funnel, You Are Not the User

Each scored PASSES / FAILS / MIXED / UNSCORED with a one-line summary, a 2–4 sentence finding, and a specific implementable recommendation when the verdict is not PASSES.

---

## How to use it

### Install the skill in Claude

Claude skills live at `/mnt/skills/user/` in Claude's container environment. To install:

1. Clone this repo
2. Copy the `interactive-design-aesthetics/` directory into `/mnt/skills/user/`

```
cp -r interactive-design-aesthetics /mnt/skills/user/
```

Claude reads skill directories on load. The `SKILL.md` description field tells Claude when to trigger the skill automatically.

### Trigger it in conversation

```
/interactive-design-aesthetics apple.com
/interactive-design-aesthetics our checkout flow on mobile
/interactive-design-aesthetics [paste a description of the interface]
```

The artifact renders immediately. The audit runs inside it. No waiting.

### Use the dashboard

1. Watch the audit populate domain by domain — progress bars track each stage
2. Expand any finding to read the detail and recommendation
3. FAILS and MIXED are pre-checked — adjust selection as needed
4. Use **Select all failing** or **Clear** in the action panel
5. Choose your target model from the dropdown
6. Click **Generate prompt** — a popup opens with the redesign prompt
7. Switch prompt format to match your target model if sending externally
8. Copy the prompt or click **Send** — Anthropic models receive the screenshot; external models get clipboard + browser
9. Click **Download report** in the header to export as Markdown or Word

---

## Framework sources

Kinney, Drew. *Interactive Design Beyond the Desktop: User Experience Defined by Aesthetics.* MFA Thesis, Miami International University of Art & Design, 2009.

---

*Amazon.com.* Screenshot, 15 Mar 2009. Amazon.com, Inc. 15 Mar 2009 <http://amazon.com>

Arnheim, Rudolph. *Art and Visual Perception: A Psychology of the Creative Eye: The New Version.* Berkeley: University of California Press, 1974.

*Art of the Twentieth Century: 1900–1919 The Avant-garde Movements.* Milano: Skira, 2006.

Baer, Kim. *Information Design Workbook: Graphic Approaches, Solutions, and Inspiration + 30 Case Studies.* Beverly: Rockport Publishers, 2008.

Baggerman, Lisa. *Design for Interaction: User Friendly Graphics.* Glouchester: Rockport Publishers, 2000.

Bertelsen, Olav W and Marianne G. Petersen, Søren Pold (Eds.). "Aesthetic Approaches to Human-Computer Interaction: Proceedings of the NordiCHI 2004 Workshop." *The Department of Computer Science, DAIMI.* 24 Oct 2004. 13 Nov 2008 <http://www.daimi.au.dk/publications/PB/572/PB-572.pdf>

Blundel, Barry G. and Adam Schwartz. *Creative 3-D Display and Interaction Interfaces: A Trans-Disciplinary Approach.* John Wiley & Sons, Hoboken, 2006.

Bodker, Mads. "Position Paper for the Aesthetic HCI Workshop." *Aesthetic Approaches to Human-Computer Interaction: Proceedings of the NordiCHI 2004 Workshop, The Department of Computer Science, DAIMI,* 24 Oct 2004. 13 Nov 2008 <http://www.daimi.au.dk/publications/PB/572/PB-572.pdf>

Bosman, Jos. *Bernard Tschumi: Architecture In/Of Motion.* Rotterdam: NAi Publishers, 1997.

Brinck, Tom and Darren Giggle, Scott D. Wood. *Usability for the Web: Designing Web Sites that Work.* San Diego: Academic Press, 2002.

Bruinsma, Max. *Deep Sites: Intelligent Innovation in Contemporary Web Design.* New York: Thames & Hudson, 2003.

Ching, Francis D.K. *Architecture: Form, Space and Order.* New York: John Wiley & Sons, Inc., 1996.

Christensen, Martin Sønderlev. "Introducing Excitability." *Aesthetic Approaches to Human-Computer Interaction: Proceedings of the NordiCHI 2004 Workshop, The Department of Computer Science, DAIMI,* 24 Oct 2004. 13 Nov 2008 <http://www.daimi.au.dk/publications/PB/572/PB-572.pdf>

Cooper, Alan and Robert Reinmann, David Cronin. *About Face 3: The Essentials of Interaction Design.* Indianapolis: Wiley Publishing, 2007.

Crawford, Chris. *The Art of Interactive Design.* San Francisco: No Starch Press, 2003.

Curtis, Hillman. *MTIV Process, Inspiration and Practice for the New Media Designer.* Indianapolis: New Riders, 2002.

Dawes, Brendan. *Analog In, Digital Out: Brendan Dawes on Interaction Design.* Berkeley: New Riders, 2007.

Eames, Charles and Ray Eames, dir. "The Powers of 10." 1977. *YouTube,* 12 Sep 2008 <http://www.youtube.com/watch?v=A2cmlhfdxuY>

Easley, Charles. "Perception: The Niger Project." 3 Aug 2008. *Introduction to Scripting Languages.* The Art Institute of Charlotte, Charlotte.

Glaser, Milton and Mirko Ilic. *The Design of Dissent.* Glouchester: Rockport Publishers, 2005.

Goto, Kelly and Emily Cotler. *Web ReDesign 2.0: Workflow that Works.* New York: Peach Pit Press, 2004.

Gray, Jeremy R. and Todd S. Braver, Marcus E. Raichle. "Integration of Emotion and Cognition in the Lateral Prefrontal Cortex." *Proceedings of the National Academy of Sciences,* 19 Mar 2002. Vol. 99, No. 6: 4115–4120. *Université de Genève.* 13 Nov 2008 <http://www.unige.ch/fapse/emotion/announcements/GBR-PNAS-2002.pdf>

Hammel, Michael. "The Aesthetics of Use." *Aesthetic Approaches to Human-Computer Interaction: Proceedings of the NordiCHI 2004 Workshop, The Department of Computer Science, DAIMI,* 24 Oct 2004. 13 Nov 2008 <http://www.daimi.au.dk/publications/PB/572/PB-572.pdf>

Han, Jefferson Y. "Jeff Han." *New York University, Computer Science Department, Courant Institute of Mathematical Sciences.* Feb 2006. 30 Aug 2007 <http://cs.nyu.edu/~jhan/>

Heller, Stephen and David Womak. *Becoming a Digital Designer: A Guide to Careers in Web/Video/Broadcast/Game+Animation Design.* Hoboken: John Wiley & Sons, Inc., 2008.

Hoekman, Jr., Robert. *Designing the Moment: Web Interface Design Concepts in Action.* Berkeley: New Riders, 2008.

Karvonen, Kristiina. "The Beauty of Simplicity." *Department of Art History, University of Helsinki. Telecommunications Software and Multimedia Laboratory,* Helsinki University of Technology, 2000. 13 Nov 2008 <http://www.tml.hut.fi/Research/TeSSA/Papers/Karvonen/CUU2000_Karvonen_K.pdf>

Lagerkvist, Christian. "Exploring the Mnemonic User Interface." *re-pdf.com,* 07 Jul 2004. *TextCenter AB.* 13 Nov 2008 <http://www.re-pdf.com/?f=531&x=9233c3a94597ee684c4fb813538924a0>

Lazar, Jonathan. *Web Usability: A User-Centered Approach.* Boston: Pearson Education Inc., 2006.

Lee, Eun-Ju. "Factors That Enhance Consumer Trust In Human-Computer Interaction: An Examination Of Interface Factors And The Moderating Influences." Diss. *The University of Tennessee Knoxville,* 2002. 18 Apr 2008 <http://idserver.utk.edu/?id=200300000001751>

Lerup, Lars. *Planned Assaults.* Montreal: Centre Canadien d'Architecture, 1987.

Lidwell, William and Kritina Holden, Jill Butler. *Universal Principles of Design.* Glouchester: Rockport Publishers, 2003.

Lipton, Ronnie. *The Practical Guide to Information Design.* Hoboken: John Wiley & Sons, Inc., 2007.

Lough, Wade. "Once More With Feeling." *University of Tennessee Knoxville,* Oct 2005. *Departamento de Diseño, Universidad Iberoamericana.* 13 Nov 2008 <http://www.dis.uia.mx/conference/HTMs-PDFs/Lough.pdf>

Lowgren, Jonas, and Erik Stolterman. *Thoughtful Interaction Design: A Design Perspective on Information Technology.* Cambridge: The MIT Press, 2004.

Lupton, Ellen. *Graphic Design the New Basics.* New York: Princeton Architectural Press, 2008.

Lynch, Patrick and Sarah Horton. "Web Style Guide, 3rd Edition." *Web Style Guide,* 2008. 11 Aug 2007 <http://webstyleguide.com/>

Maeda, John. *Creative Code.* New York: Thames & Hudson, 2004.

Maes, Pattie. "Talks: Pattie Maes & Pranav Mistry: Unveiling the 'Sixth Sense,' game-changing wearable tech." *TED,* 2009. 12 Mar 2009 <http://www.ted.com/index.php/talks/david_merrill_demos_siftables_the_smart_blocks.html>

Merrill, David. "Talks: David Merrill: Siftables, the toy blocks that think." *TED,* 2009. 26 Feb 2009 <http://www.ted.com/index.php/talks/pattie_maes_demos_the_sixth_sense.html>

*Minority Report.* Dir. Steven Spielberg. Perf. Tom Cruise, Max von Sydow. DVD. Dreamworks Home, 17 Dec 2002.

Moggridge, Bill. *Designing Interactions.* Cambridge: The MIT Press, 2007.

Mok, Clement. *Designing Business: Multiple Media, Multiple Disciplines.* San Jose: Adobe Press, 1996.

Müller, Matthias. *Vision and Reality of Hypertext and Graphical User Interfaces.* Diss. Universität Hamburg, Feb 2002. Bericht 237, FBI-HH-B-237/02.

Mullet, Kevin and Darrell Sano. *Designing Visual Interfaces: Communication Oriented Techniques.* Mountain View: SunSoft Press, 1995.

Nielsen, Jacob. *Designing Web Usability: The Practice of Simplicity.* New Riders Publishing, Indiana, 1999.

Nielsen, Jacob and Hoa Loranger. *Prioritizing Web Usability.* Berkeley: New Riders, 2006.

Norman, D. A. "Emotion and Design: Attractive things work better." *Don Norman's jnd.org,* 2002. 05 Aug 2006 <http://jnd.org/dn.mss/emotion_design_attractive_things_work_better.html>

Norman, Donald A. "Emotional Design: People and Things." *Don Norman's jnd.org,* 2002. 05 Aug 2006 <http://www.jnd.org/dn.mss/emotional_desig.html>

Norman, Don. *Emotional Design: Why We Love (or Hate) Everyday Things.* New York: Basic Books, 2003.

Norman, Donald A. *The Design of Everyday Things.* New York: Basic Books, 2002.

Norman, Donald A. "Usability Is Not a Luxury." *Don Norman's jnd.org,* 14 Jan 2000. 05 Aug 2006 <http://jnd.org/dn.mss/usability_is_not_a_luxury.html>

Parizotto-Ribeiro, Rosamelia and Nick Hammond. "Does Aesthetics Affect the Users' Perceptions of VLE's?" *Department of Psychology, University of York,* Mar 2006. *Informatics Department, University of Sussex.* 13 Nov 2008 <http://www.informatics.sussex.ac.uk/users/gr20/aied05/finalVersion/RParizotto.pdf>

Penenberg, Adam L. "Can't Touch This." *Fast Company Magazine,* March 2009, Issue 133. Fast Company, 19 Dec 2007. 15 Aug 2008 <http://www.fastcompany.com/magazine/112/open_features-canttouchthis.html>

*Perceptive Pixel.* Screenshot, 25 Feb 2009. Perceptive Pixel, Inc. 25 Feb 2009 <http://www.perceptivepixel.com/>

Sharp, Helen and Yvonne Rogers, Jenny Preece. *Interaction Design: Beyond Human-Computer Interaction.* 2nd ed. West Sussex: John Wiley & Sons Ltd., 2007.

Spillers, Frank. "Emotion as a Cognitive Artifact and the Design Implications for Products That are Perceived As Pleasurable." *Experience Dynamics,* 2004. 13 Nov 2008 <http://www.experiencedynamics.com/sites/default/files/spillers-emotiondesign-proceedings.pdf>

Spillers, Frank. "Synch with me: Rhythmic interaction as an emerging principle of experiential design." *Experience Dynamics,* 2008. 20 Dec 2008 <http://www.experiencedynamics.com/sites/default/files/synch-with-me-spillers.pdf>

Spillers, Frank. "Usability of Dynamic Media: Are We Really Reaching and Serving Our Customers?." *Experience Dynamics,* 2002. 13 Nov 2008 <http://www.experiencedynamics.com/sites/default/files/usability_of_dynamic_media-spillers.pdf>

Stamen Design. "Digg Arc." Screenshot. *digg labs / arc,* 30 Aug 2007. 12 Mar 2009 <http://labs.digg.com/arc/>

Suliman, Helen-Joy. "Framing The Digital: The Viewing Environment for Web Specific Art Work." *University of Wollongong \<ADT\> Public View,* 2004. 15 Aug 2008 <http://www.library.uow.edu.au/adt-NWU/public/adt-NWU20050301.100315/index.html>

*The Great Utopia: The Russian and Soviet Avant-Garde, 1915–1932.* New York: Guggenheim Museum, 1992.

Thissen, Frank and J.G. Rager. *Screen Design Manual: Communicating Effectively Through Multimedia.* Berlin: Springer-Verlag, 2006.

Udsen, Lars Erik and Anker Helms Jørgensen. "The Aesthetic Turn: Unravelling Recent Aesthetic Approaches to Human-Computer Interaction." *Digital Creativity,* 2005, Vol. 16, No. 4: 205–216. larsudsen.com. 13 Nov 2008 <http://www.larsudsen.com/files/DC_aesthetics.pdf>

Van Dijk. *Information Architecture for Designers: Structuring Websites for Business Success.* Mies: Rotovision, 2003.

Van Duyne, Douglas K., James A. Landay and Jason I. Hong. *The Design of Sites: Patterns for Creating Winning Web Sites.* 2nd ed. Upper Saddle River: Prentice Hall, 2007.

Veen, Jeffrey. *The Art & Science of Web Design.* Indianapolis: New Riders, 2001.

Veletsianos, G. "Cognitive and Affective Benefits of an Animated Pedagogical Agent: Considering Contextual Relevance and Aesthetics." *Journal of Educational Computing Research,* 36 Vol. 4, (2007): 373–377.

*Zaha Hadid.* New York: Guggenheim Museum Publications, 2006.

Zeldman, Jeffrey. *Designing with Web Standards.* New York: Peach Pit Press, 2004.
