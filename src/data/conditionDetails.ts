export interface FAQ {
  q: string;
  a: string;
}

export interface ProtocolPhase {
  phase: string;
  description: string;
}

export interface ConditionDetail {
  overview: string;
  symptoms: string[];
  ayurvedicView: string;
  approachComparison: string;
  treatmentProtocol: ProtocolPhase[];
  expectedOutcomes: string;
  faqs: FAQ[];
}

export const conditionDetails: Record<string, ConditionDetail> = {
  arthritis: {
    overview:
      "Arthritis is not a single disease but a family of over a hundred conditions that share one feature — inflammation and pain in the joints. At our hospital the two presentations we see most often are osteoarthritis (wear-related, typically in the knees, hips, and lower spine) and rheumatoid arthritis (an autoimmune condition that attacks joint linings symmetrically). We also treat cervical and lumbar spondylosis, frozen shoulder, gout, ankylosing spondylitis, and post-injury chronic joint pain. Classical Ayurveda groups most of these under Sandhigata Vata — vitiated Vata dosha localised in the joints — with inflammatory forms involving Ama, the undigested metabolic residue that settles into joint tissue and produces swelling, warmth, and stiffness.",
    symptoms: [
      "Pain that worsens with movement or after periods of inactivity, including morning stiffness lasting more than thirty minutes",
      "Swelling, warmth, or visible deformity in one or more joints",
      "Grating, cracking, or clicking sounds during joint movement",
      "Reduced range of motion — particularly in the knees, hips, shoulders, neck, or lower spine",
      "Weakness, fatigue, or a feeling of instability in the affected limb",
      "Numbness or tingling radiating from the joint (common in cervical and lumbar conditions)",
      "Difficulty with routine activities — climbing stairs, gripping objects, turning the neck, rising from a chair",
      "Low-grade fever, fatigue, and loss of appetite in active inflammatory forms like rheumatoid arthritis",
    ],
    ayurvedicView:
      "Classical texts describe joint pain primarily as a Vata disorder. Vata — the bioenergy of movement and air — accumulates in the joints as natural lubrication (Shleshaka Kapha) declines with age, stress, irregular diet, and physical overuse. When undigested metabolic residue (Ama) also enters the picture, characteristic of rheumatoid presentations, the condition is called Amavata. Treatment must therefore first remove Ama, then restore Vata balance, and finally rebuild the depleted joint tissues (Asthi and Majja dhatu). Each patient's prakriti (constitution) and vikriti (current imbalance) shape the sequence — there is no single protocol that fits all forms of arthritis, which is why careful dosha assessment precedes any treatment here.",
    approachComparison:
      "Conventional management — NSAIDs, corticosteroids, DMARDs, and joint replacement in severe cases — is effective at controlling inflammation and preserving function, but often at the cost of long-term side effects and rising medication burden. Ayurvedic treatment works more slowly but addresses the root: correcting the underlying Vata and Ama imbalance, reducing dependence on symptomatic medication, and slowing disease progression. The two are not mutually exclusive. Many of our patients continue prescribed medications during early treatment and gradually reduce dosage under their rheumatologist's supervision as symptoms improve. We work with your primary physician, not in place of them.",
    treatmentProtocol: [
      {
        phase: "Assessment & dosha diagnosis",
        description:
          "Detailed prakriti and vikriti evaluation, classical pulse diagnosis (Nadi Pariksha), and review of existing imaging, blood reports, and medication history. One to two consultations before treatment begins.",
      },
      {
        phase: "Ama removal",
        description:
          "Where inflammation and Ama are present — particularly in rheumatoid and active inflammatory arthritis — we use Deepana-Pachana medication, mild Panchakarma procedures such as Virechana (therapeutic purgation), and short courses of Vasti (medicated enema).",
      },
      {
        phase: "Targeted external therapies",
        description:
          "Abhyangam with joint-specific medicated oils (Kottamchukkadi, Mahanarayana, Dhanwantaram), Elakizhi or Choorna Pinda Swedam over affected joints, and Kati Vasthi or Greeva Vasthi for spinal involvement. Typical course: 14–21 days for chronic presentations.",
      },
      {
        phase: "Internal medication",
        description:
          "Condition-specific classical formulations — Rasnasaptakam Kashayam, Maharasnadi Kashayam, Yogaraja Guggulu, Simhanada Guggulu — selected by the form and stage of arthritis.",
      },
      {
        phase: "Follow-up & maintenance",
        description:
          "Structured review at one and three months, with a Vata-pacifying diet, daily self-abhyanga, appropriate yoga, and seasonal reinforcement protocols to prevent recurrence.",
      },
    ],
    expectedOutcomes:
      "Patients typically report meaningful reduction in pain and stiffness within the first two to three weeks of residential treatment, with noticeably better joint mobility by the end of a three-week protocol. Deeper outcomes — decreased medication dependence, slower disease progression, sustained relief — develop over three to six months of continued internal medication and lifestyle adherence. Severe structural damage in advanced osteoarthritis or end-stage joint deformity is managed to improve quality of life rather than reversed; we are transparent about where Ayurveda can and cannot undo what has already been lost.",
    faqs: [
      {
        q: "How long before I see improvement?",
        a: "Most patients experience symptomatic relief within two to three weeks of residential treatment. Sustained benefit requires three to six months of structured follow-up, including diet, daily self-massage, and internal medication.",
      },
      {
        q: "Can Ayurveda help rheumatoid arthritis?",
        a: "Yes, with realistic expectations. We cannot cure autoimmunity, but we can reduce flare frequency, manage joint damage, and often help patients reduce corticosteroid or DMARD dependence over time under their rheumatologist's supervision.",
      },
      {
        q: "Do I need to stop my current medication?",
        a: "No. We never ask patients to discontinue prescribed medication on their own. As symptoms improve, your primary physician can taper dosage based on clinical and laboratory markers.",
      },
      {
        q: "What lifestyle changes will I need to maintain?",
        a: "A Vata-pacifying diet (warm, well-cooked, mildly oily foods), daily self-massage (Abhyanga), consistent sleep, and yoga postures that mobilise joints without stressing them.",
      },
      {
        q: "Can you treat knee osteoarthritis without surgery?",
        a: "For Grade 1 and 2 osteoarthritis, yes — often with significant functional improvement. Grade 3 and 4 benefit from Ayurvedic care for symptom relief and delaying surgery, but structural damage itself is not reversed.",
      },
      {
        q: "Is the treatment painful?",
        a: "External therapies are generally pleasant. Some patients experience initial soreness in the first few days of deep-tissue work, which subsides as the body responds.",
      },
      {
        q: "Is treatment residential or outpatient?",
        a: "Chronic arthritis typically benefits from a 14–21 day residential program. For stable cases we also offer outpatient protocols with daily treatments.",
      },
    ],
  },

  asthma: {
    overview:
      "Respiratory conditions — bronchial asthma, chronic bronchitis, allergic rhinitis, chronic sinusitis, and recurrent cough — share a common Ayurvedic root in an imbalance between Kapha (mucus and bronchial secretions) and Vata (airflow and bronchial contraction). What makes Kerala's approach distinctive is the emphasis on Panchakarma detoxification at the seat of the disease — the chest, throat, and sinuses — rather than treating only the surface symptoms. Our protocols aim to address the underlying hypersensitivity and recurrent inflammation, not just the immediate wheezing or congestion a patient walks in with.",
    symptoms: [
      "Shortness of breath, especially at night or in the early morning",
      "Wheezing, chest tightness, or a whistling sound on exhalation",
      "Persistent cough, often worse on exposure to dust, cold, or allergens",
      "Frequent throat clearing, post-nasal drip, or repeated sneezing episodes",
      "Recurrent sinus headaches, facial heaviness, or nasal congestion",
      "Reduced exercise tolerance or breathlessness on mild exertion",
      "Disturbed sleep from night-time breathing difficulty or coughing",
      "Rescue-inhaler dependence increasing over months or years",
    ],
    ayurvedicView:
      "The Charaka Samhita describes Tamaka Shwasa — roughly, what modern medicine calls bronchial asthma — as arising from Vata pushing vitiated Kapha into the airways. The triggers listed are familiar: cold foods, dairy, exposure to cold air, emotional stress, and seasonal transition (particularly the monsoon). The classical management principle is Shodhana — removing the underlying Kapha accumulation through controlled therapeutic procedures — followed by Shamana (pacifying medication) and long-term preventive care (Rasayana) to strengthen respiratory immunity and reduce reactivity.",
    approachComparison:
      "Inhalers, bronchodilators, and corticosteroids manage symptoms effectively but do not address the underlying tendency toward reactive airways. Ayurvedic treatment, by contrast, aims to reduce the frequency and severity of attacks, lessen reliance on rescue medication, and improve baseline lung function over time. Most patients continue their inhalers throughout Ayurvedic treatment; we work alongside respiratory physicians rather than in place of them. Children and elderly patients particularly benefit from supportive Ayurvedic care that helps minimise long-term steroid exposure.",
    treatmentProtocol: [
      {
        phase: "Assessment",
        description:
          "Spirometry or PFT review, allergen history, rescue inhaler usage pattern, and prakriti analysis to identify whether the picture is Vata-Kapha, Pitta-Kapha, or Kapha-predominant.",
      },
      {
        phase: "Internal preparation",
        description:
          "Deepana-Pachana medication and Snehapana (graduated internal ghee dosing) to mobilise accumulated Kapha into the gastrointestinal tract for elimination.",
      },
      {
        phase: "Panchakarma",
        description:
          "Vamana (therapeutic emesis) — the primary Kerala therapy for upper-respiratory Kapha — administered in a controlled clinical setting. Nasyam (medicated nasal instillation) targets sinus disease and allergic rhinitis.",
      },
      {
        phase: "Internal medication",
        description:
          "Specific herbal formulations — Vasa, Pushkaramula, Kantakari, and classical compounds like Shwasakuthara Rasa or Kanakasava — tailored to the individual pattern.",
      },
      {
        phase: "Rasayana & lifestyle",
        description:
          "Chyawanaprasha, Pippali Rasayana, pranayama instruction, and dietary guidelines to reduce Kapha-aggravating foods (cold drinks, refined dairy, heavy meals at night).",
      },
    ],
    expectedOutcomes:
      "Over a two- to three-week residential program most patients experience clearer breathing, reduced nocturnal symptoms, and noticeable improvement in exercise tolerance. Sustained benefit — fewer attacks per season, reduced dependence on inhalers, more stable peak-flow readings — develops over three to six months of continued internal medication and lifestyle adherence. Seasonal reinforcement protocols every monsoon or winter are common for long-term control, particularly for patients with childhood-onset or allergy-driven asthma.",
    faqs: [
      {
        q: "Can asthma be cured with Ayurveda?",
        a: "No single treatment cures asthma. Ayurvedic care can significantly reduce attack frequency, severity, and medication dependence for most patients — but the underlying reactivity is managed, not permanently erased.",
      },
      {
        q: "Is Vamana safe?",
        a: "When performed by trained physicians on properly prepared patients, yes. We do not use Vamana during pregnancy, severe debility, uncontrolled cardiac conditions, or active respiratory infection.",
      },
      {
        q: "Can children receive this treatment?",
        a: "Children aged eight and above can benefit; treatments are modified for age. We do not prescribe full Panchakarma for very young children.",
      },
      {
        q: "Will I need to continue my inhalers?",
        a: "Most patients continue inhalers during and after treatment. Your pulmonologist adjusts dosage over time based on symptom frequency and peak-flow readings.",
      },
      {
        q: "How soon will I feel better?",
        a: "Sinus and post-nasal symptoms often improve within the first week. Core asthmatic symptoms take two to three weeks of active treatment plus four to eight weeks of follow-up medication.",
      },
      {
        q: "Which season is best for treatment?",
        a: "Early autumn and late winter are ideal for Vamana. Monsoon is traditionally preferred for Karkidaka Chikitsa but involves humid conditions some asthmatics tolerate less well.",
      },
      {
        q: "Do you treat allergic rhinitis without a residential stay?",
        a: "Yes. Nasyam with follow-up medication can be delivered as a five- to seven-day outpatient course for those who cannot take residential time off.",
      },
    ],
  },

  diabetes: {
    overview:
      "Type 2 diabetes, insulin resistance, and metabolic syndrome are classified in Ayurveda as Madhumeha — a subset of the broader Prameha family of urinary-metabolic disorders. Classical texts describe Prameha in twenty subtypes distinguished by dosha involvement, each with its own treatment path. Our contemporary focus is on blood-sugar stability, restoring insulin sensitivity, normalising weight, and preventing downstream complications — neuropathy, retinopathy, nephropathy, and cardiovascular strain. We treat diabetes as a complex metabolic disorder, not just a number on a glucose meter.",
    symptoms: [
      "Excessive thirst and frequent urination, particularly at night",
      "Unintended weight loss or, more commonly in Type 2, stubborn central weight gain",
      "Fatigue and reduced stamina, especially after meals",
      "Slow wound healing and recurrent skin or urinary infections",
      "Tingling, burning, or numbness in the feet and hands",
      "Blurred vision or fluctuating visual acuity",
      "Increased hunger despite regular or large meals",
      "Dry mouth, sugar cravings, and a sweet taste in the mouth",
    ],
    ayurvedicView:
      "Madhumeha is classified primarily as a Kapha-Medas disorder — the result of excessive accumulation of fatty tissue, sedentary lifestyle, overconsumption of sweet and heavy foods, daytime sleep, and mental stagnation. Once the Meda dhatu (fat tissue) loses its capacity to receive and hold nutrition, the body's sweetness spills into urine. Advanced Madhumeha involves Vata — which is why neuropathy, cachexia, and serious complications emerge as the disease progresses. Treatment is therefore staged: vigorous Kapha management in early disease, Vata protection in advanced stages, and Rasayana support throughout to preserve vision, kidneys, and nerve function.",
    approachComparison:
      "Metformin, SGLT2 inhibitors, insulin, and GLP-1 agonists are the standard of care and should not be discontinued on Ayurvedic advice alone. Our role is complementary: improving insulin sensitivity through specific herbs (Vijaysara, Gudmar, Saptaranga), correcting underlying metabolic dysfunction through Udwarthanam (therapeutic powder massage), and helping patients reduce medication requirements over months under their diabetologist's supervision. Many patients successfully reduce oral hypoglycaemics; fewer manage to come off insulin entirely, though improved glycaemic control is common. Diabetes is a disease to manage well — not one we promise to erase.",
    treatmentProtocol: [
      {
        phase: "Assessment",
        description:
          "Review of HbA1c trend, fasting and postprandial glucose records, lipid profile, kidney function, and fundoscopy/neurology screening. Prakriti assessment guides treatment selection.",
      },
      {
        phase: "Udwarthanam",
        description:
          "Dry medicated-powder massage with herbs like Triphala, Kolakulathadi, or Kottamchukkadi to mobilise Kapha and improve peripheral insulin sensitivity. Typically daily for 14–21 days.",
      },
      {
        phase: "Panchakarma",
        description:
          "Condition-specific purification — Virechana for Pitta-Kapha patterns, Vamana in Kapha predominance, Vasti where Vata has begun to contribute.",
      },
      {
        phase: "Internal medication",
        description:
          "Nishakathakadi Kashayam, Vijaysar churna, Chandraprabha Vati, Triphala Guggulu — selected and dosed by dosha presentation and complication profile.",
      },
      {
        phase: "Lifestyle redesign",
        description:
          "Low-glycaemic, Kapha-Medo-pacifying diet; structured meal timing; elimination of daytime naps; a graduated walking and yoga program; monthly follow-up review.",
      },
    ],
    expectedOutcomes:
      "A typical 21-day residential program brings fasting glucose down by 15–40 mg/dL in most Type 2 patients, with HbA1c reduction of 0.5–1.5% over the following three months. Weight loss of three to eight kilograms during the same period is common. Sustained benefit requires adherence to diet, exercise, and internal medication for six to twelve months, with gradual medication taper under your diabetologist's supervision. Many patients are able to maintain better control on fewer medications; some achieve drug-free glycaemic control in early-stage disease.",
    faqs: [
      {
        q: "Can Ayurveda cure diabetes?",
        a: "Type 2 diabetes can often be brought back into non-diabetic range for some patients with consistent lifestyle and treatment. But the underlying susceptibility remains — it is a disease to manage, not permanently erase.",
      },
      {
        q: "Will I need to stop my insulin?",
        a: "No. Insulin doses are adjusted only by your diabetologist based on your glucose readings. We coordinate closely with your doctor.",
      },
      {
        q: "What about Type 1 diabetes?",
        a: "Our role in Type 1 is supportive — improving insulin sensitivity, managing complications, maintaining vitality and quality of life. Insulin remains essential throughout.",
      },
      {
        q: "How much weight will I lose?",
        a: "Typically three to eight kilograms during a 21-day residential program, with continued loss in the following three months if the dietary and activity protocols are maintained.",
      },
      {
        q: "Is the diet restrictive?",
        a: "The Ayurvedic diabetic diet emphasises timing and quality more than severe restriction. Most patients find it sustainable and satisfying.",
      },
      {
        q: "Do I need a residential stay?",
        a: "Chronic diabetes benefits significantly from a 14–21 day residential program to establish new patterns. Follow-up is typically outpatient.",
      },
      {
        q: "Can you treat diabetic neuropathy?",
        a: "Yes. Abhyangam with Mahanarayana taila, Pada Abhyanga, and specific internal medications (Balarishta, Ashwagandha Rasayana) address neuropathic pain and numbness, though results vary by how advanced the nerve damage is.",
      },
    ],
  },

  "geriatric-care": {
    overview:
      "Elderly wellness in Ayurveda centres on Rasayana — the classical science of rejuvenation that aims not only to extend lifespan but to preserve cognitive function, strength, immunity, and quality of life across the later decades. At Vaidya Vrindavanam we treat conditions common to ageing — sleep disturbances, joint stiffness, reduced stamina, memory concerns, and the cumulative effects of years of chronic medication. The approach is gentle and staged, with careful attention to existing prescriptions, cardiovascular safety, and the patient's current capacity for treatment.",
    symptoms: [
      "Chronic fatigue and reduced physical endurance",
      "Disrupted sleep — difficulty falling asleep, frequent waking, early-morning wakefulness, daytime drowsiness",
      "Joint stiffness and reduced mobility, particularly on rising in the morning",
      "Constipation, bloating, and irregular digestion",
      "Memory lapses, word-finding difficulty, slower recall",
      "Dry skin, brittle nails, weakening hair",
      "Reduced immune resilience — frequent colds, slow wound healing",
      "Loss of appetite, unintended weight changes, reduced social engagement",
    ],
    ayurvedicView:
      "Ayurveda views ageing as a gradual depletion of the seven dhatus (tissues) and the growing dominance of Vata — the dosha of movement, drying, and catabolism. Left unchecked, Vata produces the familiar markers: weakness, insomnia, anxiety, and the structural drying characteristic of ageing. Rasayana therapy works through three mechanisms: improving the quality of nutrition reaching the tissues (Aharaja Rasayana), ensuring efficient metabolism and assimilation (Agni strengthening), and using specific rejuvenating herbs and classical compounds (Brahmi, Ashwagandha, Amalaki, Brahma Rasayanam) to rebuild depleted reserves.",
    approachComparison:
      "Modern geriatric medicine excels at acute management — hypertension, cardiac care, bone density monitoring — but rarely offers systematic approaches to cognitive preservation, sleep quality, or overall vitality. Ayurvedic Rasayana complements this care by improving functional wellness metrics that standard medicine doesn't specifically target: sleep quality, mental clarity, energy for daily activities, and resistance to recurrent infections. We work in parallel with your physicians, not in competition.",
    treatmentProtocol: [
      {
        phase: "Comprehensive assessment",
        description:
          "Review of current medications, cardiac and renal history, bone density, cognitive screening, and discussion of day-to-day functional priorities.",
      },
      {
        phase: "Gentle Panchakarma",
        description:
          "Staged procedures modified for age — Sneha Vasti (medicated-oil enema) is preferred over aggressive purgation. Each procedure carefully dosed and monitored.",
      },
      {
        phase: "Daily external therapies",
        description:
          "Abhyangam (full-body oil massage) daily, Shiroabhyanga for sleep and cognition, Pada Abhyanga for circulation and sleep quality.",
      },
      {
        phase: "Rasayana medications",
        description:
          "Specific to the predominant concern: Brahma Rasayanam for cognitive decline, Chyawanaprasha for immunity, Ashwagandha Lehya for strength and sleep, Triphala for digestion.",
      },
      {
        phase: "Daily routine & follow-up",
        description:
          "Dinacharya guidance, appropriate gentle yoga and pranayama, easy-digestion diet, and structured monthly or quarterly reinforcement.",
      },
    ],
    expectedOutcomes:
      "Patients typically report improved sleep quality within the first week, better appetite and energy by the end of a 14-day program, and sustained gains in stamina and mood over two to three months. Cognitive benefits — sharper recall, clearer thinking, less morning mental fog — develop more gradually with continued Rasayana medication. We set realistic expectations: Rasayana extends function and enhances quality of life; it does not reverse the underlying biology of age.",
    faqs: [
      {
        q: "At what age should one begin Rasayana?",
        a: "Traditionally after sixty, but selective Rasayana benefits anyone with chronic fatigue, recovery from illness, or early ageing signs. Preventive Rasayana is valuable from the mid-fifties onward.",
      },
      {
        q: "Is Panchakarma safe for elderly patients?",
        a: "In modified form, yes. We avoid aggressive purgation and use Sneha Vasti or gentle Abhyangam as the core therapies, carefully adjusted to the patient's condition.",
      },
      {
        q: "Can Ayurveda treat dementia or Alzheimer's?",
        a: "We cannot cure neurodegeneration. We can slow progression in early stages, improve mood and functional capacity, and complement neurology care.",
      },
      {
        q: "Will treatment interact with my cardiac or diabetic medications?",
        a: "Herbs are chosen with full awareness of current prescriptions. We never ask patients to stop prescribed medications without physician coordination.",
      },
      {
        q: "Do you offer outpatient Rasayana?",
        a: "Yes, as a supplement to short residential reinforcements. The most effective results come from an initial 14-day residential stay followed by outpatient maintenance.",
      },
      {
        q: "How often should Rasayana be repeated?",
        a: "A yearly 10–14 day reinforcement — often in early winter or monsoon — is ideal for sustained benefit.",
      },
      {
        q: "Is the diet restrictive for older patients?",
        a: "The geriatric diet prioritises easy digestion: warm, soft, mildly oily, well-spiced food. Most patients find it comfortable and sustainable.",
      },
    ],
  },

  hypertension: {
    overview:
      "Primary hypertension — sustained high blood pressure without an identifiable secondary cause — is classified in Ayurveda as a disorder of Rakta and Vata, with chronic stress and lifestyle as the principal drivers. Rather than working through pharmacological vasodilation, Ayurvedic management addresses the autonomic over-activation, chronic stress load, and lifestyle factors that keep blood pressure elevated in the first place. The goal is to complement antihypertensive medication, reduce autonomic reactivity, and — where possible — support gradual medication reduction under your cardiologist's supervision.",
    symptoms: [
      "Persistent headaches, especially at the back of the head or temples",
      "Dizziness or lightheadedness, particularly on standing or bending",
      "Blurred vision or occasional visual disturbances",
      "Chest tightness, palpitations, or irregular heartbeat",
      "Difficulty sleeping, early-morning wakefulness, or disturbed sleep",
      "Nosebleeds (in moderate-to-severe cases)",
      "Fatigue and difficulty with exertion",
      "Many patients are asymptomatic — hypertension is often detected incidentally",
    ],
    ayurvedicView:
      "Blood pressure is the pressure Vata exerts on the walls of Rakta-vahini srotas — the blood-carrying channels. Vata becomes excessive from stress, insomnia, irregular meals, and suppression of natural urges. Pitta contributes through anger, inflammation, and sleep loss. Kapha's role is structural — arterial thickening and atherosclerosis. Correcting hypertension Ayurvedically means addressing all three but especially Vata and Pitta: calming the nervous system, restoring sleep, and reducing the inflammatory load that stiffens vessels over decades.",
    approachComparison:
      "Antihypertensive medications — ACE inhibitors, beta blockers, calcium channel blockers, diuretics — are essential and should not be discontinued. Our role is complementary: reducing autonomic reactivity through Shirodhara and Shiroabhyanga, correcting sleep and stress through lifestyle and medication, and addressing underlying inflammation. Some patients experience reduced medication requirement over three to six months; others stabilise on the same medication with better control. Both are considered successes.",
    treatmentProtocol: [
      {
        phase: "Baseline & stress profile",
        description:
          "Seven-day BP log, lab review (kidney function, lipid panel, ECG), stress history, and assessment of sleep and dietary patterns.",
      },
      {
        phase: "Shirodhara",
        description:
          "Continuous flow of warm medicated oil over the forehead — daily for 7–14 days. The single most effective Ayurvedic therapy for stress-driven hypertension.",
      },
      {
        phase: "Supporting therapies",
        description:
          "Abhyangam with sedating oils (Ksheerabala, Chandanadi), Takradhara (buttermilk flow) for heated/angry presentations, and Pada Abhyanga for sleep quality.",
      },
      {
        phase: "Internal medications",
        description:
          "Sarpagandha (used cautiously alongside current BP medications), Jatamansi, Mukta vati, and Rauwolfia-containing compounds — personalised to prakriti and cardiac history.",
      },
      {
        phase: "Daily routine reset",
        description:
          "Sleep timing, meditation, specific pranayama (Anulom-Vilom, Bhramari), dietary adjustments (reduced sodium, saturated fat, caffeine), and follow-up BP monitoring.",
      },
    ],
    expectedOutcomes:
      "Most patients experience 5–15 mmHg reduction in systolic BP within 14 days of residential treatment, along with better sleep, reduced anxiety, and improved energy. Sustained benefit develops over three months of follow-up with continued medication, lifestyle practice, and periodic Shirodhara reinforcement. Medication reduction, when it happens, is always gradual and guided by your cardiologist based on home BP readings and clinic measurements.",
    faqs: [
      {
        q: "Can Ayurveda replace my BP medication?",
        a: "For most patients, no. For some with mild stage-1 hypertension, Ayurvedic management and lifestyle may be sufficient. Never discontinue medication on your own.",
      },
      {
        q: "Is Shirodhara safe for hypertensive patients?",
        a: "Yes, and highly beneficial. We use specific oils (not warming ones) and monitor BP before and after each session.",
      },
      {
        q: "How much will my BP drop?",
        a: "Typically 5–15 mmHg systolic reduction in 14 days; more sustained reduction over three months of continued treatment and lifestyle practice.",
      },
      {
        q: "Can I continue my statin and aspirin?",
        a: "Yes. We coordinate Ayurvedic herbs with your cardiac medication regimen.",
      },
      {
        q: "Do I need to stop salt?",
        a: "Moderation, not elimination. Most hypertensive patients benefit from 3–4 grams of sodium daily rather than drastic restriction.",
      },
      {
        q: "What about secondary hypertension?",
        a: "We treat the Ayurvedic component; the underlying cause (kidney disease, endocrine issue, etc.) must be managed by your specialist.",
      },
      {
        q: "How often do I need follow-up treatment?",
        a: "A seven-day Shirodhara reinforcement every 6–12 months typically sustains the benefits achieved in the initial course.",
      },
    ],
  },

  infertility: {
    overview:
      "Male and female infertility — the inability to conceive after twelve months of regular unprotected intercourse — affects roughly one in seven couples worldwide, and the number is rising. At Vaidya Vrindavanam we see patients across the spectrum: unexplained infertility, PCOS-related anovulation, male factor (low sperm count, motility, or morphology), recurrent miscarriage, and age-related decline in reproductive potential. The Ayurvedic classification — Vandhyatva, Kshina Shukra, and Kshina Artava — provides a detailed framework for distinguishing dosha-specific sub-types, each with its own treatment path.",
    symptoms: [
      "Irregular, scanty, or painful menstrual cycles in women",
      "Difficulty conceiving after twelve months of regular unprotected intercourse",
      "Recurrent pregnancy loss, particularly in the first trimester",
      "Low libido, erectile concerns, or delayed ejaculation in men",
      "Chronic fatigue, stress, or emotional exhaustion in either partner",
      "Hormonal imbalances reflected in weight, skin, hair, or mood changes",
      "Reports of low sperm count, poor motility, or abnormal morphology on semen analysis",
      "Ovulation disorders seen on cycle tracking or confirmed by hormonal panel",
    ],
    ayurvedicView:
      "Reproduction depends on four classical factors: healthy season (Ritu — the optimal fertile window), healthy uterus and seminal channels (Kshetra), healthy nutrition (Ambu), and healthy seed (Beeja — ovum and sperm quality). Dysfunction in any of these produces infertility. The three doshas each produce characteristic patterns: Vata — anovulation, erratic cycles, implantation failure, low sperm motility; Pitta — endometriosis, pelvic inflammation, hormonal excess; Kapha — PCOS, cyst formation, metabolic infertility. Our protocols target the specific pattern identified rather than applying a generic fertility regimen.",
    approachComparison:
      "Assisted reproductive technology — IUI, IVF, ICSI — is powerful and succeeds for many couples, but fails for others, often at significant emotional and financial cost. Ayurvedic preparation before ART improves egg quality, uterine receptivity, and sperm parameters, and may improve implantation rates. For couples who have not yet attempted ART, three to six months of Ayurvedic treatment often resolves the underlying dysfunction and restores natural conception. We work with reproductive endocrinologists, not against them.",
    treatmentProtocol: [
      {
        phase: "Comprehensive evaluation",
        description:
          "History from both partners, hormonal panels (AMH, FSH, LH, prolactin, TSH, testosterone), imaging (HSG, pelvic ultrasound, scrotal ultrasound where indicated), and semen analysis.",
      },
      {
        phase: "Detoxification",
        description:
          "Panchakarma tailored to dosha pattern — Virechana for Pitta imbalance, Vasti for Vata, Udwarthanam for PCOS or obesity-related infertility. 14–21 days for each partner.",
      },
      {
        phase: "Uttara Vasti",
        description:
          "Intrauterine medicated-oil instillation for women with uterine factor. Shirodhara for stress-driven and psychogenic infertility.",
      },
      {
        phase: "Internal medications",
        description:
          "Pattern-specific classical formulations — Phalaghrita, Ashwagandha Rasayana, Kapikacchu, Shatavari Kalpa, Pushpadhanwa Rasa — chosen by the dominant imbalance.",
      },
      {
        phase: "Cycle-timed support",
        description:
          "Pushpa deepana in the follicular phase, Artava jananam around ovulation, and Garbhini paricharya if conception occurs. Partner coordination of treatment timing.",
      },
    ],
    expectedOutcomes:
      "Improvement in menstrual regularity, egg maturation, and semen parameters is typically visible over three to six months. Conception rates vary significantly by underlying cause: PCOS and unexplained infertility show the best responses; severe male factor and advanced maternal age benefit most from combined Ayurvedic preparation and ART. Most patients need at least three months of treatment before attempting conception or ART cycles to allow semen regeneration (approximately 72 days) and endometrial remodelling.",
    faqs: [
      {
        q: "How long does treatment take?",
        a: "Three to six months is the standard preparation window. Couples attempting natural conception typically commit to six months of treatment before evaluating response.",
      },
      {
        q: "Can Ayurveda improve IVF outcomes?",
        a: "Yes. Three months of preparatory Ayurvedic care is associated with improved egg and sperm quality and may improve implantation. We coordinate timing with your fertility specialist.",
      },
      {
        q: "Do both partners need treatment?",
        a: "Yes, when possible. Male factor contributes to 40–50% of infertility cases. Treating both partners together produces better outcomes than treating one alone.",
      },
      {
        q: "Is treatment residential?",
        a: "The initial detoxification phase is best done residentially (14–21 days). Subsequent phases are typically outpatient.",
      },
      {
        q: "Can you help with PCOS-related infertility?",
        a: "Yes — this is one of our strongest areas. Udwarthanam combined with internal medication and lifestyle often restores ovulation within three to six cycles.",
      },
      {
        q: "What about advanced maternal age?",
        a: "Over forty, Ayurveda helps optimise egg quality and uterine environment. We are transparent about declining reproductive potential with age.",
      },
      {
        q: "Is treatment compatible with ongoing fertility medications?",
        a: "Usually yes. We adjust protocols around specific fertility drugs (letrozole, gonadotropins, progesterone support) to avoid interactions.",
      },
    ],
  },

  obesity: {
    overview:
      "Obesity — body mass index above 30 — and its related metabolic conditions (insulin resistance, fatty liver, sleep apnoea, hypertension) are recognised in Ayurveda as Sthaulya, a Kapha-Medas disorder with eventual Vata complications. The condition is not cosmetic: it underlies cardiovascular disease, diabetes, joint degeneration, reproductive problems, and reduced life expectancy. Our approach combines Panchakarma detoxification, metabolic correction through specific therapies, graduated physical activity, and sustainable dietary change — producing weight loss that tends to last because it corrects the underlying metabolism rather than starving the body.",
    symptoms: [
      "BMI above 25 (overweight) or 30 (obese); central adiposity (waist > 90cm men, > 80cm women)",
      "Unintended weight gain despite stable or even reduced food intake",
      "Chronic fatigue and reduced stamina",
      "Shortness of breath on mild exertion",
      "Joint pain, particularly in the knees and lower back",
      "Daytime drowsiness, especially after meals",
      "Insulin resistance — sweet cravings, afternoon energy slumps, darkened skin folds",
      "Menstrual irregularity in women; reduced libido and low testosterone in men",
    ],
    ayurvedicView:
      "Obesity results from a combination of Kapha-aggravating diet (sweet, oily, heavy foods), sedentary lifestyle, daytime sleep, and mental stagnation. The accumulating Meda dhatu (fat tissue) paradoxically traps Vata, producing the familiar pattern of intense hunger (because nutrition is not reaching tissues efficiently) combined with lethargy and difficulty moving. Classical management therefore combines Ruksha (drying), Ushna (warming), and Teekshna (sharp, penetrating) therapies to reduce Kapha and Medas while restoring proper metabolic fire (Agni).",
    approachComparison:
      "Conventional weight loss — caloric restriction, bariatric surgery, GLP-1 agonists like semaglutide — produces results but rarely addresses the underlying metabolic dysfunction; weight regain is common once intervention stops. Ayurveda offers a slower but more sustainable approach that corrects the imbalance producing the weight gain. Patients typically lose 4–10 kg during a 21-day residential program and continue losing 1–2 kg per month in the following six months if lifestyle recommendations are maintained.",
    treatmentProtocol: [
      {
        phase: "Assessment",
        description:
          "BMI, waist circumference, body composition; metabolic panel (lipid, fasting insulin, HbA1c, liver function, thyroid); medical clearance for planned activity levels.",
      },
      {
        phase: "Udwarthanam",
        description:
          "Dry medicated-powder massage — daily for 21 days — with herbs such as Triphala, Kolakulathadi, or Kottamchukkadi. The single most distinctive Ayurvedic weight-loss therapy.",
      },
      {
        phase: "Panchakarma",
        description:
          "Virechana for Pitta-Kapha patients, Vamana for Kapha predominance, Vasti where Vata has begun to contribute.",
      },
      {
        phase: "Internal medications",
        description:
          "Triphala Guggulu, Navaka Guggulu, Varanadi Kashayam, Medohara Vidangadi lehya — selected by dosha and metabolic profile.",
      },
      {
        phase: "Lifestyle redesign",
        description:
          "Graduated daily walking and yoga (Surya Namaskara, Warrior series), Kapha-pacifying diet with strict meal timing, elimination of daytime sleep, hydration guidelines, and monthly follow-up weigh-in.",
      },
    ],
    expectedOutcomes:
      "A typical 21-day residential program produces 4–10 kg weight loss, with visible reduction in abdominal circumference, improved energy, better sleep, and lower HbA1c and lipid values. Sustained loss of another 8–20 kg over six months is achievable with consistent lifestyle and monthly outpatient reinforcement. Unlike crash diets, this weight loss tends to be sustainable because it corrects the underlying metabolism rather than working against it.",
    faqs: [
      {
        q: "How much weight will I lose in a month?",
        a: "Typically 4–10 kg during a 21-day residential stay; 1–2 kg per month with continued outpatient support.",
      },
      {
        q: "Is the diet restrictive?",
        a: "Measured portions of warm, cooked, well-spiced food. Most patients find it filling and satisfying. Sweet, oily, and cold foods are limited, not banned.",
      },
      {
        q: "Is exercise required during residential treatment?",
        a: "Graduated daily walking and gentle yoga. We do not prescribe intense exercise during active Panchakarma phases.",
      },
      {
        q: "Will I regain the weight afterward?",
        a: "Only if lifestyle returns to pre-treatment patterns. Patients who maintain our dietary and activity recommendations typically sustain and extend the loss.",
      },
      {
        q: "Can it help if I have diabetes and obesity together?",
        a: "Yes — these are traditionally treated together. The protocols overlap significantly and results are often better than treating either alone.",
      },
      {
        q: "Is bariatric surgery ever recommended?",
        a: "For BMI above 40 with major comorbidities, yes. Ayurveda supports pre- and post-surgical recovery and helps sustain long-term results after surgery.",
      },
      {
        q: "What about children and teenagers?",
        a: "Paediatric obesity is treated with gentler protocols — Udwarthanam, diet, and activity — without aggressive Panchakarma.",
      },
    ],
  },

  "skin-disorders": {
    overview:
      "Chronic skin conditions — psoriasis, eczema, atopic dermatitis, acne, chronic urticaria, vitiligo, and recurrent fungal infections — share a core Ayurvedic root in Rakta dushti (vitiation of the blood tissue) and Pitta imbalance, often complicated by Kapha (weeping, oily presentations) or Vata (dry, scaly types). Ayurveda treats skin conditions from within as much as without, recognising that visible manifestations reflect internal metabolic dysfunction, chronic inflammation, gut dysbiosis, or prolonged psychological stress. The visible skin is only the surface expression of something deeper.",
    symptoms: [
      "Psoriasis — red, silvery-scaled plaques on elbows, knees, scalp, or lower back",
      "Atopic dermatitis / eczema — itchy, inflamed, thickened patches in flexural areas (behind knees, inside elbows)",
      "Acne — inflamed papules, pustules, or cystic lesions on face and upper trunk",
      "Urticaria — migratory wheals and itching, often lasting hours to days",
      "Vitiligo — progressive loss of skin pigment in patches",
      "Recurrent fungal infections — itchy, circular, scaly rashes on skin folds",
      "Chronic dry skin, cracking, or slow-healing wounds",
      "Burning, stinging sensations; skin thickening; or hyperpigmentation after inflammation",
    ],
    ayurvedicView:
      "Classical texts describe skin diseases collectively as Kushta — a broad category ranging from mild dermatological conditions to severe infectious disease. All forms share a common feature: doshic toxicity reaching the skin layer through vitiated blood. Psoriasis fits the Ekakushta and Kitibha descriptions; eczema maps to Vicharchika; urticaria to Sheethapitta; acne to Mukhadushika; vitiligo to Shvitra. Each distinct pattern calls for distinct treatment. The common principle running through all: cleanse the blood (Rakta shodhana), pacify Pitta, restore gut health (since the digestive tract is the primary site of toxin generation), and address chronic stress.",
    approachComparison:
      "Topical steroids, calcineurin inhibitors, and biologics control symptoms powerfully but often with rebound on withdrawal or long-term effects (skin atrophy, immunosuppression). Ayurvedic treatment is slower but addresses the underlying blood and gut dysfunction. For many chronic conditions — particularly psoriasis and eczema — three to six months of Ayurvedic care produces sustained remission that topical therapy alone rarely achieves. We advise patients not to stop prescribed medication abruptly; tapering occurs gradually as the skin condition improves.",
    treatmentProtocol: [
      {
        phase: "Assessment",
        description:
          "History, lesion mapping, prakriti assessment, and review of previous biopsies, allergy panels, or patch-test results.",
      },
      {
        phase: "Virechana",
        description:
          "Therapeutic purgation — the classical treatment for Pitta-Rakta skin conditions. Includes preparation (Deepana-Pachana, Snehapana) and Virechana itself. Typically 14–21 days total.",
      },
      {
        phase: "Raktamoksha",
        description:
          "Localised bloodletting for severe, fixed lesions. Leech application is the most commonly used form in our hospital — particularly effective for psoriatic plaques and chronic non-healing areas.",
      },
      {
        phase: "External applications",
        description:
          "Medicated oils (Karanja taila, Karaskara taila, Nalpamaradi), lepa (herbal pastes), and therapeutic baths with specific herbs. Applied daily throughout the residential stay.",
      },
      {
        phase: "Internal medication",
        description:
          "Mahatiktakam Kashayam, Manjishthadi Kashayam, Arogyavardhini Vati, Patolakaturohinyadi Kashayam, and condition-specific Rasayanas.",
      },
    ],
    expectedOutcomes:
      "Most chronic skin conditions show visible improvement within 14–21 days of residential treatment. Clearance of psoriatic plaques, reduction of eczema flares, and acne improvement typically require three to six months of continued internal medication. Vitiligo responds more slowly — pigment return over six to twelve months — and outcomes vary significantly by extent and duration of the condition. Small, recent vitiligo patches respond best; widespread long-standing vitiligo responds less predictably.",
    faqs: [
      {
        q: "Can Ayurveda cure psoriasis?",
        a: "Remission is achievable for many patients; cure in the sense of never recurring is not promised. Most patients experience 70–90% clearance with sustained treatment and a Pitta-pacifying diet.",
      },
      {
        q: "Is Raktamoksha / leech therapy safe?",
        a: "Yes, when performed under sterile conditions by trained practitioners with medical-grade leeches. Very effective for localised plaques and chronic inflammation.",
      },
      {
        q: "Will my steroid creams interfere?",
        a: "No. We prefer patients taper them gradually under dermatological supervision as the skin improves; abrupt discontinuation can cause rebound flares.",
      },
      {
        q: "How long does vitiligo treatment take?",
        a: "Six to twelve months minimum. Small, recent patches respond best; widespread long-standing vitiligo responds less predictably.",
      },
      {
        q: "Is the treatment residential?",
        a: "The initial 14–21 days are best residential so Virechana and external therapies can run daily. Follow-up is outpatient with internal medication.",
      },
      {
        q: "Does diet really matter?",
        a: "Enormously. Pitta-Rakta pacifying diet — avoidance of fermented foods, excess salt, spicy or fried foods, contradictory food combinations — accelerates healing significantly.",
      },
      {
        q: "Can you treat allergic reactions and hives?",
        a: "Yes. Shamana (pacifying) medications and antihistamine-equivalent herbs provide relief; Panchakarma addresses recurrence at the root.",
      },
    ],
  },

  "stress-anxiety": {
    overview:
      "Chronic stress, generalised anxiety, insomnia, burnout, and low-grade depression are among the most common presentations we see, particularly in working professionals, students, and overseas returnees. Ayurveda classifies these under Chittodvega, Anidra, and related mind-body disorders, where sustained mental activity, irregular routine, and sensory overstimulation progressively deplete Ojas — the essence that supports stability, immunity, and emotional resilience. Treatment focuses on restoring sleep, calming the nervous system through specific therapies, and rebuilding the reserves modern life tends to drain.",
    symptoms: [
      "Persistent worry, racing thoughts, or inability to mentally relax",
      "Difficulty falling asleep, staying asleep, or waking unrefreshed",
      "Irritability, emotional reactivity, frequent mood changes",
      "Chronic tension — headaches, neck and shoulder tightness, jaw clenching",
      "Digestive symptoms — IBS, acid reflux, loss of appetite or overeating",
      "Fatigue that does not resolve with rest",
      "Difficulty concentrating, memory lapses, reduced productivity",
      "Physical anxiety symptoms — palpitations, breathlessness, dizziness, tingling",
    ],
    ayurvedicView:
      "Mental-health conditions involve Vata (the dosha of movement, producing anxiety and racing thought), Pitta (irritability, anger, sleep loss), and depleted Ojas. When daily demands consistently exceed recovery, Vata becomes disturbed — sleep breaks, thoughts race, the body tightens. Classical management uses three pillars: Sneha (internal and external oleation to stabilise Vata), Shirodhara (sustained warm flow over the forehead, deeply calming to the nervous system), and Medhya Rasayanas — mental rejuvenators like Brahmi, Shankhapushpi, Mandookaparni, and Jatamansi — to rebuild cognitive and emotional stamina.",
    approachComparison:
      "Anxiolytics, SSRIs, and hypnotics provide relief but often carry long-term side-effect burdens — dependency, sexual dysfunction, cognitive blunting. Ayurveda offers a complementary approach particularly effective for chronic stress, mild-to-moderate anxiety, insomnia, and burnout. For severe or psychiatric-range conditions, we coordinate with psychiatrists rather than replacing their care. Many patients successfully reduce benzodiazepine and sleep-medication use over three to six months under their prescriber's supervision.",
    treatmentProtocol: [
      {
        phase: "Assessment",
        description:
          "Sleep log, stress history, existing psychiatric medication, and prakriti evaluation. Screening for severe presentations that need psychiatric co-management.",
      },
      {
        phase: "Shirodhara",
        description:
          "Continuous warm medicated-oil flow over the forehead — 30–45 minutes daily for 7–14 days. The principal therapy for stress-driven disorders.",
      },
      {
        phase: "Supporting therapies",
        description:
          "Shiroabhyanga, Takradhara (buttermilk-dhara) for heated presentations, Abhyangam with Ksheerabala or Dhanwantaram taila, and Pada Abhyanga for sleep quality.",
      },
      {
        phase: "Internal medications",
        description:
          "Brahmi ghrita, Saraswatarishta, Manasamitra vatakam, Ashwagandha, and Jatamansi — chosen by whether the pattern is predominantly anxious, depressed, or insomnic.",
      },
      {
        phase: "Lifestyle reset & follow-up",
        description:
          "Daily routine (Dinacharya), pranayama, meditation training, screen-time reduction, early dinner (before 7 pm where possible), and structured monthly follow-up.",
      },
    ],
    expectedOutcomes:
      "Most patients notice meaningful sleep improvement within three to five days of Shirodhara, significant anxiety reduction by day ten, and sustained improvement in mood, energy, and resilience over two to three months of continued medication. Medication reduction, when attempted, is always gradual and coordinated with the prescribing physician. Long-term resilience develops with sustained daily practice of the routine established during residential treatment.",
    faqs: [
      {
        q: "Will I need to stop my psychiatric medications?",
        a: "No. We never ask patients to stop psychiatric medications. Your psychiatrist adjusts doses based on clinical response — we coordinate timing of Ayurvedic care around the prescription plan.",
      },
      {
        q: "How quickly will Shirodhara work?",
        a: "Sleep usually improves within three to five sessions. Deeper anxiety relief develops over 10–14 sessions of daily Shirodhara.",
      },
      {
        q: "Is treatment residential?",
        a: "A 7–14 day residential stay is ideal. We also offer outpatient Shirodhara courses for stable patients unable to take residential time.",
      },
      {
        q: "Can it help with panic disorder?",
        a: "Yes, as an adjunct to psychiatric care. Ayurveda addresses underlying Vata hyperactivity effectively.",
      },
      {
        q: "What about PTSD?",
        a: "We work with PTSD patients under joint care with mental-health specialists. Treatment is gentle and trauma-aware.",
      },
      {
        q: "Does Ayurveda treat depression?",
        a: "Mild-to-moderate depression responds well to Shirodhara, Medhya Rasayanas, and lifestyle care. Severe or suicidal presentations require psychiatric care as primary treatment.",
      },
      {
        q: "Can I combine this with therapy?",
        a: "Yes — strongly encouraged. Psychotherapy and Ayurveda complement each other effectively, working on the psychological and physiological layers together.",
      },
    ],
  },

  "varicose-veins": {
    overview:
      "Varicose veins — dilated, tortuous superficial veins of the legs — develop when venous valves fail and blood pools in the vessel below, progressively distending and damaging it. Ayurvedic texts describe the condition as Siraja Granthi, linking it to impaired Vata movement, Rakta stagnation, and prolonged standing or sedentary habits. While surgical options (sclerotherapy, laser ablation, stripping) are effective for late-stage disease, early and moderate varicose veins respond well to Ayurvedic therapy — particularly Raktamoksha with medical-grade leeches, one of the most established classical treatments for this condition.",
    symptoms: [
      "Visible, bulging, twisted veins on the legs — typically calves, inner thighs, behind the knee",
      "Aching, heaviness, or fatigue in the legs, worse after prolonged standing",
      "Swelling of the ankles and lower legs by evening",
      "Burning, throbbing, or muscle cramps — particularly at night",
      "Itching around the affected veins",
      "Skin discolouration — brownish pigmentation — in advanced cases",
      "Ulcers near the ankle in severe disease (CEAP C5–C6)",
      "Restless-leg sensations in some patients",
    ],
    ayurvedicView:
      "Ayurveda identifies varicose veins as a Rakta-Vata disorder with Kapha involvement. Sedentary lifestyle, prolonged standing at work, pregnancy, obesity, and familial predisposition weaken the venous channels (Siras). Rakta (blood) — which should flow smoothly — stagnates and distends the vessels. Local accumulation of dosha then produces pain, heaviness, and the visible changes a patient brings us. Classical management uses bloodletting (Raktamoksha), external therapies, and systemic blood purification to restore venous tone and flow.",
    approachComparison:
      "Surgery addresses the mechanical defect but does not prevent recurrence or treat the underlying tendency toward venous insufficiency. Ayurvedic management — particularly Raktamoksha with leeches — reduces venous congestion, promotes tissue healing, and often halts progression. For early to moderate varicosities (CEAP C1–C3), Ayurveda can achieve significant visible and symptomatic improvement. Advanced disease (C4–C6, with pigmentation or ulceration) often benefits from combined Ayurvedic and surgical approaches rather than Ayurveda alone.",
    treatmentProtocol: [
      {
        phase: "Assessment",
        description:
          "Doppler ultrasound review, lesion mapping, and identification of associated risk factors (occupation, weight, pregnancy history, family history).",
      },
      {
        phase: "Raktamoksha with leeches",
        description:
          "Medical-grade leeches applied directly over affected veins — 2–4 leeches per session, two to three sessions per week for three to four weeks. The cornerstone of our varicose-vein protocol.",
      },
      {
        phase: "External applications",
        description:
          "Post-Raktamoksha oils (Manjishthadi taila, Sahacharadi taila), herbal compresses, and localised Snehana to support healing between sessions.",
      },
      {
        phase: "Internal medication",
        description:
          "Kaishora Guggulu, Manjishthadi Kashayam, Triphala, Sariva Asavam, and Chandraprabha Vati — combined to purify blood and strengthen venous tone.",
      },
      {
        phase: "Lifestyle instructions",
        description:
          "Compression stockings during standing work, leg elevation at rest, specific yoga postures (Viparita Karani, Sarvangasana), weight management, and avoiding prolonged sitting or standing.",
      },
    ],
    expectedOutcomes:
      "Patients typically report reduced leg heaviness and aching within the first week of Raktamoksha, visible reduction in vein prominence over three to four weeks, and stabilisation of disease progression. Pigmentation, where present, lightens slowly over two to three months. Advanced ulcers heal over six to twelve weeks with combined treatment. Periodic reinforcement — two sessions every six months — is recommended for long-term maintenance, particularly for patients whose work involves prolonged standing.",
    faqs: [
      {
        q: "Is leech therapy safe and hygienic?",
        a: "Yes. We use medical-grade leeches in a single-use, sterile protocol. Each session is clinician-supervised.",
      },
      {
        q: "Is it painful?",
        a: "The initial bite is mildly uncomfortable — similar to a mosquito bite. Afterwards most patients feel warmth and relief in the affected leg.",
      },
      {
        q: "How many sessions will I need?",
        a: "Typically 8–12 Raktamoksha sessions over three to four weeks, followed by outpatient internal medication for continued benefit.",
      },
      {
        q: "Will the veins disappear?",
        a: "Smaller veins often resolve completely. Larger varicosities reduce in prominence and symptoms but may remain visible to some extent.",
      },
      {
        q: "Can I avoid surgery?",
        a: "For early and moderate disease (CEAP C1–C3), often yes. Advanced disease (C5–C6) often benefits from combined Ayurvedic and surgical approaches.",
      },
      {
        q: "Is it residential treatment?",
        a: "Three to four weeks residential is ideal. Outpatient is possible for working professionals who can come twice weekly.",
      },
      {
        q: "What lifestyle changes help?",
        a: "Weight management, compression stockings during prolonged standing, elevated-leg rest periods, and specific yoga or exercise that promotes venous return.",
      },
    ],
  },

  "womens-health": {
    overview:
      "Women's reproductive and hormonal health — irregular menstruation, dysmenorrhoea, PCOS, fibroids, endometriosis, and perimenopausal and menopausal symptoms — forms a distinct area of classical Ayurvedic practice known as Stree Roga. At Vaidya Vrindavanam, Dr. Ganga specialises in this field. The Ayurvedic framework recognises that women's reproductive health is governed by the coordinated action of all three doshas across the monthly cycle, and that disruption of this rhythm produces the common conditions we see today — many of them downstream consequences of stress, irregular schedules, and dietary disruption.",
    symptoms: [
      "Irregular or absent menstruation, prolonged cycles, or very short cycles",
      "Heavy, painful, or clotted menses",
      "Premenstrual mood changes, bloating, breast tenderness, irritability",
      "PCOS — weight gain, acne, facial hair, anovulation, insulin resistance",
      "Endometriosis — pelvic pain, painful intercourse, dysmenorrhoea, infertility",
      "Fibroids — heavy bleeding, pelvic pressure, urinary frequency",
      "Menopausal hot flashes, night sweats, mood disturbance, insomnia",
      "Vaginal dryness, libido changes, and post-menopausal pelvic concerns",
    ],
    ayurvedicView:
      "Artava — menstrual blood — is considered an upadhatu (subsidiary tissue) of Rasa dhatu. Its quality and rhythm reflect overall health: stress, diet, sleep, and dosha balance all influence the cycle. Different conditions arise from different dosha patterns — PCOS is Kapha-dominant with Meda involvement; endometriosis and heavy bleeding are typically Pitta-Rakta disorders; menopausal symptoms involve Vata aggravation; painful menses can be Vata or Pitta depending on pattern. Treatment is personalised to the specific pattern identified on assessment, not a standard 'women's tonic' approach.",
    approachComparison:
      "Hormonal contraceptives, IUDs, and HRT effectively manage symptoms but often don't address the underlying pattern — they frequently mask the disorder while it continues. Ayurvedic treatment — particularly Udwarthanam for PCOS, Uttara Vasti for endometriosis and fibroids, and Basti for menopausal Vata — offers a systemic approach. We work alongside gynaecologists rather than against them; patients continue necessary medication during Ayurvedic treatment and taper only under medical supervision.",
    treatmentProtocol: [
      {
        phase: "Assessment",
        description:
          "Detailed menstrual and reproductive history, hormonal panels (FSH, LH, AMH, prolactin, TSH, testosterone), pelvic ultrasound review, and prakriti evaluation.",
      },
      {
        phase: "Condition-specific Panchakarma",
        description:
          "PCOS — Udwarthanam + Virechana (14–21 days). Endometriosis / heavy bleeding — Virechana + Vasti. Fibroids — Vasti + Uttara Vasti. Menopause — Snehana + Vasti for Vata management.",
      },
      {
        phase: "Uttara Vasti",
        description:
          "Intrauterine instillation of medicated oil for uterine-factor conditions (fibroids, endometriosis, recurrent implantation failure). Performed under strict sterile protocol.",
      },
      {
        phase: "Internal medications",
        description:
          "Phalaghrita, Shatavari Kalpa, Ashokarishta, Pushyanuga Churna, Rajapravartini Vati, Chandraprabha Vati — chosen by the specific condition and stage.",
      },
      {
        phase: "Lifestyle & cycle-timed follow-up",
        description:
          "Dietary adjustment by dosha, yoga for pelvic health (Supta Baddha Konasana, Setu Bandhasana, Viparita Karani), stress reduction, and cycle-timed follow-up consultations.",
      },
    ],
    expectedOutcomes:
      "Menstrual regularity often restores within three to six months of treatment for PCOS and dysfunctional bleeding. Endometriosis-related pain typically reduces significantly by month three. Fibroids respond variably — small fibroids may reduce, while large symptomatic ones often stabilise rather than shrink. Menopausal symptoms typically improve within 14–21 days of treatment and sustain with continued medication. We set realistic expectations tailored to the specific condition and its stage.",
    faqs: [
      {
        q: "Can Ayurveda reverse PCOS?",
        a: "Ovulation and cycle regularity can often be restored with three to six months of consistent treatment. The underlying metabolic tendency is managed lifelong through diet and lifestyle — not permanently erased.",
      },
      {
        q: "Does Ayurveda shrink fibroids?",
        a: "Small fibroids may reduce. Large symptomatic fibroids often require a combined surgical and Ayurvedic approach rather than Ayurveda alone.",
      },
      {
        q: "Is HRT incompatible with Ayurvedic treatment?",
        a: "No. Many patients continue HRT during and after Ayurvedic menopausal care; we adjust protocols around the prescription.",
      },
      {
        q: "Is Uttara Vasti safe?",
        a: "Yes, when performed by trained physicians under strict sterile protocol. Dr. Ganga personally supervises all Uttara Vasti procedures.",
      },
      {
        q: "Can Ayurveda help with fertility after forty?",
        a: "It can improve egg and uterine quality, though age-related decline is real. Three to six months of preparation before ART is commonly beneficial.",
      },
      {
        q: "Is the treatment discreet and comfortable?",
        a: "Yes. Women's health treatments are supervised exclusively by Dr. Ganga and conducted with female attendants throughout.",
      },
      {
        q: "When should perimenopausal treatment begin?",
        a: "Early perimenopause — typically the late forties — is ideal. Treatment reduces the severity of the menopausal transition and preserves bone, skin, and cognitive health.",
      },
    ],
  },
};
