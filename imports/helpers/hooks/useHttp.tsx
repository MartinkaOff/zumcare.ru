export const useHttp = () => {
  const request = async (
    url: string,
    method,
    body,
    // headers = { 'Content-Type': 'application/x-www-form-urlencoded' },
    headers,
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
    } catch (e) {
      throw e;
    }
  };
  return { request };
};
