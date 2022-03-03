import React from "react";
import State from "./interfaces/state.interface";

export const state: State = {
  case: {
    caseId: '',
    content: ''
  },
  conditions: [],
  selectedConditionId: ''
};

const StateContext = React.createContext<State>(null!);

export default StateContext;
