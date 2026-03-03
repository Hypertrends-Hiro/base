import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentLayout } from "@/components/assessment/AssessmentLayout";
import { SectionBiometrics } from "@/components/assessment/steps/SectionBiometrics";
import { SectionHealthGoals } from "@/components/assessment/steps/SectionHealthGoals";
import { SectionPregnancy } from "@/components/assessment/steps/SectionPregnancy";
import { SectionHormonalHealth } from "@/components/assessment/steps/SectionHormonalHealth";
import { SectionMedicalHistory } from "@/components/assessment/steps/SectionMedicalHistory";
import { SectionPreventiveScreening } from "@/components/assessment/steps/SectionPreventiveScreening";
import { SectionMedications } from "@/components/assessment/steps/SectionMedications";
import { SectionFamilyHistory } from "@/components/assessment/steps/SectionFamilyHistory";
import { SectionNutrition } from "@/components/assessment/steps/SectionNutrition";
import { SectionPhysicalActivity } from "@/components/assessment/steps/SectionPhysicalActivity";
import { SectionSleep } from "@/components/assessment/steps/SectionSleep";
import { SectionSubstanceUse } from "@/components/assessment/steps/SectionSubstanceUse";
import { SectionInformedConsent } from "@/components/assessment/steps/SectionInformedConsent";

const TOTAL_STEPS = 13;

export default function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});

  const handleAnswer = (key: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep === TOTAL_STEPS) {
      navigate("/assessment-complete");
    } else {
      setDirection("forward");
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/welcome");
    } else {
      setDirection("back");
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const commonProps = { answers, onAnswer: handleAnswer, onNext: handleNext, onBack: handleBack, direction };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <SectionBiometrics {...commonProps} />;
      case 2: return <SectionHealthGoals {...commonProps} />;
      case 3: return <SectionPregnancy {...commonProps} />;
      case 4: return <SectionHormonalHealth {...commonProps} />;
      case 5: return <SectionMedicalHistory {...commonProps} />;
      case 6: return <SectionPreventiveScreening {...commonProps} />;
      case 7: return <SectionMedications {...commonProps} />;
      case 8: return <SectionFamilyHistory {...commonProps} />;
      case 9: return <SectionNutrition {...commonProps} />;
      case 10: return <SectionPhysicalActivity {...commonProps} />;
      case 11: return <SectionSleep {...commonProps} />;
      case 12: return <SectionSubstanceUse {...commonProps} />;
      case 13: return <SectionInformedConsent {...commonProps} />;
      default: return null;
    }
  };

  return (
    <AssessmentLayout currentStep={currentStep} totalSteps={TOTAL_STEPS}>
      {renderStep()}
    </AssessmentLayout>
  );
}
