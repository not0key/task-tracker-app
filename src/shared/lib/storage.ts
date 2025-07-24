export function getFromStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function saveToStorage(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}
