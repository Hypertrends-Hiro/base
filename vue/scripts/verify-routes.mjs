/**
 * FINAL_VERIFY checklist runner.
 * Requires: npx playwright install chromium (one-time)
 * Run: BASE_URL=http://localhost:5173 node scripts/verify-routes.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5173';

const checklist = [
  { path: '/', expect: ['KWILT', 'Redefine your age', 'JOIN TODAY', 'LOGIN'] },
  { path: '/login', expect: ['Member Login', 'Login', 'Email', 'Password'] },
  { path: '/register', expect: ['Become a KWILT', 'Your Information', 'First Name'] },
  { path: '/welcome', expect: ['KWILT', 'officially', 'member', 'Payment successful'] },
  { path: '/assessment', expect: ['Exit', '1 of 13', 'Biometrics'] },
  { path: '/assessment-complete', expect: ['Assessment complete', 'Thank you for completing', 'Go to My Dashboard'] },
  { path: '/shop', expect: ['JOIN TODAY', 'LOGIN'] },
  { path: '/dashboard', expect: ['Dashboard', 'biological age'] },
  { path: '/results', expect: ['longevity pillars', 'Awaiting lab results'] },
  { path: '/plan', expect: ['Your KWILT plan', 'Top Actions', "Today's Agenda"] },
  { path: '/plan/nutrition', expect: ['Nutrition optimization'] },
  { path: '/plan/exercise', expect: ['Exercise & Movement'] },
  { path: '/treatments', expect: ['Treatments', 'Manage subscription', 'treatments'] },
  { path: '/treatments/manage/semaglutide', expect: ['Manage', 'Semaglutide', 'subscription'] },
  { path: '/lifestyle', expect: ['Track your meals', 'Add a meal'] },
  { path: '/profile', expect: ['KWILT', 'profile', 'Account settings', 'Demographics'] },
  { path: '/info', expect: ['How to use KWILT', 'Your portal at a glance', 'Getting started tips'] },
  { path: '/order-history', expect: ['Order history', 'ALL', 'SHIPPED'] },
  { path: '/patient-portal', expect: ['Patient Portal', 'Upcoming', 'Recent'] },
  { path: '/payment', expect: ['Become a KWILT', 'Annual Membership', '$449', 'Complete Purchase'] },
  { path: '/checkout', expect: ['Summary', 'Info', 'Shipping', 'Payment'] },
  { path: '/thank-you', expect: ['Back to dashboard', 'Summary', 'Order #', 'Thank you', 'biological age'] },
  { path: '/foo', expect: ['404', 'Oops! Page not found', 'Return to Home'] },
];

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const results = [];

    for (const { path, expect } of checklist) {
      const url = BASE + path;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
        const text = await page.locator('body').innerText();
        const found = expect.filter((s) => text.includes(s));
        const ok = found.length >= 1;
        results.push({
          path,
          status: ok ? 'PASS' : 'FAIL',
          found: found.length,
          expected: expect.length,
          hint: ok ? found.slice(0, 2).join(', ') : `missing e.g. ${expect[0]}`,
        });
      } catch (e) {
        results.push({ path, status: 'ERROR', message: e.message });
      }
    }

    console.log('\n--- FINAL_VERIFY checklist results ---\n');
    let passed = 0;
    results.forEach((r, i) => {
      const num = i + 1;
      if (r.status === 'PASS') passed++;
      const msg = r.status === 'PASS' ? r.hint : r.message || r.hint || 'missing content';
      console.log(`${String(num).padStart(2)} ${r.path.padEnd(35)} ${r.status.padEnd(6)} ${msg}`);
    });
    console.log(`\n${passed}/${results.length} routes passed.\n`);
    process.exit(passed === results.length ? 0 : 1);
  } finally {
    if (browser) await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
