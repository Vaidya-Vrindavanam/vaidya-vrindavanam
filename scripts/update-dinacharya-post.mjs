/**
 * Patches the "ayurvedic-daily-routine" Sanity blog post with the rewritten content.
 *
 * Usage:
 *   node scripts/update-dinacharya-post.mjs          # dry-run (prints patch, no write)
 *   node scripts/update-dinacharya-post.mjs --apply  # writes to Sanity
 *
 * Requires SANITY_API_TOKEN in environment (editor token from Sanity Studio).
 */

import { createClient } from '@sanity/client'
import { randomBytes } from 'crypto'

const PROJECT_ID = process.env.SANITY_PROJECT_ID ?? '7rhexv2k'
const DATASET = process.env.SANITY_DATASET ?? 'production'
const TOKEN = process.env.SANITY_API_TOKEN

const APPLY = process.argv.includes('--apply')

if (APPLY && !TOKEN) {
  console.error('ERROR: SANITY_API_TOKEN is not set. Export it before running with --apply.')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: TOKEN,
})

// ---- Portable Text helpers ----

function key() {
  return randomBytes(4).toString('hex')
}

function normal(text) {
  return { _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

function h2(text) {
  return { _type: 'block', _key: key(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

function h3(text) {
  return { _type: 'block', _key: key(), style: 'h3', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

function blockquote(text) {
  return { _type: 'block', _key: key(), style: 'blockquote', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

function bullet(children, markDefs = []) {
  return { _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs, children }
}

function ordered(children, markDefs = []) {
  return { _type: 'block', _key: key(), style: 'normal', listItem: 'number', level: 1, markDefs, children }
}

function span(text, marks = []) {
  return { _type: 'span', _key: key(), text, marks }
}

function paragraphWithLinks(segments) {
  const markDefs = []
  const children = segments.map(seg => {
    if (seg.href) {
      const k = key()
      markDefs.push({ _key: k, _type: 'link', href: seg.href })
      return span(seg.text, [k])
    }
    return span(seg.text)
  })
  return { _type: 'block', _key: key(), style: 'normal', markDefs, children }
}

function strongNormal(parts) {
  const children = parts.map(p =>
    p.strong
      ? { _type: 'span', _key: key(), text: p.text, marks: ['strong'] }
      : span(p.text)
  )
  return { _type: 'block', _key: key(), style: 'normal', markDefs: [], children }
}

// ---- Article content ----

const content = [
  // Intro
  normal('Dinacharya — the Ayurvedic daily routine — is one of the simplest and most overlooked tools in preventive medicine. The word means "daily conduct" in Sanskrit, and the Ashtanga Hridayam dedicates an entire chapter to it. Not as a rigid schedule, but as a framework for aligning your body with the rhythms of the natural world. You don\'t need to follow every practice. Start with two or three, and you\'ll notice a difference within a week. At Vaidya Vrindavanam in Haripad, Kerala, we recommend Dinacharya to almost every patient — because lifestyle is often where imbalance begins, and where it can also be reversed.'),

  // Key Practices at a Glance
  blockquote('Key Practices at a Glance'),
  bullet([span('Wake during Brahma Muhurta (45 minutes before sunrise) to use the most sattvic time of day')]),
  bullet([span('Begin with warm water, tongue scraping, and oil pulling before food or screens')]),
  bullet([span('Abhyanga (self-oil massage) before bathing is one of the highest-return daily practices for the nervous system')]),
  bullet([span('Make lunch your largest meal — Agni (digestive fire) peaks at midday according to classical Ayurveda')]),
  bullet([span('Sleep by 10 PM to allow the body\'s Pitta-governed repair cycle to run without interruption')]),

  // Section 1
  h2('What Is Dinacharya and Why Does It Work?'),

  normal('Ayurveda\'s logic is that the body runs on biological rhythms — and that disrupting those rhythms is itself a cause of disease. The Doshas shift in 4-hour cycles through the day: Kapha dominates the morning hours (6-10 AM), Pitta governs midday and midnight (10 AM-2 PM, 10 PM-2 AM), and Vata runs the remaining windows. Dinacharya structures your activities — sleep, meals, exercise, rest — to work with these cycles rather than against them.'),

  normal('The person who eats a heavy meal at 9 PM and sleeps at 1 AM is fighting Pitta time with exactly the wrong inputs. These small misalignments, repeated daily for years, are what Ayurveda identifies as the root of most lifestyle disorders.'),

  // Section 2
  h2('Morning Routine (Brahma Muhurta)'),

  normal('The classical texts describe the morning as the most important part of the day. Get this right, and the rest tends to follow.'),

  h3('Wake Before Sunrise'),

  normal('Ayurveda recommends waking during Brahma Muhurta — roughly 45 minutes before sunrise, around 5:30-6 AM depending on the season. This is Vata time: the mind is clear, the air is fresh, and the body is naturally primed to move from rest to activity. Sleeping through this window and waking in Kapha time (after 6 AM) leaves many people feeling heavy and sluggish even after adequate sleep. The transition matters as much as the total hours.'),

  h3('Drink Warm Water on Waking'),

  normal('Before anything else, drink a full glass of warm water. This kickstarts Agni, stimulates peristalsis, and helps clear the GI tract of waste accumulated overnight. In our clinical experience at Haripad, patients who adopt this single habit consistently report improved digestion within two weeks. Add a squeeze of lime or a thin slice of fresh ginger if your digestion is sluggish; plain warm water is fine for most constitutions.'),

  h3('Tongue Scraping and Oil Pulling'),

  normal('Two often-skipped practices with a clear rationale. Tongue scraping (Jihwa Prakshalana) uses a copper or stainless steel scraper to remove the coating on the tongue — this coating, visible in the morning, is Ama (undigested metabolic waste). Removing it prevents reabsorption and improves taste sensitivity. Oil pulling (Gandusha) involves swishing a tablespoon of sesame or coconut oil in the mouth for 5-10 minutes. Classical texts attribute this to strengthening the gums, teeth, and jaw. Both take under 15 minutes combined.'),

  h3('Abhyanga (Self-Oil Massage)'),

  normal('This is the practice patients most often say they wish they\'d started sooner. Warm sesame oil applied to the entire body before bathing — long strokes on the limbs, circular motions on the joints — takes 10-15 minutes and has a disproportionate effect on the nervous system. Abhyanga directly pacifies Vata, which governs the nervous system, movement, and anxiety. It\'s the basis of the clinical treatment we offer at our clinic, and the self-practice version is a useful daily approximation.'),

  paragraphWithLinks([
    { text: 'View Abhyangam Swedam treatment', href: '/treatments/abhyangam-swedam/' },
    { text: ' →' },
  ]),

  h3('Bathing'),

  normal('Follow Abhyanga with a warm bath. Not hot — avoid very hot water on the head, which aggravates Pitta. The bath emulsifies the oil and helps it penetrate the deeper tissue layers. This is why the sequence matters: oil first, then water.'),

  // Section 3
  h2('How Should You Eat Through the Day?'),

  normal('Ayurvedic nutrition is not primarily about what you eat — it\'s about when and how. Meal timing and eating environment affect digestion more than most people realise.'),

  h3('Make Lunch the Main Meal'),

  normal('Agni is strongest between 10 AM and 2 PM. This is the time to eat your largest, most complex meal. Breakfast should be light and warm. Dinner should be lighter still, taken before 7 PM if possible, and at least two to three hours before sleep. Reversing this — light breakfast, desk lunch, heavy dinner — is one of the most common patterns we see in patients presenting with chronic digestive complaints, poor sleep, and weight gain. The food itself may be fine; the timing is working against the body.'),

  h3('Eat Mindfully'),

  normal('Sit down. No screens. Chew thoroughly. The classical guideline is to fill the stomach one-third with food, one-third with water, and leave one-third empty — this isn\'t a metaphor for moderation, it\'s a prescription for creating the physical space Agni needs to work. Cold water with meals dampens digestive fire; warm water or a small cup of warm soup is preferable.'),

  h3('Seasonal Adjustments'),

  normal('Ayurveda adjusts diet by season (Ritucharya). In summer, favour cooling foods: sweet fruits, coconut water, cucumber, dairy. In the Kerala monsoon season, digestive fire weakens — eat warm, lightly spiced, well-cooked foods. In winter, the body can handle richer, more nourishing foods and healthy fats. Patients who follow these seasonal shifts tend to get through the monsoon without the respiratory and digestive complaints that affect others.'),

  // Section 4
  h2('Exercise — How Much Is Right for You?'),

  normal('The Ayurvedic principle on exercise is counterintuitive for anyone raised on "push harder" fitness culture. The classical texts recommend exercising to half capacity — meaning you stop when you notice sweat on the forehead, underarms, and along the spine. Going further depletes Ojas, the vital essence that supports immunity, mental clarity, and resilience.'),

  normal('What form of exercise? Yoga asanas and Surya Namaskar in the morning are the classical recommendation. Brisk walking works well. Pranayama — particularly Nadi Shodhana (alternate nostril breathing) and Bhastrika — supports both the cardiovascular and nervous systems. Avoid exercising in the afternoon or during the heat of the day.'),

  // Section 5
  h2('Evening Wind-Down and Dinner'),

  normal('As Pitta gives way to Vata in the late afternoon, the right response is to slow down. Reduce screen brightness. Lower ambient lighting after 7 PM. Move physically demanding tasks earlier in the day.'),

  normal('Take a short walk after dinner. The classical texts mention 100 steps, which takes a few minutes around the house. This is not for cardiovascular benefit — it\'s to support digestion. Avoid heavy physical or mental activity in the two to three hours before sleep.'),

  paragraphWithLinks([
    { text: 'Patients managing stress and anxiety', href: '/conditions/stress-anxiety/' },
    { text: ' often find that the evening wind-down combined with warm-water foot oil application at bedtime produces measurable improvements in sleep quality within a fortnight.' },
  ]),

  // Section 6
  h2('Sleep (Nidra)'),

  normal('Sleep is one of the three pillars of health in Ayurveda, alongside food and celibacy (Brahmacharya). The classical sleep window is 10 PM to 6 AM. The period between 10 PM and 2 AM is Pitta time, when the body performs its internal repair and metabolic cleansing. Staying awake past 10 PM means Pitta energy that should go toward repair instead goes toward mental activity — which is why late nights feel stimulating rather than calm, and why sleep after midnight is often lighter and less restorative.'),

  normal('Before sleep: apply a small amount of warm sesame oil to the soles of the feet. This calms the nervous system and reduces mental restlessness. Five minutes of slow breathing or quiet sitting is enough. Avoid eating within two hours of bed.'),

  paragraphWithLinks([
    { text: 'For patients with significant sleep disturbance, Shirodhara', href: '/treatments/shirodhara/' },
    { text: ' — a specialised therapy in which warm medicated oil is poured continuously over the forehead — is one of the most effective clinical interventions we offer at our Haripad clinic.' },
  ]),

  // Section 7
  h2('Starting When You Cannot Follow Everything'),

  normal('You won\'t adopt all of this at once. That\'s expected. Start with one practice and hold it for two weeks before adding another. The order that tends to work best for patients at our Alappuzha district clinic:'),

  ordered([span('Warm water on waking', ['strong']), span(' — easiest entry point, immediate digestive benefit')]),
  ordered([span('Make lunch the main meal', ['strong']), span(' — requires planning but has a large downstream effect')]),
  ordered([span('Sleep by 10:30 PM', ['strong']), span(' — harder than it sounds, but the improvement in morning energy is usually motivation enough')]),
  ordered([span('Abhyanga twice a week', ['strong']), span(' — start with twice rather than daily; most patients extend it naturally once they feel the effect')]),

  normal('Small, consistent changes build better health over years. That\'s the premise of Dinacharya, and it\'s why we return to it with almost every patient regardless of what they came in for.'),

  paragraphWithLinks([
    { text: 'Book a consultation at Vaidya Vrindavanam, Haripad', href: '/packages/' },
    { text: ' →' },
  ]),
]

// ---- FAQs ----

const faqs = [
  {
    question: 'What is Dinacharya in Ayurveda?',
    answer: 'Dinacharya is the Ayurvedic daily routine described in classical texts like the Ashtanga Hridayam. It prescribes a sequence of daily practices — from waking time to bedtime — designed to align the body with natural rhythms, strengthen digestion, calm the nervous system, and prevent the accumulation of Ama (metabolic waste). It is not a rigid schedule; it is a framework adapted to your constitution (Prakriti) and current state (Vikriti).',
  },
  {
    question: 'What is Brahma Muhurta and why does Ayurveda recommend waking then?',
    answer: 'Brahma Muhurta is the period approximately 45 minutes before sunrise, around 5:30-6 AM. Ayurveda considers this Vata time: the atmosphere is quiet, the mind naturally clear, and the body is at its most receptive to meditation, pranayama, and gentle movement. Waking in this window sets the tone for a stable, alert day. Sleeping past sunrise, into Kapha time, tends to produce the heaviness many people attribute wrongly to not being a morning person.',
  },
  {
    question: 'What is Abhyanga and can I do it at home?',
    answer: 'Abhyanga is the practice of applying warm oil to the entire body before bathing. Sesame oil is the classical choice for most constitutions; coconut oil suits Pitta types or summer months. The self-practice takes 10-15 minutes: long strokes on the limbs, circular motions on the joints, gentle pressure on the abdomen. It directly pacifies Vata, supports the lymphatic system, and calms the nervous system. The clinical version — Abhyangam Swedam — uses medicated oils applied by a therapist and is considerably more intensive.',
  },
  {
    question: 'How does Dinacharya help with stress and sleep problems?',
    answer: 'The Vata-pacifying practices in Dinacharya — Abhyanga, Brahma Muhurta waking, warm oil on the feet at bedtime, and consistent sleep timing — directly target the nervous system dysregulation behind most stress and sleep complaints. Vata governs movement and the nervous system; chronic stress and poor sleep are classic signs of elevated Vata. Following these practices consistently tends to reduce anxiety and improve sleep quality over two to four weeks.',
  },
  {
    question: 'Do I need to follow the full Dinacharya routine to see benefits?',
    answer: 'No. Even two or three practices adopted consistently produce results. The warm-water morning habit and shifting to a larger lunch are often sufficient to improve digestion and energy within two to three weeks. Dinacharya is not all-or-nothing — it is a set of tools, and you use the ones that fit your life. A physician consultation will identify which practices are most relevant to your constitution and current health goals.',
  },
]

// ---- Main ----

async function run() {
  const doc = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id, title, slug }`,
    { slug: 'ayurvedic-daily-routine' }
  )

  if (!doc) {
    console.error('ERROR: Post with slug "ayurvedic-daily-routine" not found in Sanity.')
    process.exit(1)
  }

  console.log(`Found post: "${doc.title}" (${doc._id})`)

  if (!APPLY) {
    console.log('\n--- DRY RUN (pass --apply to write) ---')
    console.log(`\nContent blocks: ${content.length}`)
    console.log(`FAQ items: ${faqs.length}`)
    console.log('\nFirst 3 content blocks:')
    content.slice(0, 3).forEach((b, i) => {
      const text = (b.children ?? []).map(c => c.text ?? '').join('').slice(0, 80)
      console.log(`  [${i}] style=${b.style ?? b.listItem ?? '?'} — "${text}..."`)
    })
    console.log('\nFAQs:')
    faqs.forEach((f, i) => console.log(`  [${i}] Q: ${f.question}`))
    console.log('\nRun with --apply to patch the live Sanity document.')
    return
  }

  const result = await client
    .patch(doc._id)
    .set({ content, faqs })
    .commit()

  console.log(`\nPatched document: ${result._id} (rev: ${result._rev})`)
  console.log('Done. Trigger a Vercel rebuild to publish the changes.')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
