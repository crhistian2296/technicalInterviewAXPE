import { useState } from 'react';
/**
 * Permite el manejo de eventos que solo tienen 2 estados
 * @param {Boolean} initialState
 * @returns Boolean
 */
export const useToggle = (initialState) => {
  const [state, setState] = useState((initialState = false));

  const toggle = () => setState((initialState) => !initialState);

  return [state, toggle];
};
