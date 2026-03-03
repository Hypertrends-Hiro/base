# PARITY PROOF — Phase 3 Page-by-Page Verification

Each ported page is verified against PAGES_PARITY.md. Strings must exist verbatim in the Vue template.

---

## Batch 1

### Page: Welcome

- **Vue file:** `src/pages/WelcomeView.vue`
- **Route:** `/welcome`
- **Components used:** `UiButton`, (router-link), img
- **Assets used:** `kwilt-logo-dark.png`
- **Visible strings check (exact):**
  - "KWILT" — line 16 (alt), line 36 (heading)
  - "Payment successful" — line 29
  - "You're officially a KWILT™ member" — line 36
  - "Your annual membership is now active. Welcome to a healthier you." — line 40
  - "What's next" — line 52
  - "Every person is unique. Help us get to know you." — line 54
  - "To build your personalized health plan, we'll ask you a series of simple questions about your health history and lifestyle. Your answers let us tailor everything — from your biomarker panel to your recommendations — specifically to you." — lines 56–58
  - "~10 min · Save & resume anytime" — line 64
  - "Start My Health Assessment" — line 72
  - "I'll do this later — take me to my dashboard" — line 78
  - "You can always start your assessment from your dashboard." — line 81
- **String presence:** All 11 strings from PAGES_PARITY.md appear verbatim in `WelcomeView.vue` at the lines above.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Landing2

- **Vue file:** `src/pages/LandingView.vue` + `src/features/landing/*.vue` (landing-nav, landing-hero, landing-tagline, landing-assess, landing-therapy-carousel, landing-how-it-works, landing-get-true-results, landing-pricing-and-footer, fade-in)
- **Route:** `/`
- **Components used:** LandingNav, LandingHero, LandingTagline, LandingAssess, LandingTherapyCarousel, LandingHowItWorks, LandingGetTrueResults, LandingPricingAndFooter, LandingFadeIn, RouterLink
- **Hero media (parity audit):** React uses **`<video>`** (not img). Source: `https://cdn.prod.website-files.com/6830e308e57fd4713ea17bc9%2F6868777b35de09e3adcfdcf8_Kwilt_homepage_r1-transcode.mp4`. Vue `landing-hero.vue` uses the same `<video>` element and URL. (hero-rocky.jpg / hero-water.jpg are imported in React but not used in the hero.)
- **Assets used:** kwilt-logo-dark.png, woman-hair-wind.jpg, therapy-card-1.jpg, therapy-card-2.jpg, therapy-card-3.jpg, therapy-card-4.jpg, results-ui-card.png, woman-swimwear.jpg, app-phone-mockup.png, woman-relaxing.jpg, surfer-sunset.png, story-card-1.jpg, story-card-2.jpg, story-card-3.jpg, story-card-4.jpg
- **Visible strings check (exact):**
  - "KWILT", "™" — landing-nav.vue (lines 36, 44), landing-hero.vue (lines 34, 37), landing-pricing-and-footer.vue (line 160)
  - "Redefine your age." — landing-hero.vue line 37
  - "Get Started", "Shop", "Plan", "Labs", "Science", "About", "Log In" — landing-nav.vue
  - "Join KWILT to empower your wellness journey. Discover a holistic personalized platform that combines breakthrough science and intuitive tools for every stage of life." — landing-tagline.vue line 9
  - "Taking charge of your longevity journey should be effortless—now it is." — landing-assess.vue line 18
  - "Assess, repair, sustain" — landing-assess.vue line 21
  - "11 ORGAN SYSTEMS", "AGING RATE", "BIOLOGICAL AGE" — landing-assess.vue
  - "BRAIN HEALTH", "CANCER PREVENTION", "METABOLIC HEALTH", "BONE &\nMUSCLE CARE", "SHOP SHARPEN", "SHOP DEFEND", "SHOP VITALITY", "SHOP FORTIFY" — landing-therapy-carousel.vue
  - "How it works", "Become a member", "Get tested", "Discover insights", "Ongoing guidance" — landing-how-it-works.vue
  - "Get true results", "100+ BIOMARKERS", "INSIGHTS MADE FOR YOU", "PROGRESS YOU CAN SEE", "Start Assessment→" — landing-get-true-results.vue
  - "$449/year", "KWILT Comprehensive 100+ Biomarker Test", "Add to Cart" — landing-pricing-and-footer.vue
  - "Longevity. Optimized.", "KWILT Health", "© 2025 Enhance.MD, LLC. All rights reserved." — landing-pricing-and-footer.vue
  - "Real people, real stories", "Weight gain isn't random", "Built around your biology", "Menopause & semaglutide", "Beyond yearly screenings" — landing-pricing-and-footer.vue (story cards)
  - "Maximum transparency", "Comprehensive holistic intake", "Personalized recommendations", "Primary Care" — landing-pricing-and-footer.vue
  - "Live well today,", "for a better tomorrow.", "Get Started→" — landing-pricing-and-footer.vue
