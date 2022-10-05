export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  return res.json();
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
