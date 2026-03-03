export interface Marker {
  name: string
  status: 'above' | 'below' | 'out'
  value: string
}

export interface Pillar {
  title: string
  subtitle: string
  score: number
  maxScore: number
  markers: Marker[]
  loweredBy: string[]
  whyItMatters: string
}

export const pillars: Pillar[] = [
  {
    title: 'Heart health',
    subtitle: 'Evaluates your heart and blood vessels, including inflammation and cholesterol-related risks.',
    score: 15,
    maxScore: 20,
    markers: [
      { name: 'Lipid Panel (Total Chol, LDL, HDL, Triglycerides)', status: 'above', value: '264 nmol/L' },
      { name: 'ApoB – Total atherogenic particles', status: 'above', value: '264 nmol/L' },
      { name: 'Lipoprotein(a) – Genetic cholesterol risk', status: 'out', value: '' },
      { name: 'Homocysteine – Vascular inflammation', status: 'above', value: '264 nmol/L' },
      { name: 'Omega-3 Index – Protective fatty acids', status: 'below', value: '336 nmol/L' },
      { name: 'hs-CRP – Arterial inflammation', status: 'above', value: '264 nmol/L' },
      { name: 'CMP / Urinalysis / Cortisol / Lead – Kidney, stress, toxin load', status: 'above', value: '176 mg/L' },
    ],
    loweredBy: [
      'Hypertension or need for BP meds',
      'Elevated LDL/ApoB, low HDL, high triglycerides',
      'Diabetes or insulin resistance',
      'Elevated CRP',
      'Smoking (current or heavy past use)',
      'Obesity (BMI, waist circumference)',
      'Kidney dysfunction',
      'Inactivity or poor aerobic fitness',
      'Family history of early heart disease',
    ],
    whyItMatters: 'High LDL, inflammation, or genetic factors like Lp(a) drive plaque buildup and cardiac risk.',
  },
  {
    title: 'Metabolic health',
    subtitle: 'Measures blood sugar regulation, fat metabolism, and body composition resilience.',
    score: 20,
    maxScore: 20,
    markers: [
      { name: 'Fasting Glucose', status: 'above', value: '92 mg/dL' },
      { name: 'HbA1c – Long-term blood sugar', status: 'above', value: '5.2%' },
      { name: 'Insulin – Fasting level', status: 'above', value: '6.4 µIU/mL' },
    ],
    loweredBy: [
      'Elevated fasting glucose or HbA1c',
      'Insulin resistance markers',
      'High triglyceride-to-HDL ratio',
      'Excess visceral fat',
    ],
    whyItMatters: 'Metabolic dysfunction accelerates aging and increases risk for diabetes, cardiovascular disease, and cognitive decline.',
  },
  {
    title: 'Brain health',
    subtitle: 'Evaluates brain aging risk and cognitive resilience based on metabolic, vascular, and neurologic inputs.',
    score: 18,
    maxScore: 20,
    markers: [
      { name: 'Homocysteine – Neurovascular risk', status: 'above', value: '12 µmol/L' },
      { name: 'Omega-3 Index – Neuroprotection', status: 'below', value: '4.2%' },
      { name: 'Vitamin B12 – Neural support', status: 'above', value: '680 pg/mL' },
    ],
    loweredBy: [
      'Elevated homocysteine',
      'Low omega-3 index',
      'Poor sleep quality',
      'Chronic stress or elevated cortisol',
    ],
    whyItMatters: 'Neuroinflammation and vascular damage silently erode cognitive function over decades.',
  },
  {
    title: 'Cancer prevention',
    subtitle: 'Gauges your risk for lifestyle- and hormone-driven cancers.',
    score: 8,
    maxScore: 20,
    markers: [
      { name: 'hs-CRP – Systemic inflammation', status: 'above', value: '3.8 mg/L' },
      { name: 'Vitamin D – Immune modulation', status: 'below', value: '22 ng/mL' },
      { name: 'Ferritin – Iron & oxidative stress', status: 'above', value: '310 ng/mL' },
    ],
    loweredBy: [
      'Chronic inflammation (elevated CRP)',
      'Low vitamin D levels',
      'Excess iron stores',
      'Smoking or alcohol use',
      'Family history of cancer',
    ],
    whyItMatters: 'Persistent inflammation, nutrient imbalances, and oxidative stress create conditions that favor cellular damage and cancer growth.',
  },
  {
    title: 'Bone and muscle care',
    subtitle: 'Captures muscle and bone health, resistance to age-related decline and frailty.',
    score: 20,
    maxScore: 20,
    markers: [
      { name: 'Vitamin D – Bone mineralization', status: 'above', value: '48 ng/mL' },
      { name: 'Calcium – Skeletal support', status: 'above', value: '9.6 mg/dL' },
      { name: 'Magnesium – Muscle function', status: 'above', value: '2.1 mg/dL' },
    ],
    loweredBy: [
      'Low vitamin D or calcium',
      'Magnesium deficiency',
      'Sedentary lifestyle',
      'Low protein intake',
    ],
    whyItMatters: 'Bone density and muscle mass decline with age. Maintaining mineral balance and resistance training prevents frailty.',
  },
]

export const statusLabel: Record<string, string> = {
  above: 'Above Range',
  below: 'Below Range',
  out: 'Out of Range',
}
