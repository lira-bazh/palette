import { useEffect, useRef, useState } from "react";

export const useEditText = (): [
  boolean,
  (value: boolean) => void,
  React.RefObject<HTMLInputElement | null>,
] => {
  const [editMode, setEditMode] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && refInput.current) {
      refInput.current.focus();
    }
  }, [editMode]);

  return [editMode, setEditMode, refInput];
};
