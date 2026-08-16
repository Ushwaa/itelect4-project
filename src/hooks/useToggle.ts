import { useState } from "react";

function useToggle(initialValue: boolean): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((previousValue: boolean) => !previousValue);
  };

  return [value, toggle];
}

export default useToggle;
