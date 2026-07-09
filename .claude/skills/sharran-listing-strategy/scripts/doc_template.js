const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, LevelFormat, PageBreak
} = require('docx');
const fs = require('fs');

// ── COLORS ───────────────────────────────────────────
const NAVY    = "1B3A6B";
const GOLD    = "B8860B";
const RED     = "C0392B";
const GREEN   = "1A6B3C";
const ORANGE  = "D35400";
const PURPLE  = "6C3483";
const TEAL    = "117A65";
const LT_BLUE = "D6E4F0";
const LT_GOLD = "FDF3D8";
const LT_RED  = "FDECEA";
const LT_GRN  = "D4EDDA";
const LT_ORG  = "FDEBD0";
const LT_PRP  = "EBD9F5";
const WHITE   = "FFFFFF";
const D_GRAY  = "333333";
const M_GRAY  = "666666";
const LT_GRAY = "F5F5F5";
const BDR_GRY = "CCCCCC";

// ── BORDERS ──────────────────────────────────────────
const b1 = { style: BorderStyle.SINGLE, size: 1, color: BDR_GRY };
const bAll = { top: b1, bottom: b1, left: b1, right: b1 };
const bNone = c => ({ top: n(c), bottom: n(c), left: n(c), right: n(c) });
function n(c="#FFFFFF") { return { style: BorderStyle.NONE, size: 0, color: c }; }
function thickBorder(color, size=14) {
  const b = { style: BorderStyle.SINGLE, size, color };
  return { top: b, bottom: b, left: b, right: b };
}

// ── HELPERS ───────────────────────────────────────────
function sp(n=1) {
  return Array.from({length:n}, ()=>
    new Paragraph({ children:[new TextRun({text:"",size:12})] })
  );
}

function sectionHdr(text, color=NAVY) {
  return new Paragraph({
    spacing: { before:300, after:120 },
    border: { bottom: { style:BorderStyle.SINGLE, size:10, color:GOLD, space:4 } },
    children: [new TextRun({ text, bold:true, size:32, color, font:"Arial" })]
  });
}

function subHdr(text, color=NAVY) {
  return new Paragraph({
    spacing: { before:160, after:60 },
    children: [new TextRun({ text, bold:true, size:22, color, font:"Arial" })]
  });
}

function body(text, opts={}) {
  const { bold=false, color=D_GRAY, italic=false, size=20 } = opts;
  return new Paragraph({
    spacing: { before:50, after:50 },
    children: [new TextRun({ text, bold, color, italic, size, font:"Arial" })]
  });
}

function bul(text, color=D_GRAY, bold=false) {
  return new Paragraph({
    numbering:{ reference:"bullets", level:0 },
    spacing:{ before:40, after:40 },
    children:[new TextRun({ text, color, bold, size:20, font:"Arial" })]
  });
}

function cell(text, opts={}) {
  const {
    bold=false, color=D_GRAY, bgColor=null, fontSize=20,
    align=AlignmentType.LEFT, width=2340, italic=false,
    colspan=1, borders=bAll
  } = opts;
  return new TableCell({
    borders,
    width:{ size:width, type:WidthType.DXA },
    columnSpan: colspan,
    shading: bgColor?{ fill:bgColor, type:ShadingType.CLEAR }:undefined,
    margins:{ top:80, bottom:80, left:130, right:130 },
    verticalAlign: VerticalAlign.CENTER,
    children:[new Paragraph({
      alignment:align,
      children:[new TextRun({ text, bold, color, size:fontSize, font:"Arial", italic })]
    })]
  });
}

function hdr(text, opts={}) {
  const { width=2340, align=AlignmentType.CENTER, bgcolor=NAVY, colspan=1 } = opts;
  return cell(text, { bold:true, color:WHITE, bgColor:bgcolor, fontSize:19,
    width, align, colspan });
}

function box(children, bgColor, borderColor, size=14) {
  return new Table({
    width:{ size:9360, type:WidthType.DXA },
    columnWidths:[9360],
    rows:[new TableRow({ children:[new TableCell({
      borders: thickBorder(borderColor, size),
      width:{ size:9360, type:WidthType.DXA },
      shading:{ fill:bgColor, type:ShadingType.CLEAR },
      margins:{ top:160, bottom:160, left:200, right:200 },
      children
    })]})]
  });
}

