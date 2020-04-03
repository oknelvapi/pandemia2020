import { ActionType } from 'typesafe-actions';
import * as actions from 'Store/Actions';

export type mainActions = ActionType<typeof actions>;

export const serviceState: ServiceReducer = {
  errors: null,
  version: null,
  errorCode: null,
};

export const service = (state = serviceState, action: mainActions) => {
  switch (action.type) {
    case 'ACTION_SET_ERROR':
      const { error, errorCode } = action.payload;
      return {
        ...state,
        errors: error,
        errorCode: errorCode,
      };
    case 'ACTION_CLEAN_ERROR':
      return {
        ...state,
        errors: null,
        errorCode: null,
      };
    default:
      return state;
  }
};
