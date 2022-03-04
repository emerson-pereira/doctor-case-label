import React from "react";
import State, { Case, Condition } from "./interfaces/state.interface";

const StateContext = React.createContext<State>(null!);

export function useLocalState() {
  return React.useContext(StateContext);
}

export function StateProvider({ children }: { children: React.ReactNode }) {
  const initCase: Case = {
    caseId: '',
    content: ''
  };

  const [currentCase, setCase] = React.useState<Case>(initCase);
  const [conditions, setConditions] = React.useState<Condition[]>([]);
  const [selectedConditionId, setSelectedConditionId] = React.useState<string>('');

  const updateCase = (newCase: Case, callback: VoidFunction) => {
    setCase(newCase);
    callback();
  };

  const updateConditions = (newConditions: Condition[], callback: VoidFunction) => {
    setConditions(newConditions);
    callback();
  };

  const updateSelectedConditionId = (newConditionId: string, callback: VoidFunction) => {
    setSelectedConditionId(newConditionId);
    callback();
  };

  const value: State = {
    case: currentCase,
    conditions,
    selectedConditionId,
    updateCase,
    updateConditions,
    updateSelectedConditionId
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

export default StateProvider;