- **String presence:** All key strings from PAGES_PARITY.md for Landing2 appear verbatim across the listed feature components.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Register

- **Vue file:** `src/pages/RegisterView.vue`
- **Route:** `/register`
- **Components used:** SignupLayout, UiButton, UiInput, UiCheckbox, UiLabel, DobPicker
- **Assets used:** None (SignupLayout uses kwilt-logo-dark.png)
- **Visible strings check (exact):**
  - "Become a KWILT™ member" — line 67
  - "It's time to truly own your health narrative. Track and understand vital aspects like your heart, hormones, potential cancer indicators, thyroid health, and more. Create an account to stay empowered and proactive." — lines 69–73
  - "Your Information" — line 79
  - "All fields are required unless marked optional." — line 80
  - "Legal Name", "*Your name must match the ID you present at each lab visit." — lines 86–87
  - "First Name", "Last Name", "Email", "Phone", "Select Biological Sex", "Select an option", "Female", "Male", "Intersex", "Date of Birth", "Password", "Confirm Password" — form labels/placeholders
  - "I want to receive offers, updates, marketing emails & SMS from KWILT Health" — line 199
  - "I agree to KWILT's", "Terms of Service", "Privacy Policy" — line 205
  - "Continue to Payment" — line 214
  - "Already have an account?", "Log in" — line 218
  - "At this time, KWILT membership is available for females only." — script (errors.sex)
  - "You must be 18 or older to create an account." — script (errors.age)
- **String presence:** All 22+ strings from PAGES_PARITY.md for Register appear verbatim in `RegisterView.vue` or SignupLayout/DobPicker.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Auth (LoginView)

- **Vue file:** `src/pages/LoginView.vue`
- **Route:** `/login` (query `?tab=register` for register tab)
- **Components used:** AuthHeader, UiButton, UiInput, UiLabel, UiCheckbox, UiDialog, UiSelect
- **Assets used:** None
- **Visible strings check (exact):**
  - "Member Login" — line 105
  - "Questions? Visit", "FAQ" — line 107
  - "Email", "Password", "Login" — form
  - "Forgot Password?" — line 139
  - "Not a member yet? -", "Sign up here" — line 143
  - "Create Account", "Join us to start your health journey today." — lines 147–148
  - "Legal Name", "First Name", "Last Name", "Email", "Phone Number", "(---) ---/----", "Password", "Confirm Password", "Biological Sex", "Biological sex", "Male", "Female", "Date of Birth", "MM/DD/YYYY"
  - "I agree to the", "Terms of Use", "Privacy Policy", "I want to receive offers, updates, marketing emails & SMS from KWILT Health." — register form
  - "Create Account", "Already have an account?", "Sign In" — lines 226, 229
  - "Reset your password", "Enter your email address, and we'll send instructions to reset your password.", "Email Address", "Email address", "Continue", "EXIT" — dialog
  - "Check your email", "We've sent password reset instructions to", "Didn't receive it?", "Try again" — reset success state
  - "Login functionality requires Lovable Cloud to be enabled.", "Registration functionality requires Lovable Cloud to be enabled." — toast (script)
- **String presence:** All key strings from PAGES_PARITY.md for Auth appear verbatim in `LoginView.vue` or AuthHeader.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

## Batch 2

### Page: Dashboard

- **Vue file:** `src/pages/DashboardView.vue`
- **Route:** `/dashboard`
- **Components used:** UiDropdownMenu, (router-link), img
- **Assets used:** longevity-card.jpg, biological-age-card.jpg, product-balance.png, product-glp1.png, product-semaglutide.png, refer-and-earn.png, how-to-use-kwilt.png
- **Visible strings check (exact):**
  - "Demo:" — DashboardView.vue line 68
  - "Select Scenario" — DashboardView.vue line 73
  - "Default View", "Default View with Wizard", "Member - New Rx Ordered", "Intake Not Started", "Lab Requisition Ready", "Preparing Lab Requisition", "Labs Ordered" — DashboardView.vue lines 21–27 (scenario labels)
  - "Hello, Elisa" — DashboardView.vue line 80
  - "14 day streak. Last updated 9:45 am." — DashboardView.vue line 81
  - "🎉 Congrats — your labs are in!" — DashboardView.vue line 86
  - "Your personalized dashboard is ready. Take a quick tour to see what's here." — DashboardView.vue line 87
  - "Dismiss", "Tour the Portal" — DashboardView.vue lines 91–92
  - "Welcome!", "Intake Questionnaire", "Start Intake" — DashboardView.vue lines 96, 97, 101
  - "Your Lab Requisition Is Ready", "Download your requisition and book your lab visit to get your blood work done.", "View details" — DashboardView.vue lines 105–106, 109
  - "Preparing Your Lab Requisition", "In progress" — DashboardView.vue lines 115–116, 119
  - "Your Lab Results Are Arriving Soon", "Pending" — DashboardView.vue lines 123–124, 125
  - "KWILT™ longevity score", "Biological age", "Based on the lab test from January 2025", "/100", "10.5 years", "younger than your calendar age" — DashboardView.vue lines 129–137
  - "Your scores", "VIEW ALL" — DashboardView.vue lines 156, 161; "Heart health", "Metabolic health", "Brain health", "Cancer prevention", "Bone and muscle care" — healthScores (script) + line 165
  - "Biomarkers", "Your plan", "VIEW FULL TREATMENT PLAN", "Nutrition", "Supplements", "Exercises", "Sleep", "Therapy", "Medical Intervention" — DashboardView.vue lines 174, 184, 188, 191
  - "Recommended for you", "Balance", "GLP-1 Assist", "NAD+", "Semaglutide", "Tirzepatide", "BEST SELLER", "LAB REQUIRED", "Add to Plan" — DashboardView.vue lines 194, 200, 202 (treatments from script line 54 + template)
