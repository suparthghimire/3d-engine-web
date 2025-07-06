export function useLocalStorage() {
  const getItem = <T,>(key: string, defaultValue: T) => {
    try {
      const value = window.localStorage.getItem(key);
      if (!value) throw new Error("Value not found");
      return JSON.parse(value) as T;
    } catch {
      return defaultValue;
    }
  };
  const setItem = (args: { key: string; value: string }) => {
    const { key, value } = args;
    console.log({ key, value });
    window.localStorage.setItem(key, value);
  };

  return { getItem, setItem };
}
