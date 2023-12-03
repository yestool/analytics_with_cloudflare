export function checkUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function getUrlData(url: string): { pathname: string, hostname: string } {
  const { pathname, hostname } = new URL(url);
  return { pathname, hostname };
}