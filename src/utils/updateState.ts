export const updateState = <T>(prevState: T, updates: Partial<T>) => {
  return { ...prevState, ...updates };
};
