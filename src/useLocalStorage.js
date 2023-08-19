/**
 * the hook use to get, set list of value in / out localStorage
 * @param {Array} initialState -
 * @param {string} key - key name of the value we want to store in local storage
 * @return {Array} an array of value state, and value state update function
 */

import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storagedValue = localStorage.getItem(key);
    return JSON.parse(storagedValue) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
