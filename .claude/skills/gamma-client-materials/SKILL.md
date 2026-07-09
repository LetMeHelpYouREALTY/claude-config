---
name: gamma-client-materials
description: >
  All client-facing materials — listing presentations, buyer guides, market reports, property showcases,
  neighborhood tours, open house flyers, and any visual content meant for clients — MUST be created in
  Gamma using the Gamma MCP generate tool. Do NOT create client materials as local .pptx files.
  Triggers on: "listing presentation", "buyer presentation", "client deck", "market report for clients",
  "property showcase", "open house materials", "seller presentation", "CMA presentation", "neighborhood guide",
  "investor packet", "relocation guide", or any request to create visual content that a client will see.
  Also triggers when Dr. Jan says "make slides", "create a deck", "presentation for [client name]",
  or "put together something for [client name]". If the deliverable is going to a client's eyes, use Gamma.
---

# Gamma Client Materials

All client-facing visual materials are created in Gamma — not as local PowerPoint files. This ensures
every client sees polished, modern, interactive presentations that reflect Dr. Jan's brand as a top
Las Vegas luxury agent.

## When to Use Gamma

Any time the output is a presentation, deck, visual report, or document that a **client** will see.
This includes listing presentations, buyer guides, market updates, property showcases, CMA
presentations, investor packets, open house materials, and neighborhood/community guides.

Internal-only documents (personal notes, checklists, SOPs) do NOT need Gamma.

## How to Create

Use the `generate` tool from the Gamma MCP. Key settings for Dr. Jan's brand:

### Theme
- Default to **Dune** theme (warm beige/gold luxury feel) unless Dr. Jan specifies otherwise
- For modern/urban properties, **Chimney Smoke** or **Pearl** work well
- For 55+ communities, **Dune** or **Gold Leaf** feel right

### Image Source
- Always use **pexels** (real photography) — never AI-generated images for client materials
- Style preset: **photorealistic**

### Dimensions
- Default **16x9** for presentations

### Text Settings
- Tone: warm, confident, luxury, personal
- Amount: medium (avoid text walls)

### Content Rules — What to Include and What NOT to Include

These are Dr. Jan's firm preferences. Follow them every time:

1. **No Exit Option or cancellation guarantee language.** Dr. Jan does not offer an Exit Option.
   Do not include slides about cancellation rights, guarantees that the client can leave, or
   "sign knowing you are protected" language. Remove any such content if it appears in source material.

2. **No volume metrics or family counts.** Do not say "500+ families served" or similar transaction
   volume numbers. Dr. Jan's value is about the quality of her service, not the quantity of deals.
   Instead, emphasize: diligent service, trustworthiness, protecting the client's investment,
   and maximizing their return on investment.

3. **No strategy framework names or attributions.** Do not mention "Sharran Srivatsaa,"
   "Invitation Framework," or any named methodology. Present pricing and marketing strategies
   in plain, client-friendly language. The client doesn't need to know the name of the playbook —
   they need to see the plan and trust the advisor.

4. **No agent-only jargon.** Avoid internal real estate terms like "Event-Based Invitation,"
   "Aspirational pricing," "Perceived Value pricing," or "Day 21 Decision Protocol."
   Use plain language: "Recommended," "Conservative," "Not Recommended."

5. **Speak directly to the client.** Use "your home," "your equity," "your next chapter" — not
   third-person language about "the seller" or "the property."

### Additional Instructions to Pass to Gamma

Always include these in the `additionalInstructions` parameter:

> This must look like it came from a top 1% luxury real estate agent — NOT from AI. Use real Pexels
> photography. NO generic stock photos, no AI-generated images. Clean elegant layouts with generous
> white space. Use tables for data-heavy slides. Use large stat callouts for key numbers. Vary layouts
> across slides. No bullet-heavy text walls. No accent lines under titles. Do NOT include any Exit Option
> or cancellation guarantee. Do NOT mention how many families or clients have been served — focus on
> diligent service, trust, and investment protection.

## After Generation

Once Gamma returns the URL, share it directly with Dr. Jan. Gamma presentations can be edited,
themed, and refined inside the Gamma editor — remind Dr. Jan she can swap photos, adjust colors,
or reorder slides directly in Gamma.

## Dr. Jan's Signature Block

Always include on the title and closing slides:

```
Dr. Jan Duffy, REALTOR® | S.0197614
Berkshire Hathaway HomeServices Nevada Properties
702-222-1964 | janet.duffy@bhhsnv.com
```
