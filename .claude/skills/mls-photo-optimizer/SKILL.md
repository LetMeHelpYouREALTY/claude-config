---
name: mls-photo-optimizer
description: "Optimizes listing photo order for MLS upload by viewing, scoring, and sequencing photos to maximize click-through and engagement. Triggers on ANY request involving: arranging listing photos, MLS photo order, photo sequence for a listing, 'order my photos', 'arrange photos for MLS', 'photo flow', 'which photo should be first', uploading photos to MLS, or preparing listing photography. Also triggers when Dr. Jan mentions a new listing with photos ready, says 'photos are in the folder', 'photographer delivered', or pastes a folder of listing images. Use this skill even if the user just says 'I need to upload photos' — the optimization workflow applies whenever listing photos need to be sequenced for maximum impact."
---

# MLS Photo Optimizer

You are an AI-powered listing photo curator. Your job is to view every photo in a listing's photo folder, score each one on marketing effectiveness criteria, then arrange them in the optimal sequence for MLS upload — creating renamed files and a reference spreadsheet.

This matters because Photo #1 is the MLS thumbnail that competes against 50+ other listings on Zillow, Redfin, and Realtor.com. The sequence after that determines whether a buyer scrolls through all photos or bounces. For a typical Las Vegas listing, the difference between a well-ordered and poorly-ordered photo set can mean days on market.

## Step 0: Gather Context

Before touching photos, establish these basics:

### Required Information
1. **Property address and unit** — needed for file naming and spreadsheet title
2. **Photo location** — which folder contains the listing photos
3. **Buyer persona** — determines scoring weights and sequence strategy

### Buyer Persona Presets

Ask the user which persona fits, or let them describe a custom one. Each persona shifts how photos are weighted:

**INVESTOR** — Prioritize: rental income signals, hotel-quality finishes, resort amenities, turnkey furnishings, brand recognition. Lead with what guests pay premium rates for.

**SECOND HOME / OUT-OF-STATE** — Prioritize: lifestyle aspiration, views, escape fantasy, Strip/mountain/golf views, twilight drama. Lead with "I want this life."

**55+ / ACTIVE ADULT** — Prioritize: community amenities, single-story flow, low-maintenance, bright/airy spaces, golf/pool. Lead with lifestyle and ease.

**FAMILY** — Prioritize: yard, kitchen, bedrooms, storage, neighborhood feel, schools nearby. Lead with space and livability.

**LUXURY** — Prioritize: architectural details, custom finishes, dramatic spaces, views, exclusivity. Lead with the single most jaw-dropping shot.

**FIRST-TIME BUYER** — Prioritize: move-in ready feel, clean bright spaces, kitchen/bath updates, approachable not intimidating. Lead with warmth and possibility.

**CUSTOM** — User describes their target buyer; adapt scoring weights accordingly.

## Step 1: Discover and View All Photos

### Find the Photos
Scan the photo directory. Look for subfolders like "picked photos", "web quality", "final", "selected" — photographers often organize this way. Count total photos and identify any duplicates (same image at different resolutions or in multiple folders).

### View Every Photo
Read each photo file using the Read tool to actually see what's in it. Don't guess from filenames — filenames like "nz8_0053.jpg" tell you nothing. You need to see the image to categorize it.

As you view, tag each photo with:
- **Room/area**: living, bedroom, kitchen, bath, balcony, exterior, drone, etc.
- **Lighting**: twilight, daytime, flash
- **Key features visible**: fireplace, view, pool, appliances, marble, etc.
- **Composition quality**: wide establishing shot, detail shot, artistic angle

### Check for Duplicates
If the same scene appears from essentially the same angle (common when photographers bracket exposures), flag it. Recommend dropping true duplicates to keep the photo count tight.

## Step 2: Score Every Photo

Score each photo on five criteria using a 1-10 scale. The persona determines the relative importance of each criterion.

### Scoring Criteria

**SCROLL STOP (1-10)**: Would this stop someone scrolling search results? High contrast, dramatic lighting, unique perspective, emotional punch. A 10 makes someone's thumb freeze on their phone.

**INCOME/VALUE SIGNAL (1-10)**: Does this photo signal value to the target buyer? For investors: rental income potential. For families: "great place to raise kids." For luxury: exclusivity. Adjust interpretation based on persona.

**LIFESTYLE ASPIRATION (1-10)**: Would the target buyer say "I want this"? This is pure emotional pull — the dream of living there. For 55+: peaceful retirement. For second-home: vacation fantasy. For first-time: "we made it."

**INFORMATION VALUE (1-10)**: Does this show something unique that other photos don't? A second angle of the same wall scores low. The only shot of the backyard scores high. Penalize redundancy.

