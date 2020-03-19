import React, { createContext, useReducer } from 'react';

type SettingsAction =
  | { type: 'ACTION_SWITCH_COUNTRY'; payload: { indexCountry: number } }
  | { type: 'ACTION_SWITCH_LANGUAGE'; payload: { indexLang: number } }
  | { type: 'ACTION_SWITCH_OFF_ANCHOR_OF_COUNTRY' }
  | { type: 'ACTION_SWITCH_OFF_ANCHOR_OF_LANG' }
  | { type: 'ACTION_SET_ANCHOR_OF_COUNTRY'; payload: { anchorCountry: null | HTMLElement } }
  | { type: 'ACTION_SET_ANCHOR_OF_LANG'; payload: { anchorLang: null | HTMLElement } };

type SettingsStateTypes = {
  anchorCountry: null | HTMLElement;
  anchorLang: null | HTMLElement;
  indexCountry: number;
  indexLang: number;
};

const initialState: SettingsStateTypes = {
  anchorCountry: null,
  anchorLang: null,
  indexCountry: 0,
  indexLang: 0,
};

const settingsReducer = (state = initialState, action: SettingsAction): SettingsStateTypes => {
  switch (action.type) {
    case 'ACTION_SWITCH_COUNTRY':
      const { indexCountry } = action.payload;
      return {
        ...state,
        anchorCountry: null,
        indexCountry,
      };
    case 'ACTION_SWITCH_LANGUAGE':
      const { indexLang } = action.payload;
      return {
        ...state,
        anchorLang: null,
        indexLang,
      };
    case 'ACTION_SET_ANCHOR_OF_COUNTRY':
      const { anchorCountry } = action.payload;
      return {
        ...state,
        anchorCountry,
      };
    case 'ACTION_SET_ANCHOR_OF_LANG':
      const { anchorLang } = action.payload;
      return {
        ...state,
        anchorLang,
      };
    case 'ACTION_SWITCH_OFF_ANCHOR_OF_COUNTRY':
      return {
        ...state,
        anchorCountry: null,
      };
    case 'ACTION_SWITCH_OFF_ANCHOR_OF_LANG':
      return {
        ...state,
        anchorLang: null,
      };
    default:
      return state;
  }
};

interface SettingsContextProp {
  settingsDispatch: Function;
  settingsState: SettingsStateTypes;
}

export const SettingsContext = createContext({} as SettingsContextProp);

type SettingsProviderProps = {
  children: React.ReactElement;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }: SettingsProviderProps) => {
  const [settingsState, settingsDispatch] = useReducer(settingsReducer, initialState);
  const value = { settingsState, settingsDispatch };
  return <SettingsContext.Provider value={value as SettingsContextProp}>{children}</SettingsContext.Provider>;
};
