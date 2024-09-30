import 'react-native-url-polyfill';

const BASE_API = 'https://narutodb.xyz';
const CHARACTERS_ENDPOINT = '/api/character';

export function buildUrlUseCase(limit: number = 1429): URL {
  const url = new URL(CHARACTERS_ENDPOINT, BASE_API);
  const queryParams = {
    page: '0',
    limit: limit.toString(),
  };
  const params = new URLSearchParams(queryParams);
  url.search = params.toString();
  console.log(`Our endpoint: ` + url.toString());
  return url;
}
