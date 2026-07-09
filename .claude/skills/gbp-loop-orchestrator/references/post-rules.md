# GBP Post Rules, QA Gates & Gemini Image Prompt Formula

Complete reference for writing, reviewing, and formatting all 19 GBP posts.

---

## Post Rules — MUST DO

- **80–300 words** per post (under 80 = rejected as too thin; over 300 = risks truncation)
- **At least 1 specific verified data point** relevant to THAT community (price, DOM, inventory, rate, sq ft, elevation, # homes, # clubs — whatever fits the angle)
- **Geo-target explicitly** — mention the community or neighborhood by name inside the post body
- **End with an engaging question** — prompts interaction, improves GBP engagement signal
- **Different angle for every post** — no two posts in the same batch share the same hook or story
- **Dr. Jan voice:** Expert neighbor, Brooklyn-direct, warm. 8–15 word sentences. Specific data beats adjectives. Expertise shows through numbers, not claims.
- **Probate post (#19):** Sensitive, consultant-first. Focus on clarity, options, privacy. Never urgency.
- **Natural language:** Write the way a buyer would type a question into Google or ChatGPT. This improves voice-search matching.

---

## Post Rules — NEVER DO

These trigger Google's spam detection or outright rejection:

| ❌ Violation | Why It Matters |
|---|---|
| Phone number in post body text | Google flags and rejects — even local numbers |
| NAP block at end of post | Spam pattern — rejected or suppressed |
| "Best," "#1," "guaranteed," "limited time," "you must act now" | Promotional superlatives = spam flag |
| Duplicate or near-duplicate copy across locations | Google suppresses repeat content |
| "The market is hot!" or generic filler | Adds no value, hurts engagement |
| Full URL in post body | Use CTA button field only |
| Excessive keyword stuffing | E-E-A-T penalty, post suppression |
| Protected class references or proxies | Fair Housing violation (see gate 7 below) |

---

## Fair Housing — Gate 7 (Hard Rule)

**NEVER reference or imply protected classes or their proxies in any post.**

❌ Never use: "safe neighborhood" · "good schools" · "family-friendly" · "established community" · "great for families" · "quiet neighborhood" (as demographic signal) · school rankings

✅ Instead use: Property features · square footage · amenities · school district NAMES (not rankings) · commute times · specific amenity names (clubhouse, pool, golf course) · elevation · freeway access

This rule applies to ALL 19 posts including lifestyle and 55+ community posts. Age designation for 55+ communities (Sun City Summerlin, Del Webb North Ranch) is lawful — no other demographic references.

---

## CTA Button Types

Each post entry includes a separate CTA button field (not in post body text):

| Button | Use For | Example URL |
|---|---|---|
| **Call now** | Direct lead capture, urgency-themed posts | (connects to GBP phone number — no URL needed) |
| **Learn more** | Market update, neighborhood info, lifestyle posts | https://www.drjanduffy.com or specific page |
| **Book** | Consultation or showing posts | https://calendly.com/drjanduffy |

Default: **Learn more** → drjanduffy.com. Upgrade to **Book** when the post has a clear consultation angle. Use **Call now** sparingly (urgent seller/buyer situations only).

---

## Gemini Image Prompt Formula

Every post requires a structured Gemini image generation prompt — not a vague description.

### Formula
```
[Subject + composition/framing] + [Action or scene detail] + [Location specifics for Las Vegas] + [Lighting quality] + [Camera/lens specs] + [Style/mood] + [Closing guard phrase]
```

### Closing guard phrase (always include verbatim):
> "Photorealistic, professional real estate marketing photography, no text overlays, suitable for Google Business Profile."

This prevents Gemini from adding AI-style artifacts, fake text, or logos.

### Las Vegas Environment Language
Always anchor prompts in the LV environment:
- "Spring Mountain Range in background" or "Spring Mountain foothills"
- "Mojave desert foliage" / "xeriscape landscaping" / "desert sage" / "decomposed granite"
- "warm Nevada afternoon light" / "clear blue Nevada sky" / "golden hour from the southwest"
- "desert-tan stucco" / "clay tile roof" / "terracotta trim"

### Camera / Lens Vocabulary
Use these terms — Gemini responds to photographic language:
- Wide shots: `24mm wide-angle lens, f/8` (exterior architecture, community overview)
- Portrait/lifestyle: `85mm portrait lens, f/2.8, shallow depth of field` (warm, personal feel)
- Standard/street: `35mm lens, f/7.1` (neighborhood, street-level)
- Dramatic/aerial: `telephoto lens, f/5.6` (aerial community, mountain backdrop)
- Interior: `16mm wide-angle, HDR-balanced` (high-rise views, interior spaces)

### Light Quality
- Exterior daytime: `golden hour from the southwest` / `bright Nevada midday sun` / `morning light from the east`
- Dusk/evening: `blue hour` / `warm amber streetlights beginning to illuminate`
- Interior: `ambient interior lighting kept low to emphasize exterior view`

### Style Variation — Rotate Across 19 Posts
Vary these across the batch (don't repeat the same style):
- Exterior architecture (straight-on or low-angle)
- Aerial/neighborhood overview
- Golf course / community amenity
- Urban/street-level lifestyle
- Interior view out (high-rise, luxury)
- Lifestyle scene (backs to camera — no identifiable faces)
- Professional/office building (for Probate)
- Sunset/dramatic sky
- Desert landscape with home

### ❌ BAD Gemini Prompt
> "Photo of a nice house in Las Vegas."
(Too vague — produces generic, unusable results)

### ✅ GOOD Gemini Prompt
> "Wide-angle exterior shot of a single-story desert contemporary home in northwest Las Vegas, low-angle perspective showing manicured xeriscape landscaping in the foreground with mature desert blooms along the walkway, Spring Mountain Range visible in the background under a clear blue Nevada sky. Warm golden hour lighting from the southwest, long shadows adding depth, 24mm wide-angle lens, f/8 aperture, slight lens flare on the left edge. Photorealistic, professional real estate marketing photography, no text overlays, suitable for Google Business Profile."

---

## Post Format Template

Use this exact structure for each of the 19 posts:

```
### [Location Name — Full Address]

**Post:**
[Post text — 80–300 words, NO phone number, NO NAP block]

**CTA Button:** [Call now / Learn more / Book] — [URL or "no URL needed" for Call now]

**Gemini Image Prompt:**
[Full structured prompt, 2–3 sentences minimum]

---
```

---

## Output File Structure

```markdown
# Dr. Jan Duffy — GBP Weekly Post Batch
**Date:** [YYYY-MM-DD]
**Trigger reason:** [which check fired]
...

## PRE-FLIGHT FINDINGS
[GBP algorithm findings | Gemini image tips | Market data table]

## SET 1 — Northwest / Summerlin Corridor
[Posts 1–6]

## SET 2 — Southwest / South Las Vegas
[Posts 7–12]

## SET 3 — Henderson, North Las Vegas & Urban Core
[Posts 13–19]

## QUALITY CHECK TABLE
[19 × 7 gate table]

## CONTINUOUS IMPROVEMENT NOTES
[What changed, what to improve next run]

## SOURCES
[All search results used, with URLs]
```
