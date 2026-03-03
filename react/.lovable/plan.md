

## Qualification Questionnaire Modal for Treatments

### Overview
After a user selects a subscription frequency and clicks "Add to cart" in the ProductModal, a new qualification questionnaire modal will appear. The user must answer a series of health-related questions to qualify for the treatment before the product is added to the cart.

### Flow
```text
ProductModal (select plan) 
  -> Click "Add to cart" 
  -> QualificationModal opens (ProductModal closes)
  -> Step 1: Intro screen ("Before You Check Out" with hero image + Continue)
  -> Step 2-N: Series of qualifying questions
  -> Submit answers
  -> Product added to cart + cart drawer opens
```

### New Component: QualificationModal

**File:** `src/components/cart/QualificationModal.tsx`

A multi-step dialog modal with the following screens:

**Step 1 - Intro Screen** (matches the uploaded reference image)
- Title: "Before You Check Out"
- Subtitle: "Please answer a few required questions before payment."
- Hero image using the existing `surfer-sunset.png` asset with overlay text "Longevity. Optimized."
- Two decorative dots on the image (brand styling)
- Full-width "Continue" button in primary color

**Step 2+ - Qualification Questions**
Questions will vary per product category but include general qualifying questions such as:
- "Are you currently pregnant or breastfeeding?" (Yes/No)
- "Do you have any known allergies to this medication?" (Yes/No)
- "Are you currently taking any prescription medications?" (Yes/No with follow-up text field)
- "Have you been diagnosed with any of the following conditions?" (multi-select checklist)

Each step will use the existing KWILT design patterns (YesNoToggle, form inputs, brand colors on `#F5F1F0` background).

A final "Submit" button completes the flow and triggers `addToCart`.

### Changes to ProductModal

**File:** `src/components/cart/ProductModal.tsx`

- The "Add to cart" button click will no longer call `addToCart` directly
- Instead, it will close the ProductModal and open the QualificationModal, passing along the selected product and plan details
- State management will be lifted: the parent (`ExploreAllTreatments`) will coordinate which modal is open

### Changes to ExploreAllTreatments

**File:** `src/components/treatments/ExploreAllTreatments.tsx`

- Add state for the QualificationModal (`qualModalOpen`, selected product/plan info)
- ProductModal will receive a callback (`onProceedToQualification`) instead of adding to cart directly
- Render the new QualificationModal component

### Technical Details

- The QualificationModal uses the existing `Dialog` component for consistency
- Internal step state managed with `useState` (currentStep number)
- Questions stored as a typed array within the component
- Reuses existing UI components: `YesNoToggle`, `Checkbox`, `Input`, `Textarea`
- Brand styling: `#F5F1F0` background, primary-colored buttons, font-heading for titles
- Mobile-first responsive layout matching existing modal patterns
- On final submit, calls `addToCart` from CartContext and closes the modal