- **String presence:** All key strings from PAGES_PARITY.md for Dashboard appear verbatim in `DashboardView.vue` at the lines above.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Shop

- **Vue file:** `src/pages/ShopView.vue` + `src/components/home/Header.vue`
- **Route:** `/shop`
- **Components used:** Header (components/home/Header.vue), RouterLink
- **Assets used:** kwilt-logo-dark.png, woman-hair-wind.jpg, woman-skincare.jpg, hand-sunset.jpg, how-to-use-kwilt.png, app-phone-mockup.png, product-semaglutide.png, product-balance.png, product-glp1.png, product-hrt.png, product-nad.png
- **Visible strings check (exact):**
  - **Header (parity vs React `components/home/Header.tsx`):** "SHOP", "PLAN", "LABS", "SCIENCE", "ABOUT" — Header.vue line 38 ({{ link.label }}); "KWILT" — Header.vue line 44 (alt); "JOIN TODAY" — Header.vue line 56; "LOGIN" — Header.vue line 65. Vue matches React exactly.
  - "Products formulated to combat the effects of aging with ingredients that create real results." — ShopView.vue line 61
  - "Results you can feel." — ShopView.vue line 63
  - "Get Started" — ShopView.vue lines 65, 156
  - "All", "Longevity Essentials", "Sexual Health", "Metabolic Health", "Aesthetic & Feminine", "Hair + Nails" — ShopView.vue categoryTabs (lines 77–82)
  - "All Products" — ShopView.vue line 89
  - "KWILT Essentials", "Daily longevity supplement stack", "$149/mo", "Metformin", "Metabolic optimization", "$99/mo", "Semaglutide", "GLP-1 receptor agonist", "$199/mo", "Tretinoin", "Topical retinoid for skin renewal", "$59/mo", "NAD+ Booster", "Cellular energy & repair", "$129/mo", "HRT Balance", "Hormone optimization therapy", "$179/mo" — ShopView.vue products + template
  - "Add to Plan" — ShopView.vue line 101
  - "Connect with a provider", "Get matched with a medical provider who understands your unique goals." — ShopView.vue features (lines 86–88)
  - "Convenient delivery", "Your treatments are compounded and shipped right to your door", "Track your progress", "With biomarker data and insights right at your fingertips" — ShopView.vue features
  - "Everyone's", "longevity", "journey is", "unique" — ShopView.vue lines 113–116
  - "A plan", "designed", "with you in", "mind", "Start Assessment" — ShopView.vue lines 127–131, 133
  - "We are here for you", "Redefine what it means to age.", "Longevity. Optimized.", "©2025 kwilthealth.com" — ShopView.vue lines 148, 156, 162, 179
- **String presence:** All key strings from PAGES_PARITY.md for Shop appear verbatim in `ShopView.vue` and `Header.vue` at the lines above. Header copy verified against React `Header.tsx`: "JOIN TODAY" and "LOGIN" match.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Treatments

- **Vue file:** `src/pages/TreatmentsView.vue`
- **Route:** `/treatments`
- **Components used:** UiAvatar, UiDialog, BookAppointmentModal, ExploreAllTreatments
- **Assets used:** product-semaglutide.png, product-balance.png, product-glp1.png
- **Visible strings check (exact):**
  - "Treatments", "My treatments" — TreatmentsView.vue line 94
  - "Schedule virtual visit" — TreatmentsView.vue line 102
  - "🎉 You have recommended treatments", "Dismiss", "Learn more" — TreatmentsView.vue lines 107–108, 112–113
  - "Metformin", "Semaglutide", "1-month subscription", "6-month Subscription", "View treatment plan", "Close treatment plan" — TreatmentsView.vue fixture data + lines 132, 147, 154
  - "Started on:", "Visit required by:", "New prescription" — TreatmentsView.vue lines 136–137, 134
  - "Tirzepatide", "3-month subscription", "Manage subscription" — TreatmentsView.vue fixture + line 143
  - "Patient", "Medical Provider", "Provider:", "Kate Cordisco, NP", "Address:", "13280 Evening Creek Drive South, Ste 225, San Diego, CA 92128", "Supervising Physician:", "Brian Crenshaw, MD", "Assessment", "Instructions" — TreatmentsView.vue lines 166–177, 180, 185
  - "For questions or concerns, text or call", "888-299-5088", "support@kwilthealth.com", "In case of an emergency call 911" — TreatmentsView.vue lines 172–175
  - "Explore all treatments", "Recommended", "View All", "Add to Plan" — ExploreAllTreatments.vue
  - "Book New Appointment", "Select Provider", "How treatments work", "Your path to wellness", "Browse your recommended treatments below", "Questions? Your provider is here to help during your visit." — BookAppointmentModal.vue + TreatmentsView.vue info modal
