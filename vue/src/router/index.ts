import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppShell from '../layouts/AppShell.vue'
import LandingView from '../pages/LandingView.vue'
import ShopView from '../pages/ShopView.vue'
import DashboardView from '../pages/DashboardView.vue'
import ProfileView from '../pages/ProfileView.vue'
import ResultsView from '../pages/ResultsView.vue'
import PlanView from '../pages/PlanView.vue'
import PlanDetailView from '../pages/PlanDetailView.vue'
import TreatmentsView from '../pages/TreatmentsView.vue'
import ManageSubscriptionView from '../pages/ManageSubscriptionView.vue'
import LifestyleView from '../pages/LifestyleView.vue'
import InfoView from '../pages/InfoView.vue'
import OrderHistoryView from '../pages/OrderHistoryView.vue'
import PatientPortalView from '../pages/PatientPortalView.vue'
import AssessmentView from '../pages/AssessmentView.vue'
import LoginView from '../pages/LoginView.vue'
import RegisterView from '../pages/RegisterView.vue'
import PaymentView from '../pages/PaymentView.vue'
import WelcomeView from '../pages/WelcomeView.vue'
import AssessmentCompleteView from '../pages/AssessmentCompleteView.vue'
import CheckoutView from '../pages/CheckoutView.vue'
import ThankYouView from '../pages/ThankYouView.vue'
import NotFoundView from '../pages/NotFoundView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/welcome', name: 'welcome', component: WelcomeView },
  { path: '/assessment', name: 'assessment', component: AssessmentView },
  { path: '/assessment-complete', name: 'assessment-complete', component: AssessmentCompleteView },
  {
    path: '/',
    component: AppShell,
    children: [
      { path: '', name: 'landing', component: LandingView },
      { path: 'shop', name: 'shop', component: ShopView },
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'profile', name: 'profile', component: ProfileView },
      { path: 'results', name: 'results', component: ResultsView },
      { path: 'plan', name: 'plan', component: PlanView },
      { path: 'plan/:categoryId', name: 'plan-detail', component: PlanDetailView },
      { path: 'treatments', name: 'treatments', component: TreatmentsView },
      { path: 'treatments/manage/:treatmentName', name: 'manage-subscription', component: ManageSubscriptionView },
      { path: 'lifestyle', name: 'lifestyle', component: LifestyleView },
      { path: 'info', name: 'info', component: InfoView },
      { path: 'order-history', name: 'order-history', component: OrderHistoryView },
      { path: 'patient-portal', name: 'patient-portal', component: PatientPortalView },
      { path: 'payment', name: 'payment', component: PaymentView },
      { path: 'checkout', name: 'checkout', component: CheckoutView },
      { path: 'thank-you', name: 'thank-you', component: ThankYouView },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})
