// backend/data/diseaseData.js
export const diseases = [
    {
        id: 1,
        disease: "Influenza",
        alternateNames: ["Flu", "Seasonal Flu"],
        symptoms: [
            "Fever or feeling feverish/chills",
            "Cough",
            "Sore throat",
            "Runny or stuffy nose",
            "Muscle or body aches",
            "Headaches",
            "Fatigue",
            "Vomiting and diarrhea (more common in children)"
        ],
        severity: "Moderate",
        description: "A contagious viral infection that attacks your respiratory system — your nose, throat and lungs. For most people, the flu resolves on its own, but sometimes complications can be deadly.",
        commonTreatments: [
            "Rest and sleep",
            "Drink plenty of fluids",
            "Antiviral medications (if prescribed within 48 hours)",
            "Pain relievers and fever reducers",
            "Decongestants"
        ],
        whenToSeeDoctor: "If symptoms persist beyond 7 days, difficulty breathing, chest pain, persistent fever above 103°F, or if you're in a high-risk group"
    },
    {
        id: 2,
        disease: "Common Cold",
        alternateNames: ["Cold", "Upper Respiratory Infection"],
        symptoms: [
            "Runny or stuffy nose",
            "Sore throat",
            "Cough",
            "Sneezing",
            "Mild headache",
            "Mild body aches",
            "Low-grade fever",
            "General malaise"
        ],
        severity: "Mild",
        description: "A viral infection of your nose and throat (upper respiratory tract). It's usually harmless, although it might not feel that way. Many types of viruses can cause a common cold.",
        commonTreatments: [
            "Rest",
            "Stay hydrated",
            "Gargle with salt water",
            "Use saline nasal drops",
            "Over-the-counter cold medications",
            "Throat lozenges"
        ],
        whenToSeeDoctor: "If symptoms last more than 10 days, severe headache, high fever above 101.3°F, difficulty breathing, or severe sore throat"
    },
    {
        id: 3,
        disease: "COVID-19",
        alternateNames: ["Coronavirus", "SARS-CoV-2"],
        symptoms: [
            "Fever or chills",
            "Cough",
            "Shortness of breath or difficulty breathing",
            "Fatigue",
            "Muscle or body aches",
            "Headache",
            "New loss of taste or smell",
            "Sore throat",
            "Congestion or runny nose",
            "Nausea or vomiting",
            "Diarrhea"
        ],
        severity: "Moderate to Severe",
        description: "An infectious disease caused by the SARS-CoV-2 virus. Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment.",
        commonTreatments: [
            "Rest and isolation",
            "Stay hydrated",
            "Fever reducers and pain relievers",
            "Antiviral medications (if prescribed)",
            "Oxygen therapy (for severe cases)",
            "Monoclonal antibodies (in some cases)"
        ],
        whenToSeeDoctor: "Difficulty breathing, persistent chest pain, confusion, inability to wake or stay awake, bluish lips or face"
    },
    {
        id: 4,
        disease: "Type 2 Diabetes",
        alternateNames: ["Diabetes Mellitus Type 2", "Adult-Onset Diabetes"],
        symptoms: [
            "Increased thirst",
            "Frequent urination",
            "Increased hunger",
            "Unintended weight loss",
            "Fatigue",
            "Blurred vision",
            "Slow-healing sores",
            "Frequent infections",
            "Numbness or tingling in hands or feet",
            "Areas of darkened skin"
        ],
        severity: "Chronic - Moderate to Severe",
        description: "A chronic condition that affects the way your body metabolizes sugar (glucose). With type 2 diabetes, your body either resists the effects of insulin or doesn't produce enough insulin to maintain normal glucose levels.",
        commonTreatments: [
            "Lifestyle changes (diet and exercise)",
            "Blood sugar monitoring",
            "Metformin and other oral medications",
            "Insulin therapy (in some cases)",
            "Weight management",
            "Regular medical checkups"
        ],
        whenToSeeDoctor: "If you notice any diabetes symptoms, or if you have risk factors such as being overweight, family history, or age over 45"
    },
    {
        id: 5,
        disease: "Hypertension",
        alternateNames: ["High Blood Pressure"],
        symptoms: [
            "Headaches",
            "Shortness of breath",
            "Nosebleeds",
            "Flushing",
            "Dizziness",
            "Chest pain",
            "Visual changes",
            "Blood in urine"
        ],
        severity: "Chronic - Moderate to Severe",
        description: "A common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease. Often called the 'silent killer' because it typically has no symptoms.",
        commonTreatments: [
            "Lifestyle modifications (diet, exercise, weight loss)",
            "Reduce sodium intake",
            "Limit alcohol",
            "ACE inhibitors",
            "Beta blockers",
            "Diuretics",
            "Calcium channel blockers",
            "Regular blood pressure monitoring"
        ],
        whenToSeeDoctor: "Regular checkups for monitoring, or immediately if blood pressure is consistently above 140/90 mmHg or if experiencing severe headache, chest pain, or vision problems"
    },
    {
        id: 6,
        disease: "Asthma",
        alternateNames: ["Bronchial Asthma"],
        symptoms: [
            "Shortness of breath",
            "Chest tightness or pain",
            "Wheezing when exhaling",
            "Trouble sleeping caused by shortness of breath",
            "Coughing or wheezing attacks",
            "Increased symptoms during viral infections"
        ],
        severity: "Chronic - Mild to Severe",
        description: "A condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, a whistling sound (wheezing) when you breathe out and shortness of breath.",
        commonTreatments: [
            "Quick-relief inhalers (bronchodilators)",
            "Long-term control medications",
            "Inhaled corticosteroids",
            "Avoid triggers",
            "Allergy medications",
            "Peak flow monitoring",
            "Asthma action plan"
        ],
        whenToSeeDoctor: "Frequent or worsening symptoms, need for quick-relief inhaler more often, difficulty breathing even with medication, or during an asthma attack"
    },
    {
        id: 7,
        disease: "Migraine",
        alternateNames: ["Migraine Headache"],
        symptoms: [
            "Severe throbbing pain, usually on one side of the head",
            "Nausea and vomiting",
            "Sensitivity to light and sound",
            "Visual disturbances (aura)",
            "Blurred vision",
            "Lightheadedness",
            "Tingling sensations"
        ],
        severity: "Moderate to Severe",
        description: "A neurological condition that can cause multiple symptoms. It's frequently characterized by intense, debilitating headaches. Symptoms may include nausea, vomiting, difficulty speaking, numbness or tingling, and sensitivity to light and sound.",
        commonTreatments: [
            "Pain relievers (NSAIDs, triptans)",
            "Anti-nausea medications",
            "Preventive medications",
            "Rest in a quiet, dark room",
            "Cold compress",
            "Caffeine",
            "Lifestyle modifications",
            "Stress management"
        ],
        whenToSeeDoctor: "Severe or frequent headaches, headache after head injury, sudden severe headache, headache with fever, stiff neck, confusion, or vision problems"
    },
    {
        id: 8,
        disease: "Gastroenteritis",
        alternateNames: ["Stomach Flu", "Stomach Bug"],
        symptoms: [
            "Watery diarrhea",
            "Nausea and vomiting",
            "Stomach cramps and pain",
            "Low-grade fever",
            "Headache",
            "Muscle aches",
            "Loss of appetite"
        ],
        severity: "Mild to Moderate",
        description: "An intestinal infection marked by watery diarrhea, abdominal cramps, nausea or vomiting, and sometimes fever. The most common way to develop viral gastroenteritis is through contact with an infected person or by consuming contaminated food or water.",
        commonTreatments: [
            "Rest and hydration",
            "Oral rehydration solutions",
            "BRAT diet (bananas, rice, applesauce, toast)",
            "Avoid dairy and fatty foods",
            "Anti-diarrheal medications (use cautiously)",
            "Gradual return to normal diet"
        ],
        whenToSeeDoctor: "Signs of dehydration, bloody diarrhea, high fever above 104°F, severe abdominal pain, vomiting for more than 2 days, or diarrhea lasting more than several days"
    },
    {
        id: 9,
        disease: "Pneumonia",
        alternateNames: ["Lung Infection"],
        symptoms: [
            "Chest pain when breathing or coughing",
            "Cough with phlegm or pus",
            "Fatigue",
            "Fever, sweating, and chills",
            "Shortness of breath",
            "Nausea, vomiting, or diarrhea",
            "Lower than normal body temperature (in older adults)"
        ],
        severity: "Moderate to Severe",
        description: "An infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough with phlegm or pus, fever, chills, and difficulty breathing.",
        commonTreatments: [
            "Antibiotics (for bacterial pneumonia)",
            "Cough medicine",
            "Fever reducers and pain relievers",
            "Rest and fluids",
            "Hospitalization (for severe cases)",
            "Oxygen therapy",
            "Breathing treatments"
        ],
        whenToSeeDoctor: "Difficulty breathing, chest pain, persistent fever, coughing up blood, or if you're in a high-risk group (over 65, young children, weakened immune system)"
    },
    {
        id: 10,
        disease: "Urinary Tract Infection",
        alternateNames: ["UTI", "Bladder Infection", "Cystitis"],
        symptoms: [
            "Strong, persistent urge to urinate",
            "Burning sensation when urinating",
            "Passing frequent, small amounts of urine",
            "Cloudy urine",
            "Blood in urine (hematuria)",
            "Strong-smelling urine",
            "Pelvic pain (in women)",
            "Rectal pain (in men)"
        ],
        severity: "Mild to Moderate",
        description: "An infection in any part of your urinary system — your kidneys, ureters, bladder and urethra. Most infections involve the lower urinary tract — the bladder and the urethra.",
        commonTreatments: [
            "Antibiotics",
            "Drink plenty of water",
            "Urinary pain relievers",
            "Heating pad for discomfort",
            "Avoid bladder irritants (caffeine, alcohol, spicy foods)",
            "Cranberry products (may help prevent recurrence)"
        ],
        whenToSeeDoctor: "Symptoms of UTI, especially if accompanied by fever, back pain, nausea, or vomiting, which could indicate a kidney infection"
    },
    {
        id: 11,
        disease: "Anxiety Disorder",
        alternateNames: ["Generalized Anxiety Disorder", "GAD"],
        symptoms: [
            "Excessive worry",
            "Restlessness",
            "Feeling on edge",
            "Fatigue",
            "Difficulty concentrating",
            "Irritability",
            "Muscle tension",
            "Sleep disturbances",
            "Rapid heartbeat",
            "Sweating"
        ],
        severity: "Mild to Severe",
        description: "A mental health disorder characterized by feelings of worry, anxiety, or fear that are strong enough to interfere with one's daily activities. It involves persistent and excessive worry about various aspects of daily life.",
        commonTreatments: [
            "Cognitive behavioral therapy (CBT)",
            "Psychotherapy",
            "Anti-anxiety medications",
            "Antidepressants (SSRIs, SNRIs)",
            "Relaxation techniques",
            "Regular exercise",
            "Stress management",
            "Mindfulness and meditation"
        ],
        whenToSeeDoctor: "If worry is interfering with work, relationships, or other parts of life, or if you're experiencing depression, substance abuse, or suicidal thoughts"
    },
    {
        id: 12,
        disease: "Allergic Rhinitis",
        alternateNames: ["Hay Fever", "Seasonal Allergies"],
        symptoms: [
            "Sneezing",
            "Runny or stuffy nose",
            "Itchy nose, eyes, or roof of mouth",
            "Watery, red, or swollen eyes",
            "Postnasal drip",
            "Cough",
            "Fatigue",
            "Headache"
        ],
        severity: "Mild to Moderate",
        description: "An allergic response to specific allergens such as pollen, dust mites, or pet dander. It causes cold-like symptoms but is not caused by a virus.",
        commonTreatments: [
            "Antihistamines",
            "Decongestants",
            "Nasal corticosteroid sprays",
            "Avoid allergens",
            "Saline nasal rinse",
            "Allergy shots (immunotherapy)",
            "Eye drops for itchy eyes"
        ],
        whenToSeeDoctor: "If symptoms are severe, not relieved by over-the-counter medications, or affecting quality of life"
    }
];

// Helper function to search diseases by name
export const findDiseaseByName = (name) => {
    const searchTerm = name.toLowerCase().trim();
    return diseases.find(
        (d) =>
            d.disease.toLowerCase() === searchTerm ||
            d.alternateNames.some((alt) => alt.toLowerCase() === searchTerm)
    );
};

// Helper function to search diseases by symptom
export const findDiseasesBySymptom = (symptom) => {
    const searchTerm = symptom.toLowerCase().trim();
    return diseases.filter((d) =>
        d.symptoms.some((s) => s.toLowerCase().includes(searchTerm))
    );
};

// Helper function to get all disease names
export const getAllDiseaseNames = () => {
    return diseases.map((d) => ({
        id: d.id,
        disease: d.disease,
        alternateNames: d.alternateNames,
        severity: d.severity
    }));
};