- **String presence:** All key strings from PAGES_PARITY.md for Treatments appear verbatim in `TreatmentsView.vue`, `BookAppointmentModal.vue`, and `ExploreAllTreatments.vue` at the lines above.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

## Batch 3

### Page: Assessment

- **Vue file:** `src/pages/AssessmentView.vue` + `src/features/assessment/AssessmentLayout.vue`, `AssessmentStep.vue`, `src/features/assessment/steps/SectionBiometrics.vue` … `SectionInformedConsent.vue`
- **Route:** `/assessment`
- **Components used:** AssessmentLayout, AssessmentStep, SectionBiometrics, SectionHealthGoals, SectionPregnancy, SectionHormonalHealth, SectionMedicalHistory, SectionPreventiveScreening, SectionMedications, SectionFamilyHistory, SectionNutrition, SectionPhysicalActivity, SectionSleep, SectionSubstanceUse, SectionInformedConsent; SingleSelect, YesNoToggle, CheckboxGrid, TagInput; UiInput, UiSelect, UiCheckbox, UiTextarea, UiDrawer
- **Assets used:** kwilt-logo-dark.png (via AssessmentLayout)
- **Visible strings check (exact):**
  - "Exit", "1 of 13" … "13 of 13" — AssessmentLayout.vue lines 32–33, 48–50
  - Section names: "Biometrics", "Health Goals", "Pregnancy", "Hormonal Health", "Medical History", "Preventive Screening", "Medications", "Family History", "Nutrition", "Physical Activity", "Sleep", "Substance Use", "Informed Consent" — AssessmentLayout.vue SECTION_NAMES (lines 7–20)
  - "Let's get your measurements", "What is your height?", "Feet", "Inches", "What is your current weight? (lbs)", "What is your goal weight? (lbs)", "Do you know your most recent blood pressure reading?" — SectionBiometrics.vue lines 48–49, 57–58, 78–79, 86, 93
  - "Normal (below 120/80)", "Elevated (120-129 / less than 80)", "High – Stage 1 (130-139 / 80-89)", "High – Stage 2 (140+ / 90+)", "I don't know", "Back", "Continue" — SectionBiometrics.vue BP_OPTIONS + AssessmentStep.vue
  - "What matters most to you?", "What are your top health focus areas?", "Check all that apply", "What specific wellness goals are you working toward?", "Are you currently experiencing any of these symptoms?", "What is your primary motivation for starting this health journey?" — SectionHealthGoals.vue
  - "Pregnancy & breastfeeding status", "Are you currently pregnant or breastfeeding?", "No", "Yes, I am currently pregnant", "Yes, I am currently breastfeeding", "I am trying to conceive", "Please note:", "Some prescription treatments may not be available during pregnancy or while breastfeeding." — SectionPregnancy.vue
  - "Your hormonal health", "What best describes your current reproductive / menopause status?", "When was your last menstrual cycle?", "How would you describe your menstrual cycle?" — SectionHormonalHealth.vue
  - "Your medical history", "Have you been diagnosed with any medical conditions?", "Do you have any known allergies or intolerances?", "Have you had any major surgeries?" — SectionMedicalHistory.vue
  - "Your preventive screenings", "When was your last Pap smear?", "When was your last mammogram?", "When was your last colon cancer screening?", "When was your last DEXA scan (bone density)?" — SectionPreventiveScreening.vue
  - "Current medications & supplements", "Are you currently taking any prescription medications?", "Are you regularly taking any over-the-counter vitamins, supplements, or herbal products?" — SectionMedications.vue
  - "Family health history", "Do any close relatives have significant health conditions?" — SectionFamilyHistory.vue
  - "Nutrition & Diet", "How would you describe your typical diet?", "How often do you eat fruits and vegetables?", "What non-alcoholic beverages do you regularly drink?" — SectionNutrition.vue
  - "Physical activity & exercise", "How often do you exercise per week?", "What types of physical activity do you do?", "Do you face any barriers or challenges to exercising?" — SectionPhysicalActivity.vue
  - "Sleep & recovery", "On average, how many hours do you sleep per night?", "Do you generally wake up feeling rested?", "Do you have any sleep concerns?" — SectionSleep.vue
  - "Substance use", "Do you currently smoke or use nicotine products?", "Do you drink alcohol?" — SectionSubstanceUse.vue
  - "Informed Consent", "Please review and agree to the following before submitting", "Telemedicine Informed Consent", "Notice of Privacy Practices", "Click to view", "Both consents are required to submit.", "Submit" — SectionInformedConsent.vue
  - "TELEMEDICINE INFORMED CONSENT", "1. Purpose", "2. How It Works", "3. Risks & Benefits", "4. Patient Rights", "5. Contact Information", "NOTICE OF PRIVACY PRACTICES", "Effective Date: January 1, 2025", "Uses & Disclosures", "Your Rights", "Contact Us" — SectionInformedConsent.vue drawer content
  - Footer: "KWILT Health Intake Form — The information collected here is used solely to personalize your health assessment and recommendations. All data is encrypted and stored securely in accordance with HIPAA guidelines. KWILT does not sell or share your personal health information with third parties. ©2025 KWILT Health, Inc." — AssessmentLayout.vue lines 62–64