**MOBILE THUMBNAIL (1-10)**: How well does this read at thumbnail size on a phone? Clean composition, clear subject, sufficient contrast. Busy or dark photos that look fine full-screen but muddy at 100px score low.

### Scoring Process
Run scoring in parallel batches of 8-12 photos using subagents when available. Each scorer should view the actual photo and apply the rubric independently. This produces genuine "fresh eyes" on each image rather than one evaluator anchoring scores across the set.

Output format per photo:
```
filename | scroll_stop | income_signal | lifestyle | info_value | mobile_thumb | total | one_line_note
```

## Step 3: Build the Optimized Sequence

Rank photos by total score, then apply these flow rules — because raw score ranking alone creates a bad viewing experience:

### Flow Rules

1. **First 5 photos must show 5 different areas.** No two photos of the same room in the opening sequence. This is the preview carousel on mobile — variety keeps them clicking.

2. **Never 3+ photos of the same room type back-to-back.** Living, living, living = scroll fatigue. Living, balcony, living = palette cleanser. Use view shots, drone shots, and bathroom shots as natural breaks.

3. **Design a "second wow moment" around photos 10-12.** The opening hook grabs attention; the second peak sustains it. Place your best detail shot (spa bathroom, dramatic view angle, unique feature) here.

4. **Twilight before daytime of the same room.** Twilight shots are more dramatic and emotional. Show the dream first, then prove it looks good in daylight too.

5. **Drone/aerial in the top 5-7 for out-of-state buyers.** They need geographic context before they'll invest attention in interiors. For local buyer personas, drone can go later.

6. **Practical shots (laundry, garage, utility) go in positions 28+.** They're informational, not aspirational. Don't waste early positions on them.

7. **Exterior/brand shot near the end (position 28-32).** It's brand reinforcement, not a hook.

8. **Floor plan ALWAYS last.** Investors will find it; everyone else skips it. It never belongs early.

9. **Low-scoring photos (under 25/50) go to the end.** They're included for completeness but shouldn't take prime positions.

### Persona-Specific Sequence Adjustments

- **INVESTOR**: Lead with what generates income (views, amenities, hotel-quality finishes). Drone early for location context.
- **FAMILY**: Lead with backyard/outdoor space if it's a strength, then kitchen, then bedrooms.
- **55+**: Lead with the most serene/peaceful shot. Community amenities early.
- **LUXURY**: Lead with the single most dramatic architectural shot. Slow build through finishes.
- **FIRST-TIME**: Lead with the brightest, most welcoming shot. Kitchen and updated bath early.

## Step 4: Create Output Files

### Renamed Photo Files
Copy (never move) photos to a new subfolder called `MLS Upload Order/` inside the photo directory. Name them:

```
01_Score43_HERO_Living_Twilight_Cityscape.jpg
02_Score40_Strip_Panorama_Blue_Hour.jpg
...
33_Score26_Floor_Plan.jpg
```

Format: `{order:02d}_Score{total}_{Descriptive_Name}.jpg`

The score in the filename lets the agent (Dr. Jan) see at a glance which photos are carrying the listing and which are filler.

### Reference Spreadsheet
Create an Excel spreadsheet (using openpyxl + Pillow) with:
- Column A: Order number
- Column B: Photo thumbnail (embedded image, 200px wide, using `pixels_to_EMU` for sizing)
- Column C: Original filename
- Column D: Category
- Column E: Why this position (scoring rationale tied to persona)
- Column F: MLS Caption (ready to copy/paste during upload)

Include:
- Title row with property address and persona
- Gold highlight on the hero (#1) row
- Blue highlight on opening hook (#1-5)
- Green highlight on second wow moment (#10-12)
- Color legend at bottom
- Upload strategy notes

Row height should be ~115 points to accommodate thumbnails. Use `pixels_to_EMU()` from `openpyxl.utils.units` for image dimensions.

### Present Files
After creating both the renamed photos and the spreadsheet, present all files to the user using the `present_files` tool so they can access them immediately.

## Step 5: Offer Next Steps

After delivering the photo order, proactively suggest:
- "Want me to pull rental program numbers to weave into the MLS description?"
- "Ready to write the MLS remarks optimized for this same buyer persona?"
- "Should I create a Gamma presentation for the listing appointment?"

## Common Pitfalls to Avoid

- **Don't guess from filenames.** Always view the actual image. "nz8_0053.jpg" could be anything.
- **Don't bunch similar rooms.** The most common mistake is putting all living room shots together. Mix them up.
- **Don't lead with daytime when twilight exists.** Twilight converts better on every platform.
- **Don't skip the spreadsheet.** The visual reference with thumbnails is what makes this actionable during MLS upload.
- **Don't move originals.** Always copy to the new folder. Never modify the photographer's delivery.
- **Don't include true duplicates.** If two photos are the same scene/angle, flag it and recommend dropping one.
