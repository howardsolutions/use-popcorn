/**
 * hook that perform an action when certain key event happens
 * @param {string} key - whatever key event
 * @param {Function} action - a callback function or the action u wanna perform with certain event
 * @return {void} - nothing to return
 */
import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [action, key]);
}