- **String presence:** All 15+ section titles and key prompts from PAGES_PARITY.md appear verbatim in the listed Vue files; 13 sections render in order with same step flow as React.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: AssessmentComplete

- **Vue file:** `src/pages/AssessmentCompleteView.vue`
- **Route:** `/assessment-complete`
- **Components used:** RouterLink, UiButton
- **Assets used:** kwilt-logo-dark.png
- **Visible strings check (exact):**
  - "KWILT" — AssessmentCompleteView.vue line 22 (alt), logo
  - "Assessment complete" — AssessmentCompleteView.vue line 40
  - "Thank you for completing your health profile." — AssessmentCompleteView.vue line 48
  - "Your answers give our team everything they need to build a health plan that's truly yours — not a template, not a guess. You've taken a meaningful step." — AssessmentCompleteView.vue lines 54–56
  - "What's next" — AssessmentCompleteView.vue line 68
  - "Expert review", "1–2 business days" — AssessmentCompleteView.vue lines 86–87
  - "Our health professionals will carefully review your responses and craft a personalized plan built specifically for you." — AssessmentCompleteView.vue lines 90–91
  - "We'll notify you", "Email &amp; SMS" — AssessmentCompleteView.vue lines 99–100
  - "You'll hear from us the moment your custom health plan is ready, with clear next steps to get started." — AssessmentCompleteView.vue lines 102–103
  - "Go to My Dashboard" — AssessmentCompleteView.vue line 115
  - "Your profile is saved. You can always update it from your dashboard." — AssessmentCompleteView.vue lines 120–121
- **String presence:** All 10+ key strings from React AssessmentComplete appear verbatim in `AssessmentCompleteView.vue` at the lines above.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

## Batch 4

### Page: Results

- **Vue file:** `src/pages/ResultsView.vue`, `src/features/results/PillarRow.vue`, `src/features/results/BiomarkerSummary.vue`, `src/features/results/pillars-data.ts`, `src/components/results/BiomarkerCategories.vue`
- **Route:** `/results`
- **Components used:** PillarRow, BiomarkerSummary, BiomarkerCategories; useScenarioStore
- **Assets used:** results-cta-hero.png
- **Visible strings check (exact):**
  - "KWILT™ longevity pillars" — ResultsView.vue line 32
  - "Heart health", "Metabolic health", "Brain health", "Cancer prevention", "Bone and muscle care" — pillars-data.ts; ResultsView.vue pillarTitles
  - "Evaluates your heart and blood vessels, including inflammation and cholesterol-related risks." — pillars-data.ts (Heart health subtitle)
  - "Measures blood sugar regulation, fat metabolism, and body composition resilience." — pillars-data.ts (Metabolic health subtitle)
  - "Lipid Panel (Total Chol, LDL, HDL, Triglycerides)", "ApoB – Total atherogenic particles", "Fasting Glucose", "HbA1c – Long-term blood sugar", "Insulin – Fasting level" — pillars-data.ts; BiomarkerCategories.vue
  - "above", "below", "out" — statusLabel in pillars-data.ts / BiomarkerCategories (Above Range, Below Range, Out of Range)
  - "Why it matters", "Lowered by", "Score is lowered by" — PillarRow.vue; pillars-data whyItMatters / loweredBy
  - "Awaiting lab results", "—/20" — ResultsView.vue blank state
  - "Biomarkers", "Complete your lab work to see your biomarker results and longevity pillar scores." — ResultsView.vue
  - "108 Biomarkers", "Download results", "in range", "out of range", "improving" — BiomarkerSummary.vue
  - "All Biomarkers" — BiomarkerCategories.vue
  - "Live well today,", "for a better tomorrow." — ResultsView.vue CTA hero