// ── DOCUMENT ─────────────────────────────────────────
const doc = new Document({
  numbering:{
    config:[
      { reference:"bullets", levels:[{
        level:0, format:LevelFormat.BULLET, text:"\u2022",
        alignment:AlignmentType.LEFT,
        style:{ paragraph:{ indent:{ left:540, hanging:360 } } }
      }]},
      { reference:"numbers", levels:[{
        level:0, format:LevelFormat.DECIMAL, text:"%1.",
        alignment:AlignmentType.LEFT,
        style:{ paragraph:{ indent:{ left:540, hanging:360 } } }
      }]},
    ]
  },
  styles:{
    default:{ document:{ run:{ font:"Arial", size:20, color:D_GRAY } } }
  },
  sections:[{
    properties:{
      page:{
        size:{ width:12240, height:15840 },
        margin:{ top:1000, right:1000, bottom:1000, left:1000 }
      }
    },
    headers:{
      default: new Header({ children:[new Paragraph({
        border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color:GOLD } },
        children:[
          new TextRun({ text:"LISTING STRATEGY  |  7400 Bisonwood Ave, Las Vegas 89131",
            bold:true, size:19, color:NAVY, font:"Arial" }),
          new TextRun({ text:"\tDr. Jan Duffy  |  BHHS Nevada Properties  |  702-500-1955",
            size:17, color:M_GRAY, font:"Arial" }),
        ],
        tabStops:[{ type:"right", position:9360 }]
      })]}),
    },
    footers:{
      default: new Footer({ children:[new Paragraph({
        border:{ top:{ style:BorderStyle.SINGLE, size:6, color:GOLD } },
        alignment:AlignmentType.CENTER,
        children:[new TextRun({
          text:"Confidential — Prepared for Litman Sellers  |  Dr. Jan Duffy, REALTOR®  S.0197614  |  janet.duffy@bhhsnv.com  |  702-500-1955",
          size:15, color:M_GRAY, font:"Arial"
        })]
      })]}),
    },
    children:[

      // ═══════════════════════════════════════════════
      // TITLE
      // ═══════════════════════════════════════════════
      new Paragraph({
        alignment:AlignmentType.CENTER, spacing:{ before:80, after:40 },
        children:[new TextRun({ text:"PRECISION LISTING STRATEGY",
          bold:true, size:52, color:NAVY, font:"Arial" })]
      }),
      new Paragraph({
        alignment:AlignmentType.CENTER, spacing:{ before:0, after:40 },
        children:[new TextRun({ text:"7400 Bisonwood Avenue  |  Las Vegas, NV 89131",
          bold:true, size:28, color:GOLD, font:"Arial" })]
      }),
      new Paragraph({
        alignment:AlignmentType.CENTER, spacing:{ before:0, after:40 },
        children:[new TextRun({ text:"Prepared by Dr. Jan Duffy  |  Berkshire Hathaway HomeServices Nevada Properties  |  April 5, 2026",
          size:20, color:M_GRAY, italic:true, font:"Arial" })]
      }),
      new Paragraph({
        alignment:AlignmentType.CENTER, spacing:{ before:0, after:200 },
        children:[new TextRun({ text:"Strategy Framework: Sharran Srivatsaa Invitation Method  |  Billion Dollar Listing Process",
          size:19, color:PURPLE, italic:true, bold:true, font:"Arial" })]
      }),

      // ═══════════════════════════════════════════════
      // SHARRAN FRAMEWORK — THE INVITATION STRATEGY
      // ═══════════════════════════════════════════════
      sectionHdr("The Sharran Srivatsaa Invitation Framework — Pricing as Strategy, Not Guesswork", PURPLE),
      ...sp(1),

      // Quote box
      box([
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:60}, children:[
          new TextRun({ text:"\u201CThe list price is not the sales price.",
            bold:true, size:30, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:40}, children:[
          new TextRun({ text:"It is an invitation to the market \u2014 designed to attract the right buyers",
            bold:true, size:28, color:GOLD, font:"Arial" }),
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:40}, children:[
          new TextRun({ text:"and trigger the response you want.\u201D",
            bold:true, size:30, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:0}, children:[
          new TextRun({ text:"\u2014 Sharran Srivatsaa, Billion Dollar Listing Process",
            size:20, color:GOLD, italic:true, font:"Arial" }),
        ]}),
      ], PURPLE, GOLD),

      ...sp(1),
      body("Most agents pick a price. Dr. Jan engineers a market response. The Sharran Invitation Framework reframes pricing as a strategic tool — the list price triggers buyer psychology, agent behavior, and market momentum. Here is how the three strategies break down and which one wins for 7400 Bisonwood:"),
      ...sp(1),

      // 3 Pricing Strategies Matrix
      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[2000,2340,2340,2680],
        rows:[
          new TableRow({ children:[
            hdr("Strategy", { width:2000, bgcolor:PURPLE }),
            hdr("How It Works", { width:2340, bgcolor:PURPLE }),
            hdr("Best When...", { width:2340, bgcolor:PURPLE }),
            hdr("Expected Outcome", { width:2680, bgcolor:PURPLE }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:2000,type:WidthType.DXA},
              shading:{fill:LT_GRAY,type:ShadingType.CLEAR},
              margins:{top:80,bottom:80,left:120,right:120},
              children:[
                new Paragraph({children:[new TextRun({text:"ASPIRATIONAL",bold:true,size:19,color:M_GRAY,font:"Arial"})]}),
                new Paragraph({children:[new TextRun({text:"Price above market",size:17,italic:true,color:M_GRAY,font:"Arial"})]}),
              ]
            }),
            cell("List above comps with room to negotiate down. Multiple reductions expected.", { width:2340, color:M_GRAY }),
            cell("Unique/celebrity property; seller has no timeline; no competition.", { width:2340, color:M_GRAY }),
            cell("60–120+ DOM. Buyers use home as benchmark to justify buying elsewhere. NOT recommended here.", { width:2680, color:RED, italic:true }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:2000,type:WidthType.DXA},
              shading:{fill:LT_BLUE,type:ShadingType.CLEAR},
              margins:{top:80,bottom:80,left:120,right:120},
              children:[
                new Paragraph({children:[new TextRun({text:"PERCEIVED MARKET VALUE",bold:true,size:19,color:NAVY,font:"Arial"})]}),
                new Paragraph({children:[new TextRun({text:"List at what comps say",size:17,italic:true,color:M_GRAY,font:"Arial"})]}),
              ]
            }),
            cell("Price equals what recent comps support. Fair market value approach.", { width:2340, color:NAVY }),
            cell("Standard market; seller not in a hurry; home shows clean with no complications.", { width:2340, color:NAVY }),
            cell("30–60 day sale, standard 1-3% negotiation off list. Solid but not aggressive.", { width:2680, color:NAVY }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:2000,type:WidthType.DXA},
              shading:{fill:LT_GRN,type:ShadingType.CLEAR},
              margins:{top:80,bottom:80,left:120,right:120},
              children:[
                new Paragraph({children:[new TextRun({text:"\u2605 EVENT-BASED",bold:true,size:19,color:GREEN,font:"Arial"})]}),
                new Paragraph({children:[new TextRun({text:"Create auction dynamics",size:17,italic:true,color:GREEN,font:"Arial"})]}),
                new Paragraph({children:[new TextRun({text:"RECOMMENDED",bold:true,size:17,color:GREEN,font:"Arial"})]}),
              ]
            }),
            cell("Strategic invitation price creates multiple showing requests simultaneously. Controlled urgency drives offers above the list price.", { width:2340, color:GREEN, bold:true }),
            cell("Motivated seller with timeline. Unique features (pool, large lot). Needs to move fast to buy in CA.", { width:2340, color:GREEN }),
            cell("10–25 day sale. 2–4 competing offers. Final sale price at or above list. Seller wins time AND money.", { width:2680, bgColor:LT_GRN, color:GREEN, bold:true }),
          ]}),
        ]
      }),

      ...sp(2),

      // Pre-Launch Blueprint
      sectionHdr("Pre-Launch Blueprint — Creating Competition Before Day 1", PURPLE),
      ...sp(1),
      body("Sharran's signature insight: the biggest mistake agents make is going straight to 'Active' on MLS. The pre-launch window \u2014 executed correctly \u2014 is where serious buyers and agents are identified BEFORE the home is visible to the public. When the listing goes live, competition is already built.", { italic:true, color:M_GRAY }),
      ...sp(1),

      box([
        new Paragraph({ spacing:{before:0,after:60}, children:[
          new TextRun({ text:"The 7-Day Pre-Launch Blueprint for 7400 Bisonwood",
            bold:true, size:26, color:GOLD, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:40}, children:[
          new TextRun({ text:"Days -7 to -5 \u2014 Intelligence & Preparation",
            bold:true, size:21, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:30}, children:[
          new TextRun({ text:"\u2022  Pull GLVAR data: original list price, every price reduction, true DOM, showing history from MLS#2717388. Walk into the appointment knowing more about this listing than the sellers do.", size:19, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:30}, children:[
          new TextRun({ text:"\u2022  Confirm solar type in writing. Determine payoff amount if applicable. This single fact determines the pricing strategy and the entire marketing message.", size:19, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:50}, children:[
          new TextRun({ text:"\u2022  Professional photography, drone, and Matterport 3D tour booked for Day -5. Assets complete before listing agreement is signed.", size:19, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:40}, children:[
          new TextRun({ text:"Days -4 to -2 \u2014 Private Agent Outreach (The Secret Weapon)",
            bold:true, size:21, color:GOLD, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:30}, children:[
          new TextRun({ text:"\u2022  Personal calls to 20 top buyer\u2019s agents in Centennial Hills/89131 with active $700K+ buyers: 'I have a coming-soon property at 7400 Bisonwood \u2014 pool, 3,676 sqft, Preserves at Elkhorn Springs. Want a private first look before it hits MLS?'", size:19, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:30}, children:[
          new TextRun({ text:"\u2022  Social media teaser campaign: 'Something special is coming to Preserves at Elkhorn Springs next week\u2026 pool home, 3,600+ sqft, turnkey ready. Comment BISONWOOD to be first to know.' Builds organic buyer anticipation.", size:19, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:50}, children:[
          new TextRun({ text:"\u2022  'Coming Soon' MLS status: All GLVAR agents can see it, no public showings allowed. Agents register interest for Day 1 showings. By launch morning, the showing calendar is already filling.", size:19, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:40}, children:[
          new TextRun({ text:"Day 0 \u2014 Launch Day (The Invitation Goes Live)",
            bold:true, size:21, color:GOLD, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:30}, children:[
          new TextRun({ text:"\u2022  New MLS# goes Active at 8:00 AM \u2014 DOM clock resets to zero. Full media package live simultaneously: Zillow, Trulia, BHHS syndication, Homes.com.", size:19, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:30}, children:[
          new TextRun({ text:"\u2022  Showing requests flood in from agents pre-registered during Coming Soon period. First showings scheduled Day 0-1.", size:19, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:0}, children:[
          new TextRun({ text:"\u2022  This is the event-based approach: the invitation is designed to create a wave, not a trickle. When three buyers tour the same week, each one knows others are looking. Urgency is real, not manufactured.", size:19, color:GOLD, bold:true, font:"Arial" }),
        ]}),
      ], PURPLE, GOLD),

      ...sp(2),

      // Exit Option Box
      box([
        new Paragraph({ spacing:{before:0,after:60}, children:[
          new TextRun({ text:"The Exit Option \u2014 Dr. Jan\u2019s Seller Guarantee",
            bold:true, size:24, color:GOLD, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:40}, children:[
          new TextRun({ text:"Inspired by Sharran Srivatsaa\u2019s proven listing presentation principle: turn the listing agreement into a low-risk decision by guaranteeing a specific service standard with the right to cancel if Dr. Jan misses.",
            size:20, color:WHITE, font:"Arial" }),
        ]}),
        new Table({
          width:{ size:8960, type:WidthType.DXA },
          columnWidths:[4480,4480],
          rows:[
            new TableRow({ children:[
              new TableCell({
                borders: thickBorder(GOLD, 8),
                width:{size:4480,type:WidthType.DXA},
                shading:{fill:"2C3E6B",type:ShadingType.CLEAR},
                margins:{top:100,bottom:100,left:150,right:150},
                children:[
                  new Paragraph({spacing:{before:0,after:40},children:[new TextRun({text:"Dr. Jan Commits To:",bold:true,size:20,color:GOLD,font:"Arial"})]}),
                  new Paragraph({spacing:{before:0,after:20},children:[new TextRun({text:"\u2705  Minimum 8 qualified showings in Days 1\u201314",size:19,color:WHITE,font:"Arial"})]}),
                  new Paragraph({spacing:{before:0,after:20},children:[new TextRun({text:"\u2705  Written showing feedback report every Monday",size:19,color:WHITE,font:"Arial"})]}),
                  new Paragraph({spacing:{before:0,after:20},children:[new TextRun({text:"\u2705  Market update call every 14 days",size:19,color:WHITE,font:"Arial"})]}),
                  new Paragraph({spacing:{before:0,after:20},children:[new TextRun({text:"\u2705  24-hour response to all seller communications",size:19,color:WHITE,font:"Arial"})]}),
                  new Paragraph({spacing:{before:0,after:0},children:[new TextRun({text:"\u2705  Price-reduction consultation if 21 days with no offers",size:19,color:WHITE,font:"Arial"})]}),
                ]
              }),
              new TableCell({
                borders: thickBorder(GOLD, 8),
                width:{size:4480,type:WidthType.DXA},
                shading:{fill:"2C3E6B",type:ShadingType.CLEAR},
                margins:{top:100,bottom:100,left:150,right:150},
                children:[
                  new Paragraph({spacing:{before:0,after:40},children:[new TextRun({text:"The Exit Option:",bold:true,size:20,color:GOLD,font:"Arial"})]}),
                  new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"If Dr. Jan fails to deliver the minimum commitments above, sellers may cancel the listing agreement with 3 days written notice \u2014 no cancellation fee.",size:19,color:WHITE,font:"Arial"})]}),
                  new Paragraph({spacing:{before:20,after:0},children:[new TextRun({text:"This guarantee exists because Dr. Jan is confident in the strategy. Sellers should sign knowing they are protected \u2014 not trapped.",size:19,bold:true,color:GOLD,font:"Arial"})]}),
                ]
              }),
            ]}),
          ]
        }),
      ], NAVY, GOLD),

      ...sp(2),

      // ═══════════════════════════════════════════════
      // SECTION 1 — TODAY'S MARKET REALITY
      // ═══════════════════════════════════════════════
      sectionHdr("1.  Today's Las Vegas Market — What's Actually Happening"),
      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[2340,2340,2340,2340],
        rows:[
          new TableRow({ children:[
            hdr("30-Yr Rate", { width:2340 }),
            hdr("LV Median Price", { width:2340 }),
            hdr("Months Supply", { width:2340 }),
            hdr("Avg DOM (89131)", { width:2340 }),
          ]}),
          new TableRow({ children:[
            cell("6.29%–6.46%", { width:2340, align:AlignmentType.CENTER,
              bold:true, fontSize:26, color:RED }),
            cell("~$470,000", { width:2340, align:AlignmentType.CENTER,
              bold:true, fontSize:26, color:NAVY }),
            cell("3.35 months", { width:2340, align:AlignmentType.CENTER,
              bold:true, fontSize:26, color:ORANGE }),
            cell("56 days", { width:2340, align:AlignmentType.CENTER,
              bold:true, fontSize:26, color:NAVY }),
          ]}),
          new TableRow({ children:[
            cell("↑ Rose from sub-6% in Feb.", { width:2340, align:AlignmentType.CENTER,
              italic:true, color:M_GRAY, fontSize:17 }),
            cell("89131 median list: $549K", { width:2340, align:AlignmentType.CENTER,
              italic:true, color:M_GRAY, fontSize:17 }),
            cell("Balanced → buyers gaining leverage", { width:2340, align:AlignmentType.CENTER,
              italic:true, color:M_GRAY, fontSize:17 }),
            cell("80 active listings competing", { width:2340, align:AlignmentType.CENTER,
              italic:true, color:M_GRAY, fontSize:17 }),
          ]}),
        ]
      }),

      ...sp(1),
      body("What this means for your sellers right now:", { bold:true, color:NAVY }),
      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[4680,4680],
        rows:[
          new TableRow({ children:[
            new TableCell({
              borders: thickBorder(RED, 10),
              width:{ size:4680, type:WidthType.DXA },
              shading:{ fill:LT_RED, type:ShadingType.CLEAR },
              margins:{ top:120, bottom:120, left:150, right:150 },
              children:[
                new Paragraph({ spacing:{before:0,after:60}, children:[
                  new TextRun({ text:"Rate Headwind for Buyers",
                    bold:true, size:21, color:RED, font:"Arial" })
                ]}),
                new Paragraph({ spacing:{before:0,after:30}, children:[
                  new TextRun({ text:"At 6.46%, a buyer putting 20% down on $769K carries a $615K loan — about $3,940/month in principal & interest alone. That is $200/month MORE than it was in February when rates were under 6%.", size:20, color:D_GRAY, font:"Arial" })
                ]}),
                new Paragraph({ spacing:{before:30,after:0}, children:[
                  new TextRun({ text:"Every $10,000 you overprice = buyers walk.",
                    bold:true, size:20, color:RED, font:"Arial" })
                ]}),
              ]
            }),
            new TableCell({
              borders: thickBorder(GREEN, 10),
              width:{ size:4680, type:WidthType.DXA },
              shading:{ fill:LT_GRN, type:ShadingType.CLEAR },
              margins:{ top:120, bottom:120, left:150, right:150 },
              children:[
                new Paragraph({ spacing:{before:0,after:60}, children:[
                  new TextRun({ text:"Precision Pricing Wins",
                    bold:true, size:21, color:GREEN, font:"Arial" })
                ]}),
                new Paragraph({ spacing:{before:0,after:30}, children:[
                  new TextRun({ text:"This is a precision market — experts call it 'priced right or priced wrong, there is no middle.' Correctly priced homes in 89131 are still selling. The 56-day average hides a bi-modal reality: 15–30 days for well-priced homes, 90+ days for everything else.", size:20, color:D_GRAY, font:"Arial" })
                ]}),
                new Paragraph({ spacing:{before:30,after:0}, children:[
                  new TextRun({ text:"Right price + right marketing = clean, fast sale.",
                    bold:true, size:20, color:GREEN, font:"Arial" })
                ]}),
              ]
            }),
          ]}),
        ]
      }),

      ...sp(2),

      // ═══════════════════════════════════════════════
      // SECTION 2 — HYPER LOCAL
      // ═══════════════════════════════════════════════
      sectionHdr("2.  Hyper-Local — Preserves at Elkhorn Springs, Centennial Hills"),
      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[2000,1600,1400,1300,700,700,1660],
        rows:[
          new TableRow({ children:[
            hdr("Comparable Property", { width:2000, align:AlignmentType.LEFT }),
            hdr("Status", { width:1600 }),
            hdr("List Price", { width:1400 }),
            hdr("Sale Price", { width:1300 }),
            hdr("SqFt", { width:700 }),
            hdr("Pool", { width:700 }),
            hdr("DOM / Note", { width:1660 }),
          ]}),
          new TableRow({ children:[
            cell("7430 Bisonwood (ACTIVE)", { width:2000, bgColor:LT_GOLD }),
            cell("Active — YOUR COMPETITION", { width:1600, bold:true, color:ORANGE, bgColor:LT_GOLD }),
            cell("$725,000", { width:1400, align:AlignmentType.CENTER, bgColor:LT_GOLD }),
            cell("—", { width:1300, align:AlignmentType.CENTER, bgColor:LT_GOLD }),
            cell("3,544", { width:700, align:AlignmentType.CENTER, bgColor:LT_GOLD }),
            cell("No", { width:700, align:AlignmentType.CENTER, bgColor:LT_GOLD }),
            cell("9 DOM — New. No pool.", { width:1660, bgColor:LT_GOLD }),
          ]}),
          new TableRow({ children:[
            cell("7411 Brittlethorne (SOLD)", { width:2000, bgColor:LT_GRN }),
            cell("Sold Jan 27, 2026", { width:1600, bold:true, color:GREEN, bgColor:LT_GRN }),
            cell("—", { width:1400, align:AlignmentType.CENTER, bgColor:LT_GRN }),
            cell("$738,000", { width:1300, align:AlignmentType.CENTER, bold:true, color:GREEN, bgColor:LT_GRN }),
            cell("3,676", { width:700, align:AlignmentType.CENTER, bgColor:LT_GRN }),
            cell("No", { width:700, align:AlignmentType.CENTER, bgColor:LT_GRN }),
            cell("206 DOM — Same sqft, NO pool. Key anchor.", { width:1660, bgColor:LT_GRN }),
          ]}),
          new TableRow({ children:[
            cell("Nearby (Under Contract)", { width:2000 }),
            cell("Under Contract", { width:1600, bold:true, color:NAVY }),
            cell("$798,800", { width:1400, align:AlignmentType.CENTER, bold:true, color:NAVY }),
            cell("Pending", { width:1300, align:AlignmentType.CENTER }),
            cell("~3,900", { width:700, align:AlignmentType.CENTER }),
            cell("?", { width:700, align:AlignmentType.CENTER }),
            cell("Buyers still writing $800K checks.", { width:1660 }),
          ]}),
          new TableRow({ children:[
            cell("7400 Bisonwood — SUBJECT", { width:2000, bgColor:LT_BLUE }),
            cell("Re-List Target", { width:1600, bold:true, color:NAVY, bgColor:LT_BLUE }),
            cell("$769,000", { width:1400, align:AlignmentType.CENTER, bold:true, color:NAVY, bgColor:LT_BLUE }),
            cell("Target: $755K–$769K", { width:1300, align:AlignmentType.CENTER, bold:true, color:GREEN, bgColor:LT_BLUE }),
            cell("3,676", { width:700, align:AlignmentType.CENTER, bgColor:LT_BLUE }),
            cell("YES ✓", { width:700, align:AlignmentType.CENTER, bold:true, color:GREEN, bgColor:LT_BLUE }),
            cell("Pool premium: +$20K–$30K vs Brittlethorne", { width:1660, bgColor:LT_BLUE }),
          ]}),
        ]
      }),

      ...sp(1),
      body("Key insight: 7411 Brittlethorne sold at $738K with NO pool. Your home has a pool — a feature worth $20,000–$30,000 in this market. Properly positioned as an Event-Based invitation, $769K is a compelling price that gives us room for the market to respond in your favor.", { bold:true, color:NAVY }),
      ...sp(2),

      // ═══════════════════════════════════════════════
      // SECTION 3 — SOLAR FACTOR
      // ═══════════════════════════════════════════════
      sectionHdr("3.  The Solar Factor — The Question That Changes Everything", RED),
      ...sp(1),

      box([
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:60}, children:[
          new TextRun({ text:"\u26A0  Before Setting a Price: Dr. Jan Must Ask This First",
            bold:true, size:24, color:WHITE, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:0}, children:[
          new TextRun({ text:"Is the solar system OWNED OUTRIGHT, or is it a LEASE / LOAN / PACE agreement?",
            bold:true, size:26, color:GOLD, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:60,after:0}, children:[
          new TextRun({ text:"The answer determines the price, the buyer pool, and the marketing strategy.",
            size:20, color:WHITE, italic:true, font:"Arial" })
        ]}),
      ], NAVY, GOLD),

      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[2200,2380,2380,2400],
        rows:[
          new TableRow({ children:[
            hdr("Solar Type", { width:2200, align:AlignmentType.LEFT }),
            hdr("Impact on Sale", { width:2380 }),
            hdr("Impact on Buyer Pool", { width:2380 }),
            hdr("Pricing Adjustment", { width:2400 }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:2200,type:WidthType.DXA},
              shading:{fill:LT_GRN,type:ShadingType.CLEAR},
              margins:{top:80,bottom:80,left:120,right:120},
              children:[
                new Paragraph({children:[new TextRun({text:"OWNED OUTRIGHT",bold:true,size:20,color:GREEN,font:"Arial"})]}),
                new Paragraph({children:[new TextRun({text:"(Paid off — no lien, no lease)",size:18,color:M_GRAY,italic:true,font:"Arial"})]}),
              ]
            }),
            cell("Cleanest possible scenario. Transfers with title. Adds value. Market as $30K+ savings feature.", { width:2380, bgColor:LT_GRN, color:GREEN }),
            cell("ALL buyers qualify — conventional, FHA, VA, cash, investors", { width:2380, bgColor:LT_GRN, color:GREEN }),
            cell("ADD $10,000–$15,000 to listing price. Buyer sees long-term utility savings.", { width:2400, bgColor:LT_GRN, bold:true, color:GREEN }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:2200,type:WidthType.DXA},
              shading:{fill:LT_GOLD,type:ShadingType.CLEAR},
              margins:{top:80,bottom:80,left:120,right:120},
              children:[
                new Paragraph({children:[new TextRun({text:"SOLAR LOAN",bold:true,size:20,color:GOLD,font:"Arial"})]}),
                new Paragraph({children:[new TextRun({text:"(Monthly payment, not a lien)",size:18,color:M_GRAY,italic:true,font:"Arial"})]}),
              ]
            }),
            cell("Buyer must qualify to assume the loan. Adds to DTI. Requires solar company approval. Some buyers will walk.", { width:2380, bgColor:LT_GOLD, color:GOLD }),
            cell("Conventional & cash buyers OK. FHA/VA may have issues. No LLCs/corporations.", { width:2380, bgColor:LT_GOLD, color:GOLD }),
            cell("Hold at $769K BUT offer $5,000 seller concession toward buyer closing costs/rate buydown to offset friction.", { width:2400, bgColor:LT_GOLD, bold:true, color:ORANGE }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:2200,type:WidthType.DXA},
              shading:{fill:LT_ORG,type:ShadingType.CLEAR},
              margins:{top:80,bottom:80,left:120,right:120},
              children:[
                new Paragraph({children:[new TextRun({text:"SOLAR LEASE / PPA",bold:true,size:20,color:ORANGE,font:"Arial"})]}),
                new Paragraph({children:[new TextRun({text:"(Monthly lease to solar company)",size:18,color:M_GRAY,italic:true,font:"Arial"})]}),
              ]
            }),
            cell("Buyer assumes lease. Monthly payment impacts DTI. Solar company must approve transfer. MOST COMMON deal-complicating scenario.", { width:2380, bgColor:LT_ORG, color:ORANGE }),
            cell("Shrinks buyer pool. No LLCs. Buyer must pass solar company credit check separately from mortgage.", { width:2380, bgColor:LT_ORG, color:ORANGE }),
            cell("Price at $755,000 OR seller offers to pay off remaining lease balance at closing. Disclose upfront in listing.", { width:2400, bgColor:LT_ORG, bold:true, color:RED }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:2200,type:WidthType.DXA},
              shading:{fill:LT_RED,type:ShadingType.CLEAR},
              margins:{top:80,bottom:80,left:120,right:120},
              children:[
                new Paragraph({children:[new TextRun({text:"PACE / HERO LOAN",bold:true,size:20,color:RED,font:"Arial"})]}),
                new Paragraph({children:[new TextRun({text:"(Property tax assessment lien)",size:18,color:M_GRAY,italic:true,font:"Arial"})]}),
              ]
            }),
            cell("PACE stays with the property as a tax lien. MUST be disclosed. FHA and VA will NOT lend on PACE properties.", { width:2380, bgColor:LT_RED, color:RED }),
            cell("CONVENTIONAL and CASH ONLY. Cuts buyer pool by 30%+. Longest transfer issues.", { width:2380, bgColor:LT_RED, color:RED }),
            cell("Strong recommendation: Seller pays off PACE at closing. Otherwise price at $745,000 AND seller credit. Must be disclosed.", { width:2400, bgColor:LT_RED, bold:true, color:RED }),
          ]}),
        ]
      }),

      ...sp(1),
      body("Note: A Nevada real estate case saw a property sit unsold for an ENTIRE YEAR because the solar company refused to transfer to an LLC buyer. This is not theoretical. Disclosing early and pricing accordingly saves everyone months of pain.", { italic:true, color:RED }),
      ...sp(2),

      // ═══════════════════════════════════════════════
      // SECTION 4 — WHAT REALLY HAPPENED WITH THE SHOWINGS
      // ═══════════════════════════════════════════════
      sectionHdr("4.  The '100 Showings' Story — What to Validate Before You Price"),
      ...sp(1),
      body("Sellers claim 100 showings with zero offers. This is worth verifying in GLVAR before the listing appointment. Here is what the data actually suggests:"),
      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[3120,3120,3120],
        rows:[
          new TableRow({ children:[
            hdr("If 100 showings is accurate...", { width:3120, bgcolor:RED }),
            hdr("If 30–50 showings (more typical)", { width:3120, bgcolor:ORANGE }),
            hdr("What it likely means either way", { width:3120, bgcolor:NAVY }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:3120,type:WidthType.DXA},
              shading:{fill:LT_RED,type:ShadingType.CLEAR},
              margins:{top:100,bottom:100,left:130,right:130},
              children:[
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"Price was significantly overpriced — buyers used the home as a benchmark to justify buying elsewhere",size:19,color:D_GRAY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"OR the solar assumption was killing deals after buyers toured",size:19,color:RED,bold:true,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:0},children:[new TextRun({text:"OR undisclosed condition issue emerged during showings",size:19,color:D_GRAY,font:"Arial"})]}),
              ]
            }),
            new TableCell({
              borders:bAll, width:{size:3120,type:WidthType.DXA},
              shading:{fill:LT_ORG,type:ShadingType.CLEAR},
              margins:{top:100,bottom:100,left:130,right:130},
              children:[
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"Still a strong signal of overpricing — 30 showings with zero offers means buyers consistently rejected the value proposition",size:19,color:D_GRAY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:0},children:[new TextRun({text:"Solar assumption friction may have accounted for 20–40% of zero-offer outcomes",size:19,color:ORANGE,bold:true,font:"Arial"})]}),
              ]
            }),
            new TableCell({
              borders:bAll, width:{size:3120,type:WidthType.DXA},
              shading:{fill:LT_BLUE,type:ShadingType.CLEAR},
              margins:{top:100,bottom:100,left:130,right:130},
              children:[
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"THREE things need to change for Dr. Jan to succeed:",size:19,bold:true,color:NAVY,font:"Arial"})]}),
                new Paragraph({numbering:{reference:"numbers",level:0},spacing:{before:20,after:20},children:[new TextRun({text:"Correct price from Day 1",size:19,color:D_GRAY,font:"Arial"})]}),
                new Paragraph({numbering:{reference:"numbers",level:0},spacing:{before:20,after:20},children:[new TextRun({text:"Solar disclosure front and center",size:19,color:D_GRAY,font:"Arial"})]}),
                new Paragraph({numbering:{reference:"numbers",level:0},spacing:{before:20,after:0},children:[new TextRun({text:"Fresh MLS# = zero DOM, fresh eyes",size:19,color:D_GRAY,font:"Arial"})]}),
              ]
            }),
          ]}),
        ]
      }),

      ...sp(1),
      body("Action Item: Pull GLVAR history on MLS# 2717388 before your listing appointment. Know the original list price, every price reduction, and the total DOM. Walk in knowing more about their listing than they do.", { italic:true, bold:true, color:NAVY }),
      ...sp(2),

      // ═══════════════════════════════════════════════
      // SECTION 5 — PRICING SCENARIOS
      // ═══════════════════════════════════════════════
      sectionHdr("5.  Pricing Strategy — Three Scenarios Based on Solar Type"),
      ...sp(1),
      body("Because the solar situation is the single biggest variable, pricing scenarios are structured around it. Confirm solar type FIRST, then apply the matching scenario. Each scenario uses the Event-Based Invitation framework — priced to attract, not to anchor.", { italic:true, color:M_GRAY }),
      ...sp(1),

      // Scenario A
      box([
        new Paragraph({ spacing:{before:0,after:60}, children:[
          new TextRun({ text:"SCENARIO A  — Solar Owned Outright",
            bold:true, size:26, color:GOLD, font:"Arial" }),
          new TextRun({ text:"   |   Invitation Price: $769,000",
            bold:true, size:32, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:60}, children:[
          new TextRun({ text:"$209/sqft  |  Projected DOM: 20–35 days  |  Target Sale: $755,000–$769,000  |  Equity Gain from 2020: ~$184,000",
            size:19, color:GOLD, italic:true, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:30}, children:[
          new TextRun({ text:"Event-Based strategy: ", bold:true, size:20, color:WHITE, font:"Arial" }),
          new TextRun({ text:"$769K is set to attract 3–5 competing buyers simultaneously, not to sit and wait. 7411 Brittlethorne closed at $738K with NO pool. Add the pool premium, own the solar, and this is a compelling invitation that buyers will respond to within Days 7–14.",
            size:20, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:30,after:30}, children:[
          new TextRun({ text:"Marketing angle: ", bold:true, size:20, color:GOLD, font:"Arial" }),
          new TextRun({ text:"'Own the solar — no lease, no obligation, just savings.' Owned solar adds real value; appraisers increasingly support it in Nevada. Market to buyers who want to own their home AND their energy.",
            size:20, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:30,after:0}, children:[
          new TextRun({ text:"If we receive multiple offers, we do not automatically take the highest. We look at terms, contingencies, and net proceeds. This is where the Invitation Framework pays off.",
            bold:true, size:20, color:GOLD, font:"Arial" }),
        ]}),
      ], NAVY, GOLD),

      ...sp(1),

      // Scenario B
      box([
        new Paragraph({ spacing:{before:0,after:60}, children:[
          new TextRun({ text:"SCENARIO B  — Solar Loan (Monthly Payment Assumption)",
            bold:true, size:26, color:NAVY, font:"Arial" }),
          new TextRun({ text:"   |   Invitation Price: $769,000 + $5,000 Buyer Concession",
            bold:true, size:28, color:ORANGE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:60}, children:[
          new TextRun({ text:"Projected DOM: 25–40 days  |  Net to Seller: ~$758,000–$762,000  |  Effective buyer cost: offset by rate buydown",
            size:19, color:M_GRAY, italic:true, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:40}, children:[
          new TextRun({ text:"Strategy: ", bold:true, size:20, color:NAVY, font:"Arial" }),
          new TextRun({ text:"Hold headline price at $769K (the invitation stays strong) but offer a $5,000 seller concession toward buyer's closing costs or a 0.5-point rate buydown. At today's rates, a 0.5-point buydown saves the buyer ~$95/month — a real, tangible incentive that offsets the solar assumption friction without dropping the invitation price.",
            size:20, color:D_GRAY, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:0}, children:[
          new TextRun({ text:"Disclosure language for MLS: ", bold:true, size:20, color:NAVY, font:"Arial" }),
          new TextRun({ text:"'Solar loan in place — buyer to assume. Solar company approval required. Seller offering $5,000 concession to qualified buyer.' Puts it out front so only willing buyers tour.",
            size:20, color:D_GRAY, font:"Arial" }),
        ]}),
      ], LT_GOLD, ORANGE),

      ...sp(1),

      // Scenario C
      box([
        new Paragraph({ spacing:{before:0,after:60}, children:[
          new TextRun({ text:"SCENARIO C  — Solar Lease or PACE (Most Complicated)",
            bold:true, size:26, color:WHITE, font:"Arial" }),
          new TextRun({ text:"   |   Invitation Price: $749,000–$755,000",
            bold:true, size:28, color:GOLD, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:60}, children:[
          new TextRun({ text:"Projected DOM: 30–50 days  |  Buyer pool: Conventional & Cash ONLY  |  Full transparency required",
            size:19, color:GOLD, italic:true, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:40}, children:[
          new TextRun({ text:"Why the lower invitation price: ", bold:true, size:20, color:WHITE, font:"Arial" }),
          new TextRun({ text:"A solar lease or PACE loan eliminates FHA and VA buyers — typically 20–35% of the buyer market in this price range. Smaller pool requires a more compelling invitation to generate competitive activity. The goal is 2–3 serious offers from qualified buyers within 30 days.",
            size:20, color:WHITE, font:"Arial" }),
        ]}),
        new Paragraph({ spacing:{before:0,after:0}, children:[
          new TextRun({ text:"Best option if lease/PACE: ", bold:true, size:20, color:WHITE, font:"Arial" }),
          new TextRun({ text:"Seller pays off the solar balance at closing from proceeds and prices at $769K. This eliminates the restriction entirely, opens the full buyer pool, and often results in a higher net. Run the math: if solar payoff is under $25K, payoff almost always wins.",
            size:20, color:WHITE, font:"Arial" }),
        ]}),
      ], RED, GOLD),

      ...sp(2),

      // ═══════════════════════════════════════════════
      // SECTION 6 — NO OPEN HOUSES STRATEGY
      // ═══════════════════════════════════════════════
      sectionHdr("6.  No Open Houses — And That Is Actually Fine in 2026"),
      ...sp(1),
      body("Open houses in 2026 attract curiosity, not contracts. Research shows serious buyers in the $750K+ range ALWAYS schedule private showings after online research — they arrive with pre-approvals, their agent, and specific questions. Public open houses in this price range primarily attract neighbors and unqualified lookers.", { italic:true, color:M_GRAY }),
      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[4680,4680],
        rows:[
          new TableRow({ children:[
            hdr("What Replaces the Open House", { width:4680, bgcolor:NAVY }),
            hdr("Why It Works Better", { width:4680, bgcolor:NAVY }),
          ]}),
          new TableRow({ children:[
            cell("Broker preview (invitation-only) — top agents with $700K+ buyers get exclusive first look before public launch. They bring clients within 48 hours.", { width:4680, bgColor:LT_BLUE }),
            cell("Agent-driven showings close deals. A buyer's agent who loves the home will sell it for you. Open houses attract the agent to the next listing.", { width:4680 }),
          ]}),
          new TableRow({ children:[
            cell("Professional photo + drone + Matterport 3D virtual tour — buyers pre-qualify themselves before requesting a showing. Only serious buyers tour.", { width:4680 }),
            cell("Filters out lookers. Every person who walks through already wants the house. Cleaner, faster showings with higher offer conversion.", { width:4680, bgColor:LT_BLUE }),
          ]}),
          new TableRow({ children:[
            cell("Targeted digital ads — Zillow premium, Facebook/Instagram video to buyers actively searching $725K–$825K in 89131/89143/89149", { width:4680, bgColor:LT_BLUE }),
            cell("Puts the home in front of the 30 buyers per day actively searching this exact price band in Centennial Hills right now", { width:4680 }),
          ]}),
          new TableRow({ children:[
            cell("Direct mail to 500 nearby homeowners — neighbors know qualified buyers; word of mouth is powerful in gated communities", { width:4680 }),
            cell("Gated community neighbors often have family/friends looking to move in. This is the highest-conversion marketing channel many agents ignore", { width:4680, bgColor:LT_BLUE }),
          ]}),
        ]
      }),

      ...sp(1),
      body("Private showings only means: pre-qualified buyers only, scheduled 24 hours in advance, with a buyer's agent present. This actually gives sellers MORE control and security than an open house.", { bold:true, color:NAVY }),
      ...sp(2),

      // ═══════════════════════════════════════════════
      // SECTION 7 — FINANCING INTELLIGENCE
      // ═══════════════════════════════════════════════
      sectionHdr("7.  Financing Intelligence — What Your Buyer Looks Like Today"),
      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[4680,4680],
        rows:[
          new TableRow({ children:[
            hdr("At List Price $769,000 (20% down)", { width:4680 }),
            hdr("Buyer's Monthly Reality at 6.46%", { width:4680 }),
          ]}),
          new TableRow({ children:[
            new TableCell({
              borders:bAll, width:{size:4680,type:WidthType.DXA},
              margins:{top:100,bottom:100,left:130,right:130},
              children:[
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"Down Payment (20%)",size:19,color:M_GRAY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"Loan Amount",size:19,color:M_GRAY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"P&I at 6.46% (30-yr)",size:19,color:M_GRAY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"Estimated Taxes & Insurance",size:19,color:M_GRAY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:0},children:[new TextRun({text:"TOTAL Monthly Payment",bold:true,size:19,color:NAVY,font:"Arial"})]}),
              ]
            }),
            new TableCell({
              borders:bAll, width:{size:4680,type:WidthType.DXA},
              shading:{fill:LT_BLUE,type:ShadingType.CLEAR},
              margins:{top:100,bottom:100,left:130,right:130},
              children:[
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"$153,800",size:19,bold:true,color:NAVY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"$615,200",size:19,bold:true,color:NAVY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"~$3,940/month",size:19,bold:true,color:RED,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:30},children:[new TextRun({text:"~$650/month",size:19,bold:true,color:NAVY,font:"Arial"})]}),
                new Paragraph({spacing:{before:0,after:0},children:[new TextRun({text:"~$4,590/month",bold:true,size:22,color:RED,font:"Arial"})]}),
              ]
            }),
          ]}),
        ]
      }),

      ...sp(1),
      body("Why this matters for pricing: At $769K with today's rates, the buyer needs a qualifying income of approximately $165,000/year (using 33% housing ratio). That is a specific, qualified buyer — not everyone. Every $10,000 price reduction = about $60/month savings = expands the buyer pool. Price psychology matters: $769K vs. $770K is invisible. $769K vs. $779K loses buyers in the search filters.", { color:D_GRAY }),
      ...sp(1),
      body("Solar impact on financing: If the buyer assumes a $200/month solar lease, their DTI increases, meaning the qualifying income threshold rises to ~$172,000+. This is why solar disclosure upfront is critical to attracting buyers who can actually close.", { bold:true, color:RED }),
      ...sp(2),

      // ═══════════════════════════════════════════════
      // SECTION 8 — RECOMMENDED PRICE + PLAN
      // ═══════════════════════════════════════════════
      sectionHdr("8.  Dr. Jan's Recommended Invitation Price & 30-Day Action Plan"),
      ...sp(1),

      box([
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:60}, children:[
          new TextRun({ text:"Recommended Invitation Price (Event-Based Strategy)",
            bold:true, size:26, color:GOLD, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:40}, children:[
          new TextRun({ text:"$769,000",
            bold:true, size:56, color:WHITE, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:40}, children:[
          new TextRun({ text:"(conditioned on solar owned outright or payoff at closing)",
            size:19, color:GOLD, italic:true, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:40}, children:[
          new TextRun({ text:"If solar is a lease/PACE that cannot be paid off:  $749,000 + $5,000 buyer concession",
            size:20, color:WHITE, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:0}, children:[
          new TextRun({ text:"Target net to seller: $745,000–$762,000  |  Equity gain from 2020 purchase: ~$160,000–$177,000",
            size:19, color:GOLD, italic:true, font:"Arial" })
        ]}),
      ], NAVY, GOLD),

      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[1400,7960],
        rows:[
          new TableRow({ children:[
            hdr("When", { width:1400, align:AlignmentType.CENTER }),
            hdr("Action", { width:7960, align:AlignmentType.LEFT }),
          ]}),
          new TableRow({ children:[
            cell("Days -7 to -5", { width:1400, align:AlignmentType.CENTER, bold:true, color:PURPLE, bgColor:LT_PRP }),
            cell("PRE-LAUNCH: Confirm solar type in writing → Pull GLVAR MLS history → Book photographer, drone, Matterport 3D → Finalize listing copy with solar disclosed as a feature, not a footnote", { width:7960, bgColor:LT_PRP }),
          ]}),
          new TableRow({ children:[
            cell("Days -4 to -2", { width:1400, align:AlignmentType.CENTER, bold:true, color:PURPLE }),
            cell("COMING SOON STATUS: MLS Coming Soon tag live (agents can see it, no showings) → Personal calls to 20 top buyer agents in 89131/89143/89149 → Social media teasers → Pre-show interest list building", { width:7960 }),
          ]}),
          new TableRow({ children:[
            cell("Day 1", { width:1400, align:AlignmentType.CENTER, bold:true, color:NAVY, bgColor:LT_BLUE }),
            cell("INVITATION GOES LIVE: New MLS# Active at 8:00 AM — DOM resets to zero → Full media package live simultaneously (Zillow, BHHS, Trulia, Homes.com) → Pre-registered agents book Day 1–2 showings → Social launch campaign fires", { width:7960, bgColor:LT_BLUE }),
          ]}),
          new TableRow({ children:[
            cell("Day 3", { width:1400, align:AlignmentType.CENTER, bold:true, color:NAVY }),
            cell("Broker preview (private, invitation-only) — top agents with active $700K+ buyers get exclusive first look. Agents who tour sell. No public.", { width:7960 }),
          ]}),
          new TableRow({ children:[
            cell("Week 2", { width:1400, align:AlignmentType.CENTER, bold:true, color:NAVY, bgColor:LT_BLUE }),
            cell("Showing feedback compiled and sent to sellers → market update call → digital retargeting campaign activates (follows online visitors) → e-blast to Dr. Jan's buyer database of 500+ qualified buyers in Las Vegas", { width:7960, bgColor:LT_BLUE }),
          ]}),
          new TableRow({ children:[
            cell("Day 21–30", { width:1400, align:AlignmentType.CENTER, bold:true, color:GREEN }),
            cell("Target: 1–2 strong offers from pre-approved buyers → negotiate using Sharran's principle: evaluate net proceeds + terms + timeline, not just offer price → accepted contract in hand → California purchase timeline begins", { width:7960, color:GREEN, bold:true }),
          ]}),
          new TableRow({ children:[
            cell("Day 45–55", { width:1400, align:AlignmentType.CENTER, bold:true, color:GREEN }),
            cell("CLOSE on 7400 Bisonwood → sellers sign California purchase contract → moving trucks booked → California dream is real", { width:7960, color:GREEN, bold:true }),
          ]}),
        ]
      }),

      ...sp(1),

      new Table({
        width:{ size:9360, type:WidthType.DXA },
        columnWidths:[3120,3120,3120],
        rows:[
          new TableRow({ children:[
            hdr("Day 21 Check: 8+ showings, offers?", { width:3120, bgcolor:GREEN }),
            hdr("Day 21 Check: 4–7 showings, no offers?", { width:3120, bgcolor:ORANGE }),
            hdr("Day 21 Check: <4 showings?", { width:3120, bgcolor:RED }),
          ]}),
          new TableRow({ children:[
            cell("You are in the invitation sweet spot. Negotiate hard — hold firm or counter at list. The market is responding exactly as planned.", { width:3120, bgColor:LT_GRN, color:GREEN }),
            cell("Review showing feedback. Staging or condition issue likely. Address before Day 30. Hold price. Solar disclosure may need stronger framing.", { width:3120, bgColor:LT_ORG, color:ORANGE }),
            cell("Price adjustment of $10,000–$15,000 needed. Pre-launch outreach to be repeated. Solar situation must be re-evaluated.", { width:3120, bgColor:LT_RED, color:RED }),
          ]}),
        ]
      }),

      ...sp(2),

      // ═══════════════════════════════════════════════
      // CLOSE
      // ═══════════════════════════════════════════════
      box([
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:60}, children:[
          new TextRun({ text:"Why Dr. Jan Wins This Listing",
            bold:true, size:26, color:GOLD, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:60}, children:[
          new TextRun({ text:"I am walking into this appointment knowing more about 7400 Bisonwood than the sellers do. I know the original list history, every comp in the Preserves, exactly where the solar situation can make or break the deal, and why the previous strategy failed. I know which of Sharran Srivatsaa's three pricing strategies fits this exact situation — and I have the pre-launch blueprint already built. That is not luck. That is the preparation that gets your sellers to California.",
            size:20, color:WHITE, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:60}, children:[
          new TextRun({ text:"The invitation is set. The plan is ready. The only question is when we sign.",
            bold:true, size:22, color:GOLD, font:"Arial" })
        ]}),
        new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:0,after:0}, children:[
          new TextRun({ text:"Ready to list? Call or text 702-222-1964",
            bold:true, size:24, color:WHITE, font:"Arial" })
        ]}),
      ], NAVY, GOLD),

      ...sp(1),
      new Paragraph({
        alignment:AlignmentType.CENTER,
        children:[new TextRun({
          text:"Excited to maximize your equity, Dr. Jan \uD83D\uDCB0  |  janet.duffy@bhhsnv.com  |  S.0197614",
          size:20, color:M_GRAY, font:"Arial"
        })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Litman_ListingStrategy_Sharran_2026-04-05_v1.docx', buf);
  console.log('✅  Created: Litman_ListingStrategy_Sharran_2026-04-05_v1.docx');
}).catch(err => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
