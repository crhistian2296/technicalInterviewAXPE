import { useState } from 'react';
/**
 * Permite el manejo de formulaios
 * @param {Object} initialState
 * @returns Object
 */
const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setFormValues(() => ({
      ...formValues,
      [target.name]: target.value,
    }));
  };

  const reset = () => setFormValues(initialState);

  return { formValues, handleInputChange, reset };
};

export default useForm;
