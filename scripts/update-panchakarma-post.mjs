/**
 * Patches the "what-is-panchakarma" Sanity blog post with the rewritten content.
 *
 * Usage:
 *   node scripts/update-panchakarma-post.mjs          # dry-run (prints patch, no write)
 *   node scripts/update-panchakarma-post.mjs --apply  # writes to Sanity
 *
 * Requires SANITY_API_TOKEN in environment (editor token from Sanity Studio).
 * SANITY_PROJECT_ID and SANITY_DATASET are read from the same env (or fall back to defaults).
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

function span(text, marks = []) {
  return { _type: 'span', _key: key(), text, marks }
}

function linked(text, href) {
  const linkKey = key()
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [{ _key: linkKey, _type: 'link', href }],
    children: [span(text, [linkKey])],
  }
}

function paragraphWithLinks(segments) {
  // segments: array of { text, href? }
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
  // parts: array of { text, strong?: true }
  const children = parts.map(p =>
    p.strong ? { _type: 'span', _key: key(), text: p.text, marks: ['strong'] } : span(p.text)
  )
  return { _type: 'block', _key: key(), style: 'normal', markDefs: [], children }
}

// ---- Article content (Portable Text blocks) ----

const content = [
  // Intro
  normal('Panchakarma — literally "five actions" in Sanskrit — is Ayurveda\'s most comprehensive healing protocol. It isn\'t a single treatment: it\'s a physician-supervised medical programme, first codified in the Charaka Samhita over 2,000 years ago, that uses five distinct therapeutic procedures to remove accumulated toxins (Ama) and restore balance to the body\'s three governing energies — Vata, Pitta, and Kapha. At Vaidya Vrindavanam in Haripad, Kerala, we administer Panchakarma under the direct supervision of our BAMS and MD Ayurveda physicians — because this is, above all, a medical procedure.'),

  // Key Takeaways (as a blockquote intro + bullets)
  blockquote('Key Takeaways'),
  bullet([span('Panchakarma is a five-part medical detoxification protocol from the 2,000-year-old Charaka Samhita — not a spa treatment')]),
  bullet([span('Each of the five therapies works through a different elimination channel (respiratory, digestive, nasal, colon)')]),
  bullet([span('A complete programme has three mandatory phases: Poorvakarma (preparation), Pradhanakarma (main therapies), Paschatkarma (recovery)')]),
  bullet([span('Programmes at our Haripad clinic run 7-21 days under physician supervision')]),

  // Section 1
  h2('How Does Panchakarma Differ from a Spa Detox or Cleanse?'),

  normal('The word "detox" is applied to everything from green juice fasts to infrared saunas. It\'s worth being direct about what separates Panchakarma from those approaches. Most commercial detox programmes work through a single elimination pathway for a few days. Panchakarma works through five channels simultaneously — under direct physician oversight — preceded by a full preparatory phase that loosens toxins from the deep tissues before any purification begins.'),

  normal('A juice cleanse might stimulate the liver briefly. Panchakarma systematically unloads the liver, large intestine, respiratory tract, nasal passages, and lymphatic channels — each through a targeted medical procedure — and then follows up with a structured recovery protocol. The classical Ayurvedic texts are explicit on this point: beginning the main purification procedures without adequate preparation is like washing a wet cloth. You move the contamination around rather than removing it.'),

  normal('What you\'ll also notice at a qualified Ayurveda clinic is that no two patients receive the same Panchakarma. Your constitution (Prakriti), current imbalance (Vikriti), digestive strength (Agni), age, and health history determine which of the five therapies you receive, in what order, and for how long. This individualisation is where the therapeutic precision sits.'),

  // Section 2
  h2('The Five Therapies of Panchakarma'),

  normal('The five therapies were first documented in the Charaka Samhita and Ashtanga Hridayam — Ayurveda\'s twin foundational classical texts, compiled between 600 BCE and 200 CE. Each works through a specific physiological pathway. A patient may receive all five or a curated subset, based on clinical assessment. At our clinic in Haripad, the physician determines this after the initial consultation.'),

  h3('1. Vamanam (Therapeutic Emesis)'),

  normal('Vamanam uses controlled, medically induced vomiting to clear excess Kapha dosha from the upper respiratory and digestive tract. This is distinct from illness-related nausea: the patient drinks a specific medicated preparation after several days of internal oleation, and the process is carefully timed and supervised. It\'s the treatment of choice for chronic respiratory conditions — asthma, recurrent bronchitis, sinusitis — and for skin disorders where Kapha accumulation is the root cause.'),

  paragraphWithLinks([
    { text: 'Learn about Vamanam at our clinic', href: '/treatments/vamanam/' },
    { text: ' →' },
  ]),

  h3('2. Virechanam (Therapeutic Purgation)'),

  normal('Virechanam uses medicated herbal preparations to produce a controlled purging of the small intestine and liver, targeting excess Pitta. It\'s effective for inflammatory conditions: psoriasis, eczema, chronic acidity, IBS, and hormonal irregularities. The preparatory oleation phase is especially critical here — the channels need adequate lubrication before purgation begins, so toxins move outward rather than deeper into the tissues.'),

  h3('3. Nasyam (Nasal Administration)'),

  normal('The nose is the gateway to the head in Ayurvedic anatomy, and Nasyam uses that pathway directly. Medicated oils, herbal powders, or liquid preparations are administered through the nasal passages to reach the sinus cavities, upper respiratory tract, and brain channels. Nasyam is highly effective for chronic sinusitis, cervical spondylosis, migraines, and conditions affecting mental clarity.'),

  paragraphWithLinks([
    { text: 'View our Nasyam treatment', href: '/treatments/nasyam/' },
    { text: ' →' },
  ]),

  h3('4. Kashaya Vasti (Decoction Enema)'),

  normal('The classical Charaka Samhita describes Vasti — the two enema-based therapies — as capable of addressing the vast majority of Vata disorders. Kashaya Vasti delivers a medicated herbal decoction into the colon to cleanse it deeply and restore Vata balance. It\'s most commonly used for lower back pain, sciatica, joint disorders, and neurological conditions.'),

  paragraphWithLinks([
    { text: 'View our Vasti treatment', href: '/treatments/vasthi/' },
    { text: ' →' },
  ]),

  h3('5. Sneha Vasti (Oil Enema)'),

  normal('Sneha Vasti uses medicated oil rather than a decoction. Where Kashaya Vasti cleanses, Sneha Vasti nourishes — it lubricates the colonic tissues, supports the nervous system, and replenishes depleted Vata. The two Vastis are typically administered in an alternating protocol and together form the backbone of most Panchakarma programmes for musculoskeletal and neurological conditions.'),

  // Section 3
  h2('The Three Phases — Why Preparation Matters as Much as the Treatment'),

  normal('Experienced Panchakarma physicians consistently find that the preparatory phase determines how deeply the treatment can reach. Skip it, and the purification procedures clear only superficial accumulations. Follow it properly, and the main therapies can address imbalances that have been building for years.'),

  h3('Poorvakarma (Preparation)'),

  normal('Poorvakarma runs 3-7 days before the main procedures and has two components:'),

  strongNormal([
    { text: 'Snehana (oleation)', strong: true },
    { text: ' — both internal and external. Internal oleation involves drinking medicated ghee in increasing doses over several days; it loosens fat-soluble toxins from the deeper tissues. External Snehana is the full-body Abhyangam oil massage, using herbal oils specific to your condition and constitution.' },
  ]),

  paragraphWithLinks([
    { text: 'Learn about Abhyangam Swedam at our clinic', href: '/treatments/abhyangam-swedam/' },
    { text: ' →' },
  ]),

  strongNormal([
    { text: 'Swedana (steam therapy)', strong: true },
    { text: ' — applied after Abhyangam to open the body\'s channels (Srotas), further loosen toxins, and prepare them to move toward the elimination pathways during the main procedures.' },
  ]),

  h3('Pradhanakarma (Main Procedures)'),

  normal('The main procedures are the five therapies above, selected and sequenced by your physician based on your clinical assessment. This isn\'t a fixed protocol — it\'s a custom treatment plan adjusted to your constitution, condition, and current strength.'),

  h3('Paschatkarma (Post-Therapy Recovery)'),

  normal('Paschatkarma is the phase most commonly underestimated — and most completely skipped in home detox attempts. After the main purification procedures, the digestive system is in a sensitive, receptive state. Paschatkarma includes:'),

  strongNormal([
    { text: 'Samsarjana Krama', strong: true },
    { text: ' — a graduated dietary return beginning with liquid foods and slowly reintroducing solids over 5-7 days.' },
  ]),

  bullet([span('Follow-up herbal medicines tailored to the condition being treated')]),
  bullet([span('Lifestyle and activity guidelines that consolidate the detoxification and help prevent re-accumulation')]),

  normal('Completing Paschatkarma is what distinguishes a genuinely therapeutic Panchakarma programme from a temporary symptomatic intervention.'),

  // Section 4
  h2('Who Should Consider Panchakarma — and Who Should Not'),

  normal('Panchakarma works best for people with established chronic conditions, significant Ama accumulation, or those seeking genuine preventive Ayurvedic healthcare. Good candidates include:'),

  paragraphWithLinks([
    { text: 'People with chronic musculoskeletal conditions such as back pain', href: '/conditions/back-pain/' },
    { text: ', arthritis, or sciatica — Vasti therapy in particular shows strong outcomes for these' },
  ]),

  bullet([span('Those with inflammatory skin disorders (psoriasis, eczema, chronic dermatitis)')]),

  paragraphWithLinks([
    { text: 'People managing chronic stress, anxiety, or sleep disorders', href: '/conditions/stress-anxiety/' },
    { text: ' linked to Vata-Pitta imbalance' },
  ]),

  bullet([span('Individuals with digestive conditions including IBS, chronic acidity, or constipation')]),
  bullet([span('Those seeking seasonal preventive detox — traditionally recommended at the junction of Ayurvedic seasons (Ritusandhi)')]),
  bullet([span('Patients with neurological conditions including cervical spondylosis, frozen shoulder, or early-stage Parkinson\'s')]),

  strongNormal([{ text: 'Who should not undergo Panchakarma:', strong: true }]),

  normal('Panchakarma is a medical procedure, and certain conditions contraindicate it:'),

  bullet([span('Active fever, infection, or acute inflammation')]),
  bullet([span('Pregnancy or active menstruation (for most procedures)')]),
  bullet([span('Extreme weakness or very low body weight')]),
  bullet([span('Active bleeding disorders')]),
  bullet([span('Recent major surgery (within 3-6 months)')]),

  normal('If you\'re uncertain whether you\'re a good candidate, the initial consultation at our Haripad clinic will identify this before any treatment begins.'),

  // Section 5
  h2('What to Expect at Vaidya Vrindavanam, Haripad'),

  normal('Our clinic sits near RK Junction on NH-66, Haripad — a short drive from the centre of Alappuzha district. We\'ve been providing Ayurvedic care since 2014, combining classical Kerala Panchakarma protocols with modern clinical assessment.'),

  normal('Every Panchakarma programme begins with a detailed consultation with Dr. Jayakrishnan T J (BAMS) or Dr. Ganga S S (BAMS), covering your Prakriti, Vikriti, Agni, and overall health status. This assessment drives your entire protocol: which therapies you receive, which medicated preparations we use, and how many days each phase runs.'),

  normal('A typical programme runs 7-21 days. Shorter programmes (7-10 days) address specific targeted conditions. Full programmes (14-21 days) suit deeper constitutional detoxification or complex chronic presentations.'),

  normal('We offer both day-visit and residential formats. Residential care keeps you in a calm, supported environment between treatments — particularly important during Paschatkarma, which is difficult to complete properly when returning to a stressful daily routine. For patients travelling from outside Haripad or from abroad, the residential format produces the best outcomes.'),

  paragraphWithLinks([
    { text: 'View our residential packages', href: '/packages/' },
    { text: ' →' },
  ]),

  // Section 6
  h2('Benefits of Completing a Full Residential Panchakarma'),

  normal('The improvements patients report after completing a full programme often extend beyond the presenting condition. This isn\'t unusual: Panchakarma addresses systemic imbalances rather than individual symptoms, so clearing one channel often produces positive changes elsewhere.'),

  normal('What patients consistently experience:'),

  strongNormal([
    { text: 'Significant reduction in musculoskeletal pain and inflammation', strong: true },
    { text: ' — particularly for back pain and joint conditions — with improvements that continue for weeks after the programme ends as the body completes its internal rebalancing.' },
  ]),

  strongNormal([
    { text: 'Improved digestion and appetite regulation', strong: true },
    { text: ', often reported even by patients who came for an unrelated condition.' },
  ]),

  strongNormal([
    { text: 'Better sleep and reduced anxiety', strong: true },
    { text: ', notably in patients who undertook the programme for physical rather than mental health conditions.' },
  ]),

  strongNormal([
    { text: 'Lighter, more energised feeling', strong: true },
    { text: ' in the weeks following Paschatkarma, as the digestive channels clear and Agni strengthens.' },
  ]),

  strongNormal([
    { text: 'Mental clarity and reduced brain fog', strong: true },
    { text: ', particularly after Nasyam and the full oleation protocol.' },
  ]),

  normal('The residential format supports all of this. You eat medically appropriate food, rest between procedures, and aren\'t pulled back into daily obligations during the critical preparation and recovery phases.'),
]

// ---- FAQs ----

const faqs = [
  {
    question: 'How long does a Panchakarma programme take?',
    answer: 'A complete Panchakarma programme typically runs 14-21 days, covering Poorvakarma (preparation), Pradhanakarma (main therapies), and the initial Paschatkarma (recovery). Focused 7-10-day programmes are available for specific conditions. At Vaidya Vrindavanam, the physician determines the right duration during your initial consultation based on your condition and constitution.',
  },
  {
    question: 'What are the side effects of Panchakarma?',
    answer: 'Panchakarma produces expected responses as the detoxification progresses — these are not adverse effects but signs the programme is working. Common experiences include temporary fatigue during the first days of oleation, digestive changes during the main procedures, and occasional mild skin eruptions as toxins clear. All procedures are medically supervised, and the physician adjusts the protocol if responses are stronger than expected.',
  },
  {
    question: 'Who is not suitable for Panchakarma?',
    answer: 'Contraindications include active fever, severe anaemia, pregnancy, active bleeding disorders, and significant physical weakness. Individual procedures have specific additional contraindications — Vamanam is not performed in patients with cardiac conditions or hiatus hernia, for example. Your consultation will identify any contraindications before the programme begins.',
  },
  {
    question: 'How much does Panchakarma cost in Kerala?',
    answer: 'Costs depend on programme duration, the procedures included, and whether you choose residential or day-visit format. Authentic medically supervised Panchakarma in Kerala — administered by qualified physicians using genuine preparations — is considerably more affordable than equivalent programmes in Europe or the Gulf, without any reduction in clinical quality. Contact us via WhatsApp for a personalised quote based on your condition and programme length.',
  },
  {
    question: 'How often should I undergo Panchakarma?',
    answer: 'Classical Ayurvedic texts recommend Panchakarma once yearly, ideally at a seasonal junction (Ritusandhi) when the body is most receptive to purification. For people with chronic conditions, twice-yearly programmes may be recommended during the first few years. After completing a programme, your physician will advise the appropriate interval for your constitution and health goals.',
  },
]

// ---- Main ----

async function run() {
  // Find the post document
  const doc = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id, title, slug }`,
    { slug: 'what-is-panchakarma' }
  )

  if (!doc) {
    console.error('ERROR: Post with slug "what-is-panchakarma" not found in Sanity.')
    process.exit(1)
  }

  console.log(`Found post: "${doc.title}" (${doc._id})`)

  if (!APPLY) {
    console.log('\n--- DRY RUN (pass --apply to write) ---')
    console.log(`\nContent blocks: ${content.length}`)
    console.log(`FAQ items: ${faqs.length}`)
    console.log('\nFirst 3 content blocks:')
    content.slice(0, 3).forEach((b, i) => {
      const text = b.children?.map(c => c.text).join('').slice(0, 80)
      console.log(`  [${i}] style=${b.style ?? b.listItem ?? '?'} — "${text}..."`)
    })
    console.log('\nFAQs:')
    faqs.forEach((f, i) => console.log(`  [${i}] Q: ${f.question}`))
    console.log('\nRun with --apply to patch the live Sanity document.')
    return
  }

  // Apply the patch
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
