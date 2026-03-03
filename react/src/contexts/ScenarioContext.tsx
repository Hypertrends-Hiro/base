import { createContext, useContext, useState, ReactNode } from "react";

export type ScenarioKey = "none" | "assessment-not-started" | "intake-complete" | "labs-ordered" | "preparing-lab-requisition" | "default-with-wizard" | "new-rx-ordered";

interface ScenarioContextValue {
  scenario: ScenarioKey;
  setScenario: (key: ScenarioKey) => void;
}

const ScenarioContext = createContext<ScenarioContextValue>({
  scenario: "none",
  setScenario: () => {},
});

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<ScenarioKey>("none");
  return (
    <ScenarioContext.Provider value={{ scenario, setScenario }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  return useContext(ScenarioContext);
}
