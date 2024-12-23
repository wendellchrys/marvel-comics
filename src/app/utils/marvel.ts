import md5 from "md5";

const MARVEL_API_BASE_URL = process.env.MARVEL_API_BASE_URL!;
const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY!;
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY!;

const getAuthParams = () => {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  return { ts, apikey: MARVEL_PUBLIC_KEY, hash };
};

export const buildMarvelUrl = (endpoint: string, params: Record<string, string> = {}) => {
  const authParams = getAuthParams();
  const queryParams = new URLSearchParams({ ...params, ...authParams });
  const fullUrl = `${MARVEL_API_BASE_URL}${endpoint}?${queryParams.toString()}`;
  return fullUrl;
};