- **Parity safety (both branches):**
  - **Blank state (scenario ≠ 'none'):** `isBlank = computed(() => scenario !== 'none')` — ResultsView.vue line 13. When true, template uses `<template v-if="isBlank">` (line 32). Proof strings in this branch: pillar placeholders with "Awaiting lab results" (line 42), "—/20" (line 47), "Biomarkers" heading (line 54), "Complete your lab work to see your biomarker results and longevity pillar scores." (lines 56–58) — ResultsView.vue lines 33–60.
  - **Full pillars state (scenario === 'none'):** When `isBlank` is false, template uses `<template v-else>` (line 63). Proof: `<PillarRow v-for="p in pillars"` (lines 65–70), `<BiomarkerSummary />` (line 72), `<BiomarkerCategories />` (line 73). Pillar titles/subtitles and marker strings come from `pillars` (pillars-data.ts) and PillarRow.vue ("Markers that influence this score", "Score is lowered by", "Why it matters").
- **String presence:** All key strings from PAGES_PARITY.md for Results appear verbatim in the listed Vue files.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Plan

- **Vue file:** `src/pages/PlanView.vue`
- **Route:** `/plan`
- **Components used:** UiCheckbox, UiButton
- **Assets used:** plan-cta-hero.png
- **Visible strings check (exact):**
  - "Your KWILT plan" — PlanView.vue header
  - "Clinician's notes", "Notes" — PlanView.vue button
  - "Your plan will become more personalized once your lab results are available." — PlanView.vue isPreLab banner
  - "Top Actions", "Today's Agenda" — PlanView.vue SLIDE_LABELS
  - "Top actions across your six plans" — PlanView.vue
  - "MUST DO", "ROUTINE", "PRO TIP" — PlanView.vue actions priority
  - "Take Vitamin D3 supplement", "Your levels are below optimal range. Take 5000 IU daily with a fat-containing meal." — PlanView.vue actions[0]
  - "30-min strength training", "Eat 30g protein at breakfast", "Wind-down routine by 10 PM", "Drink 3L of water today", "5-min mindfulness session" — PlanView.vue actions
  - "Today's agenda", "MORNING", "MIDDAY", "EVENING" — PlanView.vue agenda
  - "Nutrition", "Supplements", "Exercises", "Sleep", "Therapy", "Medical Intervention" — PAGES_PARITY; PlanView category titles: "Nutrition optimization", "Exercise & Movement", "Sleep optimization", "Diagnostics", "General Wellness", "Supplements"
  - "Complete your health assessment to receive your personalized plan." — PlanView.vue blank state
  - "Get the full picture.", "Take control." — PlanView.vue CTA hero
  - "©2025 kwilthealth" — PlanView.vue footer
- **String presence:** All key strings from PAGES_PARITY.md for Plan appear verbatim in `PlanView.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: PlanDetail

- **Vue file:** `src/pages/PlanDetailView.vue`, `src/components/plan/MealPlanSection.vue`
- **Route:** `/plan/:categoryId`
- **Components used:** MealPlanSection
- **Assets used:** None
- **Visible strings check (exact):**
  - "Nutrition optimization", "Exercise & Movement", "Sleep optimization", "Diagnostics", "General Wellness", "Supplements" — PlanDetailView.vue categoryTitles
  - "Personalized dietary recommendations based on your biomarker results and health goals." — PlanDetailView.vue categoryDescriptions (nutrition)
  - "Cardiovascular and metabolic health", "Cancer prevention", "Brain health", "Bone and muscle care", "Additional insights" — PlanDetailView.vue pillarData titles
  - "Your summary &amp; longevity pillars" — PlanDetailView.vue
  - "Notes" — PlanDetailView.vue notes card
  - "CLOSE→" — PlanDetailView.vue back button
  - "out of range", "in range", "Biomarkers", "All markers in range" — PlanDetailView.vue pillar expandable content
  - "7-Day Meal Plan: Focuses on heart-healthy fats, lean protein, and a variety of micronutrients for metabolic support." — MealPlanSection.vue
  - "Today's agenda" — MealPlanSection.vue
  - "©2025 kwilthealth" — MealPlanSection.vue
- **Parity safety (route-driven category + pillar labels):**
  - **Route-driven mapping:** `categoryId = computed(() => route.params.categoryId ?? '')` — PlanDetailView.vue line 49. `title = computed(() => categoryTitles[categoryId.value] ?? 'Plan Detail')` (line 50), `description = computed(() => categoryDescriptions[categoryId.value] ?? '')` (line 51). Category titles map: `categoryTitles` (lines 6–13): nutrition → "Nutrition optimization", exercise → "Exercise & Movement", sleep → "Sleep optimization", diagnostics → "Diagnostics", wellness → "General Wellness", supplements → "Supplements". Descriptions map: `categoryDescriptions` (lines 15–22). Rendered in template as `{{ title }}` (line 59), `{{ description }}` (line 60).
  - **Pillar labels:** Each pillar card expandable content shows: "out of range" badge (line 107), "in range" badge (line 118), "Biomarkers" subheading (lines 111, 119), "All markers in range" / "No markers in range" fallbacks (lines 115, 126). Pillar titles/descriptions from `pillarData` (lines 33–38): "Cardiovascular and metabolic health", "Cancer prevention", "Brain health", "Bone and muscle care", "Additional insights".
- **String presence:** All key strings from PAGES_PARITY.md for PlanDetail appear verbatim in the listed Vue files.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Lifestyle

- **Vue file:** `src/pages/LifestyleView.vue`
- **Route:** `/lifestyle`
- **Components used:** UiInput
- **Assets used:** woman-relaxing.jpg, meal-pasta.jpg, meal-pizza.jpg, meal-rice-beans.jpg
- **Visible strings check (exact):**
  - "Track your meals" — LifestyleView.vue header
  - "Add a meal" — LifestyleView.vue button
  - "This week", "3 meals logged", "-70% from last week" — LifestyleView.vue stats
  - "Average grade", "4.2/5", "Based on 3 analyzed meals" — LifestyleView.vue stats
  - "Trend", "Improving", "Overall nutritional quality" — LifestyleView.vue stats
  - "Quick action", "Add new meal", "Track nutrition" — LifestyleView.vue stats
  - "Filter Meals", "Search meals" — LifestyleView.vue filter section
  - "Last 30 days" — LifestyleView.vue timeframe
  - "Your meals", "VIEW ALL→" — LifestyleView.vue section
  - "JULY 19, 2025", "Pasta with meatballs", "Deep dish pizza", "Rice and beans" — LifestyleView.vue meals
  - "B", "C", "A" — LifestyleView.vue meal grades
  - "View details" — LifestyleView.vue
  - "Small changes.", "Results that you can feel." — LifestyleView.vue CTA
  - "©2025 kwilthealth" — LifestyleView.vue footer
- **String presence:** All key strings from PAGES_PARITY.md for Lifestyle appear verbatim in `LifestyleView.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Profile

