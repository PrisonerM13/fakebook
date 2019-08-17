import { useState } from 'react';

export function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: any) => setValue(e.target.value);
  return { value, setValue, onChange };
}
