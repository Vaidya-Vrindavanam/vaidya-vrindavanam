// Treatment-page detail content (mirrors conditionDetails.ts structure).
// Renders below the Sanity prose to add: clinical overview, procedure phases,
// conditions cross-link, session details, and FAQs (with FAQPage schema).
//
// Condition slugs available for `helpsConditions` cross-links:
//   arthritis, asthma, diabetes, geriatric-care, hypertension, infertility,
//   obesity, skin-disorders, stress-anxiety, varicose-veins, womens-health.

export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface ProcedurePhase {
  phase: string;
  description: string;
}

export interface SessionDetails {
  duration: string;
  frequency: string;
  whatToExpect: string;
  contraindications: string;
}

export interface TreatmentDetail {
  overview: string;
  procedure: ProcedurePhase[];
  helpsConditions: string[];
  sessionDetails: SessionDetails;
  faqs: TreatmentFAQ[];
}

export const treatmentDetails: Record<string, TreatmentDetail> = {
  'abhyangam-swedam': {
    overview:
      "Abhyangam is the foundational full-body warm-oil massage of Kerala Ayurveda, traditionally followed by Swedam — herbal steam fomentation that opens srotas (channels) and drives the medicated oil deeper into tissue. At Vaidya Vrindavanam this combination is rarely prescribed in isolation: it is the preparatory phase (Purvakarma) that softens the body before deeper Panchakarma procedures, and a stand-alone weekly therapy for stress, fatigue, joint stiffness, and the early signs of Vata aggravation. Oils are selected for the patient's prakriti — Dhanwantaram, Mahanarayana, Ksheerabala, or Sahacharadi — rather than a one-size-fits-all blend, and steam is delivered via a traditional wooden chamber that exposes the body but spares the head.",
    procedure: [
      {
        phase: "Consultation & oil selection",
        description:
          "A short pulse and prakriti reading determines whether the session leans Vata-pacifying (warming sesame-based oils), Pitta-pacifying (cooling coconut-based oils), or Kapha-pacifying (lighter mustard or castor blends). For specific complaints — joint pain, sciatica, insomnia — a targeted classical formulation is chosen.",
      },
      {
        phase: "Synchronised oil massage (Abhyangam)",
        description:
          "Two trained therapists work in rhythm along the seven classical positions — supine, left lateral, prone, right lateral, then seated for the head. Strokes follow the direction of body hair growth, with sustained pressure over marma points and longer attention to areas of complaint.",
      },
      {
        phase: "Herbal steam (Swedam)",
        description:
          "The patient enters a wooden steam chamber where the head remains outside while medicated steam — infused with Dashamoola, Nirgundi, Eranda, or Rasna depending on indication — bathes the rest of the body for 10–15 minutes. Steam temperature is calibrated to the patient's tolerance and never raised to the point of discomfort.",
      },
      {
        phase: "Rest and rehydration",
        description:
          "After steam, the body is gently towelled (oil is not fully removed for 30–45 minutes to allow continued absorption). Warm water and a light herbal drink follow, with at least 20 minutes of rest before the patient leaves the treatment room.",
      },
    ],
    helpsConditions: ["arthritis", "stress-anxiety", "geriatric-care"],
    sessionDetails: {
      duration: "60–75 minutes per session (45 min Abhyangam + 15 min Swedam + rest)",
      frequency: "Daily for 7–14 days as preparatory or rejuvenative course; weekly for maintenance",
      whatToExpect:
        "Mild drowsiness and a feeling of heaviness for 1–2 hours after the first few sessions are normal. Most patients report deeper sleep that night and noticeably looser joints by the third or fourth day. A full residential course produces measurable improvement in stamina, skin texture, and Vata-related symptoms by day 10.",
      contraindications:
        "Avoid during acute fever, active infection, indigestion, the first 48 hours after a heavy meal, and during menstruation. Pregnancy after the first trimester is permitted only with modified strokes and gentler oils. Patients with uncontrolled hypertension, severe varicose veins, or recent surgery must inform the consulting physician — protocol is adjusted, not refused.",
    },
    faqs: [
      {
        q: "Is Abhyangam the same as a regular spa massage?",
        a: "No. Spa massage focuses on muscle relaxation using neutral oils. Abhyangam is therapeutic — oils are selected for your dosha and complaint, strokes follow classical marma-point sequences, and the protocol is supervised by an Ayurvedic physician, not a spa technician.",
      },
      {
        q: "How many sessions do I need for noticeable results?",
        a: "For general rejuvenation, 7 daily sessions are the classical minimum. For specific complaints — chronic stiffness, post-illness recovery, sleep disturbance — 14 sessions are recommended. One-off sessions are useful but do not produce the cumulative tissue-level changes that a course delivers.",
      },
      {
        q: "Will I smell of oil after the session?",
        a: "Some residual oil scent on hair and skin is expected for a few hours and is part of the therapy. We provide a warm herbal bath powder (sunipindi or triphala choornam) at the end, which removes excess oil while preserving the medicinal residue absorbed by the skin.",
      },
      {
        q: "Can I do Abhyangam if I have high blood pressure?",
        a: "Yes, with adjustments. We use cooling oils (Chandanadi or coconut-based formulations), avoid intense pressure on the neck and shoulders, and shorten the steam phase. Patients on antihypertensive medication continue their usual dosage; the consulting physician monitors blood pressure on day 1 and day 7.",
      },
      {
        q: "Do I need to stay at the hospital, or can I come daily?",
        a: "Both options are available. Day-care patients should plan to rest for 30 minutes after each session and avoid driving immediately. Residential patients benefit from a controlled diet, supervised rest, and the consistency of a fixed daily schedule — typically producing better outcomes for chronic conditions.",
      },
    ],
  },

  'agnikarmam': {
    overview:
      "Agnikarmam is a parasurgical procedure described in classical Sushruta Samhita where controlled thermal stimulation is applied to specific anatomical points to relieve chronic pain and stimulate localised healing. At Vaidya Vrindavanam it is reserved for well-defined indications — heel spur (calcaneal pain), chronic plantar fasciitis, painful knee osteoarthritis, lumbar and cervical spondylosis with localised tenderness, and stubborn musculoskeletal pain that has not responded to oils, kizhi, or internal medication. The procedure is precise, brief, and performed only after detailed marma mapping and patient consent. It is not a first-line treatment; we use it when softer therapies have plateaued and the pain has a fixed, identifiable focal point.",
    procedure: [
      {
        phase: "Diagnosis & point selection",
        description:
          "The treating physician palpates the painful area to identify the exact tender point (often a marma or a focal trigger), correlates it with imaging (X-ray, MRI), and confirms that the pain is localised rather than radiating from a central source. Suitable candidates are explained the procedure in full and given written information before consent.",
      },
      {
        phase: "Site preparation",
        description:
          "The area is cleaned and a thin layer of medicated paste or oil is applied around — never on — the point of intervention to protect adjacent skin. The patient is positioned for comfort and stillness, and a sterile field is set up.",
      },
      {
        phase: "Thermal application",
        description:
          "A heated metal probe — typically panchaloha (five-metal alloy) or specialised Ayurvedic instruments — is applied to the marked point for a fraction of a second. The duration and depth are calibrated to the tissue type: skin-level for superficial pain, slightly deeper for joint capsule involvement. The procedure is brief; most points take under 3 seconds.",
      },
      {
        phase: "Post-procedure care",
        description:
          "A medicated cooling paste (often containing yashtimadhu or sandalwood) is applied immediately after. The patient rests for 20–30 minutes, is given oral pain assessment, and walks before discharge. Follow-up dressing instructions are provided; most patients need only 1–2 dressing changes over the following week.",
      },
    ],
    helpsConditions: ["arthritis"],
    sessionDetails: {
      duration: "30–45 minutes total (consultation + brief 1–3 minute thermal procedure + rest)",
      frequency: "Single session for most indications; occasionally repeated after 2–3 weeks if pain recurs",
      whatToExpect:
        "A sharp, brief sensation at the moment of application, followed by immediate cooling and a noticeable reduction in baseline pain within 24–48 hours. A small focal mark — like a healed burn the size of a pinhead — remains for 7–14 days and fades. Most patients walk out of the clinic; some report 60–80% pain reduction in heel spur and localised joint pain by the second week.",
      contraindications:
        "Pregnancy, bleeding disorders, uncontrolled diabetes, immunosuppression, active skin infection at the site, and patients on long-term anticoagulants. Children under 16 and adults over 75 are evaluated case-by-case. Generalised pain without a focal tender point is not an indication — Agnikarmam works on specific points, not zones.",
    },
    faqs: [
      {
        q: "Is Agnikarmam painful?",
        a: "There is a brief sharp sensation at the moment of application, lasting under a second per point. Most patients describe it as comparable to a vaccination prick. We apply a cooling paste immediately afterward, and the post-procedure pain is minimal — typically less than the chronic pain that brought the patient in.",
      },
      {
        q: "Will it leave a scar?",
        a: "A small pinhead-sized mark is visible for 7–14 days as the skin heals. Pigmentation may persist for a few months in some patients but usually fades fully within 6 months. We discuss this honestly during consultation; for cosmetically sensitive areas we either decline the procedure or use the smallest possible probe.",
      },
      {
        q: "How is it different from cautery in modern medicine?",
        a: "Modern cautery is generally used to seal blood vessels or remove tissue. Agnikarmam in Ayurveda is a therapeutic intervention at marma or trigger points to interrupt chronic pain pathways and stimulate local healing — the depth and intent are different. The instruments and protocol are also classical, not adapted from electrosurgery.",
      },
      {
        q: "How soon will I feel relief?",
        a: "Most patients experience reduced pain within 48–72 hours. For heel spur and plantar fasciitis, the relief is often striking by day 7. For deeper musculoskeletal pain, full benefit develops over 3–4 weeks as inflammation resolves and the tissue remodels.",
      },
      {
        q: "Do I need to stop my pain medication?",
        a: "No. Continue your prescribed medication during and immediately after the procedure. As pain subsides over the following weeks, your primary physician can taper dosage. We coordinate with your treating doctor when needed.",
      },
    ],
  },

  'choorna-pinda-swedam': {
    overview:
      "Choorna Pinda Swedam — also called Podi Kizhi — is a therapeutic massage performed with linen boluses filled with a heated mixture of medicinal powders. Unlike oil-based therapies, it delivers a dry, penetrating heat that is particularly effective for Kapha- and Vata-Kapha-type joint pain, stiffness, swelling, and conditions involving Ama (metabolic toxin accumulation). At Vaidya Vrindavanam, the powder formulation — typically a blend of Rasna, Eranda, Devadaru, Kolakulathadi choornam — is selected to match the dominant pathology, and the bolus temperature is closely monitored throughout the session. It is one of our most prescribed therapies for osteoarthritis, rheumatoid presentations, frozen shoulder, and post-fracture stiffness.",
    procedure: [
      {
        phase: "Powder preparation",
        description:
          "The classical formulation is freshly heated on a slow flame each session day — never reheated from a previous batch. Powders are tied into linen boluses (kizhi) of standardised size and weight to ensure uniform heat delivery and pressure during the massage.",
      },
      {
        phase: "Light oil application",
        description:
          "A thin layer of medicated oil — usually Murivenna or Kottamchukkadi tailam — is applied to the body to prevent friction and protect the skin from direct heat. Oil quantity is minimal; the therapy is fundamentally dry-heat-based, unlike Pizhichil or Abhyangam.",
      },
      {
        phase: "Bolus massage",
        description:
          "Two therapists work in rhythm, dabbing and stroking the heated boluses across the affected joints and the full body. Boluses are reheated continuously on a hot plate so a fresh one is always in contact with the skin. Strokes follow standard classical positions, with extra time over inflamed joints.",
      },
      {
        phase: "Wipe-down and rest",
        description:
          "The herbal residue is wiped off with warm cloth (no shower for at least an hour), and the patient rests for 20–30 minutes covered in a light blanket. A warm herbal drink and dietary instructions follow.",
      },
    ],
    helpsConditions: ["arthritis", "obesity"],
    sessionDetails: {
      duration: "60–75 minutes per session",
      frequency: "Daily for 7–14 days as a structured course; rarely as a one-off",
      whatToExpect:
        "Warmth and a mild sweating response during the session are expected. Patients with significant joint stiffness often report visibly reduced swelling and improved range of motion within 3–5 sessions. The dry herbal scent and minimal oil residue make it preferable for patients who dislike heavy oil therapies.",
      contraindications:
        "Active fever, acute inflammation with redness and severe pain, pregnancy, severe dehydration, recent surgical wounds, and uncontrolled hypertension. Patients with very dry, sensitive skin (high Vata) tolerate it less well — we usually substitute Elakizhi in such cases.",
    },
    faqs: [
      {
        q: "How is Choorna Pinda Swedam different from Elakizhi?",
        a: "Both use linen boluses, but Choorna Pinda Swedam uses dry herbal powders heated dry, while Elakizhi uses fresh medicinal leaves dipped in warm oil. The dry-heat approach of Choorna Pinda is preferred for Kapha and Ama-dominant conditions; the oil-based Elakizhi is preferred for Vata-dominant joint pain and stiffness.",
      },
      {
        q: "Can I take this therapy alongside my arthritis medication?",
        a: "Yes. There is no interaction between the herbal powders applied externally and oral medications. We document your current prescriptions during intake and coordinate with your rheumatologist when relevant. Most patients are able to reduce NSAID frequency over a 14-day course.",
      },
      {
        q: "Will the heat be uncomfortable?",
        a: "The boluses are kept at a temperature that is warm but tolerable. Therapists test each bolus on the patient's wrist before applying it to the affected area. If the heat is too intense, we reduce it immediately; we never push beyond comfort.",
      },
      {
        q: "Is one session enough to feel a difference?",
        a: "You may feel slight warmth and reduced stiffness after a single session, but the cumulative effect of a 7–14 day course is what produces sustained improvement in joint mobility and inflammation reduction.",
      },
      {
        q: "Do I need to follow a special diet during the course?",
        a: "Yes — light, warm, easily digestible food is recommended. We provide specific dietary guidance during your consultation. Heavy, cold, or fried foods slow the body's response to the therapy and reduce results.",
      },
    ],
  },

  'elakizhi': {
    overview:
      "Elakizhi — also known as Patra Pinda Swedam — uses linen boluses filled with chopped fresh medicinal leaves (Nirgundi, Eranda, Arka, Karavellaka, Tamarind) that are dipped in warm medicated oil and applied to the body in rhythmic strokes. The combination of oil-based heat and the volatile compounds in the fresh leaves makes it one of the most effective therapies for Vata-dominant musculoskeletal conditions: chronic joint pain, post-injury stiffness, lumbar spondylosis, sports injuries, and the muscle-wasting that follows prolonged immobility. Many patients move directly from Abhyangam-Swedam into Elakizhi as the second phase of a 14-day course, when deeper oil penetration and targeted heat are needed.",
    procedure: [
      {
        phase: "Leaf bolus preparation",
        description:
          "Fresh leaves are sourced and chopped each morning; pre-cut bundles are not used. The leaves are sautéed briefly in medicated oil (Murivenna, Sahacharadi, or Mahanarayana tailam selected by indication), tied into linen boluses, and kept warm in a vessel of the same oil during the session.",
      },
      {
        phase: "Body oil application",
        description:
          "A standard Abhyangam pre-stroke is performed with the same medicated oil for 10–15 minutes to warm the tissue and open superficial channels. This is shorter than a full Abhyangam — its purpose is preparation, not therapy in itself.",
      },
      {
        phase: "Bolus massage",
        description:
          "Two therapists work in synchronised pairs, dipping boluses in warm oil and applying them with a combination of dabbing, stroking, and gentle pounding motions. Painful joints receive sustained contact; surrounding muscles get rhythmic strokes. Boluses are rotated and re-warmed every 2–3 minutes.",
      },
      {
        phase: "Final stroke and rest",
        description:
          "The session closes with a calming downstroke from head to feet, the body is wiped lightly (oil is left on), and the patient rests under a warm cloth for 20–30 minutes. A warm herbal drink follows.",
      },
    ],
    helpsConditions: ["arthritis", "geriatric-care"],
    sessionDetails: {
      duration: "75–90 minutes per session (longest of the kizhi therapies due to bolus preparation)",
      frequency: "Daily for 7–14 days; can extend to 21 days for severe chronic conditions",
      whatToExpect:
        "Warmth and a herbal aroma are continuous through the session. Most patients fall into a light sleep by the second or third bolus pass. Joint mobility improvement is often noticeable from day 4–5; a full course typically produces 60–80% reduction in chronic stiffness and Vata-related pain.",
      contraindications:
        "Acute fever, active dermatitis or skin infection at the application site, pregnancy (first trimester), and patients with allergies to any of the leaf components — we screen carefully for known plant allergies during intake.",
    },
    faqs: [
      {
        q: "Is Elakizhi suitable for elderly patients?",
        a: "Yes — and it is one of the gentlest therapies for older patients with Vata-dominant joint stiffness, balance issues, or post-stroke recovery. We adjust bolus temperature and pressure carefully for fragile skin or osteoporotic bones, and the session is performed in a supine, well-supported position.",
      },
      {
        q: "How does Elakizhi compare to Njavara Kizhi?",
        a: "Elakizhi uses medicinal leaves dipped in oil — strongly anti-inflammatory and Vata-pacifying. Njavara Kizhi uses cooked Njavara rice in herbal milk — strongly nourishing and tissue-rebuilding. The two are often sequenced: Elakizhi reduces inflammation first, then Njavara Kizhi rebuilds depleted muscle and joint tissue.",
      },
      {
        q: "Can it help with sciatica?",
        a: "Yes. Sciatic pain — when caused by Vata aggravation, lumbar disc compression, or piriformis tightness — responds well to Elakizhi over the lower back, hip, and posterior leg. We typically combine it with Kati Vasthi for spinal involvement and oral Kashayam internally.",
      },
      {
        q: "Will the oil stain my clothes?",
        a: "Yes — the medicated oils are dark and persistent. We provide disposable cotton wraps for the session. Bring older clothes for travel home, and avoid light-coloured fabrics during a course.",
      },
      {
        q: "Can I do Elakizhi as a single session for general wellness?",
        a: "It is possible, but the effect is limited. The therapy is designed as a course; tissue-level changes — reduced inflammation, improved circulation, restored mobility — accumulate over 7+ days. A single session is more like a sample than a treatment.",
      },
    ],
  },

  'jambeera-pinda-swedam': {
    overview:
      "Jambeera Pinda Swedam uses linen boluses filled with chopped lemons (Jambeera) sautéed with rock salt, garlic, and a specific mix of warming herbs in medicated oil. The citric acid and volatile oils from the lemon — combined with the warming spices — produce a sharp, penetrating heat that is unmatched for releasing deep-seated stiffness, sports injuries, and persistent muscle knots. It is one of the more vigorous Kerala kizhi therapies and is reserved for patients with strong constitutions: athletes, manual workers, post-injury recovery, and chronic frozen shoulder or lumbar pain that has not responded to gentler kizhi treatments.",
    procedure: [
      {
        phase: "Bolus preparation",
        description:
          "Fresh lemons are quartered and sautéed with rock salt, sliced garlic, methika, and other warming herbs in Murivenna or Karpooradi oil for 8–10 minutes. The mixture is tied into linen boluses while still warm and kept in heated oil during the session.",
      },
      {
        phase: "Pre-massage oil",
        description:
          "A short, vigorous Abhyangam with warming oil (Mahanarayana, Karpooradi, or Murivenna) prepares the muscle tissue and opens channels for the more intense bolus phase to follow.",
      },
      {
        phase: "Lemon bolus application",
        description:
          "Boluses are applied with deeper pressure than a standard Elakizhi, focusing on knotted muscle groups, frozen joints, and trigger points. The heat is more intense due to the citric and saline content; therapists check tolerance every few minutes and rotate to fresh boluses frequently.",
      },
      {
        phase: "Cooling and rest",
        description:
          "After the bolus phase, the body is wiped with warm cloth and a thin layer of cooling oil (often coconut-based) is applied to balance the residual heat. Rest for 30 minutes follows; a warm herbal drink and a light meal close the session.",
      },
    ],
    helpsConditions: ["arthritis"],
    sessionDetails: {
      duration: "60–75 minutes per session",
      frequency: "Daily for 7–10 days; rarely extended beyond two weeks",
      whatToExpect:
        "Strong warmth and a distinct citrus-herbal scent throughout the session. A faint tingling on the skin is normal and indicates active circulation. Athletes and patients with chronic muscle injuries often notice substantial release of long-held tension within the first 3–4 sessions.",
      contraindications:
        "Sensitive or thin skin, broken skin or fresh wounds, severe Pitta aggravation, active inflammation with redness, pregnancy, hypertension on multiple medications, and any history of citrus allergy. We screen carefully — this is a powerful therapy and not the right starting point for everyone.",
    },
    faqs: [
      {
        q: "Why lemon? Is the citric acid safe on the skin?",
        a: "Yes — the lemons are sautéed in oil with salt before being tied into boluses, which neutralises raw acid contact while preserving the volatile oils that produce therapeutic heat. The skin is also protected by a base layer of medicated oil applied before the session.",
      },
      {
        q: "Is it suitable for delicate skin?",
        a: "Generally not. We recommend Elakizhi or Choorna Pinda Swedam for patients with thin, sensitive, or Pitta-dominant skin. Jambeera Pinda Swedam is best suited for thicker, Vata-Kapha skin with deep musculoskeletal complaints.",
      },
      {
        q: "Can it help my frozen shoulder?",
        a: "Yes. Frozen shoulder, especially when stuck for several months, responds particularly well to Jambeera Pinda Swedam combined with progressive range-of-motion exercises. A 10-day course often restores 60–80% of lost movement, with continued home exercises completing the recovery.",
      },
      {
        q: "Will the strong scent linger?",
        a: "The citrus-herbal scent stays on the skin and clothes for several hours and clears with the next bath. Most patients find it pleasant; if it is bothersome, we shift to Elakizhi which has a milder herbal scent.",
      },
      {
        q: "Is this a recovery therapy for athletes?",
        a: "Yes — it is one of the most effective traditional therapies for sports recovery, treating strains, chronic muscle stiffness, post-game soreness, and recurring injuries. We have worked with kabaddi players, cyclists, and martial artists; specific protocols are tailored to the sport.",
      },
    ],
  },

  'katee-greeva-vasthi': {
    overview:
      "Katee Vasthi (lower back) and Greeva Vasthi (neck) are localised oil-pooling therapies in which a dough ring of black gram flour is built on the patient's body and filled with warm medicated oil that is kept at a steady therapeutic temperature for 30–45 minutes. The held oil penetrates deeply into the lumbar or cervical tissue, soothing nerve roots, lubricating joint capsules, and resolving the stiffness and pain of disc bulges, spondylosis, sciatica, and chronic neck strain. At Vaidya Vrindavanam these are among our most-prescribed therapies for office workers, drivers, and patients with imaging-confirmed lumbar or cervical disc issues.",
    procedure: [
      {
        phase: "Dough ring construction",
        description:
          "Black gram (urad) flour is kneaded into a stiff dough and shaped into a ring that fits precisely around the lower back (Katee) or back of the neck (Greeva). The ring is sealed to the skin so it can hold warm oil without leakage.",
      },
      {
        phase: "Oil filling",
        description:
          "Warm medicated oil — Mahanarayana, Sahacharadi, Dhanwantaram, or Ksheerabala — is poured into the dough basin to a depth of about 2 cm. The oil is kept at a steady therapeutic temperature (just above body temperature) by replacing it every 8–10 minutes with freshly warmed oil.",
      },
      {
        phase: "Holding phase",
        description:
          "The patient lies still for 30–45 minutes, with the oil bathing the spinal segment continuously. Many patients fall into a light sleep. The deep, sustained warmth allows the medicated oil to penetrate well below the surface, reaching the muscle and ligament layer.",
      },
      {
        phase: "Drainage and gentle massage",
        description:
          "The dough ring is opened and the oil drained. A gentle massage over the same region completes the procedure; the oil residue is left on the skin. The patient rests for 20 minutes before discharge.",
      },
    ],
    helpsConditions: ["arthritis"],
    sessionDetails: {
      duration: "45–60 minutes per session",
      frequency: "Daily for 7–14 days; combined with Elakizhi or Pizhichil for severe spinal cases",
      whatToExpect:
        "A warm, calming sensation pools over the spine; most patients describe it as the most relaxing therapy on their itinerary. Pain relief typically begins from day 3–4; structural improvement (reduced spasm, better spinal mobility) develops over the full course. Many patients report returning to long-distance driving or desk work without pain after a 14-day course.",
      contraindications:
        "Open wounds at the application site, severe skin disease, very recent spinal surgery (less than 6 weeks), uncontrolled hypertension during the lying phase, and pregnancy (Katee Vasthi specifically). Greeva Vasthi requires modification in patients with severe arthritis of the neck — we use a shorter holding phase.",
    },
    faqs: [
      {
        q: "Will the dough ring stay sealed for 45 minutes?",
        a: "Yes — properly prepared black gram dough holds oil reliably for the full session. Therapists check the seal at each oil change. In the rare event of seepage, the ring is reinforced without disturbing the patient's position.",
      },
      {
        q: "Is it safe with a herniated disc?",
        a: "Yes, and it is often particularly effective for disc-related pain. We review your MRI report during consultation. For acute disc prolapse with severe radiating pain, we may add Vasthi (medicated enema) and oral Kashayam to the protocol.",
      },
      {
        q: "How is this different from a hot oil massage?",
        a: "A massage applies oil with strokes for 30–60 seconds at any given point. Vasthi holds warm oil over the spine for 30–45 minutes continuously — the depth of penetration and the duration of therapeutic contact are entirely different. Imaging studies show measurable changes in muscle tension after a course of Katee Vasthi.",
      },
      {
        q: "Can I do this for a stiff neck from desk work?",
        a: "Greeva Vasthi is one of the most common therapies we prescribe for desk workers with chronic neck and shoulder stiffness, tension headaches, and early cervical spondylosis. A 7-day course is usually sufficient for these presentations.",
      },
      {
        q: "Will I be able to walk after the session?",
        a: "Yes — patients walk out of the treatment room normally. We recommend avoiding heavy lifting and long drives for the rest of the day, and continuing gentle stretches at home.",
      },
    ],
  },

  'marma-chikitsa': {
    overview:
      "Marma Chikitsa is the therapeutic application of pressure, manipulation, and oil to the 107 marma points described in the Sushruta Samhita — vital junctions where prana, blood vessels, nerves, and connective tissue intersect. At Vaidya Vrindavanam this classical practice is integrated with modern chiropractic principles to treat chronic pain, post-injury recovery, neurological conditions, and structural imbalances that purely soft-tissue therapies cannot resolve. It is the hospital's signature offering. Each session is fully physician-led: the points worked, the pressure applied, and the sequence are determined by the specific imbalance, not by a fixed protocol. Patients with sciatica, frozen shoulder, post-stroke weakness, sports injuries, and chronic spinal pain often come specifically for this treatment.",
    procedure: [
      {
        phase: "Marma assessment",
        description:
          "The treating physician palpates the relevant marma points to identify those that are tender, blocked, or hyperactive. Findings are correlated with the patient's symptoms, imaging, and previous treatments. A specific point map for the session is created.",
      },
      {
        phase: "Preparatory oil and warming",
        description:
          "Targeted Abhyangam with marma-specific medicated oil (Mahanarayana for joint marmas, Ksheerabala for nervous-system marmas) prepares the tissue. A localised steam or heat application at the planned area follows.",
      },
      {
        phase: "Marma manipulation",
        description:
          "The physician applies graded pressure — superficial, intermediate, or deep — at each selected marma using fingertips, knuckles, or specialised techniques. Where indicated, gentle chiropractic adjustments are integrated to release vertebral or joint restrictions that hold the marma in dysfunction.",
      },
      {
        phase: "Closing strokes and stillness",
        description:
          "Long calming strokes from head to feet integrate the work and allow the nervous system to reset. The patient rests for 15–20 minutes; physician reviews response before discharge.",
      },
    ],
    helpsConditions: ["arthritis", "stress-anxiety", "geriatric-care"],
    sessionDetails: {
      duration: "60–90 minutes per session (longest of our therapies due to physician involvement)",
      frequency: "3–5 sessions per week for 2–3 weeks; sometimes extended for neurological cases",
      whatToExpect:
        "Most patients feel an immediate release at the point of work — sometimes followed by a wave of warmth, mild emotional release, or deep relaxation. Structural changes (improved posture, restored range of motion) typically appear within 3–5 sessions. Post-stroke and chronic-pain patients often need 15–20 sessions for full benefit.",
      contraindications:
        "Pregnancy (specific abdominal marmas avoided), bleeding disorders, recent fractures, severe osteoporosis, and uncontrolled cardiac conditions. The procedure is not painful but is precise; it should not be confused with deep-tissue massage or aggressive manipulation.",
    },
    faqs: [
      {
        q: "How does this differ from chiropractic adjustment alone?",
        a: "Chiropractic focuses on vertebral alignment. Marma Chikitsa addresses 107 specific points across the body where prana, blood, and nerve flow can stagnate. Combining the two — which is unique to our protocol — addresses both the structural restriction and the energetic-physiological component, producing more complete and lasting relief.",
      },
      {
        q: "Is it safe for elderly patients with osteoporosis?",
        a: "Yes, with major modifications. We avoid all high-velocity adjustments, work with very gentle marma pressure, and never apply deep manipulation over fragile vertebral segments. The therapy is one of the few that can safely improve mobility and pain in patients who cannot tolerate other manual therapies.",
      },
      {
        q: "Can it help with post-stroke recovery?",
        a: "Yes — marma points along the affected limb and head are systematically worked to restore prana flow and stimulate neurological recovery. Combined with Pizhichil and Njavara Kizhi over 30–45 days, we have seen significant improvement in patients 6–24 months post-stroke.",
      },
      {
        q: "How quickly will I feel results?",
        a: "Many patients feel an immediate shift in pain or mobility after the first session. Sustained results — restored alignment, reduced chronic pain, improved function — typically develop over 8–10 sessions across 2–3 weeks.",
      },
      {
        q: "Is it painful?",
        a: "It should not be. There can be a brief sharpness when an active marma is engaged, but it resolves quickly into a sense of release. If pressure feels excessive, we adjust immediately. This is precise diagnostic work, not a 'no pain, no gain' approach.",
      },
    ],
  },

  'nasyam': {
    overview:
      "Nasyam is the systematic instillation of medicated oil, herbal ghee, or powders into the nasal passages — one of the five classical Panchakarma procedures. The nasal passages are considered the gateway to the head (Shiras), and Nasyam is the primary route to treat conditions above the shoulders: sinusitis, recurrent headaches, migraines, cervical spondylosis with cranial symptoms, allergic rhinitis, and a wide range of neurological and psychiatric presentations. At Vaidya Vrindavanam, Nasyam is rarely used in isolation; it forms the head-and-neck phase of larger Panchakarma protocols and is preceded by face Abhyangam and steam.",
    procedure: [
      {
        phase: "Pre-treatment Abhyangam",
        description:
          "A focused massage of the face, scalp, neck, and shoulders with warm medicated oil (Anu tailam, Ksheerabala, or specific classical formulations) prepares the head-region channels. Steam to the face follows, opening the nasal passages.",
      },
      {
        phase: "Oil instillation",
        description:
          "The patient lies supine with the head tilted slightly back. Warm medicated oil is instilled drop by drop into each nostril — the dose varies from 6 drops (Pratimarsha Nasyam, gentle) to 32 drops (Marsha Nasyam, deeper) per side, selected by the indication.",
      },
      {
        phase: "Retention and absorption",
        description:
          "The patient remains supine for 10–15 minutes while the oil is gently inhaled and absorbed. Mild gargling and spitting of oil-saliva at intervals clears the throat; nothing is swallowed.",
      },
      {
        phase: "Post-procedure care",
        description:
          "After clearing the residual oil, the patient is given warm water, advised to avoid cold drinks and exposure to wind for the rest of the day, and rests for 20–30 minutes. A light, warm meal follows.",
      },
    ],
    helpsConditions: ["asthma", "stress-anxiety"],
    sessionDetails: {
      duration: "30–45 minutes per session",
      frequency: "Daily for 7–14 days; specific neurological protocols extend to 21 days",
      whatToExpect:
        "Mild irritation or sneezing during the first 1–2 sessions is normal; most patients adapt by day 3. Sinus pressure and headache relief often begin within 4–5 days. Full benefit for cervical spondylosis or chronic migraine develops over a 14-day course combined with appropriate internal medication.",
      contraindications:
        "Acute fever, common cold with active discharge, immediately after meals, pregnancy, very young children (under 7), and patients with recent nasal surgery or active sinus infection. Nasyam is not performed when the patient is hungry, exhausted, or just woken — physiological readiness is part of the protocol.",
    },
    faqs: [
      {
        q: "Will it sting or burn?",
        a: "The oil is warm but not hot; most patients feel a brief tingling that subsides within 30 seconds. If it stings, we reduce the dose immediately. By the third session, almost all patients tolerate it comfortably.",
      },
      {
        q: "Can it help my chronic sinusitis?",
        a: "Yes — Nasyam combined with appropriate internal Kashayam is one of the most effective Ayurvedic protocols for chronic sinusitis. Most patients report substantial reduction in nasal congestion, post-nasal drip, and recurrent headaches within a 14-day course.",
      },
      {
        q: "Is it useful for migraine?",
        a: "Yes, particularly for migraines with neck-tension involvement, sinus triggers, or stress. We typically combine Nasyam with Shirodhara and oral medication; the combination significantly reduces frequency and severity over 21–30 days.",
      },
      {
        q: "Are there different types of Nasyam?",
        a: "Yes — Marsha (deeper, therapeutic), Pratimarsha (gentle, daily preventive), Avapeedaka (powder-based, for specific neurological cases), and Snehana Nasyam (oil-based, most common). The physician selects the type based on the indication.",
      },
      {
        q: "Can I drive home after a session?",
        a: "Yes, but most patients prefer to rest for 30–45 minutes before doing so. Some experience mild drowsiness from the oil's calming effect on the nervous system. We recommend a companion driver for the first few sessions.",
      },
    ],
  },

  'njavara-kizhi': {
    overview:
      "Njavara Kizhi — known classically as Shashtika Shali Pinda Sweda — is one of the most prized therapies of Kerala Ayurveda. Boluses are filled with cooked Njavara rice (a 60-day medicinal red rice) blended with herbal milk decoction, applied warm to the body in slow rhythmic strokes. The therapy is profoundly nourishing: it rebuilds depleted muscle tissue (Mamsa dhatu), strengthens the nervous system, and is a primary intervention for paralysis, post-stroke weakness, muscle wasting, neurological conditions, and Vata-Pitta imbalances. It is rarely the first therapy in a course — the body is usually prepared with Abhyangam and Elakizhi first, then Njavara Kizhi follows to nourish what has been cleared.",
    procedure: [
      {
        phase: "Rice and milk preparation",
        description:
          "Njavara rice is cooked in a Bala-based herbal milk decoction for 30–40 minutes until soft. The rice is tied into linen boluses while still warm; the cooking liquid is reserved to keep the boluses moist and warm during the session.",
      },
      {
        phase: "Pre-massage Abhyangam",
        description:
          "A short warming Abhyangam with Ksheerabala or Mahanarayana tailam opens the channels. The duration is brief — Njavara Kizhi is the central therapy of the session, not a follow-up.",
      },
      {
        phase: "Bolus application",
        description:
          "Two therapists apply warm rice boluses with slow, broad strokes across the entire body. Boluses are dipped in the warm reserved milk decoction every 2–3 minutes to maintain temperature and moisture. Affected limbs (in paralysis cases) receive sustained attention.",
      },
      {
        phase: "Cleanse and rest",
        description:
          "The body is wiped lightly to remove rice residue (oil and milk are left on the skin for absorption). Rest for 20–30 minutes follows. A light, warm, easily digested meal closes the session.",
      },
    ],
    helpsConditions: ["geriatric-care", "arthritis"],
    sessionDetails: {
      duration: "75–90 minutes per session",
      frequency: "Daily for 14–21 days; can extend to 28 days for paralysis or severe muscle wasting",
      whatToExpect:
        "A profound sense of nourishment and warmth during the session. Patients often report better sleep, increased appetite, and visible improvement in skin and muscle tone within 7–10 days. Neurological cases (post-stroke, muscle wasting) require longer courses but show measurable functional improvement when paired with Marma Chikitsa and oral medication.",
      contraindications:
        "Acute infections, high fever, severe diarrhoea, severe Kapha aggravation with active congestion, and patients with known rice allergy (rare). Diabetic patients can receive it with adjusted internal medication; the external rice does not affect blood sugar.",
    },
    faqs: [
      {
        q: "Why specifically Njavara rice?",
        a: "Njavara is a 60-day medicinal red rice grown traditionally in Kerala for therapeutic use. Its specific composition makes it strongly Mamsa-nourishing (muscle-rebuilding) and pacifying to Vata-Pitta when prepared in herbal milk. Standard rice does not have the same therapeutic profile.",
      },
      {
        q: "Can it help post-stroke recovery?",
        a: "Yes — Njavara Kizhi is one of our primary therapies for post-stroke patients, especially when paired with Marma Chikitsa and Pizhichil. Patients in the 3–24 month post-stroke window often show meaningful improvement in muscle tone, fine motor control, and limb strength over a 28-day course.",
      },
      {
        q: "Is it suitable during weight-loss programmes?",
        a: "Generally no — Njavara Kizhi is nourishing and tissue-building, the opposite of what is needed in weight-management programmes. We use Udwarthanam or other Kapha-reducing therapies for those goals. The therapies serve different intents and should not be confused.",
      },
      {
        q: "Will the rice irritate my skin?",
        a: "No — the rice is cooked soft and applied through linen boluses; it never directly contacts the skin abrasively. The texture is gentle, and the milk decoction adds a smoothing layer.",
      },
      {
        q: "How is this different from Pizhichil?",
        a: "Pizhichil pours warm medicated oil continuously over the body. Njavara Kizhi applies cooked rice boluses with rhythmic strokes. Both are deeply nourishing, but Pizhichil emphasises oil penetration while Njavara Kizhi emphasises tissue-rebuilding via the rice and milk. They are often combined in extended residential programmes.",
      },
    ],
  },

  'njavara-theppu': {
    overview:
      "Njavara Theppu is a localised application in which a soft paste of cooked Njavara rice and herbal milk is applied as a thick layer over a specific region — face, scalp, joints, or full body — and left to act for 30–45 minutes before being gently removed. Unlike Njavara Kizhi which uses linen boluses with strokes, Theppu is a still application: the medicated paste sits on the tissue, releasing its nourishing compounds slowly. It is most commonly used for facial rejuvenation, skin texture improvement, scalp conditions, localised muscle wasting, and as an alternative to Kizhi in patients who cannot tolerate prolonged massage strokes.",
    procedure: [
      {
        phase: "Paste preparation",
        description:
          "Njavara rice is cooked to a soft consistency in herbal milk and Bala decoction. The mixture is cooled to comfortable warmth, formed into a smooth, spreadable paste, and prepared fresh each session.",
      },
      {
        phase: "Skin preparation",
        description:
          "The application area is cleansed with warm cloth and a thin layer of medicated oil (chosen for the indication — Ksheerabala, Eladi, or sandalwood-based) is applied. This creates a barrier between skin and paste, allowing controlled absorption.",
      },
      {
        phase: "Paste application and rest",
        description:
          "The warm paste is spread evenly to a thickness of about 1 cm over the target region, smoothed by hand, and left for 30–45 minutes. The patient rests quietly during this period; some patients fall asleep.",
      },
      {
        phase: "Removal and finishing",
        description:
          "The paste is removed by gentle wiping with warm cloth (not water). A finishing oil is massaged briefly into the area, and the patient rests for 15–20 minutes before discharge.",
      },
    ],
    helpsConditions: ["skin-disorders"],
    sessionDetails: {
      duration: "60–75 minutes per session",
      frequency: "Daily for 7–14 days for facial or scalp work; alternate days for full-body courses",
      whatToExpect:
        "Skin texture and tone improvement is often visible within 5–7 days for facial Theppu — patients report softer skin, reduced pigmentation, and a healthy glow. For localised muscle wasting (post-injury, post-immobilisation), strength returns gradually over a 14-day course.",
      contraindications:
        "Active acne with pus, open wounds, severe eczema in the active phase, fever, and known sensitivity to dairy (the paste contains milk). Patients with very oily skin may prefer Mukhalepam or Udwarthanam for facial work.",
    },
    faqs: [
      {
        q: "How does Theppu differ from a standard face pack?",
        a: "A face pack is typically clay or herbal powder applied for 15–20 minutes for cleansing or temporary tightening. Njavara Theppu uses cooked medicinal rice in herbal milk, applied warm for 30–45 minutes for tissue nourishment. The intent is rejuvenation, not surface cleansing.",
      },
      {
        q: "Will it help with pigmentation and dark spots?",
        a: "Yes, gradually. Njavara Theppu over 14–21 sessions can soften pigmentation, even out skin tone, and improve overall texture. We often combine it with Mukhalepam, internal Rasayana, and dietary guidance for best results in pigmentation cases.",
      },
      {
        q: "Is it suitable for sensitive skin?",
        a: "Generally yes — the paste is gentle and applied warm, not hot. We do a small patch test for first-time patients with very sensitive skin, and adjust the herbal milk composition to a calmer profile (Yashtimadhu, sandalwood) if needed.",
      },
      {
        q: "Can it be done on the scalp for hair issues?",
        a: "Yes — Njavara Theppu on the scalp is one of the therapies used for hair fall, premature greying, and scalp dryness. The application is followed by a gentle scalp Abhyangam and oil retention. Results develop over 14–21 days combined with internal medication.",
      },
      {
        q: "Will the paste leave residue?",
        a: "Some residue is wiped off after the session, but full bath/shower is recommended only after 1–2 hours to allow residual nourishment to absorb. We provide warm cloth and gentle herbal cleansers to remove the bulk before discharge.",
      },
    ],
  },

  'pichu': {
    overview:
      "Pichu is a localised oil-retention therapy in which a thick cotton pad soaked in warm medicated oil is placed on a specific area — head (Shiropichu), spine (Prishtapichu), or affected joint — and replenished with warm oil at intervals to maintain therapeutic temperature. The continuous oil contact over 30–60 minutes allows much deeper penetration than a massage can achieve, making it particularly useful for chronic head and spine conditions: insomnia, chronic headache, sciatica, lumbar disc bulge, and localised joint stiffness. It is one of the gentlest therapies in our offerings and is often the right choice for fragile or elderly patients who cannot tolerate Kizhi or Pizhichil.",
    procedure: [
      {
        phase: "Cotton pad preparation",
        description:
          "Sterile cotton is shaped into a thick pad sized to the application area. Warm medicated oil — Ksheerabala for head, Mahanarayana for spine, Sahacharadi for joints — is heated to a comfortable therapeutic temperature.",
      },
      {
        phase: "Site preparation",
        description:
          "The skin is cleansed and a thin base layer of the same oil is applied. For Shiropichu, hair is parted to allow the pad to sit directly on the scalp; for spinal Pichu, the patient lies prone and the pad covers the affected vertebral segment.",
      },
      {
        phase: "Pad application and oil retention",
        description:
          "The oil-saturated pad is placed on the prepared area and covered loosely. Warm oil is poured onto the pad every 8–10 minutes to keep it saturated and warm. The patient remains still for 30–60 minutes.",
      },
      {
        phase: "Removal and gentle massage",
        description:
          "The pad is removed and a brief, gentle massage spreads the absorbed oil into surrounding tissue. The oil residue is left on the skin or scalp; the patient rests for 20 minutes before discharge.",
      },
    ],
    helpsConditions: ["arthritis", "stress-anxiety"],
    sessionDetails: {
      duration: "45–60 minutes per session",
      frequency: "Daily for 7–14 days; often combined with internal medication or Abhyangam",
      whatToExpect:
        "A deep, sustained warmth at the application site without any vigorous manipulation. Most patients fall asleep during the session. Insomnia and tension-headache patients often see results from day 4–5; chronic spinal pain typically responds across a 14-day course.",
      contraindications:
        "Open wounds, fungal infection at the site, fever, recent shaving cuts on the scalp (for Shiropichu), and pregnancy (specifically for spinal applications). Patients with very oily scalp may prefer Thalam or Shirodhara for head therapies.",
    },
    faqs: [
      {
        q: "Is Pichu only for the head?",
        a: "No. Shiropichu (head) is the most well-known form, but Pichu can be applied to any focal area — spine, knee, hip, or chest — depending on the indication. The principle is sustained oil retention at the affected site, not a fixed body location.",
      },
      {
        q: "How is it different from Shirodhara?",
        a: "Shirodhara pours a continuous stream of oil onto the forehead. Shiropichu places an oil-saturated pad on the scalp. Both produce calming effects, but Shirodhara emphasises the rhythmic stream's nervous-system reset, while Shiropichu emphasises sustained oil absorption into the scalp tissue. They are sometimes done sequentially in extended courses.",
      },
      {
        q: "Will my hair become very oily?",
        a: "Yes — for Shiropichu, the hair retains oil for the rest of the day. We schedule hair washes for the next morning using a herbal wash powder. Patients are advised to wear a head cover when leaving the clinic.",
      },
      {
        q: "Is it safe during pregnancy?",
        a: "Shiropichu is generally safe during pregnancy with cooling oils and is sometimes prescribed for sleep disturbance in the second trimester. Spinal Pichu is avoided. We always confirm the indication and trimester with a senior physician before scheduling.",
      },
      {
        q: "How quickly does it help with insomnia?",
        a: "Most patients sleep noticeably better from the second or third night. A full 7–14 day course often resolves persistent sleep issues, particularly when combined with dietary and lifestyle adjustments. Severe insomnia may need additional internal medication.",
      },
    ],
  },

  'pizhichil': {
    overview:
      "Pizhichil — sometimes called the 'royal treatment' — is a continuous warm oil bath in which medicated oil is poured in a steady, rhythmic stream over the body while two to four therapists massage in synchronised strokes. Historically reserved for kings and the nobility of Kerala, it remains one of the most opulent and therapeutically intense therapies in Ayurveda. At Vaidya Vrindavanam it is prescribed for paralysis, post-stroke recovery, severe Vata aggravation, chronic muscle wasting, advanced rheumatoid arthritis, and full-body rejuvenation in residential programmes. The volume of oil used (4–7 litres per session) and the team-based execution make it one of our most resource-intensive offerings, typically reserved for serious indications or premium rejuvenation packages.",
    procedure: [
      {
        phase: "Oil heating and team preparation",
        description:
          "5–7 litres of medicated oil — typically Mahanarayana, Sahacharadi, or Ksheerabala depending on indication — is heated to a precise therapeutic temperature. A team of 2–4 therapists positions around the wooden treatment table (Droni); a fifth person manages oil temperature and supply continuously.",
      },
      {
        phase: "Pre-massage and positioning",
        description:
          "A short Abhyangam warms the body and opens superficial channels. The patient lies on the wooden Droni in the seven classical positions in sequence — supine, left lateral, prone, right lateral, then seated for the head.",
      },
      {
        phase: "Continuous oil pour with massage",
        description:
          "Therapists pour warm oil from cloth-wrapped vessels in a continuous stream while massaging in coordinated rhythm. The oil is collected, reheated, and re-poured throughout the session. Each position lasts 8–12 minutes; the head receives a separate, gentler protocol.",
      },
      {
        phase: "Wipe, cover, and rest",
        description:
          "After the final position, excess oil is wiped lightly (a layer is left for absorption), the patient is covered warmly, and rest of 30–45 minutes follows. A warm herbal drink and a strictly Vata-pacifying meal close the session.",
      },
    ],
    helpsConditions: ["arthritis", "geriatric-care"],
    sessionDetails: {
      duration: "75–90 minutes per session",
      frequency: "Daily for 7–14 days as part of a residential programme; rarely as a one-off",
      whatToExpect:
        "A profound sense of warmth, weightlessness, and deep relaxation throughout the session. Many patients fall into a meditative half-sleep. Improvements in muscle strength, joint mobility, and overall vitality typically appear from day 5; full benefit develops over 14 days. Post-stroke patients on extended courses (28+ days) often show measurable functional gains.",
      contraindications:
        "Acute fever, active infection, severe Kapha-dominant conditions with congestion, diabetic patients with poorly controlled sugar levels, severe heart conditions, and pregnancy. The therapy is intense — patients with low stamina or anxiety may prefer starting with Abhyangam-Swedam first.",
    },
    faqs: [
      {
        q: "Why is it called the 'royal treatment'?",
        a: "Historically, Pizhichil required a team of trained therapists, large quantities of medicated oil, and extended sessions — making it accessible only to royalty and wealthy patrons in classical Kerala. The protocol has not changed: the resource intensity is what defines its therapeutic depth.",
      },
      {
        q: "How is it different from a regular full-body massage?",
        a: "A full-body massage applies oil with strokes for 60 minutes. Pizhichil pours oil continuously throughout 75–90 minutes while a team massages in coordination — the volume of oil, sustained warmth, and number of therapists produce tissue-level changes that single-therapist massage cannot achieve.",
      },
      {
        q: "Can it really help post-stroke recovery?",
        a: "Yes, particularly when combined with Marma Chikitsa, Njavara Kizhi, and oral medication. Patients in the 3–24 month post-stroke window benefit most. Long-standing paralysis (5+ years) responds less, but quality-of-life improvements are still common.",
      },
      {
        q: "Is the oil reused for other patients?",
        a: "No — used oil is discarded after each patient's session. Each patient receives fresh, freshly-heated medicated oil for hygiene and therapeutic potency.",
      },
      {
        q: "Will I gain weight from the oil exposure?",
        a: "No. Most of the absorbed oil is metabolised and used by the body for tissue nourishment. Patients on residential programmes are also on controlled, light Vata-pacifying diets — many actually lose weight or improve body composition during a course.",
      },
    ],
  },

  'raktamoksham': {
    overview:
      "Raktamoksham — controlled therapeutic bloodletting — is the fifth and most specialised of the classical Panchakarma procedures. It is reserved for conditions where vitiated blood (Rakta dushti) is the primary pathology: chronic skin disorders (eczema, psoriasis, urticaria), pigmentation disorders, gout, varicose veins, certain types of headache, and Pitta-dominated inflammatory conditions that have not responded to internal medication. At Vaidya Vrindavanam, Raktamoksham is performed sparingly and only after thorough evaluation. Two methods are used depending on indication: leech application (Jalauka, for localised skin and joint conditions) and venesection (Siravyadha, for systemic Pitta-blood conditions). All procedures follow strict sterile protocols and are physician-led.",
    procedure: [
      {
        phase: "Patient assessment",
        description:
          "Detailed evaluation including blood counts, coagulation profile, and review of medication history (especially anticoagulants). The treating physician determines suitability, selects the method (leech vs venesection), and identifies the application site.",
      },
      {
        phase: "Site preparation",
        description:
          "The skin over the target area is cleansed thoroughly. For leech therapy, sterile medical-grade leeches from controlled supply are prepared. For venesection, sterile equipment and trained Marma-aware practitioners ensure safe site selection (typically away from major vessels and nerves).",
      },
      {
        phase: "Bloodletting procedure",
        description:
          "Leeches are applied to the affected site and allowed to draw 5–15 ml of vitiated blood naturally over 20–40 minutes; they detach when satisfied and are not reused. For venesection, a small puncture allows controlled drainage of 30–100 ml of blood depending on the indication.",
      },
      {
        phase: "Post-procedure care",
        description:
          "The site is cleaned, a medicated paste applied, and a sterile dressing placed. The patient rests for 30–45 minutes; vital signs are monitored. Specific dietary and medication instructions follow for the next 7 days.",
      },
    ],
    helpsConditions: ["skin-disorders", "varicose-veins"],
    sessionDetails: {
      duration: "60–75 minutes per session",
      frequency: "Single session for some indications; weekly for 3–6 weeks for chronic skin or varicose vein protocols",
      whatToExpect:
        "Leech therapy is largely painless — most patients describe only a mild prick at attachment. Venesection is briefly uncomfortable. Skin condition improvement is often visible within 7–10 days; varicose vein heaviness reduces over 3–4 sessions; chronic gout typically improves over 6–8 weeks of combined Raktamoksham and internal medication.",
      contraindications:
        "Anaemia, bleeding disorders, pregnancy, immunosuppression, current anticoagulant therapy, very young or very frail patients, and any signs of active infection at the site. We screen carefully — Raktamoksham is offered only when clearly indicated, never as a routine wellness treatment.",
    },
    faqs: [
      {
        q: "Is leech therapy safe? Where do the leeches come from?",
        a: "Yes — we use medical-grade leeches from controlled, certified suppliers. Each leech is used once and disposed of safely; there is no patient-to-patient transfer. The procedure is one of the safest forms of bloodletting and has documented use in modern medicine for varicose vein and microsurgery applications.",
      },
      {
        q: "Will it hurt?",
        a: "Leech therapy involves only a brief pricking sensation at attachment — most patients feel little after that. Venesection is more uncomfortable but brief; we use careful technique and the bleeding itself is painless. Anaesthetic creams are sometimes used at the patient's request.",
      },
      {
        q: "Can it help my psoriasis or eczema?",
        a: "Yes, especially for localised, treatment-resistant patches with strong Pitta involvement (red, hot, weeping lesions). We typically combine Raktamoksham with Virechana, internal Kashayam, and external medicated pastes. The full protocol unfolds over 4–6 weeks.",
      },
      {
        q: "Can I receive it for varicose veins?",
        a: "Yes — leech therapy at specific points along the affected veins is one of the few Ayurvedic interventions documented to reduce varicose vein heaviness, pigmentation, and discomfort. We typically perform 3–6 sessions across 6 weeks combined with internal medication and lifestyle guidance.",
      },
      {
        q: "Is recovery time needed after the procedure?",
        a: "For leech therapy, normal activities resume the same day with mild restrictions (no heavy exertion, no alcohol for 48 hours). For venesection, 24 hours of light activity is recommended. Specific instructions are given based on the procedure and the patient's overall health.",
      },
    ],
  },

  'shirodhara': {
    overview:
      "Shirodhara is the continuous, rhythmic pouring of warm medicated oil (or buttermilk, herbal milk, or decoction depending on the variant) in a thin steady stream onto the centre of the forehead — the marma point known as Sthapani. The technique produces a profound calming effect on the nervous system: it is one of the most reliably effective Ayurvedic treatments for chronic insomnia, anxiety, stress-related headaches, migraines, post-traumatic stress, and the cognitive-emotional symptoms of menopause. At Vaidya Vrindavanam, Shirodhara is rarely used as a standalone wellness session; it is prescribed as part of a structured course, usually combined with Abhyangam, Nasyam, or specific internal medication.",
    procedure: [
      {
        phase: "Liquid selection and preparation",
        description:
          "The oil or liquid is selected by indication — Ksheerabala or Brahmi-infused oil for stress and insomnia; Takra Dhara (medicated buttermilk) for psoriasis and Pitta-dominant conditions; Ksheera Dhara (medicated milk) for anxiety with heat. The liquid is warmed to body temperature and held in the special Shirodhara pot.",
      },
      {
        phase: "Patient positioning",
        description:
          "The patient lies supine on the wooden Droni with eyes covered and head supported. The Shirodhara pot is suspended above the forehead at a precisely-measured distance — usually 4 finger-widths — to produce the correct stream tension and rhythm.",
      },
      {
        phase: "Continuous stream",
        description:
          "Warm liquid is poured in a steady stream onto the centre of the forehead in a slow oscillating motion, covering a small range. The therapist refills and reheats the pot continuously. The session typically lasts 30–45 minutes.",
      },
      {
        phase: "Closure and rest",
        description:
          "The stream is gradually slowed and stopped. The hair is wrapped in warm cloth, residual oil is left to absorb, and the patient rests for 20–30 minutes before discharge. Most patients feel deeply settled and slightly disoriented for the first hour.",
      },
    ],
    helpsConditions: ["stress-anxiety", "hypertension"],
    sessionDetails: {
      duration: "60–75 minutes (45 min stream + preparation and rest)",
      frequency: "Daily for 7–14 days; alternate days for milder protocols",
      whatToExpect:
        "Most patients describe entering a state between sleep and meditation. Sleep improves dramatically from the first or second night; anxiety reduces over 3–5 days; chronic migraine and stress-headache patients typically respond across a 14-day course. Some patients report mild emotional release — old memories or feelings surfacing — which is a recognised therapeutic effect.",
      contraindications:
        "Acute fever, common cold with active discharge, head injury within 6 weeks, pregnancy in the first trimester, severe hypertension uncontrolled by medication, and recent eye surgery. Patients with severe depression should be jointly evaluated by their psychiatrist before starting a Shirodhara course.",
    },
    faqs: [
      {
        q: "Will I feel results from a single session?",
        a: "Most patients feel calmer and sleep better the first night. But the cumulative effect over a 7–14 day course is what produces sustained improvement in chronic insomnia, anxiety, or migraines. A single session is more sample than treatment.",
      },
      {
        q: "Why does it feel so deeply relaxing?",
        a: "The continuous warm stream on the forehead stimulates Sthapani marma — a vital point connected via classical Ayurvedic anatomy to the deep nervous system and pituitary. The rhythm itself induces a parasympathetic shift, similar to but more reliable than meditation for most patients.",
      },
      {
        q: "Is it suitable for children?",
        a: "Yes, with shorter sessions (15–25 minutes) and milder oils. We have used Shirodhara for children with severe ADHD, anxiety, and behavioural issues with good results. Always physician-supervised; we coordinate with the child's paediatrician.",
      },
      {
        q: "Will my hair become greasy?",
        a: "Yes — your hair will be heavily oiled after the session and remain so until the next morning's wash. We provide herbal wash powders (sunipindi, triphala) that remove the oil while preserving therapeutic residue absorbed into the scalp.",
      },
      {
        q: "Can it help my migraine?",
        a: "Yes — particularly migraines with stress, hormonal, or insomnia triggers. We typically combine Shirodhara with Nasyam and oral Kashayam over 14–21 days. Most patients report significant reduction in migraine frequency and severity.",
      },
    ],
  },

  'thalam': {
    overview:
      "Thalam is a localised application of medicinal paste retained on the crown of the head (the Brahmarandhra region) for 30–45 minutes. The paste — typically prepared from Rasnadi choornam, Eladi powder, or specific classical formulations mixed with herbal oils or buttermilk — is held in place by a thin dough barrier. Thalam works on the head's deeper centres through sustained local absorption. It is most commonly prescribed for chronic insomnia, severe stress-induced headaches, mental fatigue, age-related cognitive changes, and as a complementary therapy in larger Panchakarma courses for psychiatric or neurological conditions. It is gentler and less time-intensive than Shirodhara, making it suitable for patients who cannot lie still under a continuous stream for 45 minutes.",
    procedure: [
      {
        phase: "Paste and dough preparation",
        description:
          "The selected herbal powder is mixed with appropriate oil or liquid (Ksheerabala for cooling, Mahanarayana for warming) into a smooth paste. A black gram dough ring is shaped for the crown of the head to hold the paste in place.",
      },
      {
        phase: "Scalp preparation",
        description:
          "Hair at the crown is parted to expose the scalp. A short, gentle scalp massage with a thin layer of the same oil prepares the area. The dough ring is placed and sealed against the scalp.",
      },
      {
        phase: "Paste retention",
        description:
          "Warm paste is filled into the dough basin to a depth of 1–2 cm and left for 30–45 minutes. The patient remains in a comfortable seated or supine position; some patients fall asleep during this phase.",
      },
      {
        phase: "Removal and finishing",
        description:
          "The dough is removed, paste is wiped away with warm cloth (oil residue is left on the scalp for absorption), and a brief final scalp massage closes the session. The patient rests for 15–20 minutes.",
      },
    ],
    helpsConditions: ["stress-anxiety", "hypertension"],
    sessionDetails: {
      duration: "45–60 minutes per session",
      frequency: "Daily for 7–14 days; sometimes alternate days in milder protocols",
      whatToExpect:
        "A cooling, settling sensation on the crown that often produces a sense of mental clarity. Patients with chronic insomnia frequently report better sleep from the first or second night. Stress-headache and mental-fatigue patients typically respond over the full course. Many patients combine Thalam with Shirodhara or Shiropichu in extended programmes.",
      contraindications:
        "Open scalp wounds, severe scalp infection, pregnancy in the first trimester, and acute febrile illness. Patients with very oily scalp may need adjusted paste composition; we screen for individual sensitivities during intake.",
    },
    faqs: [
      {
        q: "How is Thalam different from Shirodhara or Shiropichu?",
        a: "Shirodhara pours liquid continuously; Shiropichu uses an oil-soaked pad; Thalam holds a thick herbal paste in a dough basin. The intent and effect of all three are similar — calming the head and nervous system — but the depth and quality of absorption differ. Thalam is the most localised and concentrated; Shirodhara has the most rhythmic nervous-system effect.",
      },
      {
        q: "Will I be able to sit still for 45 minutes?",
        a: "Yes — the procedure is comfortable. Most patients find the sustained warmth on the crown deeply settling and either rest quietly or fall into a light sleep. The seated or supine position is comfortable for most age groups.",
      },
      {
        q: "Can it really help insomnia?",
        a: "Yes. Thalam targets the head's deeper marma centres directly and produces reliable improvements in sleep quality within the first few sessions. We typically prescribe a 7–14 day course combined with dietary and lifestyle adjustments; severe insomnia may need additional internal medication.",
      },
      {
        q: "What is in the paste?",
        a: "The composition varies by indication. For stress and insomnia: Brahmi, Yashtimadhu, Eladi powder in Ksheerabala oil. For hypertension and Pitta-dominant headache: cooling herbal powders in buttermilk or coconut oil. The selection is made by the consulting physician based on your prakriti and complaint.",
      },
      {
        q: "Will my hair smell of the herbs?",
        a: "Yes, mildly. The scent persists until the next hair wash. Most patients find it pleasant and earthy rather than strong. We provide herbal wash powders to remove the residue while preserving therapeutic absorption.",
      },
    ],
  },

  'tharpanam': {
    overview:
      "Tharpanam (Netra Tharpanam) is a specialised eye treatment in which warm medicated ghee is held over the eyes inside a black gram dough ring for 10–25 minutes. The eyes are bathed continuously in the medicated ghee — typically Triphala ghrita, Patoladi ghrita, or Mahatriphala ghrita — which lubricates the ocular tissues, nourishes optic nerves, reduces strain, and addresses chronic dryness, refractive issues, and degenerative eye conditions. At Vaidya Vrindavanam, Tharpanam is one of our most precise procedures: ghee selection, temperature, and retention time vary significantly between indications, and the therapy is always physician-supervised.",
    procedure: [
      {
        phase: "Pre-treatment Abhyangam and steam",
        description:
          "A short Abhyangam to face, scalp, and shoulders with cooling oil opens the channels around the eyes. Mild steam to the face follows, reducing tension in the periorbital tissues.",
      },
      {
        phase: "Dough ring construction",
        description:
          "A snug ring of black gram dough is shaped around each eye, sealed against the skin to hold ghee securely. The patient lies supine with eyes closed; the dough is built with the eyes closed and the patient is asked to open them only when the ghee is in place.",
      },
      {
        phase: "Ghee filling and retention",
        description:
          "Warm medicated ghee — at body temperature, never hot — is poured into the dough basin until it covers the closed eyes. The patient slowly opens the eyes within the ghee, blinks gently, and moves the eyes in all directions on physician's instruction. Retention time ranges from 10 to 25 minutes by indication.",
      },
      {
        phase: "Drainage and rest",
        description:
          "The dough is opened, ghee drained, and eyes wiped gently. A cooling herbal eye-wash and brief rest in a darkened room follows. Patients are asked to avoid bright light, screens, and dust for the rest of the day.",
      },
    ],
    helpsConditions: ["geriatric-care"],
    sessionDetails: {
      duration: "45–60 minutes per session",
      frequency: "Daily for 7 days; sometimes alternating days for sensitive patients",
      whatToExpect:
        "Most patients report a striking sense of relief from eye strain, sharper vision in the next 24 hours, and better sleep on treatment nights. Chronic dry-eye patients often see results within 4–5 sessions. For early refractive errors and computer-vision syndrome, a 7-day course produces measurable improvement; degenerative conditions need longer courses combined with internal Rasayana.",
      contraindications:
        "Acute eye infection, recent eye surgery (within 6 weeks), severe glaucoma, retinal detachment, and any active inflammation of the eye. We require a recent ophthalmologist clearance for patients with diagnosed eye disease, and we coordinate care.",
    },
    faqs: [
      {
        q: "Will it sting or hurt?",
        a: "No — the ghee is at body temperature, and the closed-eye protocol prevents any discomfort during placement. When the eyes are opened within the ghee, most patients feel only a soothing warmth. If any discomfort arises, we drain immediately.",
      },
      {
        q: "Can it improve my eyesight?",
        a: "For early refractive errors, computer-vision syndrome, and chronic dry eye, yes — measurable improvement is common over a 7-day course. For established myopia, hypermetropia, or progressed cataracts, Tharpanam slows progression and improves comfort but does not reverse structural changes. We are honest about this in consultation.",
      },
      {
        q: "How is it different from eye drops or eye-wash treatments?",
        a: "Eye drops deliver active compounds for seconds; eye-wash flushes the surface. Tharpanam holds medicated ghee continuously over the open eye for 10–25 minutes — the depth of absorption into the optic and lacrimal tissues is incomparably greater. It is one of the most therapeutically intense eye treatments in any medical tradition.",
      },
      {
        q: "Can I do it for screen-related eye strain?",
        a: "Yes — Tharpanam is one of our most prescribed therapies for IT professionals and patients with chronic computer-vision syndrome. A 7-day course typically produces lasting improvement, especially when combined with appropriate eye exercises and dietary adjustments.",
      },
      {
        q: "Will I be able to drive home after the session?",
        a: "Vision is slightly blurred for 30–60 minutes after the session due to ghee residue. We strongly recommend a companion driver for the first 1–2 sessions. By the third session, most patients adjust and can drive themselves after a brief rest.",
      },
    ],
  },

  'udwarthanam': {
    overview:
      "Udwarthanam is a vigorous dry powder massage performed with herbal powders applied against the direction of body hair growth. Unlike oil-based therapies, it is intentionally drying and stimulating: it scrapes Kapha and Meda (excess fat tissue) from the channels, improves circulation, mobilises lymphatic flow, and is the primary external therapy for weight management, cellulite, sluggish metabolism, and Kapha-dominant lethargy. At Vaidya Vrindavanam, Udwarthanam is a core component of our weight-management programmes and is also prescribed for skin tone improvement, post-pregnancy recovery, and metabolic conditions.",
    procedure: [
      {
        phase: "Powder selection and preparation",
        description:
          "Herbal powders — typically Kolakulathadi choornam, Triphala choornam, or specific weight-management blends — are warmed lightly. The selection depends on the indication: weight management uses warming, drying powders; skin tone improvement uses gentler, brightening blends.",
      },
      {
        phase: "Optional thin oil layer",
        description:
          "For very dry skin, a thin layer of light oil (often coconut or mustard) is applied to prevent excessive friction. For Kapha-reduction protocols, no oil is used — the therapy is entirely dry, maximising the scraping effect on subcutaneous fat.",
      },
      {
        phase: "Vigorous powder massage",
        description:
          "Two therapists apply the powder with firm, fast strokes against the direction of hair growth — the opposite direction of all other Ayurvedic massages. The motion is more vigorous and more energetic than Abhyangam; sweating during the session is a standard endpoint.",
      },
      {
        phase: "Optional steam and shower",
        description:
          "A brief medicated steam may follow to enhance Kapha mobilisation. Unlike most Kerala therapies, a warm shower is permitted — and recommended — within an hour to remove the powder residue.",
      },
    ],
    helpsConditions: ["obesity", "diabetes", "varicose-veins"],
    sessionDetails: {
      duration: "45–60 minutes per session",
      frequency: "Daily for 14–28 days as part of a weight-management or detox programme",
      whatToExpect:
        "Strong stimulation, warmth, and a vigorous sense of movement — quite different from the calming feel of oil therapies. Most patients feel energised after the session. Weight management programmes typically combine Udwarthanam with dietary intervention, internal medication, and yoga; visible results in body composition appear from week 2.",
      contraindications:
        "Very dry, sensitive, or Vata-dominant skin types (we use Abhyangam instead), open wounds or active dermatitis, fever, pregnancy, and emaciation. For diabetic patients with neuropathy, we use modified pressure to avoid skin damage.",
    },
    faqs: [
      {
        q: "Does it really help with weight loss?",
        a: "Udwarthanam alone does not produce significant weight loss. As part of a structured 21–28 day programme combining diet, internal medication, yoga, and other Kapha-reducing therapies, it contributes meaningfully to fat metabolism and body composition. Patients typically lose 3–7 kg over a programme, with sustained changes when lifestyle adjustments continue.",
      },
      {
        q: "Will it improve cellulite?",
        a: "Yes — the vigorous against-the-grain stimulation improves lymphatic drainage and breaks down subcutaneous adipose accumulations. Visible reduction in cellulite typically appears over 14–21 days when combined with a Kapha-pacifying diet.",
      },
      {
        q: "Is it suitable for thin or weak patients?",
        a: "No. Udwarthanam is contraindicated in emaciation, weakness, or Vata-dominant body types. We use nourishing therapies (Abhyangam, Pizhichil, Njavara Kizhi) for those patients. Mismatching therapy to constitution causes harm — proper assessment is essential.",
      },
      {
        q: "Will it dry my skin out?",
        a: "Some dryness is intentional and therapeutic. We use a thin oil layer for sensitive skin and recommend coconut oil application after the post-session shower. Skin texture typically improves over a course as circulation and tissue tone are restored.",
      },
      {
        q: "Can diabetic patients receive this therapy?",
        a: "Yes, with modifications. Pressure is adjusted for skin sensitivity and any neuropathy is checked beforehand. Udwarthanam is one of our standard therapies in diabetic Panchakarma protocols, typically combined with Vasthi and internal Kashayam for blood sugar management.",
      },
    ],
  },

  'uzhichil': {
    overview:
      "Uzhichil is the traditional Kerala foot-pressure massage in which a single trained therapist uses precise, controlled pressure from the feet — supported by suspended ropes for balance — to work along the patient's body. The technique allows for strong, sustained pressure on large muscle groups, marma points, and stubborn fascial restrictions that hand-pressure massage cannot reach. It is one of the signature traditional Kalari (martial-arts-derived) therapies of Kerala, used for athletes, post-injury recovery, chronic muscle stiffness, deep fascial restrictions, and serious post-paralysis rehabilitation. At Vaidya Vrindavanam, Uzhichil is reserved for specific indications and physically capable patients.",
    procedure: [
      {
        phase: "Patient assessment",
        description:
          "The treating physician confirms suitability — strong constitution, no fragility of bones or joints, no recent surgery, no significant cardiovascular issues. Detailed marma mapping identifies the regions and points that need work.",
      },
      {
        phase: "Pre-massage Abhyangam",
        description:
          "A thorough warming Abhyangam with Mahanarayana, Murivenna, or Sahacharadi tailam prepares the tissue and is essential — the foot pressure that follows could not be tolerated on cold tissue. This phase typically takes 20–25 minutes.",
      },
      {
        phase: "Foot-pressure massage",
        description:
          "The therapist holds suspended ropes and works the patient with their feet — long, smooth strokes along the back, legs, and shoulders, with controlled focal pressure on marma points and fascial restrictions. The therapist's body weight is precisely managed via the rope support; pressure is adjusted continuously based on the patient's response.",
      },
      {
        phase: "Closing strokes and rest",
        description:
          "The session closes with calming downstrokes, the body is wrapped warmly, and rest of 30–45 minutes follows. A warm meal and herbal drink complete the session.",
      },
    ],
    helpsConditions: ["arthritis"],
    sessionDetails: {
      duration: "75–90 minutes per session",
      frequency: "Daily for 7–14 days; sometimes alternated with Pizhichil or Elakizhi in longer programmes",
      whatToExpect:
        "Profound, deep release in chronic muscle and fascial tissue — often deeper than what hand-pressure massage achieves. Athletes report return to peak performance; post-injury patients see measurable improvement in mobility and strength. Some next-day soreness is normal, similar to a deep-tissue treatment.",
      contraindications:
        "Osteoporosis, recent fractures, advanced cardiac conditions, recent abdominal surgery, pregnancy, severe varicose veins, and frail or geriatric patients. The therapy requires a robust constitution; we are honest with patients who are not suitable and offer Pizhichil or Abhyangam instead.",
    },
    faqs: [
      {
        q: "Won't a person standing on me hurt?",
        a: "No — the therapist's weight is precisely controlled by suspended ropes; they do not stand fully on the patient. The technique allows for stronger and more sustained pressure than hands can deliver, but the actual force on any one point is calibrated and never excessive. The therapist's training takes years.",
      },
      {
        q: "How is it different from a regular deep-tissue massage?",
        a: "Hand-based deep-tissue massage applies pressure through fingers, knuckles, and elbows — limited by the practitioner's hand strength. Foot pressure with rope support allows broader, deeper, and longer-sustained pressure with less practitioner fatigue, reaching tissue depths that hand massage cannot.",
      },
      {
        q: "Is it safe for older patients?",
        a: "Generally not — Uzhichil is contraindicated in osteoporosis, frail joints, and reduced cardiovascular reserve. We use Marma Chikitsa or Abhyangam for older patients who need targeted pressure work. Mismatching therapy to constitution can cause injury.",
      },
      {
        q: "Will I be sore the next day?",
        a: "Mild next-day soreness is common, similar to after a deep workout or vigorous physical therapy. The soreness resolves within 24–48 hours and is followed by significantly improved mobility. Severe soreness is uncommon and indicates the pressure was excessive — we adjust for subsequent sessions.",
      },
      {
        q: "Is it suitable for athletes?",
        a: "Yes — Uzhichil is one of our most prescribed therapies for athletes, particularly martial artists, kabaddi players, and endurance athletes. We design specific protocols around competition or recovery cycles. The depth of fascial release that Uzhichil provides is uniquely valuable for high-performance athletes.",
      },
    ],
  },

  'vamanam': {
    overview:
      "Vamanam — therapeutic emesis — is the first of the five classical Panchakarma procedures and the principal treatment for excess Kapha in the upper body. It is reserved for specific indications: chronic asthma, recurrent respiratory infections, chronic skin disorders with Kapha involvement, certain forms of obesity with sluggish metabolism, hyperacidity, and Kapha-dominant psychological conditions. At Vaidya Vrindavanam, Vamanam is performed only after a structured 5–7 day preparatory phase (Snehapana — internal oleation, and Swedana — fomentation), is fully physician-supervised, and is conducted in a residential setting. It is not a wellness procedure and should never be undertaken casually.",
    procedure: [
      {
        phase: "Preparatory phase (Purvakarma)",
        description:
          "5–7 days of progressive Snehapana — internal consumption of medicated ghee in increasing quantities — followed by daily Abhyangam and Swedana to mobilise Kapha from peripheral tissues to the stomach. Strict dietary observance is required throughout.",
      },
      {
        phase: "Emesis day preparation",
        description:
          "Patient eats a Kapha-rich early breakfast (often milk-based porridge), arrives at the procedure room. Pulse, blood pressure, and overall readiness are confirmed. The emesis-inducing decoction (typically with Madanaphala) is prepared.",
      },
      {
        phase: "Therapeutic emesis",
        description:
          "The patient drinks the prepared decoction; physician-induced gentle vomiting is allowed to proceed in waves over 30–60 minutes. Each bout is monitored for character (Pittic, Kaphic, bilious), volume, and patient response. The procedure ends when the predefined therapeutic endpoint is reached.",
      },
      {
        phase: "Post-procedure recovery (Samsarjana Krama)",
        description:
          "A precisely structured graduated diet over the following 7 days reintroduces foods from the lightest (rice gruel) to normal diet, allowing digestive fire (Agni) to rebuild. Strict rest, no exertion, and specific lifestyle observances are essential.",
      },
    ],
    helpsConditions: ["asthma", "obesity", "skin-disorders"],
    sessionDetails: {
      duration: "Single procedure day takes 4–6 hours; the full Vamanam protocol with preparation and recovery is 14–21 days",
      frequency: "Once per indication; rarely repeated within the same year",
      whatToExpect:
        "The preparatory phase is challenging — heavy ghee consumption causes mild nausea by day 5–6, which is a sign of readiness. The procedure itself is medically managed; most patients tolerate it well with experienced supervision. The post-procedure recovery requires patience and discipline. The therapeutic effects — improved respiratory function, reduced skin disease, better metabolic markers — develop over the 6–8 weeks following the procedure.",
      contraindications:
        "Pregnancy, very young or very elderly patients, weakness, recent surgery, severe cardiovascular disease, gastrointestinal bleeding, severe Vata aggravation, and anyone unable to commit to the full preparatory and recovery phases. Patient screening is rigorous.",
    },
    faqs: [
      {
        q: "Is therapeutic vomiting safe?",
        a: "Yes — when performed in a properly equipped residential setting under physician supervision after the full preparatory phase. Modern Vamanam protocols include pulse, BP, and electrolyte monitoring; the procedure has an excellent safety record in indicated patients. It is not safe in DIY settings or without preparation.",
      },
      {
        q: "Can it cure my asthma?",
        a: "It can produce significant, sometimes long-lasting improvement in Kapha-dominant chronic asthma. We do not use the word 'cure' — bronchial hyperreactivity has structural components — but most asthma patients see fewer flares, reduced inhaler use, and better overall respiratory function for 6–18 months after a properly executed Vamanam.",
      },
      {
        q: "How long is the full programme?",
        a: "14–21 days minimum, typically as a residential admission. Preparation: 5–7 days. Procedure day: 1. Recovery diet (Samsarjana): 7 days. Discharge with continued internal medication: ongoing for 6–12 weeks. Skipping any phase compromises results and risks complications.",
      },
      {
        q: "Will I lose weight?",
        a: "Some weight loss during preparation and recovery is common, but Vamanam is not a weight-loss procedure. We use Udwarthanam, Vasthi, and dietary interventions for weight management. Vamanam targets specific Kapha-dominant pathologies — using it for general weight loss is inappropriate.",
      },
      {
        q: "Can I do Vamanam as an outpatient?",
        a: "No. We require residential admission for the full procedure. The preparatory ghee consumption, the procedure day itself, and the post-procedure recovery diet all require continuous medical and dietary supervision. Outpatient Vamanam is not safe.",
      },
    ],
  },

  'vasthi': {
    overview:
      "Vasthi — medicated enema — is described in classical Ayurveda as the most effective single treatment for Vata, accounting for nearly half of all Panchakarma in many traditional protocols. It involves the rectal administration of medicated decoction (Niruha Vasthi, cleansing) or medicated oil (Anuvasana Vasthi, nourishing), often in alternating sequence over 8 to 30 days. At Vaidya Vrindavanam, Vasthi is the primary internal Panchakarma procedure for chronic lower-back pain, sciatica, arthritis, neurological conditions, infertility, chronic constipation, and Vata-dominant systemic conditions. It is fully physician-supervised, performed in a residential setting, and is one of our most consistently effective therapies.",
    procedure: [
      {
        phase: "Preparatory phase",
        description:
          "Daily Abhyangam and Swedana for 3–7 days prepare the body and channels. Light, warm, easily digested food is observed. Bowel function is regularised.",
      },
      {
        phase: "Vasthi formulation preparation",
        description:
          "The Vasthi mixture — a Niruha decoction with multiple herbs and adjuvants, or Anuvasana oil-only — is prepared fresh on the morning of administration. Composition is selected by indication: Mustadi Yapana for general Vata, Eranda Mooladi for sciatica, Dashamoola Niruha for spinal conditions.",
      },
      {
        phase: "Administration and retention",
        description:
          "The patient is positioned in left lateral decubitus. The Vasthi is administered slowly via a sterile catheter. For Niruha, the patient retains the decoction until natural urge to evacuate (usually 30–45 minutes). For Anuvasana, the oil is retained for 1.5–3 hours.",
      },
      {
        phase: "Recovery and observation",
        description:
          "After natural evacuation, the patient is given warm water, light dietary instructions for the rest of the day, and rest. The treating physician documents the response — colour, character, volume of return — to guide subsequent days' Vasthi.",
      },
    ],
    helpsConditions: ["arthritis", "infertility"],
    sessionDetails: {
      duration: "60–90 minutes per session including preparation and observation",
      frequency: "Daily for 8 days (Kala Vasthi), 16 days (Karma Vasthi), or 30 days (Yoga Vasthi); alternating Niruha and Anuvasana",
      whatToExpect:
        "The first session can feel unusual; by the second or third day most patients are comfortable. Lower-back pain typically begins improving from day 4–5. Sciatica and chronic Vata conditions respond over the full course. Infertility protocols often combine Vasthi with Uttara Vasthi (genital tract administration) and oral medication over 3–6 months.",
      contraindications:
        "Acute diarrhoea, intestinal obstruction, recent abdominal surgery, severe weakness, pregnancy, severe haemorrhoids with active bleeding, and certain types of inflammatory bowel disease. We screen carefully and may modify the protocol or substitute alternative therapies when needed.",
    },
    faqs: [
      {
        q: "Is Vasthi the same as a colonic?",
        a: "No. A colonic is a high-volume water flush focused on bowel cleansing. Vasthi uses a controlled volume of carefully prepared medicated decoction or oil — classical Ayurveda specifies multiple ingredients, sequence, and administration parameters. The intent is therapeutic absorption and Vata pacification, not just bowel cleansing.",
      },
      {
        q: "Will I have severe bowel reactions?",
        a: "No — properly prepared Vasthi produces a controlled, comfortable evacuation. Cramping or distress is uncommon and indicates an issue with formulation or technique; we adjust immediately. Most patients describe the natural evacuation as gentle and complete.",
      },
      {
        q: "Can it really help my chronic back pain?",
        a: "Yes — Vasthi is one of our most reliable therapies for chronic lumbar pain and sciatica, particularly when imaging confirms disc involvement. We typically combine Vasthi with Kati Vasthi (oil-pooling), Elakizhi over the lower back, and oral Kashayam. A 16-day programme often produces 60–80% sustained relief.",
      },
      {
        q: "Is it embarrassing or undignified?",
        a: "We understand the concern. Vasthi is performed by trained therapists in a private treatment room with appropriate draping and dignity throughout. Most patients adjust by the second or third session; the therapeutic results almost always justify the initial reservation.",
      },
      {
        q: "Can it help with infertility?",
        a: "Yes — Vasthi (especially Uttara Vasthi for the female reproductive tract) is one of the principal Ayurvedic interventions for both male and female infertility, particularly in cases with Vata-related uterine or sperm-quality issues. Treatment is typically across 3–6 cycles combined with internal medication and lifestyle adjustments.",
      },
    ],
  },
};