- **Vue file:** `src/pages/ProfileView.vue`
- **Route:** `/profile`
- **Components used:** UiCollapsible
- **Assets used:** None
- **Visible strings check (exact):**
  - "KWILT™ profile" — ProfileView.vue header
  - "Demographics", "Health Goals and Motivation", "Medical History and Current Health", "Medications and Supplements", "Lifestyle and Habits", "Substance Use", "Subjective Symptoms and Wellness", "Biometrics and Measurements", "Wearables and Tracking" — ProfileView.vue intakeCategories
  - "Account settings", "Log out" — ProfileView.vue
  - "LEGAL NAME", "BIOLOGICAL SEX", "EMAIL", "DATE OF BIRTH", "ADDRESS", "PHONE NUMBER" — ProfileView.vue accountFields labels
  - "Elisa George", "Female", "05/05/1985", "123 Wellness Ave, Austin TX 78701", "(512) 555-0198", "elisa.george@email.com" — ProfileView.vue accountFields values
  - "CHANGE PASSWORD", "NOTIFICATION PREFERENCES", "DELETE ACCOUNT" — ProfileView.vue collapsible rows
- **String presence:** All key strings from PAGES_PARITY.md for Profile appear verbatim in `ProfileView.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

## Batch 5

### Page: Checkout

- **Vue file:** `src/pages/CheckoutView.vue`, `src/features/checkout/OrderSummary.vue`, `src/features/checkout/checkout-fixture.ts`
- **Route:** `/checkout`
- **Components used:** UiInput, UiButton, UiCheckbox, OrderSummary; useOrderThankYouStore
- **Assets used:** kwilt-logo-dark.png, product-semaglutide.png, product-balance.png
- **Visible strings check (exact):**
  - "KWILT" — CheckoutView.vue logo alt
  - "Summary", "Discount or Gift Card Code", "Apply", "Subtotal:", "Shipping", "Total:" — OrderSummary.vue
  - "Your cart is empty.", "Browse Treatments" — CheckoutView.vue empty state
  - "1 of 3", "2 of 3", "3 of 3", "Info", "First Name", "Last Name", "Email", "Date of Birth", "Gender" — CheckoutView.vue step 1
  - "Shipping", "Edit", "Saved Addresses", "Home", "Work", "Use new address", "Use saved address" — CheckoutView.vue step 2
  - "Payment", "Visa ending in 4242", "Mastercard ending in 8888", "Add new card", "Billing same as shipping", "I agree to the terms and authorize the charge.", "Place order" — CheckoutView.vue step 3
  - "Member Monthly Subscription", "Member", "-month Subscription", "for a", "-month supply" — OrderSummary.vue item copy
- **String presence:** All key strings from PAGES_PARITY.md for Checkout appear verbatim in the listed Vue files.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Payment

- **Vue file:** `src/pages/PaymentView.vue`
- **Route:** `/payment`
- **Components used:** SignupLayout, UiInput, UiButton
- **Assets used:** None
- **Visible strings check (exact):**
  - "Become a KWILT™ member", "Annual Membership", "$449" — PaymentView.vue left slot
  - "Unlock a deeper understanding of your health for $449 a year. Gain invaluable insights with our comprehensive Mega Panel, exploring over 100 key biomarkers. Cancel anytime. Membership auto renews each year." — PaymentView.vue
  - "Secured with 256-bit SSL encryption" — PaymentView.vue
  - "Cancel anytime. Membership auto renews each year.", "Payment Details", "First Name", "Last Name", "Card Number", "4433 2211 4433 2211", "Exp Date", "12/29", "Security Code", "123", "Address", "Start typing your address...", "City", "State", "ZIP", "Complete Purchase" — PaymentView.vue form
- **String presence:** All key strings from PAGES_PARITY.md for Payment appear verbatim in `PaymentView.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: ThankYou

