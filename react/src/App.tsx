import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { ScenarioProvider } from "@/contexts/ScenarioContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { DashboardLayout } from "@/components/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import AssessmentComplete from "./pages/AssessmentComplete";
import Landing2 from "./pages/Landing2";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import Plan from "./pages/Plan";
import PlanDetail from "./pages/PlanDetail";
import Treatments from "./pages/Treatments";
import ManageSubscription from "./pages/ManageSubscription";
import Lifestyle from "./pages/Lifestyle";
import Info from "./pages/Info";
import OrderHistory from "./pages/OrderHistory";
import Checkout from "./pages/Checkout";
import PatientPortal from "./pages/PatientPortal";
import ThankYou from "./pages/ThankYou";
import Shop from "./pages/Shop";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
    <ScenarioProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Landing2 />} />
          <Route path="/shop" element={<Shop />} />
          
          {/* Dashboard pages share a persistent layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/results" element={<Results />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/plan/:categoryId" element={<PlanDetail />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/treatments/manage/:treatmentName" element={<ManageSubscription />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/info" element={<Info />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/patient-portal" element={<PatientPortal />} />
          </Route>

          <Route path="/assessment" element={<Assessment />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/assessment-complete" element={<AssessmentComplete />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ScenarioProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
