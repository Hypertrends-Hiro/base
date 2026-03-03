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
  - "Demo:", "Select Scenario", "Default View", "Default View with Wizard", "Member - New Rx Ordered", "Intake Not Started", "Lab Requisition Ready", "Preparing Lab Requisition", "Labs Ordered" — scenario dropdown
  - "Hello, Elisa", "14 day streak. Last updated 9:45 am." — header
  - "🎉 Congrats — your labs are in!", "Your personalized dashboard is ready. Take a quick tour to see what's here.", "Dismiss", "Tour the Portal" — wizard banner
  - "Welcome!", "To fill dashboard with your personalized insights—we just need your information. Get started by completing your", "Intake Questionnaire", "Start Intake" — intake-not-started banner
  - "Your Lab Requisition Is Ready", "Download your requisition and book your lab visit to get your blood work done.", "View details" — intake-complete banner
  - "Preparing Your Lab Requisition", "We're preparing your lab requisition. Once ready, you'll receive it with instructions to visit a lab for your blood work.", "In progress" — preparing banner
  - "Your Lab Results Are Arriving Soon", "We'll notify you when your results are ready and you can schedule your labs.", "Pending" — labs-ordered banner
  - "KWILT™ longevity score", "Biological age", "Based on the lab test from January 2025", "/100", "Your score total is based on an analysis of all screened biomarkers across the five health pillars.", "10.5 years", "younger than your calendar age"
  - "Your scores", "VIEW ALL", "Heart health", "Metabolic health", "Brain health", "Cancer prevention", "Bone and muscle care" — health score rows
  - "Biomarkers", "Your plan", "VIEW FULL TREATMENT PLAN", "Nutrition", "Supplements", "Exercises", "Sleep", "Therapy", "Medical Intervention"
  - "Recommended for you", "Balance", "GLP-1 Assist", "NAD+", "Semaglutide", "Tirzepatide", "Weightloss", "Hormone Treatment", "Metabolic Health", "BEST SELLER", "LAB REQUIRED", "Add to Plan"
- **String presence:** All key strings from PAGES_PARITY.md for Dashboard appear verbatim in `DashboardView.vue` (scenario dropdown, banners, score cards, health scores, plan categories, treatments carousel).
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Shop

- **Vue file:** `src/pages/ShopView.vue`
- **Route:** `/shop`
- **Components used:** Header (components/home/Header.vue), RouterLink
- **Assets used:** kwilt-logo-dark.png, woman-hair-wind.jpg, woman-skincare.jpg, hand-sunset.jpg, how-to-use-kwilt.png, app-phone-mockup.png, product-semaglutide.png, product-balance.png, product-glp1.png, product-hrt.png, product-nad.png
- **Visible strings check (exact):**
  - "Products formulated to combat the effects of aging with ingredients that create real results.", "Results you can feel.", "Get Started" — hero
  - "All", "Longevity Essentials", "Sexual Health", "Metabolic Health", "Aesthetic & Feminine", "Hair + Nails", "All Products"
  - "KWILT Essentials", "Daily longevity supplement stack", "$149/mo", "Metformin", "Metabolic optimization", "$99/mo", "Semaglutide", "GLP-1 receptor agonist", "$199/mo", "Tretinoin", "Topical retinoid for skin renewal", "$59/mo", "NAD+ Booster", "Cellular energy & repair", "$129/mo", "HRT Balance", "Hormone optimization therapy", "$179/mo", "Add to Plan"
  - "Connect with a provider", "Get matched with a medical provider who understands your unique goals.", "Convenient delivery", "Your treatments are compounded and shipped right to your door", "Track your progress", "With biomarker data and insights right at your fingertips"
  - "Everyone's", "longevity", "journey is", "unique", "A plan", "designed", "with you in", "mind", "Start Assessment"
  - "We are here for you", "Redefine what it means to age.", "Longevity. Optimized.", "©2025 kwilthealth.com"
- **String presence:** All key strings from PAGES_PARITY.md for Shop appear verbatim in `ShopView.vue` and `Header.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

### Page: Treatments

- **Vue file:** `src/pages/TreatmentsView.vue`
- **Route:** `/treatments`
- **Components used:** UiAvatar, UiDialog, BookAppointmentModal, ExploreAllTreatments
- **Assets used:** product-semaglutide.png, product-balance.png, product-glp1.png
- **Visible strings check (exact):**
  - "Treatments", "My treatments", "Schedule virtual visit" — header
  - "🎉 You have recommended treatments", "Dismiss", "Learn more" — wizard banner
  - "Metformin", "Semaglutide", "1-month subscription", "6-month Subscription", "View treatment plan", "Close treatment plan", "Started on:", "Visit required by:", "New prescription" — treatment cards
  - "Tirzepatide", "3-month subscription", "Manage subscription", "Patient", "Medical Provider", "Provider:", "Kate Cordisco, NP", "Address:", "13280 Evening Creek Drive South, Ste 225, San Diego, CA 92128", "Supervising Physician:", "Brian Crenshaw, MD", "Assessment", "Instructions"
  - "For questions or concerns, text or call", "888-299-5088", "support@kwilthealth.com", "In case of an emergency call 911"
  - "Explore all treatments", "Recommended", "View All", "Add to Plan"
  - "Book New Appointment", "Select Provider", "How treatments work", "Your path to wellness", "Browse your recommended treatments below", "Questions? Your provider is here to help during your visit."
- **String presence:** All key strings from PAGES_PARITY.md for Treatments appear verbatim in `TreatmentsView.vue`, `BookAppointmentModal.vue`, and `ExploreAllTreatments.vue`.
- **Gates:** npm run typecheck PASS, npm run build PASS

---

## Parity exceptions

- **Batch 1:** Zero. All strings and assets match PAGES_PARITY.md; no invented copy.
- **Batch 2:** Zero. All strings and assets match PAGES_PARITY.md; no invented copy.