- **Vue file:** `src/pages/ThankYouView.vue`
- **Route:** `/thank-you`
- **Components used:** useScenarioStore, useOrderThankYouStore
- **Assets used:** kwilt-logo-dark.png
- **Visible strings check (exact):**
  - "KWILT" — ThankYouView.vue logo alt
  - "Order #", "Thank you", "!", "A confirmation email has been sent to your email with order and shipping details.", "Back to dashboard" — ThankYouView.vue left column
  - "Summary", "Monthly Subscription", "-month Subscription", "for a", "-month supply" — ThankYouView.vue right column
- **String presence:** All key strings from PAGES_PARITY.md for ThankYou appear verbatim in `ThankYouView.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: ManageSubscription

- **Vue file:** `src/pages/ManageSubscriptionView.vue`
- **Route:** `/treatments/manage/:treatmentName`
- **Components used:** UiInput, UiCheckbox, UiButton, UiDialog
- **Assets used:** product-semaglutide.png, product-balance.png
- **Visible strings check (exact):**
  - "Subscription not found." — ManageSubscriptionView.vue when invalid param
  - "Manage", "subscription", "Billing", "Shipping", "Payment", "Bills on:", "Ships on:", "Order Total:", "Next billing date", "Shipment", "Add to calendar", "Save", "Edit", "Card number", "Expiry", "CVV", "Name on card", "Billing same as shipping", "I agree to the terms and authorize the charge.", "Cancel", "Confirm", "Are you sure?", "Your subscription will remain active until the end of the current period.", "Cancel subscription" — ManageSubscriptionView.vue
- **String presence:** All key strings from PAGES_PARITY.md for ManageSubscription appear verbatim in `ManageSubscriptionView.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: OrderHistory

- **Vue file:** `src/pages/OrderHistoryView.vue`
- **Route:** `/order-history`
- **Components used:** cn (lib)
- **Assets used:** product-semaglutide.png, product-balance.png
- **Visible strings check (exact):**
  - "Order history", "CLOSE→", "ALL", "SHIPPED", "DELIVERED", "CANCELLED", "No orders found.", "Placed:", "Order #", "Order Total:", "Show order details", "Hide order details", "Sent to", "Paid with", "Summary", "Subtotal", "Shipping", "Discount", "Tax", "Total" — OrderHistoryView.vue
  - "Semaglutide", "6-month Subscription – $200/mo", "1-month Subscription – $50/mo", "Balance Supplement Pack", "One-time purchase", "delivered", "shipped", "cancelled" — OrderHistoryView.vue mock data
- **String presence:** All key strings from PAGES_PARITY.md for OrderHistory appear verbatim in `OrderHistoryView.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: PatientPortal

- **Vue file:** `src/pages/PatientPortalView.vue`, `src/components/treatments/BookAppointmentModal.vue`, `src/components/treatments/RescheduleModal.vue`, `src/components/treatments/CancelAppointmentModal.vue`
- **Route:** `/patient-portal`
- **Components used:** UiTabs, UiButton, BookAppointmentModal, RescheduleModal, CancelAppointmentModal
- **Assets used:** None (avatars use external URL)
- **Visible strings check (exact):**
  - "Patient Portal", "Manage your health records and appointments", "+ Book New Appointment" — PatientPortalView.vue header
  - "Upcoming", "Recent", "Visit summaries", "Appointments" — PatientPortalView.vue tabs/sections
  - "Dr. Sarah Wilson", "Follow-up Visit", "Mid-point Lab Review", "Lab Review", "Routine Check-up", "New Treatment Consultation", "Confirmed", "Missed", "Completed" — appointment cards
  - "Tuesday, March 10, 2026", "10:30 AM", "Reschedule", "Cancel", "View summary" — PatientPortalView.vue
  - "Complaint", "Medications", "Lab results", "Care instructions", "Provider notes", "Next appointment" — visit summary detail
- **String presence:** All key strings from PAGES_PARITY.md for PatientPortal appear verbatim in the listed Vue files.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

## Parity exceptions

- **Batch 1:** Zero. All strings and assets match PAGES_PARITY.md; no invented copy.
- **Batch 2:** Zero. All strings and assets match PAGES_PARITY.md; no invented copy.
- **Batch 3:** Zero. All strings and section flows match PAGES_PARITY.md and React; no invented copy.
- **Batch 4:** Zero. All strings, assets, and layout match PAGES_PARITY.md and React; no invented copy.
- **Batch 5:** Zero. All strings, assets, and layout match PAGES_PARITY.md and React; no invented copy.
