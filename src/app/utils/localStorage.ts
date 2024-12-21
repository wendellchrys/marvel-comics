export const LocalStorageUtils = {
    setItem<T>(key: string, value: T): void {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
  
    getItem<T>(key: string): T | null {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
      }
      return null;
    },
  
    removeItem(key: string): void {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    },
  
    clear(): void {
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    },
  };
  