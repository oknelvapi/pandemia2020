import { action } from 'typesafe-actions';

export const setError = (error: Array<string>, errorCode: number) =>
  action('ACTION_SET_ERROR', { error: error, errorCode: errorCode });

export const cleanError = () => action('ACTION_CLEAN_ERROR');
