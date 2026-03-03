export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  vitaminD: string;
  b12: string;
  omega3: string;
}

export interface Meal {
  type: "BREAKFAST" | "SNACK" | "LUNCH" | "DINNER";
  rationale: string;
  name: string;
  ingredients: string[];
  instructions: string;
  nutrition: NutritionInfo;
}

export interface DayPlan {
  label: string;
  meals: Meal[];
}

export const mealPlanData: DayPlan[] = [
  {
    label: "Day 1",
    meals: [
      {
        type: "BREAKFAST",
        rationale: "High in healthy fats and fiber to stabilize morning blood sugar.",
        name: "Avocado Toast with Poached Egg",
        ingredients: ["2 slices whole-grain bread", "1 ripe avocado", "2 eggs", "Pinch of sea salt & black pepper", "Red pepper flakes"],
        instructions: "Toast the bread until golden. Mash avocado with salt and pepper, spread onto toast. Poach eggs in simmering water for 3 minutes. Place eggs on toast and finish with red pepper flakes.",
        nutrition: { calories: "420 kcal", protein: "18g", carbs: "38g", fat: "24g", vitaminD: "1.1 µg", b12: "0.9 µg", omega3: "0.3g" },
      },
      {
        type: "SNACK",
        rationale: "Antioxidant-rich berries with probiotics for gut health support.",
        name: "Berry Yogurt Bowl",
        ingredients: ["1 cup Greek yogurt", "½ cup mixed berries", "1 tbsp ground flaxseed", "1 tsp honey"],
        instructions: "Spoon yogurt into a bowl. Top with mixed berries and flaxseed. Drizzle with honey and serve immediately.",
        nutrition: { calories: "220 kcal", protein: "15g", carbs: "28g", fat: "6g", vitaminD: "0.1 µg", b12: "1.2 µg", omega3: "1.6g" },
      },
      {
        type: "LUNCH",
        rationale: "Omega-3 rich salmon supports cardiovascular and brain health.",
        name: "Grilled Salmon Salad",
        ingredients: ["6 oz wild salmon fillet", "3 cups mixed greens", "½ cucumber, sliced", "2 tbsp olive oil", "1 tbsp lemon juice", "Salt & pepper"],
        instructions: "Season salmon with salt, pepper, and a drizzle of olive oil. Grill for 4 minutes per side. Toss greens and cucumber with remaining olive oil and lemon juice. Serve salmon over the salad.",
        nutrition: { calories: "480 kcal", protein: "38g", carbs: "8g", fat: "34g", vitaminD: "14.2 µg", b12: "4.8 µg", omega3: "2.1g" },
      },
      {
        type: "DINNER",
        rationale: "Lean protein with colorful vegetables for micronutrient density.",
        name: "Chicken & Veggie Stir-Fry",
        ingredients: ["6 oz chicken breast", "1 cup broccoli florets", "1 red bell pepper, sliced", "½ cup snap peas", "2 tbsp low-sodium soy sauce", "1 tbsp sesame oil", "1 cup brown rice"],
        instructions: "Cook brown rice according to package directions. Slice chicken into strips and sear in sesame oil over high heat for 5 minutes. Add vegetables and stir-fry for 3–4 minutes. Add soy sauce, toss, and serve over rice.",
        nutrition: { calories: "560 kcal", protein: "42g", carbs: "52g", fat: "18g", vitaminD: "0.2 µg", b12: "0.6 µg", omega3: "0.2g" },
      },
    ],
  },
  {
    label: "Day 2",
    meals: [
      {
        type: "BREAKFAST",
        rationale: "Slow-releasing oats with omega-3 from walnuts for sustained energy.",
        name: "Overnight Oats with Walnuts",
        ingredients: ["½ cup rolled oats", "¾ cup almond milk", "1 tbsp chia seeds", "¼ cup walnuts", "½ banana, sliced", "1 tsp cinnamon"],
        instructions: "Combine oats, almond milk, and chia seeds in a jar. Refrigerate overnight. In the morning, top with sliced banana, walnuts, and a sprinkle of cinnamon.",
        nutrition: { calories: "380 kcal", protein: "12g", carbs: "44g", fat: "19g", vitaminD: "0 µg", b12: "0 µg", omega3: "2.5g" },
      },
      {
        type: "SNACK",
        rationale: "Healthy fats and fiber to curb afternoon hunger.",
        name: "Apple Slices with Almond Butter",
        ingredients: ["1 medium apple", "2 tbsp almond butter"],
        instructions: "Slice the apple and serve with almond butter for dipping.",
        nutrition: { calories: "260 kcal", protein: "6g", carbs: "30g", fat: "14g", vitaminD: "0 µg", b12: "0 µg", omega3: "0.1g" },
      },
      {
        type: "LUNCH",
        rationale: "Mediterranean-style bowl rich in anti-inflammatory ingredients.",
        name: "Quinoa Mediterranean Bowl",
        ingredients: ["1 cup cooked quinoa", "½ cup chickpeas", "½ cup cherry tomatoes", "¼ cup Kalamata olives", "2 oz feta cheese", "2 tbsp olive oil", "Fresh lemon juice"],
        instructions: "Arrange quinoa in a bowl. Top with chickpeas, halved cherry tomatoes, olives, and crumbled feta. Drizzle with olive oil and lemon juice.",
        nutrition: { calories: "510 kcal", protein: "20g", carbs: "54g", fat: "26g", vitaminD: "0.1 µg", b12: "0.8 µg", omega3: "0.3g" },
      },
      {
        type: "DINNER",
        rationale: "Lean fish with roasted vegetables for balanced macros.",
        name: "Baked Cod with Roasted Vegetables",
        ingredients: ["6 oz cod fillet", "1 cup Brussels sprouts, halved", "1 sweet potato, cubed", "2 tbsp olive oil", "1 tsp smoked paprika", "Salt & pepper"],
        instructions: "Preheat oven to 400°F. Toss Brussels sprouts and sweet potato with olive oil, paprika, salt and pepper. Roast for 20 minutes. Place cod on the pan, season, and bake another 12 minutes until fish flakes.",
        nutrition: { calories: "440 kcal", protein: "36g", carbs: "40g", fat: "16g", vitaminD: "1.0 µg", b12: "1.2 µg", omega3: "0.4g" },
      },
    ],
  },
  {
    label: "Day 3",
    meals: [
      {
        type: "BREAKFAST",
        rationale: "Protein-packed start with anti-inflammatory turmeric.",
        name: "Spinach & Mushroom Omelet",
        ingredients: ["3 eggs", "1 cup fresh spinach", "½ cup mushrooms, sliced", "1 tbsp olive oil", "Salt & pepper"],
        instructions: "Heat olive oil in a non-stick pan. Sauté mushrooms for 3 minutes, add spinach until wilted. Pour beaten eggs over vegetables, cook until set, fold and serve.",
        nutrition: { calories: "340 kcal", protein: "24g", carbs: "4g", fat: "26g", vitaminD: "2.0 µg", b12: "1.5 µg", omega3: "0.4g" },
      },
      {
        type: "SNACK",
        rationale: "Nutrient-dense seeds and dried fruit for a quick energy boost.",
        name: "Trail Mix",
        ingredients: ["¼ cup almonds", "2 tbsp pumpkin seeds", "2 tbsp dried cranberries", "1 tbsp dark chocolate chips"],
        instructions: "Combine all ingredients in a small container. Enjoy as a grab-and-go snack.",
        nutrition: { calories: "280 kcal", protein: "8g", carbs: "22g", fat: "20g", vitaminD: "0 µg", b12: "0 µg", omega3: "0.1g" },
      },
      {
        type: "LUNCH",
        rationale: "Fiber-rich lentils support metabolic health and satiety.",
        name: "Lentil Soup with Crusty Bread",
        ingredients: ["1 cup red lentils", "1 carrot, diced", "1 celery stalk, diced", "1 onion, diced", "2 cloves garlic", "4 cups vegetable broth", "1 tsp cumin", "Whole-grain bread"],
        instructions: "Sauté onion, carrot, celery, and garlic in olive oil for 5 minutes. Add lentils, broth, and cumin. Simmer for 25 minutes until lentils are tender. Serve with warm crusty bread.",
        nutrition: { calories: "420 kcal", protein: "22g", carbs: "64g", fat: "6g", vitaminD: "0 µg", b12: "0 µg", omega3: "0.2g" },
      },
      {
        type: "DINNER",
        rationale: "Grass-fed beef provides iron and B12 for energy and cognition.",
        name: "Grass-Fed Beef Tacos",
        ingredients: ["6 oz grass-fed ground beef", "3 small corn tortillas", "½ cup shredded lettuce", "¼ cup diced tomatoes", "¼ avocado, sliced", "2 tbsp salsa", "Lime wedge"],
        instructions: "Brown ground beef with cumin, chili powder, salt and pepper. Warm tortillas. Assemble tacos with beef, lettuce, tomatoes, avocado and salsa. Squeeze lime over top.",
        nutrition: { calories: "520 kcal", protein: "34g", carbs: "36g", fat: "28g", vitaminD: "0.1 µg", b12: "5.2 µg", omega3: "0.3g" },
      },
    ],
  },
  {
    label: "Day 4",
    meals: [
      {
        type: "BREAKFAST",
        rationale: "Complex carbs with protein for steady morning energy.",
        name: "Whole-Grain Pancakes with Berries",
        ingredients: ["1 cup whole-wheat flour", "1 egg", "¾ cup milk", "1 tbsp maple syrup", "½ cup blueberries", "1 tsp baking powder"],
        instructions: "Mix flour, baking powder, egg, and milk into a batter. Pour ¼ cup portions onto a heated, greased skillet. Add blueberries, flip when bubbles form. Serve with maple syrup.",
        nutrition: { calories: "390 kcal", protein: "14g", carbs: "62g", fat: "10g", vitaminD: "0.8 µg", b12: "0.7 µg", omega3: "0.1g" },
      },
      {
        type: "SNACK",
        rationale: "Creamy hummus with raw veggies for fiber and plant protein.",
        name: "Hummus & Veggie Sticks",
        ingredients: ["¼ cup hummus", "1 carrot, cut into sticks", "1 celery stalk", "½ bell pepper, sliced"],
        instructions: "Arrange vegetable sticks on a plate with hummus for dipping.",
        nutrition: { calories: "180 kcal", protein: "6g", carbs: "20g", fat: "9g", vitaminD: "0 µg", b12: "0 µg", omega3: "0.1g" },
      },
      {
        type: "LUNCH",
        rationale: "Tuna provides lean protein and omega-3 fatty acids.",
        name: "Tuna Poke Bowl",
        ingredients: ["5 oz sushi-grade tuna, cubed", "1 cup sushi rice", "½ avocado, sliced", "½ cup edamame", "2 tbsp soy sauce", "1 tsp sesame seeds", "Pickled ginger"],
        instructions: "Cook sushi rice and let cool slightly. Marinate tuna in soy sauce for 5 minutes. Arrange rice in a bowl, top with tuna, avocado, edamame, sesame seeds, and pickled ginger.",
        nutrition: { calories: "490 kcal", protein: "38g", carbs: "48g", fat: "16g", vitaminD: "5.6 µg", b12: "9.4 µg", omega3: "1.8g" },
      },
      {
        type: "DINNER",
        rationale: "Turkey is a lean, high-protein alternative to red meat.",
        name: "Herb-Roasted Turkey Breast with Sweet Potato",
        ingredients: ["6 oz turkey breast", "1 medium sweet potato", "1 cup green beans", "2 tbsp olive oil", "1 tsp rosemary", "1 tsp thyme", "Salt & pepper"],
        instructions: "Preheat oven to 375°F. Season turkey with herbs, salt, pepper, and olive oil. Cube sweet potato and toss with remaining oil. Roast turkey and sweet potato for 25 minutes. Steam green beans and serve together.",
        nutrition: { calories: "480 kcal", protein: "40g", carbs: "42g", fat: "16g", vitaminD: "0.3 µg", b12: "1.8 µg", omega3: "0.1g" },
      },
    ],
  },
  {
    label: "Day 5",
    meals: [
      {
        type: "BREAKFAST",
        rationale: "Smoothie packs nutrients and hydration in one quick meal.",
        name: "Green Power Smoothie",
        ingredients: ["1 cup spinach", "1 banana", "½ cup mango chunks", "1 scoop protein powder", "1 cup almond milk", "1 tbsp flaxseed"],
        instructions: "Add all ingredients to a blender and blend on high until smooth. Pour into a glass and enjoy immediately.",
        nutrition: { calories: "350 kcal", protein: "26g", carbs: "46g", fat: "8g", vitaminD: "0 µg", b12: "0 µg", omega3: "1.8g" },
      },
      {
        type: "SNACK",
        rationale: "Cottage cheese is high in casein protein for sustained fullness.",
        name: "Cottage Cheese & Pineapple",
        ingredients: ["¾ cup cottage cheese", "½ cup pineapple chunks", "1 tbsp sunflower seeds"],
        instructions: "Place cottage cheese in a bowl, top with pineapple chunks and sunflower seeds.",
        nutrition: { calories: "200 kcal", protein: "18g", carbs: "18g", fat: "6g", vitaminD: "0.1 µg", b12: "0.9 µg", omega3: "0.1g" },
      },
      {
        type: "LUNCH",
        rationale: "Shrimp is low in calories and high in selenium for thyroid support.",
        name: "Shrimp & Avocado Wrap",
        ingredients: ["5 oz cooked shrimp", "1 whole-wheat tortilla", "½ avocado, mashed", "¼ cup shredded cabbage", "2 tbsp Greek yogurt sauce", "Lime juice"],
        instructions: "Spread mashed avocado on the tortilla. Add shrimp, shredded cabbage, and yogurt sauce. Squeeze lime juice over filling, roll tightly and slice in half.",
        nutrition: { calories: "410 kcal", protein: "32g", carbs: "32g", fat: "18g", vitaminD: "0.2 µg", b12: "1.4 µg", omega3: "0.5g" },
      },
      {
        type: "DINNER",
        rationale: "Plant-based dinner rich in fiber and anti-inflammatory spices.",
        name: "Chickpea & Sweet Potato Curry",
        ingredients: ["1 can chickpeas, drained", "1 sweet potato, cubed", "1 can coconut milk", "2 tbsp curry paste", "1 cup spinach", "1 cup basmati rice", "Fresh cilantro"],
        instructions: "Sauté curry paste in a pot for 1 minute. Add sweet potato and coconut milk, simmer for 15 minutes. Add chickpeas and spinach, cook 5 more minutes. Serve over basmati rice with cilantro.",
        nutrition: { calories: "580 kcal", protein: "18g", carbs: "72g", fat: "26g", vitaminD: "0 µg", b12: "0 µg", omega3: "0.1g" },
      },
    ],
  },
  {
    label: "Day 6",
    meals: [
      {
        type: "BREAKFAST",
        rationale: "Eggs and smoked salmon deliver protein, D3, and omega-3.",
        name: "Smoked Salmon Eggs Benedict",
        ingredients: ["2 eggs", "2 oz smoked salmon", "1 English muffin", "2 tbsp hollandaise sauce", "Fresh dill"],
        instructions: "Toast English muffin halves. Poach eggs for 3 minutes. Layer smoked salmon on muffin, top with poached egg and hollandaise sauce. Garnish with dill.",
        nutrition: { calories: "440 kcal", protein: "28g", carbs: "26g", fat: "26g", vitaminD: "8.2 µg", b12: "4.2 µg", omega3: "1.4g" },
      },
      {
        type: "SNACK",
        rationale: "Edamame is a complete plant protein with isoflavones.",
        name: "Steamed Edamame with Sea Salt",
        ingredients: ["1 cup edamame in pods", "½ tsp sea salt", "Squeeze of lemon"],
        instructions: "Steam edamame for 5 minutes. Toss with sea salt and a squeeze of lemon juice.",
        nutrition: { calories: "190 kcal", protein: "17g", carbs: "13g", fat: "8g", vitaminD: "0 µg", b12: "0 µg", omega3: "0.3g" },
      },
      {
        type: "LUNCH",
        rationale: "Grilled chicken with whole grains for balanced macros and satiety.",
        name: "Chicken & Farro Grain Bowl",
        ingredients: ["5 oz grilled chicken breast", "¾ cup cooked farro", "½ cup roasted red peppers", "¼ cup arugula", "2 tbsp balsamic vinaigrette", "1 tbsp pine nuts"],
        instructions: "Arrange farro in a bowl. Top with sliced grilled chicken, roasted peppers, and arugula. Drizzle with balsamic vinaigrette and scatter pine nuts on top.",
        nutrition: { calories: "480 kcal", protein: "38g", carbs: "42g", fat: "18g", vitaminD: "0.1 µg", b12: "0.4 µg", omega3: "0.2g" },
      },
      {
        type: "DINNER",
        rationale: "Wild-caught halibut with cruciferous vegetables for detox support.",
        name: "Pan-Seared Halibut with Asparagus",
        ingredients: ["6 oz halibut fillet", "1 bunch asparagus", "2 tbsp butter", "2 cloves garlic, minced", "1 tbsp capers", "Lemon zest", "Salt & pepper"],
        instructions: "Season halibut with salt and pepper. Sear in butter for 4 minutes per side. Remove fish, sauté garlic and asparagus in the same pan for 3 minutes. Add capers and lemon zest. Plate together.",
        nutrition: { calories: "420 kcal", protein: "42g", carbs: "8g", fat: "24g", vitaminD: "5.8 µg", b12: "1.6 µg", omega3: "0.8g" },
      },
    ],
  },
  {
    label: "Day 7",
    meals: [
      {
        type: "BREAKFAST",
        rationale: "Chia pudding offers sustained energy from healthy fats and fiber.",
        name: "Coconut Chia Pudding",
        ingredients: ["3 tbsp chia seeds", "1 cup coconut milk", "1 tsp vanilla extract", "1 tbsp maple syrup", "½ cup mango, diced", "2 tbsp toasted coconut flakes"],
        instructions: "Mix chia seeds, coconut milk, vanilla, and maple syrup. Refrigerate for at least 4 hours or overnight. Top with mango and toasted coconut before serving.",
        nutrition: { calories: "360 kcal", protein: "8g", carbs: "32g", fat: "24g", vitaminD: "0 µg", b12: "0 µg", omega3: "4.9g" },
      },
      {
        type: "SNACK",
        rationale: "Protein and potassium for muscle recovery and heart health.",
        name: "Banana & Peanut Butter Bites",
        ingredients: ["1 banana", "2 tbsp natural peanut butter", "1 tbsp dark chocolate chips", "Pinch of sea salt"],
        instructions: "Slice banana into rounds. Spread peanut butter on half the slices, top with remaining slices to make sandwiches. Press chocolate chips into sides. Sprinkle with sea salt.",
        nutrition: { calories: "290 kcal", protein: "8g", carbs: "34g", fat: "16g", vitaminD: "0 µg", b12: "0 µg", omega3: "0.1g" },
      },
      {
        type: "LUNCH",
        rationale: "Sardines are one of the richest sources of omega-3 and vitamin D.",
        name: "Sardine & White Bean Salad",
        ingredients: ["1 can sardines in olive oil", "½ can white beans, drained", "½ cup cherry tomatoes, halved", "¼ red onion, thinly sliced", "2 tbsp olive oil", "1 tbsp red wine vinegar", "Fresh parsley"],
        instructions: "Arrange sardines and white beans on a plate. Add cherry tomatoes and red onion. Drizzle with olive oil and vinegar. Garnish with fresh parsley.",
        nutrition: { calories: "440 kcal", protein: "30g", carbs: "28g", fat: "24g", vitaminD: "4.8 µg", b12: "8.9 µg", omega3: "2.2g" },
      },
      {
        type: "DINNER",
        rationale: "Lean pork tenderloin with roasted root vegetables for a hearty finish.",
        name: "Roasted Pork Tenderloin with Root Vegetables",
        ingredients: ["6 oz pork tenderloin", "1 cup parsnips, cubed", "1 cup carrots, cubed", "½ cup beets, cubed", "2 tbsp olive oil", "1 tsp sage", "1 tsp garlic powder", "Salt & pepper"],
        instructions: "Preheat oven to 400°F. Season pork with sage, garlic powder, salt and pepper. Toss root vegetables with olive oil and seasoning. Roast pork and vegetables for 25 minutes until pork reaches 145°F internal temp. Rest 5 minutes before slicing.",
        nutrition: { calories: "460 kcal", protein: "36g", carbs: "36g", fat: "20g", vitaminD: "0.4 µg", b12: "1.0 µg", omega3: "0.2g" },
      },
    ],
  },
];
