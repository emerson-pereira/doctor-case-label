interface Case {
  caseId: string;
  content: string;
}

interface Condition {
  conditionId: string;
  description: string;
  code: string;
}

interface State {
  case: Case;
  conditions: Condition[];
  selectedConditionId: string;
}

export default State;
