import axios from 'axios';

const BASE_URL = 'https://covid19.mathdro.id';

// if (process.env.NODE_ENV !== 'production') {
//   BASE_URL = 'http://localhost:3001';
// }

export const instance = axios.create({
  baseURL: BASE_URL,
});

const GLOBAL = '/api';
const SUMMARY_UKRAINE = 'api/countries/Ukraine';
const SUMMARY_USA = 'api/countries/USA';
const GLOBAL_CONFIRMED = '/api/confirmed';
const GLOBAL_DEATHS = '/api/recovered';
const GLOBAL_RECOVERED = 'api/deaths';

export const getGlobal = () => instance.get(GLOBAL);
export const getGlobalConfirmed = () => instance.get(GLOBAL_CONFIRMED);
export const getSummaryUSA = () => instance.get(SUMMARY_USA);
export const getSummaryUkraine = () => instance.get(SUMMARY_UKRAINE);
export const getGlobalDeaths = () => instance.get(GLOBAL_DEATHS);
export const getGlobalRecovered = () => instance.get(GLOBAL_RECOVERED);

export const getDataFromRNBO = () => axios.get('https://api-covid19.rnbo.gov.ua/data?to=2020-04-02');
