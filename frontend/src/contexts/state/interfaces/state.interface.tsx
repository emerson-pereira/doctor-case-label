export interface Case {
  caseId: string;
  content: string;
}

export interface Condition {
  conditionId: string;
  description: string;
  code: string;
}

interface State {
  case: Case;
  conditions: Condition[];
  selectedConditionId: string;
  updateCase: (currentCase: Case, callback?: VoidFunction) => void;
  updateConditions: (conditions: Condition[], callback?: VoidFunction) => void;
  updateSelectedConditionId: (conditionId: string, callback?: VoidFunction) => void;
}

export default State;
