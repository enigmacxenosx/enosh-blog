/**
 * Seed 5 SEO-optimized Editorial Noir articles into the blog database.
 * Run: npx tsx server/seed-articles.ts
 * These articles are reusable — skip rows whose slug already exists.
 */
import { getDb, slugExists } from "./db"
import { blogPosts } from "../drizzle/schema"

const now = new Date()

const ARTICLES = [
  {
    slug: "building-trust-in-kenyan-e-commerce",
    title: "Building Trust in Kenyan E-commerce: What Buyers Actually Look For",
    excerpt:
      "Price, authenticity, and delivery speed decide whether a Kenyan online shopper completes a purchase. Here is what research — and real listings — tell us.",
    tags: "e-commerce, kenya, consumer-trust",
    coverUrl: "",
    sortOrder: 5,
    body: `# Building Trust in Kenyan E-commerce: What Buyers Actually Look For

Online shopping in Kenya has moved from a novelty to a daily habit. Jumia, Kilimall, and Jiji all claim a slice of the market, but the real battle is not over inventory — it is over **trust**.

## The price is only the entry ticket

Shoppers comparing an item across three platforms expect the difference to be meaningful, not symbolic. A KES 50 gap between Jumia and Kilimall will not move a buyer; a KES 4,000 gap will. Platforms that surface the true comparison — including delivery fees — win the click.

## Authenticity signals beat marketing copy

Kenyan consumers have been burned by counterfeit electronics more than once. Listings that carry clear photos of the actual product, warranty terms, and seller history convert better than glossy stock imagery. Verified listings, as we call them at Enosx Tech Hub, are not a luxury feature — they are table stakes.

## Speed and after-sale support close the deal

The winning platform is the one that answers one question honestly: *when will it arrive, and what happens if it does not work?* Delivery estimates, return windows, and reachable support determine repeat purchases far more than banner discounts.

Trust, in other words, is built transaction by transaction. Every honest listing, every accurate photo, and every fulfilled promise is a deposit in the account a platform needs to survive the next decade of Kenyan e-commerce.`,
  },
  {
    slug: "price-history-why-it-matters-for-tech-buyers",
    title: "Price History: Why Every Tech Buyer Should Track Prices Before They Buy",
    excerpt:
      "A price drop is only a deal if it is real. Tracking price history protects buyers from artificial discounts — here is how to do it right.",
    tags: "price-tracking, shopping, data",
    coverUrl: "",
    sortOrder: 4,
    body: `# Price History: Why Every Tech Buyer Should Track Prices Before They Buy

Every November and December, the same pattern repeats: prices climb in September, "drop" in October, and shoppers celebrate a discount that never existed. This is why **price history** matters more than any coupon code.

## The anatomy of an artificial discount

Artificial discounts work in three steps. First, the seller raises the base price. Second, a countdown timer and a crossed-out original price create urgency. Third, the "discounted" price lands exactly where the real market price always was. Without history, you cannot see the trick.

## What a real price curve looks like

A genuine deal shows a slow drift downward as competition increases, with occasional genuine promotions. A manipulated curve shows a sharp pre-sale spike followed by a "discount" to the pre-spike level. One glance at the trend line separates the two.

## Track passively, decide actively

You do not need spreadsheets. Modern aggregators like [Enosx Tech Hub](https://enosxtech-hub.vercel.app) record prices each time you browse Jumia, Kilimall, and Jiji listings, then surface lowest-price, highest-price, and trend data on a dedicated history page. The rule is simple: if you cannot see the last three months, you are not comparing — you are hoping.`,
  },
  {
    slug: "editorial-noir-design-system",
    title: "Editorial Noir: Designing a Blog That Reads Like a Magazine",
    excerpt:
      "Playfair Display, charcoal canvases, and asymmetric grids — the reasoning behind the Editorial Noir design language used across Enosx's publications.",
    tags: "design, typography, case-study",
    coverUrl: "",
    sortOrder: 3,
    body: `# Editorial Noir: Designing a Blog That Reads Like a Magazine

The web is full of clean, minimal blogs. What is rare is a blog that feels like a **printed magazine** — weight, texture, and hierarchy you can almost touch. That is the ambition behind Editorial Noir, the design system powering this blog.

## Typography as the skeleton

Three typefaces carry everything. Playfair Display handles display moments — headlines and pull quotes that demand a serif presence. DM Sans takes body copy, where neutrality matters more than personality. Space Mono marks metadata: dates, tags, page numbers. The contrast between them creates the rhythm a magazine reader recognizes instantly.

## Color that stays out of the way

Charcoal (#0a0a0a) instead of pure black, warm white (#f0ece4) instead of pure white, and a single amber accent (#c9a96e). Warm neutrals read as paper stock under warm light; the amber is reserved for interaction, so it always means something.

## Asymmetric grids create tension

Symmetric layouts feel like templates. Editorial Noir offsets images from columns, hangs captions outside image boundaries, and varies the weight of left and right rails. The page is never balanced — but it is never chaotic. That tension, carefully controlled, is what makes readers feel they are reading something edited rather than generated.

Design systems, like magazines, live or die by consistency. Every component in the [_core layer](https://enosxtech.vercel.app) now enforces these three disciplines — and the result is a blog that does not just display words. It typesets them.`,
  },
  {
    slug: "ai-assistants-in-small-businesses-kenya",
    title: "AI Assistants in Kenyan Small Business: A Practical Field Guide",
    excerpt:
      "From invoice drafting to inventory alerts, AI is quietly entering Nairobi's SMEs. What works, what does not, and how to start without a technical team.",
    tags: "ai, small-business, kenya, productivity",
    coverUrl: "",
    sortOrder: 2,
    body: `# AI Assistants in Kenyan Small Business: A Practical Field Guide

You do not need a data science team to get value from AI. For a Nairobi SME, the highest-return applications are boring ones: invoicing, inventory, follow-ups, and reporting. Here is a field guide from real deployments, including [Enosx BizOS](https://enosxtech.vercel.app).

## Start where the paperwork is

The first hour of AI time should go to the task your business repeats most. For most SMEs that is either invoicing or customer follow-up. An assistant that drafts an invoice from a list of line items saves minutes every single day — and minutes compound into margins.

## Govern the assistant, don't unleash it

The difference between an AI tool that helps and one that creates chaos is governance. Good systems restrict the assistant to a small set of permitted actions — answer questions, summarize operations, draft tasks, prepare invoice drafts — and validate every mutation with the same rules a human operator would face. If the assistant cannot explain what it changed, do not let it change anything.

## Local data, local context

Generic AI advice often fails in the Kenyan context because it assumes tools and infrastructure that do not exist here. Ask questions in Kiswahili or Sheng, expect invoice templates formatted for KRA compliance, and check that delivery estimates reflect local logistics. The assistants that survive are the ones tuned to the market they serve.

The practical path is not to adopt everything at once. Pick one repetitive task, put a governed assistant on it, measure the hours saved, and scale from there.`,
  },
  {
    slug: "photography-nairobi-street-frames",
    title: "Nairobi Through the Frame: Street Photography Lessons From the City",
    excerpt:
      "Light at six in the morning, matatus as moving portraits, and the discipline of waiting — notes on photographing Nairobi with intention.",
    tags: "photography, nairobi, street",
    coverUrl: "",
    sortOrder: 1,
    body: `# Nairobi Through the Frame: Street Photography Lessons From the City

Nairobi is a generous city for photographers, but generosity is not the same as ease. The city gives you everything at once — light, color, movement, noise — and the photographer's job is to refuse most of it.

## The golden hour is not just about the sun

Everyone knows the light is best at dawn. What matters more is what the light *does* to people. At six in the morning, Nairobi's pace is unhurried; faces are lit from the side; shadows are long enough to compose around. By nine, the light flattens and the city accelerates. Shoot early not for the color temperature, but for the rhythm.

## Matatus are moving portrait studios

No subject in Nairobi carries more visual information than a matatu. The artwork tells you the owner's ambitions, the neighborhood's taste, and the route's history. The lesson: treat each matatu as a character study, not a vehicle. Wait for the driver's face, the passenger's gesture, or the conductor's call before releasing the shutter.

## Subtract until it hurts

The hardest discipline in street photography is subtraction. A frame with seven interesting elements usually beats a frame with none — but a frame with *one* unforgettable element beats everything. Crop aggressively. Step closer. Remove the sign, the bystander, the second vehicle. The photo becomes stronger exactly when you are afraid you removed too much.

Nairobi will not stop moving. Your job is to decide, frame by frame, what deserves to stand still.`,
  },
] as const

async function main() {
  const db = await getDb()
  if (!db) {
    throw new Error("Database not available. Set DATABASE_URL before running the seed script.")
  }

  let added = 0
  for (const a of ARTICLES) {
    const exists = await slugExists(a.slug)
    if (exists) {
      console.log(`skip  ${a.slug} (exists)`)
      continue
    }
    await db.insert(blogPosts).values({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      body: a.body,
      tags: a.tags,
      coverUrl: a.coverUrl,
      status: "published",
      publishedAt: now,
      sortOrder: a.sortOrder,
    })
    added++
    console.log(`added ${a.slug}`)
  }
  console.log(`done — ${added} article(s) inserted`)
}

main().catch((e) => {
  console.error("seed failed:", e)
  process.exit(1)
})
